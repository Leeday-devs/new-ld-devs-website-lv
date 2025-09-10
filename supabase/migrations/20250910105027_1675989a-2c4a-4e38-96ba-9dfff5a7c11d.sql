-- Create promo_strips table
CREATE TABLE public.promo_strips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  background_color TEXT NOT NULL DEFAULT '#ef4444',
  text_color TEXT NOT NULL DEFAULT '#ffffff',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.promo_strips ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage promo strips" 
ON public.promo_strips 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Allow public read access for active promo strips
CREATE POLICY "Public can view active promo strips" 
ON public.promo_strips 
FOR SELECT 
USING (is_active = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_promo_strips_updated_at
BEFORE UPDATE ON public.promo_strips
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();