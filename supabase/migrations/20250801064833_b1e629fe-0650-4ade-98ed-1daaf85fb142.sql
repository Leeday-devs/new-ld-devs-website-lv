-- Create customers table
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  phone TEXT,
  website_url TEXT,
  plan_name TEXT NOT NULL DEFAULT 'Basic',
  plan_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  payment_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  next_payment_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create work_requests table
CREATE TABLE public.work_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined', 'completed')),
  hours_logged DECIMAL(5,2) DEFAULT 0.00,
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_requests ENABLE ROW LEVEL SECURITY;

-- Update profiles table to support customer role
UPDATE public.profiles SET role = 'customer' WHERE role IS NULL OR role = '';

-- Create policies for customers table
CREATE POLICY "Admins can manage all customers" 
ON public.customers 
FOR ALL 
USING (is_admin());

CREATE POLICY "Customers can view their own data" 
ON public.customers 
FOR SELECT 
USING (user_id = auth.uid());

-- Create policies for work_requests table
CREATE POLICY "Admins can manage all work requests" 
ON public.work_requests 
FOR ALL 
USING (is_admin());

CREATE POLICY "Customers can view their own work requests" 
ON public.work_requests 
FOR SELECT 
USING (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

CREATE POLICY "Customers can insert their own work requests" 
ON public.work_requests 
FOR INSERT 
WITH CHECK (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_work_requests_updated_at
BEFORE UPDATE ON public.work_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();