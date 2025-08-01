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
    const webhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL');
    if (!webhookUrl) {
      return new Response(JSON.stringify({ error: 'Discord webhook URL not configured' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    console.log('Testing Discord buttons with webhook URL:', webhookUrl);

    // Test payload with buttons
    const testPayload = {
      embeds: [{
        title: '🎉 Test Customer Signup!',
        description: '**Test User** just signed up for the customer portal!',
        color: 0x0099ff,
        fields: [
          { name: 'Email', value: 'test@example.com', inline: true },
          { name: 'Company', value: 'Test Company', inline: true },
          { name: 'Plan', value: 'Basic', inline: true },
          { name: 'Status', value: 'Pending Approval', inline: false }
        ],
        timestamp: new Date().toISOString()
      }],
      components: [
        {
          type: 1, // Action Row
          components: [
            {
              type: 2, // Button
              style: 3, // Success/Green
              label: 'Approve',
              custom_id: 'approve_test-customer-id',
              emoji: { name: '✅' }
            },
            {
              type: 2, // Button
              style: 4, // Danger/Red
              label: 'Decline',
              custom_id: 'decline_test-customer-id',
              emoji: { name: '❌' }
            }
          ]
        }
      ]
    };

    console.log('Sending test Discord payload:', JSON.stringify(testPayload, null, 2));

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord webhook error:', response.status, errorText);
      throw new Error(`Discord webhook failed: ${response.status} ${errorText}`);
    }

    console.log('Test Discord notification sent successfully');

    return new Response(JSON.stringify({ success: true, message: 'Test notification sent with buttons' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error sending test Discord notification:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});