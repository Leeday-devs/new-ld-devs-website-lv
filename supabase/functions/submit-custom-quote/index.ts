import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    console.log('Received custom quote request');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { 
      name, 
      email, 
      phone, 
      company, 
      projectType, 
      projectDescription, 
      budgetRange, 
      timeline,
      specialRequirements,
      hasExistingBranding,
      needsHosting,
      needsMaintenance 
    } = await req.json();

    console.log('Quote data received:', { name, email, projectType, budgetRange });

    // Save to database
    const { data: quoteData, error: dbError } = await supabase
      .from('custom_quote_requests')
      .insert({
        name,
        email,
        phone,
        company,
        project_type: projectType,
        project_description: projectDescription,
        budget_range: budgetRange,
        timeline,
        special_requirements: specialRequirements,
        has_existing_branding: hasExistingBranding,
        needs_hosting: needsHosting,
        needs_maintenance: needsMaintenance
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save quote request');
    }

    console.log('Quote saved to database:', quoteData.id);

    // Send Discord notification
    const discordWebhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL');
    
    if (discordWebhookUrl) {
      const discordEmbed = {
        title: "🎯 New Custom Quote Request",
        description: "A new custom quote request has been submitted",
        color: 15844367, // Orange color
        fields: [
          {
            name: "👤 Contact Info",
            value: `**Name:** ${name}\n**Email:** ${email}\n**Phone:** ${phone || 'Not provided'}\n**Company:** ${company || 'Not provided'}`,
            inline: false
          },
          {
            name: "🔧 Project Details",
            value: `**Type:** ${projectType}\n**Budget:** ${budgetRange}\n**Timeline:** ${timeline}`,
            inline: true
          },
          {
            name: "📋 Requirements",
            value: `**Branding:** ${hasExistingBranding ? 'Yes' : 'No'}\n**Hosting:** ${needsHosting ? 'Yes' : 'No'}\n**Maintenance:** ${needsMaintenance ? 'Yes' : 'No'}`,
            inline: true
          },
          {
            name: "📝 Project Description",
            value: projectDescription.length > 200 ? 
              `${projectDescription.substring(0, 200)}...` : 
              projectDescription,
            inline: false
          }
        ],
        footer: {
          text: `Quote ID: ${quoteData.id} • ${new Date().toLocaleString()}`
        },
        timestamp: new Date().toISOString()
      };

      if (specialRequirements) {
        discordEmbed.fields.push({
          name: "⭐ Special Requirements",
          value: specialRequirements.length > 200 ? 
            `${specialRequirements.substring(0, 200)}...` : 
            specialRequirements,
          inline: false
        });
      }

      const discordPayload = {
        embeds: [discordEmbed],
        components: [{
          type: 1,
          components: [{
            type: 2,
            style: 5,
            label: "View in Admin Panel",
            url: `https://leedaydevs.com/admin/custom-quotes/${quoteData.id}`
          }]
        }]
      };

      console.log('Sending Discord notification');
      
      const discordResponse = await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload),
      });

      if (!discordResponse.ok) {
        console.error('Discord webhook failed:', await discordResponse.text());
      } else {
        console.log('Discord notification sent successfully');
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Quote request submitted successfully',
        quoteId: quoteData.id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error processing quote request:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});