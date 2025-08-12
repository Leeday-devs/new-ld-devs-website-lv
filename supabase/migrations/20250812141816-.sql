-- Fix RLS performance warnings by avoiding per-row re-evaluation of auth.*
-- Replace auth.uid() / auth.jwt() with scalar subselects (select auth.uid()) / (select auth.jwt())

-- Helper function: drop policy if exists
DO $$
BEGIN
  -- customers policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='customers' AND policyname='Admin can manage all') THEN
    EXECUTE 'DROP POLICY "Admin can manage all" ON public.customers';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='customers' AND policyname='Customers can view own record') THEN
    EXECUTE 'DROP POLICY "Customers can view own record" ON public.customers';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='customers' AND policyname='Users can insert their own customer record') THEN
    EXECUTE 'DROP POLICY "Users can insert their own customer record" ON public.customers';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='customers' AND policyname='Users can update their own customer record') THEN
    EXECUTE 'DROP POLICY "Users can update their own customer record" ON public.customers';
  END IF;

  -- orders policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='orders' AND policyname='select_own_orders') THEN
    EXECUTE 'DROP POLICY "select_own_orders" ON public.orders';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='orders' AND policyname='insert_order') THEN
    -- keep insert true policy as-is; no auth.* used
    NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='orders' AND policyname='update_order') THEN
    -- keep update true policy as-is; no auth.* used
    NULL;
  END IF;

  -- work_requests policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='work_requests' AND policyname='Customers can view their own work requests') THEN
    EXECUTE 'DROP POLICY "Customers can view their own work requests" ON public.work_requests';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='work_requests' AND policyname='Customers can insert their own work requests') THEN
    EXECUTE 'DROP POLICY "Customers can insert their own work requests" ON public.work_requests';
  END IF;

  -- customer_services policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='customer_services' AND policyname='Customers can view their own services') THEN
    EXECUTE 'DROP POLICY "Customers can view their own services" ON public.customer_services';
  END IF;

  -- profiles policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND policyname='Users can view their own profile') THEN
    EXECUTE 'DROP POLICY "Users can view their own profile" ON public.profiles';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND policyname='Users can update their own profile data') THEN
    EXECUTE 'DROP POLICY "Users can update their own profile data" ON public.profiles';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND policyname='Users can insert their own profile') THEN
    EXECUTE 'DROP POLICY "Users can insert their own profile" ON public.profiles';
  END IF;

  -- template_purchases
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='template_purchases' AND policyname='Users can view their own template purchases') THEN
    EXECUTE 'DROP POLICY "Users can view their own template purchases" ON public.template_purchases';
  END IF;
END$$;

-- Recreate policies using (select auth.*) patterns

-- customers
CREATE POLICY "Admin can manage all"
ON public.customers
AS PERMISSIVE
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = (select auth.uid()) AND p.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = (select auth.uid()) AND p.role = 'admin'
  )
);

CREATE POLICY "Customers can view own record"
ON public.customers
AS PERMISSIVE
FOR SELECT
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert their own customer record"
ON public.customers
AS PERMISSIVE
FOR INSERT
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own customer record"
ON public.customers
AS PERMISSIVE
FOR UPDATE
USING ((select auth.uid()) = user_id)
WITH CHECK ((select auth.uid()) = user_id);

-- orders
CREATE POLICY "select_own_orders"
ON public.orders
AS PERMISSIVE
FOR SELECT
USING (user_id = (select auth.uid()));

-- work_requests
CREATE POLICY "Customers can view their own work requests"
ON public.work_requests
AS PERMISSIVE
FOR SELECT
USING (
  customer_id IN (
    SELECT c.id FROM public.customers c WHERE c.user_id = (select auth.uid())
  )
);

CREATE POLICY "Customers can insert their own work requests"
ON public.work_requests
AS PERMISSIVE
FOR INSERT
WITH CHECK (
  customer_id IN (
    SELECT c.id FROM public.customers c WHERE c.user_id = (select auth.uid())
  )
);

-- customer_services
CREATE POLICY "Customers can view their own services"
ON public.customer_services
AS PERMISSIVE
FOR SELECT
USING (
  customer_id IN (
    SELECT c.id FROM public.customers c WHERE c.user_id = (select auth.uid())
  )
);

-- profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles
AS PERMISSIVE
FOR SELECT
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own profile data"
ON public.profiles
AS PERMISSIVE
FOR UPDATE
USING ((select auth.uid()) = user_id)
WITH CHECK (
  (select auth.uid()) = user_id AND (
    (public.get_current_user_role() = 'admin') OR (
      role = (
        SELECT p.role FROM public.profiles p WHERE p.user_id = (select auth.uid())
      )
    )
  )
);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
AS PERMISSIVE
FOR INSERT
WITH CHECK (
  (select auth.uid()) = user_id AND (
    (role <> 'admin') OR (public.get_current_user_role() = 'admin')
  )
);

-- template_purchases
CREATE POLICY "Users can view their own template purchases"
ON public.template_purchases
AS PERMISSIVE
FOR SELECT
USING (
  email = ((select auth.jwt()) ->> 'email')
);
