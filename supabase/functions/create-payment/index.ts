
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

// Input validation functions
const validatePaymentInput = (amount: any, serviceName: any, type: any) => {
  const errors: string[] = [];
  
  if (amount !== undefined) {
    if (typeof amount !== 'number' || amount < 100 || amount > 1000000) {
      errors.push("Amount must be a number between £1 and £10,000");
    }
  }
  
  if (serviceName !== undefined) {
    if (typeof serviceName !== 'string' || serviceName.length > 255) {
      errors.push("Service name must be a string with max 255 characters");
    }
    // Enhanced XSS protection
    if (/<script|javascript:|on\w+=/i.test(serviceName)) {
      errors.push("Service name contains invalid characters");
    }
  }
  
  if (type !== undefined) {
    if (typeof type !== 'string' || !['deposit', 'full', 'subscription'].includes(type)) {
      errors.push("Payment type must be 'deposit', 'full', or 'subscription'");
    }
  }
  
  return errors;
};

// Customer information validation function
const validateCustomerInfo = (customerInfo: any): string[] => {
  const errors: string[] = [];
  
  if (!customerInfo) {
    errors.push('Customer information is required');
    return errors;
  }
  
  // Validate full name
  if (!customerInfo.fullName || typeof customerInfo.fullName !== 'string') {
    errors.push('Full name is required');
  } else if (customerInfo.fullName.trim().length < 2 || customerInfo.fullName.trim().length > 100) {
    errors.push('Full name must be between 2 and 100 characters');
  } else if (/<script|javascript:|on\w+=/i.test(customerInfo.fullName)) {
    errors.push('Full name contains invalid characters');
  }
  
  // Validate email
  if (!customerInfo.email || typeof customerInfo.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email) || customerInfo.email.length > 254) {
      errors.push('Valid email is required (max 254 characters)');
    }
  }
  
  // Validate phone (optional but if provided, must be valid)
  if (customerInfo.phone && typeof customerInfo.phone === 'string') {
    const phoneClean = customerInfo.phone.replace(/[\s\-\(\)]/g, '');
    if (phoneClean.length > 0 && (phoneClean.length < 7 || phoneClean.length > 15 || !/^\+?[\d]+$/.test(phoneClean))) {
      errors.push('Phone number must be 7-15 digits');
    }
  }
  
  // Validate company (optional but if provided, must be reasonable length)
  if (customerInfo.company && typeof customerInfo.company === 'string') {
    if (customerInfo.company.trim().length > 100) {
      errors.push('Company name must not exceed 100 characters');
    } else if (/<script|javascript:|on\w+=/i.test(customerInfo.company)) {
      errors.push('Company name contains invalid characters');
    }
  }
  
  return errors;
};

// Sanitize customer information
const sanitizeCustomerInfo = (customerInfo: any) => {
  if (!customerInfo) return null;
  
  return {
    fullName: customerInfo.fullName?.trim().substring(0, 100).replace(/[<>]/g, '') || '',
    email: customerInfo.email?.trim().toLowerCase().substring(0, 254) || '',
    phone: customerInfo.phone?.trim().replace(/[^\d\s\-\(\)\+]/g, '').substring(0, 20) || null,
    company: customerInfo.company?.trim().substring(0, 100).replace(/[<>]/g, '') || null
  };
};

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (identifier: string, maxRequests = 10, windowMinutes = 15): boolean => {
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;
  
  const record = rateLimitStore.get(identifier);
  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
};

// Security monitoring and fraud detection
const detectSuspiciousActivity = (req: Request, paymentData: any): string[] => {
  const warnings: string[] = [];
  const userAgent = req.headers.get("user-agent") || "";
  const clientIP = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "unknown";
  
  // Detect automated requests
  if (!userAgent || userAgent.includes("bot") || userAgent.includes("crawler")) {
    warnings.push("Suspicious user agent detected");
  }
  
  // Detect unusually high amounts
  if (paymentData.amount && paymentData.amount > 500000) { // £5000
    warnings.push("Unusually high payment amount");
  }
  
  // Detect rapid requests from same IP
  const recentRequests = rateLimitStore.get(clientIP);
  if (recentRequests && recentRequests.count > 3) {
    warnings.push("Multiple payment attempts from same IP");
  }
  
  return warnings;
};

