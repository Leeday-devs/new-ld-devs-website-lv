-- Create storage bucket for website setup files
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-setup-files', 'website-setup-files', false);

-- Create RLS policies for the bucket
CREATE POLICY "Allow public uploads to website-setup-files bucket"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'website-setup-files');

CREATE POLICY "Allow public access to website-setup-files bucket"
ON storage.objects
FOR SELECT
USING (bucket_id = 'website-setup-files');

-- Create table to track form submissions
CREATE TABLE public.website_setup_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  logo_url TEXT,
  images_urls TEXT[],
  services_offered TEXT,
  style_preferences TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on submissions table
ALTER TABLE public.website_setup_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for form submissions)
CREATE POLICY "Allow public form submissions"
ON public.website_setup_submissions
FOR INSERT
WITH CHECK (true);