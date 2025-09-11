-- Add support for multiple images in blog posts
ALTER TABLE public.blog_posts 
ADD COLUMN images TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Update existing posts to include featured_image in images array if it exists
UPDATE public.blog_posts 
SET images = ARRAY[featured_image] 
WHERE featured_image IS NOT NULL AND featured_image != '';

-- Add comment for clarity
COMMENT ON COLUMN public.blog_posts.images IS 'Array of image URLs for blog post slideshow';