// Enhanced audit logging
const logPaymentAttempt = (
  clientIP: string, 
  userAgent: string, 
  user: any, 
  paymentData: any, 
  success: boolean, 
  error?: string,
  warnings?: string[]
) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: "payment_attempt",
    clientIP,
    userAgent,
    userId: user?.id || "guest",
    userEmail: user?.email || "guest",
    paymentType: paymentData.type || "unknown",
    amount: paymentData.amount,
    serviceName: paymentData.serviceName,
    success,
    error,
    securityWarnings: warnings || [],
    metadata: {
      hasAuth: !!user,
      origin: paymentData.origin
    }
  };
  
  console.log("PAYMENT_AUDIT:", JSON.stringify(logEntry));
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const clientIP = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "unknown";
  const userAgent = req.headers.get("user-agent") || "";
  let paymentData: any = {};
  let user: any = null;

  try {
    // Enhanced rate limiting with IP tracking
    if (!checkRateLimit(clientIP, 5, 15)) {
      logPaymentAttempt(clientIP, userAgent, null, {}, false, "Rate limit exceeded");
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 429,
      });
    }
    // Create Supabase client using the service role key for secure writes
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Try to retrieve authenticated user, but don't require it for guest payments
    let user = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data } = await supabaseClient.auth.getUser(token);
        user = data.user;
      } catch (error) {
        console.log("No valid auth token, proceeding with guest payment");
      }
    }

    // Parse and validate request body
    try {
      paymentData = await req.json();
      paymentData.origin = req.headers.get("origin");
    } catch (error) {
      logPaymentAttempt(clientIP, userAgent, user, {}, false, "Invalid JSON in request body");
      return new Response(JSON.stringify({ error: "Invalid JSON in request body" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { amount, serviceName, type, customerInfo, stripeProductKey } = paymentData;
    console.log("Payment data received:", { amount, serviceName, type, stripeProductKey, customerInfo });
    
    // Validate input - skip amount validation if using Stripe product key
    if (!stripeProductKey) {
      const validationErrors = validatePaymentInput(amount, serviceName, type);
      if (validationErrors.length > 0) {
        logPaymentAttempt(clientIP, userAgent, user, paymentData, false, `Validation failed: ${validationErrors.join(", ")}`);
        return new Response(JSON.stringify({ error: validationErrors.join(", ") }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
    }

    // Validate customer information
    const customerValidationErrors = validateCustomerInfo(customerInfo);
    if (customerValidationErrors.length > 0) {
      logPaymentAttempt(clientIP, userAgent, user, paymentData, false, `Customer validation failed: ${customerValidationErrors.join(", ")}`);
      return new Response(JSON.stringify({ error: customerValidationErrors.join(", ") }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Sanitize customer information
    const sanitizedCustomerInfo = sanitizeCustomerInfo(customerInfo);

    // Security fraud detection
    const securityWarnings = detectSuspiciousActivity(req, paymentData);
    if (securityWarnings.length > 0) {
      console.warn("SECURITY_WARNING:", JSON.stringify({
        timestamp: new Date().toISOString(),
        clientIP,
        userAgent,
        warnings: securityWarnings,
        paymentData: { amount, serviceName, type }
      }));
    }
    
    // Initialize Stripe with proper secret key from environment
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      console.error("Stripe secret key not found in environment");
      logPaymentAttempt(clientIP, userAgent, user, paymentData, false, "Stripe secret key not configured");
      return new Response(JSON.stringify({ error: "Payment processing unavailable" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // For guest payments, use a default email or collect it in the checkout
    const customerEmail = user?.email || "guest@ldevelopment.co.uk";

    // Check if a Stripe customer record exists for this email
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    let sessionConfig;

    if (stripeProductKey) {
      // For payments with Stripe product key, use the product directly
      console.log("Using Stripe product key:", stripeProductKey);
      
      const prices = await stripe.prices.list({
        product: stripeProductKey,
        active: true,
        limit: 1,
      });

      if (prices.data.length === 0) {
        throw new Error(`No active price found for product ${stripeProductKey}`);
      }

      const priceId = prices.data[0].id;
      console.log("Found price ID:", priceId);

      sessionConfig = {
        customer: customerId,
        customer_email: customerId ? undefined : customerEmail,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: paymentData.successUrl || `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: paymentData.cancelUrl || `${req.headers.get("origin")}/payment-canceled`,
        metadata: {
          service_name: serviceName || "Website Template",
          payment_type: "template_purchase",
          user_id: user?.id || "guest",
          stripe_product_key: stripeProductKey,
        },
      };
    } else if (type === 'deposit') {
      // For deposit payments, use the provided Stripe product
      const prices = await stripe.prices.list({
        product: 'prod_SikyUQfqEguRP8',
        active: true,
        limit: 1,
      });

      if (prices.data.length === 0) {
        throw new Error("No active price found for the deposit product");
      }

      const priceId = prices.data[0].id;

      sessionConfig = {
        customer: customerId,
        customer_email: customerId ? undefined : customerEmail,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=deposit`,
        cancel_url: `${req.headers.get("origin")}/payment-canceled?type=deposit`,
        metadata: {
          service_name: serviceName || "Service Deposit",
          payment_type: "deposit",
          user_id: user?.id || "guest",
        },
      };
    } else {
      // For other payments, use the original logic
      sessionConfig = {
        customer: customerId,
        customer_email: customerId ? undefined : customerEmail,
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product_data: { 
                name: serviceName || "Premium Service",
                description: "Professional service consultation and delivery"
              },
              unit_amount: amount || 2000, // Default to £20 if no amount specified
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get("origin")}/payment-canceled`,
        metadata: {
          service_name: serviceName || "Premium Service",
          payment_type: type || "full",
          user_id: user?.id || "guest",
        },
      };
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Record the payment attempt in Supabase with enhanced metadata and customer info
    try {
      await supabaseClient.from("orders").insert({
        user_id: user?.id || null, // Allow null for guest payments
        stripe_session_id: session.id,
        amount: type === 'deposit' ? 2000 : (amount || 2000), // £20 for deposit
        currency: "gbp",
        status: "pending",
        service_name: serviceName || (type === 'deposit' ? "Service Deposit" : "Premium Service"),
        customer_name: sanitizedCustomerInfo?.fullName || null,
        customer_email: sanitizedCustomerInfo?.email || customerEmail,
        customer_phone: sanitizedCustomerInfo?.phone || null,
        customer_company: sanitizedCustomerInfo?.company || null,
        created_at: new Date().toISOString()
      });

      // Log successful payment creation
      logPaymentAttempt(
        clientIP, 
        userAgent, 
        user, 
        paymentData, 
        true, 
        undefined, 
        securityWarnings.length > 0 ? securityWarnings : undefined
      );

    } catch (dbError) {
      console.error("Failed to record payment in database:", dbError);
      logPaymentAttempt(clientIP, userAgent, user, paymentData, false, `Database error: ${dbError.message}`);
      // Continue with payment even if database insert fails for guest payments
    }

    // Performance monitoring
    const processingTime = Date.now() - startTime;
    console.log("PAYMENT_PERFORMANCE:", JSON.stringify({
      timestamp: new Date().toISOString(),
      processingTimeMs: processingTime,
      paymentType: type,
      amount: amount,
      userType: user ? "authenticated" : "guest"
    }));

    // Send Discord notification for purchase
    try {
      const discordWebhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL');
      if (discordWebhookUrl) {
        await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-discord-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
           body: JSON.stringify({
             webhookUrl: discordWebhookUrl,
             eventType: 'purchase',
             data: {
               customerName: sanitizedCustomerInfo?.fullName,
               customerEmail: sanitizedCustomerInfo?.email,
               customerCompany: sanitizedCustomerInfo?.company,
               customerPhone: sanitizedCustomerInfo?.phone,
               serviceName: serviceName,
               amount: type === 'deposit' ? 2000 : (amount || 2000)
             }
           })
        });
      }
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
      // Don't fail the payment if Discord notification fails
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    
    // Log payment failure with full context
    logPaymentAttempt(
      clientIP, 
      userAgent, 
      user, 
      paymentData, 
      false, 
      error.message
    );
    
    return new Response(JSON.stringify({ 
      error: "Payment processing failed. Please try again." 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
