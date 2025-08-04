-- Allow customers to view their own customer record
CREATE POLICY "Customers can view own record" 
ON public.customers 
FOR SELECT 
USING (auth.uid() = user_id);