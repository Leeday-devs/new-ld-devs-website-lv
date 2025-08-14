-- Create cookie consent tracking table
CREATE TABLE IF NOT EXISTS public.cookie_consents (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id text,
  ip_address inet,
  user_agent text,
  consent_given boolean NOT NULL DEFAULT false,
  essential_cookies boolean NOT NULL DEFAULT true,
  analytics_cookies boolean NOT NULL DEFAULT false,
  marketing_cookies boolean NOT NULL DEFAULT false,
  preferences_cookies boolean NOT NULL DEFAULT false,
  consent_timestamp timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  consent_version text NOT NULL DEFAULT '1.0',
  page_url text,
  referrer text
);

-- Enable RLS
ALTER TABLE public.cookie_consents ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Admins can manage all cookie consents" 
ON public.cookie_consents 
FOR ALL 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

-- Allow public insertion for consent tracking
CREATE POLICY "Public can record cookie consent" 
ON public.cookie_consents 
FOR INSERT 
WITH CHECK (true);

-- Users can view their own consent records
CREATE POLICY "Users can view their own cookie consents" 
ON public.cookie_consents 
FOR SELECT 
USING (user_id = auth.uid());

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_cookie_consents_user_id ON public.cookie_consents(user_id);
CREATE INDEX IF NOT EXISTS idx_cookie_consents_session_id ON public.cookie_consents(session_id);
CREATE INDEX IF NOT EXISTS idx_cookie_consents_timestamp ON public.cookie_consents(consent_timestamp);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_cookie_consent_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_cookie_consents_updated_at ON public.cookie_consents;
CREATE TRIGGER update_cookie_consents_updated_at
  BEFORE UPDATE ON public.cookie_consents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_cookie_consent_updated_at();