import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all published blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) throw error;

    // Generate sitemap XML
    const baseUrl = 'https://leeday.uk';
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/knowledge-hub', priority: '0.9', changefreq: 'daily' },
      { url: '/pricing', priority: '0.8', changefreq: 'monthly' },
      { url: '/custom-quote', priority: '0.8', changefreq: 'monthly' },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('')}
  ${posts?.map(post => `
  <url>
    <loc>${baseUrl}/knowledge-hub/${post.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>${new Date(post.updated_at || post.published_at).toISOString().split('T')[0]}</lastmod>
  </url>`).join('') || ''}
</urlset>`;

    console.log('Sitemap generated successfully with', posts?.length || 0, 'blog posts');

    return new Response(
      JSON.stringify({ 
        success: true, 
        sitemap,
        postsCount: posts?.length || 0 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});