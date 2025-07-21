import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation and sanitization
const validateContactForm = (data: any) => {
  const errors: string[] = [];
  
  if (!data.name || typeof data.name !== 'string') {
    errors.push("Name is required and must be a string");
  } else if (data.name.length > 100) {
    errors.push("Name must be less than 100 characters");
  }
  
  if (!data.email || typeof data.email !== 'string') {
    errors.push("Email is required and must be a string");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email format");
  } else if (data.email.length > 255) {
    errors.push("Email must be less than 255 characters");
  }
  
  if (!data.subject || typeof data.subject !== 'string') {
    errors.push("Subject is required and must be a string");
  } else if (data.subject.length > 200) {
    errors.push("Subject must be less than 200 characters");
  }
  
  if (!data.message || typeof data.message !== 'string') {
    errors.push("Message is required and must be a string");
  } else if (data.message.length > 5000) {
    errors.push("Message must be less than 5000 characters");
  }
  
  // Basic XSS protection
  const xssPattern = /<script|javascript:|on\w+=/i;
  if (xssPattern.test(data.name) || xssPattern.test(data.subject) || xssPattern.test(data.message)) {
    errors.push("Input contains invalid characters");
  }
  
  return errors;
};

const sanitizeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (identifier: string, maxRequests = 5, windowMinutes = 15): boolean => {
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

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Enhanced audit logging for contact forms
const logContactSubmission = (
  clientIP: string,
  userAgent: string,
  formData: any,
  success: boolean,
  error?: string,
  warnings?: string[]
) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: "contact_form_submission",
    clientIP,
    userAgent,
    email: formData.email,
    success,
    error,
    securityWarnings: warnings || [],
    metadata: {
      subjectLength: formData.subject?.length || 0,
      messageLength: formData.message?.length || 0,
      nameLength: formData.name?.length || 0
    }
  };
  
  console.log("CONTACT_AUDIT:", JSON.stringify(logEntry));
};

// Security monitoring for contact forms
const detectSuspiciousContact = (req: Request, formData: any): string[] => {
  const warnings: string[] = [];
  const userAgent = req.headers.get("user-agent") || "";
  
  // Detect automated requests
  if (!userAgent || userAgent.includes("bot") || userAgent.includes("crawler")) {
    warnings.push("Suspicious user agent detected");
  }
  
  // Detect spam patterns
  const spamKeywords = ['viagra', 'casino', 'lottery', 'prize', 'winner'];
  const messageText = (formData.message || '').toLowerCase();
  if (spamKeywords.some(keyword => messageText.includes(keyword))) {
    warnings.push("Potential spam content detected");
  }
  
  // Detect URL flooding
  const urlCount = (messageText.match(/https?:\/\//g) || []).length;
  if (urlCount > 3) {
    warnings.push("Multiple URLs detected in message");
  }
  
  return warnings;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const clientIP = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "unknown";
  const userAgent = req.headers.get("user-agent") || "";
  let formData: any = {};

  try {
    // Enhanced rate limiting
    if (!checkRateLimit(clientIP, 3, 15)) {
      logContactSubmission(clientIP, userAgent, {}, false, "Rate limit exceeded");
      return new Response(JSON.stringify({ 
        error: "Too many contact form submissions. Please try again later.",
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 429,
      });
    }

    // Parse and validate request
    try {
      formData = await req.json();
    } catch (error) {
      logContactSubmission(clientIP, userAgent, {}, false, "Invalid JSON in request body");
      return new Response(JSON.stringify({ 
        error: "Invalid JSON in request body",
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Validate input
    const validationErrors = validateContactForm(formData);
    if (validationErrors.length > 0) {
      logContactSubmission(clientIP, userAgent, formData, false, `Validation failed: ${validationErrors.join(", ")}`);
      return new Response(JSON.stringify({ 
        error: validationErrors.join(", "),
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Security fraud detection
    const securityWarnings = detectSuspiciousContact(req, formData);
    if (securityWarnings.length > 0) {
      console.warn("CONTACT_SECURITY_WARNING:", JSON.stringify({
        timestamp: new Date().toISOString(),
        clientIP,
        userAgent,
        warnings: securityWarnings,
        email: formData.email
      }));
    }

    const { name, email, subject, message }: ContactFormData = formData;

    // Send email to business owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["LeeDayDevs@gmail.com"],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${sanitizeHtml(name)} (${sanitizeHtml(email)})</p>
        <p><strong>Subject:</strong> ${sanitizeHtml(subject)}</p>
        <div style="margin-top: 20px;">
          <strong>Message:</strong>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${sanitizeHtml(message).replace(/\n/g, '<br>')}
          </div>
        </div>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          This email was sent from your website contact form.
        </p>
      `,
    });

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Lee Day Devs <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for contacting Lee Day Devs!",
      html: `
        <h1>Thank you for contacting us, ${sanitizeHtml(name)}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Message:</h3>
          <p><strong>Subject:</strong> ${sanitizeHtml(subject)}</p>
          <p>${sanitizeHtml(message).replace(/\n/g, '<br>')}</p>
        </div>
        
        <p>We typically respond within 24 hours. For urgent matters, feel free to call us at 07586 266007.</p>
        
        <p>Best regards,<br>
        The Lee Day Devs Team</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          Lee Day Devs - Professional Web Development & Hosting<br>
          3RD Floor 86-90, Paul Street, London EC2A 4NE
        </p>
      `,
    });

    console.log("Emails sent successfully:", { ownerEmailResponse, customerEmailResponse });

    // Log successful contact submission
    logContactSubmission(
      clientIP,
      userAgent,
      formData,
      true,
      undefined,
      securityWarnings.length > 0 ? securityWarnings : undefined
    );

    // Performance monitoring
    const processingTime = Date.now() - startTime;
    console.log("CONTACT_PERFORMANCE:", JSON.stringify({
      timestamp: new Date().toISOString(),
      processingTimeMs: processingTime,
      email: email
    }));

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact form submitted successfully" 
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
    console.error("Error in send-contact-email function:", error);
    
    // Log contact submission failure
    logContactSubmission(
      clientIP,
      userAgent,
      formData,
      false,
      error.message
    );
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to send contact email. Please try again later.",
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