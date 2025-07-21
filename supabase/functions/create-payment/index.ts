
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
    // Basic XSS protection
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

    const { amount, serviceName, type } = paymentData;
    
    // Validate input
    const validationErrors = validatePaymentInput(amount, serviceName, type);
    if (validationErrors.length > 0) {
      logPaymentAttempt(clientIP, userAgent, user, paymentData, false, `Validation failed: ${validationErrors.join(", ")}`);
      return new Response(JSON.stringify({ error: validationErrors.join(", ") }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

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
    // The secret is stored with the actual key as the name in Supabase
    const stripeSecretKey = "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";
    
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

    if (type === 'deposit') {
      // For deposit payments, use the provided Stripe product
      // First, get the prices for the product
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

    // Record the payment attempt in Supabase with enhanced metadata
    try {
      await supabaseClient.from("orders").insert({
        user_id: user?.id || null, // Allow null for guest payments
        stripe_session_id: session.id,
        amount: type === 'deposit' ? 2000 : (amount || 2000), // £20 for deposit
        currency: "gbp",
        status: "pending",
        service_name: serviceName || (type === 'deposit' ? "Service Deposit" : "Premium Service"),
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
