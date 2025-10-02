-- Add new SEO and schema fields to blog_posts table
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS focus_keyword TEXT,
ADD COLUMN IF NOT EXISTS short_answer TEXT,
ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS related_article_ids UUID[],
ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'Lee Day',
ADD COLUMN IF NOT EXISTS featured_image_alt TEXT;

-- Add comments for clarity
COMMENT ON COLUMN public.blog_posts.meta_title IS 'SEO meta title (max 60 chars)';
COMMENT ON COLUMN public.blog_posts.meta_description IS 'SEO meta description (max 155 chars)';
COMMENT ON COLUMN public.blog_posts.focus_keyword IS 'Primary SEO keyword';
COMMENT ON COLUMN public.blog_posts.short_answer IS 'Short answer for Answer Box (1-2 sentences)';
COMMENT ON COLUMN public.blog_posts.faqs IS 'Array of FAQ objects with question and answer';
COMMENT ON COLUMN public.blog_posts.related_article_ids IS 'Array of related blog post IDs';
COMMENT ON COLUMN public.blog_posts.featured_image_alt IS 'Alt text for featured image';