-- Blog Categories table + RLS + triggers, and link to blog_posts

-- 1) Create categories table
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- 2) RLS policies
-- Public can read active categories (so filters on the public blog can work)
CREATE POLICY "Anyone can view active categories"
ON public.blog_categories
FOR SELECT
USING (status = 'active');

-- Admins can manage everything
CREATE POLICY "Admins can manage all categories"
ON public.blog_categories
FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- 3) Slug handling and updated_at triggers
CREATE OR REPLACE FUNCTION public.set_blog_category_slug()
RETURNS trigger AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := public.generate_slug(COALESCE(NEW.name, ''));
  ELSE
    NEW.slug := public.generate_slug(NEW.slug);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_blog_categories_set_slug
BEFORE INSERT OR UPDATE OF name, slug ON public.blog_categories
FOR EACH ROW EXECUTE FUNCTION public.set_blog_category_slug();

CREATE TRIGGER trg_blog_categories_updated_at
BEFORE UPDATE ON public.blog_categories
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4) Link posts to categories (keep existing text category for backward compat)
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON public.blog_posts(category_id);