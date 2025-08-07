-- Update template_purchases table to match new form structure
ALTER TABLE public.template_purchases 
DROP COLUMN IF EXISTS website,
DROP COLUMN IF EXISTS business_description,
DROP COLUMN IF EXISTS target_audience,
DROP COLUMN IF EXISTS brand_colors,
DROP COLUMN IF EXISTS preferred_style,
DROP COLUMN IF EXISTS additional_requests;

-- Add new columns for simplified form
ALTER TABLE public.template_purchases 
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS color_preferences TEXT,
ADD COLUMN IF NOT EXISTS image_urls TEXT[];