import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WebsiteSetupRequest {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  servicesOffered?: string;
  stylePreferences?: string;
  logoUrl?: string;
  imageUrls?: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: WebsiteSetupRequest = await req.json();
    
    const {
      name,
      businessName,
      email,
      phone,
      servicesOffered,
      stylePreferences,
      logoUrl,
      imageUrls
    } = data;

    // Create email content
    const emailHtml = `
      <h2>New Website Setup Form Submission</h2>
      
      <h3>Contact Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Business Name:</strong> ${businessName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
      </ul>
      
      <h3>Business Details:</h3>
      <p><strong>Services Offered:</strong></p>
      <p>${servicesOffered || 'Not provided'}</p>
      
      <p><strong>Style Preferences:</strong></p>
      <p>${stylePreferences || 'Not provided'}</p>
      
      <h3>Files:</h3>
      <ul>
        <li><strong>Logo:</strong> ${logoUrl ? 'Uploaded' : 'Not provided'}</li>
        <li><strong>Images:</strong> ${imageUrls?.length ? `${imageUrls.length} image(s) uploaded` : 'Not provided'}</li>
      </ul>
      
      <hr style="margin: 20px 0;">
      <p><small>This email was sent from the L-Development website setup form.</small></p>
    `;

    // Send email to business
    const emailResponse = await resend.emails.send({
      from: "Website Setup <noreply@yourdomain.com>",
      to: ["leedaydevs@gmail.com"],
      subject: `New Website Setup: ${businessName}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    // Send confirmation email to customer
    const confirmationHtml = `
      <h2>Thank you for your website setup submission!</h2>
      
      <p>Hi ${name},</p>
      
      <p>We've received your information for <strong>${businessName}</strong> and will begin customizing your website.</p>
      
      <p>You'll receive your first mockup within <strong>24–48 hours</strong>.</p>
      
      <p>If you have any questions, please contact us:</p>
      <ul>
        <li>Email: <a href="mailto:leedaydevs@gmail.com">leedaydevs@gmail.com</a></li>
        <li>Phone: <a href="tel:07586266007">07586 266007</a></li>
      </ul>
      
      <p>Thank you for choosing L-Development!</p>
      
      <p>Best regards,<br>The L-Development Team</p>
    `;

    const confirmationResponse = await resend.emails.send({
      from: "L-Development <noreply@yourdomain.com>",
      to: [email],
      subject: "Website Setup Received - We'll Send Your Mockup Soon!",
      html: confirmationHtml,
    });

    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailResponse,
      confirmationResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-website-setup-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);