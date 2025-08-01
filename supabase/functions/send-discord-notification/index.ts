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
      'visit': 0x9966cc         // Purple
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
        
      case 'signup':
        embed = {
          title: '🎉 New Customer Signup!',
          description: `**${data.name}** just signed up for the customer portal!`,
          color: eventColors.signup,
          fields: [
            { name: 'Email', value: data.email, inline: true },
            { name: 'Company', value: data.company || 'N/A', inline: true },
            { name: 'Status', value: 'Pending Approval', inline: false }
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
        
      default:
        embed = {
          title: '📱 Website Activity',
          description: `Event: ${eventType}`,
          color: 0x666666,
          timestamp: new Date().toISOString()
        };
    }

    // Send to Discord
    const discordPayload = {
      embeds: [embed]
    };

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