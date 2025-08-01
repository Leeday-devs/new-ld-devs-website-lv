-- Re-enable RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Drop the current policies
DROP POLICY IF EXISTS "Allow all inserts" ON public.customers;
DROP POLICY IF EXISTS "Admin can view all" ON public.customers;

-- Create a policy that bypasses auth completely for testing
CREATE POLICY "Bypass auth for insert test" 
ON public.customers 
FOR INSERT 
TO public
WITH CHECK (true);

-- Create admin policy for management
CREATE POLICY "Admin can manage all" 
ON public.customers 
FOR ALL 
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);