-- Create some sample blog posts to get started
INSERT INTO blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  category, 
  status, 
  published_at,
  featured_image
) VALUES 
(
  'Welcome to LD Development Blog',
  'welcome-to-ld-development-blog',
  'Learn about our latest web development insights, tips, and industry trends.',
  '<h2>Welcome to Our Blog!</h2><p>We''re excited to share our knowledge about web development, AI automation, and digital transformation. Stay tuned for regular updates with practical tips, case studies, and industry insights.</p><p>Our team of experts will be covering topics including:</p><ul><li>Modern web development frameworks</li><li>AI integration strategies</li><li>Performance optimization</li><li>Security best practices</li><li>User experience design</li></ul><p>Don''t forget to subscribe to stay updated with our latest posts!</p>',
  'Web Development',
  'published',
  NOW(),
  NULL
),
(
  'The Future of AI in Web Development',
  'future-ai-web-development',
  'Explore how artificial intelligence is revolutionizing the way we build and interact with websites.',
  '<h2>AI is Transforming Web Development</h2><p>The integration of artificial intelligence in web development is no longer a futuristic concept—it''s happening now. From automated code generation to intelligent user interfaces, AI is reshaping how we approach web projects.</p><h3>Key Areas of Impact:</h3><ul><li><strong>Code Generation:</strong> AI tools can now write functional code snippets</li><li><strong>Design Assistance:</strong> AI helps create layouts and color schemes</li><li><strong>Content Creation:</strong> Automated content generation and optimization</li><li><strong>User Personalization:</strong> Dynamic content based on user behavior</li></ul><p>At LD Development, we''re leveraging these technologies to deliver faster, smarter solutions for our clients.</p>',
  'AI & Automation',
  'published',
  NOW() - INTERVAL '1 day',
  NULL
),
(
  'Best Practices for Mobile-First Design',
  'mobile-first-design-best-practices',
  'Learn essential strategies for creating responsive websites that work perfectly on all devices.',
  '<h2>Mobile-First Approach</h2><p>With mobile traffic accounting for over 50% of web usage, designing mobile-first isn''t just recommended—it''s essential. This approach ensures your website provides an optimal experience across all devices.</p><h3>Core Principles:</h3><ol><li><strong>Progressive Enhancement:</strong> Start with mobile and enhance for desktop</li><li><strong>Touch-Friendly Interfaces:</strong> Design for fingers, not cursors</li><li><strong>Performance First:</strong> Optimize for slower mobile connections</li><li><strong>Content Priority:</strong> Focus on what matters most</li></ol><p>Our development process always begins with mobile wireframes and testing to ensure seamless experiences across all devices.</p>',
  'Web Development',
  'published',
  NOW() - INTERVAL '2 days',
  NULL
);

-- Create a basic category if none exist
INSERT INTO blog_categories (name, slug, description, status)
VALUES 
('Web Development', 'web-development', 'Articles about modern web development techniques and best practices', 'active'),
('AI & Automation', 'ai-automation', 'Insights into artificial intelligence and automation solutions', 'active'),
('Case Studies', 'case-studies', 'Real-world project examples and success stories', 'active')
ON CONFLICT (slug) DO NOTHING;