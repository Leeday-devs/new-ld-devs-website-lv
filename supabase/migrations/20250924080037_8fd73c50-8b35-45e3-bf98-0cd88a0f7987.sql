-- Add new columns to orders table for enhanced checkout information
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS customer_website_url TEXT,
ADD COLUMN IF NOT EXISTS customer_project_goals TEXT,
ADD COLUMN IF NOT EXISTS customer_timeline TEXT,
ADD COLUMN IF NOT EXISTS customer_add_hosting BOOLEAN DEFAULT false;