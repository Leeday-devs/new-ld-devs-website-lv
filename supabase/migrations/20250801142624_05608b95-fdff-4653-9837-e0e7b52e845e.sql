-- Add policy to allow authenticated users to insert their own customer records
CREATE POLICY "Users can insert their own customer record" 
ON public.customers 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);