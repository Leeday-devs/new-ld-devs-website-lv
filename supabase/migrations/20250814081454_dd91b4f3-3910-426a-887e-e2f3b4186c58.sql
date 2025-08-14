-- Comprehensive security fix for all 7 identified issues
-- This migration hardens RLS policies across all sensitive data tables

-- 1. Fix newsletter_subscriptions - Add admin management policies
DROP POLICY IF EXISTS "Admins can view newsletter subscriptions" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;

CREATE POLICY "Admins can manage all newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR ALL 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

CREATE POLICY "Public can subscribe to newsletter" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);

-- 2. Fix contact_submissions - Add admin management policies  
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

CREATE POLICY "Admins can manage all contact submissions" 
ON public.contact_submissions 
FOR ALL 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

CREATE POLICY "Public can submit contact form" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- 3. Fix website_setup_submissions - Add admin management policies
DROP POLICY IF EXISTS "Admins can view website setup submissions" ON public.website_setup_submissions;
DROP POLICY IF EXISTS "Allow public form submissions" ON public.website_setup_submissions;

CREATE POLICY "Admins can manage all website setup submissions" 
ON public.website_setup_submissions 
FOR ALL 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

CREATE POLICY "Public can submit website setup forms" 
ON public.website_setup_submissions 
FOR INSERT 
WITH CHECK (true);

-- 4. Harden template_purchases - Ensure only admins can manage, users can only see their own
DROP POLICY IF EXISTS "Admins can manage all template purchases" ON public.template_purchases;
DROP POLICY IF EXISTS "Users can view their own template purchases" ON public.template_purchases;

CREATE POLICY "Admins can manage all template purchases" 
ON public.template_purchases 
FOR ALL 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

CREATE POLICY "Users can view their own template purchases" 
ON public.template_purchases 
FOR SELECT 
USING (email = (auth.jwt() ->> 'email'));

-- Prevent any unauthorized inserts to template_purchases
CREATE POLICY "Only admins can create template purchases" 
ON public.template_purchases 
FOR INSERT 
WITH CHECK (public.is_admin());

-- 5. Harden orders table - Ensure proper access controls
DROP POLICY IF EXISTS "admin_select_orders" ON public.orders;
DROP POLICY IF EXISTS "insert_order" ON public.orders;
DROP POLICY IF EXISTS "select_own_orders" ON public.orders;
DROP POLICY IF EXISTS "update_own_orders_or_admin" ON public.orders;

CREATE POLICY "Admins can manage all orders" 
ON public.orders 
FOR ALL 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (user_id = auth.uid() OR customer_email = (auth.jwt() ->> 'email'));

CREATE POLICY "System can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own orders" 
ON public.orders 
FOR UPDATE 
USING (user_id = auth.uid() OR customer_email = (auth.jwt() ->> 'email')) 
WITH CHECK (user_id = auth.uid() OR customer_email = (auth.jwt() ->> 'email'));

-- 6. Harden work_requests - Ensure only admins and owning customers can access
DROP POLICY IF EXISTS "Admins can manage all work requests" ON public.work_requests;
DROP POLICY IF EXISTS "Customers can insert their own work requests" ON public.work_requests;
DROP POLICY IF EXISTS "Customers can view their own work requests" ON public.work_requests;

CREATE POLICY "Admins can manage all work requests" 
ON public.work_requests 
FOR ALL 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

CREATE POLICY "Customers can view their own work requests" 
ON public.work_requests 
FOR SELECT 
USING (customer_id IN (
  SELECT c.id FROM public.customers c 
  WHERE c.user_id = auth.uid()
));

CREATE POLICY "Customers can insert their own work requests" 
ON public.work_requests 
FOR INSERT 
WITH CHECK (customer_id IN (
  SELECT c.id FROM public.customers c 
  WHERE c.user_id = auth.uid()
));

CREATE POLICY "Customers can update their own work requests" 
ON public.work_requests 
FOR UPDATE 
USING (customer_id IN (
  SELECT c.id FROM public.customers c 
  WHERE c.user_id = auth.uid()
)) 
WITH CHECK (customer_id IN (
  SELECT c.id FROM public.customers c 
  WHERE c.user_id = auth.uid()
));

-- 7. Ensure blog_post_views has proper admin access
DROP POLICY IF EXISTS "Admins can view all analytics" ON public.blog_post_views;
DROP POLICY IF EXISTS "Anyone can insert views" ON public.blog_post_views;

CREATE POLICY "Admins can manage all blog post views" 
ON public.blog_post_views 
FOR ALL 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

CREATE POLICY "Public can record page views" 
ON public.blog_post_views 
FOR INSERT 
WITH CHECK (true);