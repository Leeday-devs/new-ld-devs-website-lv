-- Drop ALL policies temporarily to isolate the issue
DROP POLICY IF EXISTS "Anyone can insert customer records" ON public.customers;
DROP POLICY IF EXISTS "Admins can view all customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can update all customers" ON public.customers;  
DROP POLICY IF EXISTS "Admins can delete all customers" ON public.customers;
DROP POLICY IF EXISTS "Approved customers can view their own data" ON public.customers;

-- Create the simplest possible INSERT policy
CREATE POLICY "Allow all inserts" 
ON public.customers 
FOR INSERT 
WITH CHECK (true);

-- Re-create minimal admin policy for viewing
CREATE POLICY "Admin can view all" 
ON public.customers 
FOR ALL 
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);