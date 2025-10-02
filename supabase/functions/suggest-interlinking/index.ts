import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InterlinkingSuggestion {
  postId: string;
  postTitle: string;
  postSlug: string;
  relevanceScore: number;
  commonKeywords: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { postId, title, category, focusKeyword } = await req.json();

    // Fetch other published posts in the same or related categories
    const { data: relatedPosts, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, category, focus_keyword, excerpt')
      .eq('status', 'published')
      .neq('id', postId)
      .limit(20);

    if (error) throw error;

    // Calculate relevance scores
    const suggestions: InterlinkingSuggestion[] = relatedPosts
      ?.map(post => {
        let score = 0;
        const commonKeywords: string[] = [];

        // Same category = +30 points
        if (post.category === category) {
          score += 30;
          commonKeywords.push(category);
        }

        // Matching focus keyword = +50 points
        if (focusKeyword && post.focus_keyword && 
            post.focus_keyword.toLowerCase().includes(focusKeyword.toLowerCase())) {
          score += 50;
          commonKeywords.push(focusKeyword);
        }

        // Title word overlap
        const titleWords = title.toLowerCase().split(/\s+/).filter((w: string) => w.length > 4);
        const postTitleWords = post.title.toLowerCase().split(/\s+/).filter((w: string) => w.length > 4);
        const overlap = titleWords.filter((w: string) => postTitleWords.includes(w));
        score += overlap.length * 10;
        commonKeywords.push(...overlap);

        return {
          postId: post.id,
          postTitle: post.title,
          postSlug: post.slug,
          relevanceScore: score,
          commonKeywords: [...new Set(commonKeywords)]
        };
      })
      .filter(s => s.relevanceScore > 20)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5) || [];

    console.log('Generated', suggestions.length, 'interlinking suggestions for post', postId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        suggestions 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error suggesting interlinking:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});