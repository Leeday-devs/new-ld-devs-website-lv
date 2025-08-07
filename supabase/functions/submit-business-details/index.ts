import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    const body = await req.json();
    console.log('Received business details submission:', body);

    // Create Supabase client with service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Store business details in database
    const { data: detailsData, error: detailsError } = await supabaseAdmin
      .from('template_purchases')
      .insert({
        stripe_session_id: body.sessionId,
        template_name: body.templateName,
        business_name: body.businessName,
        email: body.email,
        phone: body.phone,
        website: body.website,
        business_description: body.businessDescription,
        services_offered: body.servicesOffered,
        target_audience: body.targetAudience,
        brand_colors: body.brandColors,
        preferred_style: body.preferredStyle,
        additional_requests: body.additionalRequests,
        logo_url: body.logoUrl,
        status: 'submitted',
        submitted_at: body.submittedAt
      });

    if (detailsError) {
      console.error('Database error:', detailsError);
      throw new Error('Failed to store business details');
    }

    console.log('Business details stored successfully:', detailsData);

    // Send notification email to team (optional)
    try {
      const emailBody = {
        to: "hello@ldevelopment.co.uk",
        subject: `New Template Purchase: ${body.templateName} - ${body.businessName}`,
        html: `
          <h2>New Template Purchase Details</h2>
          <p><strong>Template:</strong> ${body.templateName}</p>
          <p><strong>Business Name:</strong> ${body.businessName}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
          <p><strong>Website:</strong> ${body.website || 'Not provided'}</p>
          
          <h3>Business Details</h3>
          <p><strong>Description:</strong> ${body.businessDescription || 'Not provided'}</p>
          <p><strong>Services:</strong> ${body.servicesOffered || 'Not provided'}</p>
          <p><strong>Target Audience:</strong> ${body.targetAudience || 'Not provided'}</p>
          
          <h3>Branding</h3>
          <p><strong>Brand Colors:</strong> ${body.brandColors || 'Not specified'}</p>
          <p><strong>Preferred Style:</strong> ${body.preferredStyle || 'Not specified'}</p>
          <p><strong>Logo URL:</strong> ${body.logoUrl || 'No logo uploaded'}</p>
          
          <h3>Additional Requests</h3>
          <p>${body.additionalRequests || 'None'}</p>
          
          <hr>
          <p><strong>Stripe Session ID:</strong> ${body.sessionId}</p>
          <p><strong>Submitted At:</strong> ${body.submittedAt}</p>
        `
      };

      const { error: emailError } = await supabaseAdmin.functions.invoke('send-contact-email', {
        body: emailBody
      });

      if (emailError) {
        console.error('Email notification error:', emailError);
        // Don't throw error - email is optional
      } else {
        console.log('Email notification sent successfully');
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Continue - email notification is optional
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Business details submitted successfully' 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Submission error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to submit business details' 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});