-- Phase 2: Role-Based Access Control Hardening

-- Create a security definer function to safely check user roles
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$;

-- Update the profiles table RLS policies to prevent self-role modification
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create separate policies for different types of updates
CREATE POLICY "Users can update their own profile data" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id 
  AND (
    -- Prevent users from changing their own role
    OLD.role = NEW.role 
    OR 
    -- Only admins can change roles
    public.get_current_user_role() = 'admin'
  )
);

-- Ensure only admins can insert profiles with admin role
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id 
  AND (
    -- Users can only create non-admin profiles
    role != 'admin' 
    OR 
    -- Unless they're already admin
    public.get_current_user_role() = 'admin'
  )
);

-- Update the is_admin function to use the new security definer function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT public.get_current_user_role() = 'admin';
$$;