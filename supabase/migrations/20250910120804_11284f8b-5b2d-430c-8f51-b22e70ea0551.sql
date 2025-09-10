-- Clear all test/demo data for fresh production start

-- Clear customer information data
DELETE FROM contact_submissions;
DELETE FROM newsletter_subscriptions;
DELETE FROM template_purchases;
DELETE FROM website_setup_submissions;
DELETE FROM orders;
DELETE FROM cookie_consents;

-- Clear blog and analytics data
DELETE FROM blog_post_views;
DELETE FROM blog_posts;
DELETE FROM blog_categories;

-- Clear customer management data
DELETE FROM work_requests;
DELETE FROM customer_services;
DELETE FROM customers;

-- Clear security data (keep structure but clear entries)
DELETE FROM banned_emails;

-- Reset any auto-increment sequences if needed
-- Note: UUID primary keys don't need sequence resets

-- Optional: Reset any statistics or counters
-- This ensures a completely fresh start for production