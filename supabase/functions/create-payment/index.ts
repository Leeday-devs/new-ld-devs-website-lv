
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    // Parse request body to get payment details
    const { amount, serviceName, type } = await req.json();
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("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") || "", {
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

    // Record the payment attempt in Supabase (optional for guest payments)
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
    } catch (dbError) {
      console.log("Failed to record payment in database (guest payment):", dbError);
      // Continue with payment even if database insert fails for guest payments
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
