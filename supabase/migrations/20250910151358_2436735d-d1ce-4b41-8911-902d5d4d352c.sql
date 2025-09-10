-- Create custom_quote_requests table to store quote requests
CREATE TABLE public.custom_quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Contact information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  
  -- Project details
  project_type TEXT NOT NULL, -- 'website', 'mobile_app', 'ai_automation', 'custom_software', 'other'
  project_description TEXT NOT NULL,
  budget_range TEXT, -- 'under_1k', '1k_5k', '5k_10k', '10k_25k', '25k_plus', 'discuss'
  timeline TEXT, -- 'urgent', '1_month', '2_3_months', '3_6_months', 'flexible'
  
  -- Additional requirements
  special_requirements TEXT,
  has_existing_branding BOOLEAN DEFAULT false,
  needs_hosting BOOLEAN DEFAULT false,
  needs_maintenance BOOLEAN DEFAULT false,
  
  -- Admin fields
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'reviewed', 'quoted', 'converted', 'declined'
  admin_notes TEXT,
  quote_amount NUMERIC,
  quoted_at TIMESTAMP WITH TIME ZONE,
  quoted_by UUID
);

-- Enable Row Level Security
ALTER TABLE public.custom_quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for custom quote requests
CREATE POLICY "Admins can manage all custom quote requests" 
ON public.custom_quote_requests 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Public can submit custom quote requests" 
ON public.custom_quote_requests 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_custom_quote_requests_updated_at
BEFORE UPDATE ON public.custom_quote_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();