import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { eventType, data } = await req.json();
    
    console.log('Received request:', { eventType, data });
    
    const webhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL');
    if (!webhookUrl) {
      console.log('Discord webhook URL not configured, skipping notification');
      return new Response(JSON.stringify({ success: true, skipped: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // Create different embed colors for different events
    const eventColors = {
      'purchase': 0x00ff00,      // Green
      'signup': 0x0099ff,       // Blue  
      'login': 0xffaa00,        // Orange
      'visit': 0x9966cc,        // Purple
      'contact': 0xff6600,      // Orange-red
      'newsletter': 0x00ccff,   // Light blue
      'work_request': 0xff9900, // Gold
      'custom_request': 0xff3366, // Pink
      'website_setup': 0x66ff99, // Light green
      'business_details': 0x3366ff // Royal blue
    };

    // Create embed based on event type
    let embed;
    switch (eventType) {
      case 'purchase':
        embed = {
          title: '💰 New Purchase!',
          description: `**${data.customerName || 'Guest'}** just made a purchase!`,
          color: eventColors.purchase,
          fields: [
            { name: 'Service', value: data.serviceName || 'N/A', inline: true },
            { name: 'Amount', value: `£${(data.amount / 100).toFixed(2)}`, inline: true },
            { name: 'Email', value: data.customerEmail || 'N/A', inline: false },
            { name: 'Company', value: data.customerCompany || 'N/A', inline: true },
            { name: 'Phone', value: data.customerPhone || 'N/A', inline: true }
          ],
          timestamp: new Date().toISOString()
        };
        break;
        
        
      case 'login':
        embed = {
          title: '👋 Customer Login',
          description: `**${data.name || data.email}** just logged in`,
          color: eventColors.login,
          fields: [
            { name: 'Email', value: data.email, inline: true },
            { name: 'Role', value: data.role || 'Customer', inline: true }
          ],
          timestamp: new Date().toISOString()
        };
        break;
        
      case 'visit':
        embed = {
          title: '👀 Website Visit',
          description: 'Someone visited your website',
          color: eventColors.visit,
          fields: [
            { name: 'Page', value: data.page || '/', inline: true },
            { name: 'User Agent', value: data.userAgent?.substring(0, 100) || 'Unknown', inline: false }
          ],
          timestamp: new Date().toISOString()
        };
        break;

      case 'contact':
        embed = {
          title: '📧 New Contact Message!',
          description: `**${data.name}** sent a message`,
          color: eventColors.contact,
          fields: [
            { name: 'Email', value: data.email, inline: true },
            { name: 'Subject', value: data.subject || 'No subject', inline: true },
            { name: 'Message', value: data.message, inline: false }
          ],
          timestamp: new Date().toISOString()
        };
        break;

      case 'newsletter':
        embed = {
          title: '📮 Newsletter Subscription!',
          description: 'Someone subscribed to your newsletter',
          color: eventColors.newsletter,
          fields: [
            { name: 'Email', value: data.email, inline: false }
          ],
          timestamp: new Date().toISOString()
        };
        break;

      case 'work_request':
        embed = {
          title: '🔧 New Work Request!',
          description: `**${data.customerName}** submitted a work request`,
          color: eventColors.work_request,
          fields: [
            { name: 'Title', value: data.title, inline: false },
            { name: 'Customer', value: data.customerEmail, inline: true },
            { name: 'Description', value: data.description, inline: false }
          ],
          timestamp: new Date().toISOString()
        };
        break;

      case 'test':
        embed = {
          title: '✅ Test Notification',
          description: 'Discord webhook is working correctly!',
          color: 0x00ff00,
          fields: [
            { name: 'Message', value: data.message || 'Test successful', inline: false },
            { name: 'Configured at', value: data.timestamp || new Date().toISOString(), inline: true }
          ],
          timestamp: new Date().toISOString()
        };
        break;

      case 'signup':
        embed = {
          title: '🎉 New Customer Signup!',
          description: `**${data.name}** just signed up for the customer portal!`,
          color: eventColors.signup,
          fields: [
            { name: 'Email', value: data.email, inline: true },
            { name: 'Company', value: data.company || 'Not specified', inline: true },
            { name: 'Plan', value: data.planName || 'Basic', inline: true },
            { name: 'Status', value: 'Pending Approval', inline: false }
          ],
          timestamp: new Date().toISOString()
        };
        break;

      case 'custom_request':
        embed = {
          title: '🎨 Custom Website Request!',
          description: `**${data.businessName}** requested a custom website example`,
          color: eventColors.custom_request,
          fields: [
            { name: 'Business', value: data.businessName, inline: true },
            { name: 'Industry', value: data.industry, inline: true },
            { name: 'Email', value: data.email, inline: true },
            { name: 'Phone', value: data.phone || 'Not provided', inline: true },
            { name: 'Description', value: data.description || 'No description provided', inline: false }
          ],
          timestamp: new Date().toISOString()
        };
        break;

      case 'website_setup':
        embed = {
          title: '🚀 Website Setup Request!',
          description: `**${data.businessName}** submitted website setup details`,
          color: eventColors.website_setup,
          fields: [
            { name: 'Contact', value: data.name, inline: true },
            { name: 'Business', value: data.businessName, inline: true },
            { name: 'Email', value: data.email, inline: true },
            { name: 'Phone', value: data.phone || 'Not provided', inline: true },
            { name: 'Services', value: data.servicesOffered || 'Not specified', inline: false },
            { name: 'Style Preferences', value: data.stylePreferences || 'Not specified', inline: false },
            { name: 'Assets', value: `Logo: ${data.hasLogo ? 'Yes' : 'No'}, Images: ${data.imageCount || 0}`, inline: false }
          ],
          timestamp: new Date().toISOString()
        };
        break;

      case 'business_details':
        embed = {
          title: '💼 Business Details Submitted!',
          description: `**${data.businessName}** submitted details for ${data.templateName}`,
          color: eventColors.business_details,
          fields: [
            { name: 'Template', value: data.templateName, inline: true },
            { name: 'Contact', value: data.name, inline: true },
            { name: 'Email', value: data.email, inline: true },
            { name: 'Phone', value: data.phone || 'Not provided', inline: true },
            { name: 'Services', value: data.servicesOffered || 'Not specified', inline: false },
            { name: 'Color Preferences', value: data.colorPreferences || 'Not specified', inline: false },
            { name: 'Assets', value: `Logo: ${data.hasLogo ? 'Yes' : 'No'}, Images: ${data.imageCount || 0}`, inline: false },
            { name: 'Session ID', value: data.sessionId || 'N/A', inline: true }
          ],
          timestamp: new Date().toISOString()
        };
        break;
        
      default:
        embed = {
          title: '📱 Website Activity',
          description: `Event: ${eventType}`,
          color: 0x666666,
          timestamp: new Date().toISOString()
        };
    }

    // Add interactive buttons for customer signups
    let discordPayload: any = {
      embeds: [embed]
    };

    // Add approve/decline buttons for customer signups
    if (eventType === 'signup' && data.customerId) {
      console.log('Adding buttons for signup event with customerId:', data.customerId);
      discordPayload.components = [
        {
          type: 1, // Action Row
          components: [
            {
              type: 2, // Button
              style: 3, // Success/Green
              label: 'Approve',
              custom_id: `approve_${data.customerId}`,
              emoji: { name: '✅' }
            },
            {
              type: 2, // Button
              style: 4, // Danger/Red
              label: 'Decline',
              custom_id: `decline_${data.customerId}`,
              emoji: { name: '❌' }
            }
          ]
        }
      ];
      console.log('Buttons added to payload');
    } else {
      console.log('No buttons added - eventType:', eventType, 'customerId:', data.customerId);
    }

    console.log('Sending to Discord:', JSON.stringify(discordPayload, null, 2));

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord webhook error:', response.status, errorText);
      throw new Error(`Discord webhook failed: ${response.status} ${errorText}`);
    }

    console.log('Discord notification sent successfully');

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error sending Discord notification:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});