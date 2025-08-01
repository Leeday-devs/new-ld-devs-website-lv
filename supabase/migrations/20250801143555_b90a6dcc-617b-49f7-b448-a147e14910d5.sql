-- Drop the ALL policy that's interfering
DROP POLICY IF EXISTS "Admins can manage all customers" ON public.customers;

-- Create separate policies for admins for each operation except INSERT
CREATE POLICY "Admins can select all customers" 
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