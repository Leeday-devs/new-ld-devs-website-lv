-- Re-enable RLS on customers table
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can insert their own customer record" ON public.customers;
DROP POLICY IF EXISTS "Admins can select all customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can update all customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can delete all customers" ON public.customers;
DROP POLICY IF EXISTS "Approved customers can view their own data" ON public.customers;

-- Create a simple, working INSERT policy
CREATE POLICY "Anyone can insert customer records" 
ON public.customers 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Create admin policies for management
CREATE POLICY "Admins can view all customers" 
ON public.customers 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update all customers" 
ON public.customers 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete all customers" 
ON public.customers 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Allow approved customers to view their own data
CREATE POLICY "Approved customers can view their own data" 
ON public.customers 
FOR SELECT 
TO authenticated
USING ((user_id = auth.uid()) AND (approval_status = 'approved'::text));