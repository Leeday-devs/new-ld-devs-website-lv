-- Drop the current admin policy that might be causing conflicts
DROP POLICY IF EXISTS "Admins can manage all customers" ON public.customers;

-- Create a new admin policy that handles null profiles gracefully
CREATE POLICY "Admins can manage all customers" 
ON public.customers 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Also ensure the INSERT policy allows any authenticated user to create their own record
DROP POLICY IF EXISTS "Users can insert their own customer record" ON public.customers;

CREATE POLICY "Users can insert their own customer record" 
ON public.customers 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);