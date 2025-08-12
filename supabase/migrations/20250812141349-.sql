-- 1) Drop the unsafe policy if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'customers' 
      AND policyname = 'Bypass auth for insert test'
  ) THEN
    EXECUTE 'DROP POLICY "Bypass auth for insert test" ON public.customers';
  END IF;
END$$;

-- 2) Ensure RLS is enabled (safe if already enabled)
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- 3) Create secure policies
-- 3a) Admin can manage all rows (kept as-is if already present; drop/create for idempotency)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'customers' 
      AND policyname = 'Admin can manage all'
  ) THEN
    EXECUTE 'DROP POLICY "Admin can manage all" ON public.customers';
  END IF;
END$$;

CREATE POLICY "Admin can manage all"
ON public.customers
AS PERMISSIVE
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = auth.uid() AND p.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = auth.uid() AND p.role = 'admin'
  )
);

-- 3b) Customers can view their own record (recreate to be explicit)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'customers' 
      AND policyname = 'Customers can view own record'
  ) THEN
    EXECUTE 'DROP POLICY "Customers can view own record" ON public.customers';
  END IF;
END$$;

CREATE POLICY "Customers can view own record"
ON public.customers
AS PERMISSIVE
FOR SELECT
USING (auth.uid() = user_id);

-- 3c) Authenticated users can insert only their own record (and only one row per user if app enforces separately)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'customers' 
      AND policyname = 'Users can insert their own customer record'
  ) THEN
    EXECUTE 'DROP POLICY "Users can insert their own customer record" ON public.customers';
  END IF;
END$$;

CREATE POLICY "Users can insert their own customer record"
ON public.customers
AS PERMISSIVE
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
);

-- 3d) Users can update their own row (optional, but aligns with existing ALL admin policy)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'customers' 
      AND policyname = 'Users can update their own customer record'
  ) THEN
    EXECUTE 'DROP POLICY "Users can update their own customer record" ON public.customers';
  END IF;
END$$;

CREATE POLICY "Users can update their own customer record"
ON public.customers
AS PERMISSIVE
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4) Optional: enforce a unique customer per user to prevent duplicates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'customers_user_id_unique' AND conrelid = 'public.customers'::regclass
  ) THEN
    EXECUTE 'CREATE UNIQUE INDEX customers_user_id_unique ON public.customers (user_id) WHERE user_id IS NOT NULL';
  END IF;
END$$;