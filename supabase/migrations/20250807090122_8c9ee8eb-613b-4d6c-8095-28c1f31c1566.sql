-- Create template purchases table to store business details
CREATE TABLE public.template_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id TEXT UNIQUE,
  template_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  business_description TEXT,
  services_offered TEXT,
  target_audience TEXT,
  brand_colors TEXT,
  preferred_style TEXT,
  additional_requests TEXT,
  logo_url TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.template_purchases ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage all template purchases" 
ON public.template_purchases 
FOR ALL 
USING (is_admin());

-- Create policy for users to view their own purchases (by email)
CREATE POLICY "Users can view their own template purchases" 
ON public.template_purchases 
FOR SELECT 
USING (email = auth.jwt() ->> 'email');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_template_purchases_updated_at
BEFORE UPDATE ON public.template_purchases
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();