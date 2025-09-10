-- Re-enable RLS and fix the policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can manage all posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can view published posts" ON blog_posts;

-- Create comprehensive policies for blog posts
CREATE POLICY "Admins can manage all posts" 
ON blog_posts 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Anyone can view published posts" 
ON blog_posts 
FOR SELECT 
USING (status = 'published');

-- Allow public access to read published blog posts (no authentication required)
CREATE POLICY "Public can view published posts"
ON blog_posts
FOR SELECT
USING (status = 'published');

-- Ensure admins can create posts
CREATE POLICY "Admins can create posts"
ON blog_posts
FOR INSERT
WITH CHECK (is_admin());