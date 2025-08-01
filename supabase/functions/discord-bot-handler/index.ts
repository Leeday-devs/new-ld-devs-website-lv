import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Discord interaction types
const INTERACTION_TYPE = {
  PING: 1,
  APPLICATION_COMMAND: 2,
  MESSAGE_COMPONENT: 3,
};

const INTERACTION_RESPONSE_TYPE = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
  DEFERRED_UPDATE_MESSAGE: 6,
  UPDATE_MESSAGE: 7,
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Verify Discord signature
async function verifyDiscordSignature(request: Request, body: string): Promise<boolean> {
  const publicKey = Deno.env.get('DISCORD_PUBLIC_KEY');
  if (!publicKey) {
    console.error('DISCORD_PUBLIC_KEY not set');
    return false;
  }

  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  
  if (!signature || !timestamp) {
    console.error('Missing Discord signature headers');
    return false;
  }

  try {
    const encoder = new TextEncoder();
    const timestampData = encoder.encode(timestamp);
    const bodyData = encoder.encode(body);
    const message = new Uint8Array(timestampData.length + bodyData.length);
    message.set(timestampData);
    message.set(bodyData, timestampData.length);

    // Import public key
    const keyData = new Uint8Array(
      publicKey.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    );
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      {
        name: 'Ed25519',
        namedCurve: 'Ed25519',
      },
      false,
      ['verify']
    );

    // Convert signature from hex
    const signatureData = new Uint8Array(
      signature.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    );

    const isValid = await crypto.subtle.verify('Ed25519', cryptoKey, signatureData, message);
    return isValid;
  } catch (error) {
    console.error('Error verifying Discord signature:', error);
    return false;
  }
}

// Send Discord message
async function sendDiscordMessage(content: string, channelId?: string): Promise<void> {
  const botToken = Deno.env.get('DISCORD_BOT_TOKEN');
  const webhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL');
  
  if (!botToken || !webhookUrl) {
    console.error('Missing Discord bot token or webhook URL');
    return;
  }

  try {
    // Use webhook for simplicity
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content
      }),
    });
  } catch (error) {
    console.error('Failed to send Discord message:', error);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.text();
    
    // Verify Discord signature
    const isValid = await verifyDiscordSignature(req, body);
    if (!isValid) {
      console.error('Invalid Discord signature');
      return new Response('Unauthorized', { status: 401 });
    }

    const interaction = JSON.parse(body);
    console.log('Discord interaction received:', interaction);

    // Handle ping
    if (interaction.type === INTERACTION_TYPE.PING) {
      return new Response(JSON.stringify({ type: INTERACTION_RESPONSE_TYPE.PONG }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle button interactions
    if (interaction.type === INTERACTION_TYPE.MESSAGE_COMPONENT) {
      const customId = interaction.data.custom_id;
      const [action, customerId] = customId.split('_');

      console.log(`Processing ${action} for customer ${customerId}`);

      if (action === 'approve' || action === 'decline') {
        const status = action === 'approve' ? 'approved' : 'declined';
        
        // Update customer status in database
        const { data: customer, error: updateError } = await supabase
          .from('customers')
          .update({ 
            approval_status: status,
            approved_at: status === 'approved' ? new Date().toISOString() : null
          })
          .eq('id', customerId)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating customer:', updateError);
          return new Response(JSON.stringify({
            type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `❌ Error ${action}ing customer: ${updateError.message}`,
              flags: 64 // Ephemeral message
            }
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Send approval/decline email
        try {
          await supabase.functions.invoke('send-approval-email', {
            body: {
              customerEmail: customer.email,
              customerName: customer.name,
              approved: status === 'approved'
            }
          });
        } catch (emailError) {
          console.error('Failed to send approval email:', emailError);
        }

        // Update the original message to show the action taken
        const emoji = status === 'approved' ? '✅' : '❌';
        const actionText = status === 'approved' ? 'APPROVED' : 'DECLINED';
        
        return new Response(JSON.stringify({
          type: INTERACTION_RESPONSE_TYPE.UPDATE_MESSAGE,
          data: {
            embeds: [{
              title: `${emoji} Customer ${actionText}!`,
              description: `**${customer.name}** has been ${status}`,
              color: status === 'approved' ? 0x00ff00 : 0xff0000,
              fields: [
                { name: 'Email', value: customer.email, inline: true },
                { name: 'Company', value: customer.company || 'N/A', inline: true },
                { name: 'Plan', value: customer.plan_name, inline: true },
                { name: 'Status', value: actionText, inline: false }
              ],
              timestamp: new Date().toISOString()
            }],
            components: [] // Remove buttons after action
          }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({
      type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'Unknown interaction type',
        flags: 64 // Ephemeral message
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error handling Discord interaction:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});