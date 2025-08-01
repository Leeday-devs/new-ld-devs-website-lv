import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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

    // Test the actual signup notification by calling send-discord-notification
    console.log('Testing signup notification through send-discord-notification function...');
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const testResponse = await supabaseClient.functions.invoke('send-discord-notification', {
      body: {
        eventType: 'signup',
        data: {
          name: 'Test User',
          email: 'test@example.com',
          company: 'Test Company',
          customerId: 'test-customer-id-12345',
          planName: 'Basic'
        }
      }
    });

    console.log('Response from send-discord-notification:', testResponse);

    if (testResponse.error) {
      throw new Error(`Function call failed: ${JSON.stringify(testResponse.error)}`);
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