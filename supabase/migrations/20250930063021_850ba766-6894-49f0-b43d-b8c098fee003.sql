-- Add icon and display_order fields to blog_categories
ALTER TABLE public.blog_categories
ADD COLUMN IF NOT EXISTS icon TEXT,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Update existing categories with default display order
UPDATE public.blog_categories
SET display_order = 
  CASE name
    WHEN 'Website Costs & Design' THEN 1
    WHEN 'AI for Small Businesses' THEN 2
    WHEN 'Apps & Automations' THEN 3
    ELSE 999
  END
WHERE display_order = 0;

-- Set default icons for existing categories
UPDATE public.blog_categories
SET icon = 
  CASE 
    WHEN name LIKE '%Cost%' OR name LIKE '%Design%' OR name LIKE '%Website%' THEN '💰'
    WHEN name LIKE '%AI%' OR name LIKE '%Automation%' THEN '🤖'
    WHEN name LIKE '%App%' OR name LIKE '%Mobile%' THEN '📱'
    ELSE '📄'
  END
WHERE icon IS NULL;