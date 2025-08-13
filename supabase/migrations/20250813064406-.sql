-- Harden customers table RLS and add safety constraints

-- 1) Replace admin policy with function-based check to avoid recursion risks and centralize role logic
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'customers' AND policyname = 'Admin can manage all'
  ) THEN
    EXECUTE 'DROP POLICY "Admin can manage all" ON public.customers';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'customers' AND policyname = 'Admins can manage all customers'
  ) THEN
    EXECUTE 'CREATE POLICY "Admins can manage all customers" ON public.customers FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin())';
  END IF;
END$$;

-- 2) Ensure a user has at most one customer row (when linked) to reduce data exposure blast radius
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE schemaname = 'public' AND tablename = 'customers' AND indexname = 'ux_customers_user_id_not_null'
  ) THEN
    EXECUTE 'CREATE UNIQUE INDEX ux_customers_user_id_not_null ON public.customers (user_id) WHERE user_id IS NOT NULL';
  END IF;
END$$;