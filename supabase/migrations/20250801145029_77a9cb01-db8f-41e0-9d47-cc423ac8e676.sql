-- Create a function that bypasses RLS entirely for customer creation
CREATE OR REPLACE FUNCTION public.create_customer_bypassing_rls(
  p_user_id uuid,
  p_name text,
  p_email text,
  p_company text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  customer_id uuid;
BEGIN
  INSERT INTO public.customers (user_id, name, email, company, plan_name, plan_price, payment_amount, approval_status)
  VALUES (p_user_id, p_name, p_email, p_company, 'Basic', 0, 0, 'pending')
  RETURNING id INTO customer_id;
  
  RETURN customer_id;
END;
$$;