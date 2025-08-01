-- Fix the handle_new_user function to NOT automatically create admin profiles
-- This is a critical security fix
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Remove the trigger that was creating admin profiles automatically
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create a new function that only creates profiles when explicitly called
-- and does NOT default to admin role
CREATE OR REPLACE FUNCTION public.create_user_profile(user_id_param uuid, full_name_param text DEFAULT NULL, role_param text DEFAULT 'customer')
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (user_id_param, full_name_param, role_param)
  ON CONFLICT (user_id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role;
END;
$$;