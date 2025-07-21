import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation
const validateEmail = (email: any) => {
  const errors: string[] = [];
  
  if (!email || typeof email !== 'string') {
    errors.push("Email is required and must be a string");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Invalid email format");
  } else if (email.length > 255) {
    errors.push("Email must be less than 255 characters");
  }
  
  return errors;
};

// Rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (identifier: string, maxRequests = 3, windowMinutes = 15): boolean => {
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

interface NewsletterData {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIP = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(clientIP, 2, 15)) {
      return new Response(JSON.stringify({ 
        error: "Too many newsletter subscriptions. Please try again later.",
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 429,
      });
    }

    // Parse and validate request
    let newsletterData;
    try {
      newsletterData = await req.json();
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: "Invalid JSON in request body",
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Validate input
    const validationErrors = validateEmail(newsletterData.email);
    if (validationErrors.length > 0) {
      return new Response(JSON.stringify({ 
        error: validationErrors.join(", "),
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { email }: NewsletterData = newsletterData;

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert newsletter subscription
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email }])
      .select()
      .single();

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ 
            success: true,
            message: "You're already subscribed to our newsletter!" 
          }), 
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }
      throw error;
    }

    console.log("Newsletter subscription added:", data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Successfully subscribed to newsletter!" 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in subscribe-newsletter function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);