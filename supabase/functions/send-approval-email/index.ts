import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApprovalEmailRequest {
  customerEmail: string;
  customerName: string;
  status: 'approved' | 'declined';
  reason?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerEmail, customerName, status, reason }: ApprovalEmailRequest = await req.json();

    if (!customerEmail || !customerName || !status) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    let emailSubject: string;
    let emailContent: string;

    if (status === 'approved') {
      emailSubject = "🎉 Your Account Has Been Approved!";
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to Our Platform!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your account has been approved</p>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
            <h2 style="color: #1e293b; margin-top: 0;">Hi ${customerName},</h2>
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              Great news! Your account has been reviewed and <strong>approved</strong>. You can now access your customer dashboard and start using our services.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
              <h3 style="color: #065f46; margin-top: 0; margin-bottom: 15px;">What's Next?</h3>
              <ul style="color: #374151; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Log in to your customer dashboard</li>
                <li style="margin-bottom: 8px;">Explore your services and plans</li>
                <li style="margin-bottom: 8px;">Submit work requests</li>
                <li>Access your project analytics</li>
              </ul>
            </div>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${req.headers.get("origin")}/dashboard" 
               style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Access Your Dashboard
            </a>
          </div>
          
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center;">
            <p style="color: #64748b; margin: 0; font-size: 14px;">
              If you have any questions, feel free to contact our support team.
            </p>
          </div>
        </div>
      `;
    } else {
      emailSubject = "Account Registration Update";
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #fee2e2; color: #991b1b; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px;">Registration Update</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Regarding your account application</p>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
            <h2 style="color: #1e293b; margin-top: 0;">Hi ${customerName},</h2>
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              Thank you for your interest in our platform. After reviewing your registration, we're unable to approve your account at this time.
            </p>
            
            ${reason ? `
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <h3 style="color: #92400e; margin-top: 0; margin-bottom: 15px;">Reason:</h3>
                <p style="color: #374151; margin: 0;">${reason}</p>
              </div>
            ` : ''}
          </div>
          
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center;">
            <p style="color: #64748b; margin: 0; font-size: 14px;">
              If you believe this is an error or have questions, please contact our support team.
            </p>
          </div>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "No Reply <noreply@resend.dev>",
      to: [customerEmail],
      subject: emailSubject,
      html: emailContent,
    });

    console.log("Approval email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-approval-email function:", error);
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