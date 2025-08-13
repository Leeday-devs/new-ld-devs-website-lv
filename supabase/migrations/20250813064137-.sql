-- Tighten RLS and add admin visibility where needed (fixed EXECUTE strings)

-- 1) Orders: restrict UPDATE to owners or admins; add admin SELECT
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'orders' AND policyname = 'update_order'
  ) THEN
    EXECUTE 'DROP POLICY "update_order" ON public.orders';
  END IF;

  -- Create strict update policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'orders' AND policyname = 'update_own_orders_or_admin'
  ) THEN
    EXECUTE 'CREATE POLICY "update_own_orders_or_admin" ON public.orders FOR UPDATE USING (user_id = auth.uid() OR public.is_admin()) WITH CHECK (user_id = auth.uid() OR public.is_admin())';
  END IF;

  -- Ensure admins can select all orders (in addition to existing owner select policy)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'orders' AND policyname = 'admin_select_orders'
  ) THEN
    EXECUTE 'CREATE POLICY "admin_select_orders" ON public.orders FOR SELECT USING (public.is_admin())';
  END IF;
END$$;

-- 2) Contact submissions: allow only admins to read
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'contact_submissions' AND policyname = 'Admins can view contact submissions'
  ) THEN
    EXECUTE 'CREATE POLICY "Admins can view contact submissions" ON public.contact_submissions FOR SELECT USING (public.is_admin())';
  END IF;
END$$;

-- 3) Newsletter subscriptions: allow only admins to read
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'newsletter_subscriptions' AND policyname = 'Admins can view newsletter subscriptions'
  ) THEN
    EXECUTE 'CREATE POLICY "Admins can view newsletter subscriptions" ON public.newsletter_subscriptions FOR SELECT USING (public.is_admin())';
  END IF;
END$$;

-- Add a uniqueness constraint to prevent email harvesting via duplicates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE schemaname = 'public' AND tablename = 'newsletter_subscriptions' AND indexname = 'ux_newsletter_subscriptions_email_lower'
  ) THEN
    EXECUTE 'CREATE UNIQUE INDEX ux_newsletter_subscriptions_email_lower ON public.newsletter_subscriptions ((lower(email)))';
  END IF;
END$$;

-- 4) Website setup submissions: allow only admins to read
DO $$
BEGIN
  IF to_regclass('public.website_setup_submissions') IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'website_setup_submissions' AND policyname = 'Admins can view website setup submissions'
    ) THEN
      EXECUTE 'CREATE POLICY "Admins can view website setup submissions" ON public.website_setup_submissions FOR SELECT USING (public.is_admin())';
    END IF;
  END IF;
END$$;