-- Insert the new Knowledge Hub article about website costs
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  status,
  featured_image,
  published_at
) VALUES (
  'How Much Does a Website Really Cost in 2025?',
  'website-cost-uk-2025',
  'A professional UK small-business website typically costs £500–£5,000 in 2025, depending on features, design, and support. High-end bespoke builds can exceed £10,000.',
  $$<div class="answer-box bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/20 border-l-4 border-orange-500 dark:border-orange-600 p-8 rounded-xl shadow-lg mb-12">
  <h2 class="text-2xl font-bold text-navy dark:text-white mb-4">💡 Quick Answer</h2>
  <p class="text-lg leading-relaxed text-foreground">A professional UK small-business website typically costs <strong>£500–£5,000</strong> in 2025, depending on features, design, and support. High-end bespoke builds can exceed £10,000.</p>
</div>

<h2>What Factors Affect Website Cost?</h2>
<p>The final price of your website depends on several key factors:</p>
<ul>
  <li><strong>Website Type</strong> – A simple brochure site costs less than a full e-commerce platform with booking systems.</li>
  <li><strong>Features & Functionality</strong> – Contact forms, AI chatbots, payment gateways, CMS integration, and custom animations all add to development time.</li>
  <li><strong>Design Complexity</strong> – Template-based designs are cheaper; bespoke, brand-aligned designs require more resources.</li>
  <li><strong>Ongoing Services</strong> – Hosting, maintenance, SEO, and content updates can be bundled or paid separately.</li>
</ul>

<h2>Average Website Price Ranges in the UK</h2>
<p>Here's what you can expect to pay in 2025:</p>
<ul>
  <li><strong>DIY (Website Builders)</strong> – £0–£300/year<br/>Platforms like Wix or Squarespace. Good for basic sites but limited customization and scalability.</li>
  <li><strong>Budget Professional</strong> – £500–£1,500<br/>Simple template-based sites from freelancers or small agencies. Basic SEO and mobile optimization included.</li>
  <li><strong>Professional Business Site</strong> – £2,000–£5,000<br/>Custom design, CMS integration, advanced features (forms, booking, analytics), and professional copywriting.</li>
  <li><strong>High-End Bespoke</strong> – £10,000+<br/>Fully custom development, advanced integrations (CRM, payment systems, AI), ongoing strategic support.</li>
</ul>

<h2>Hidden Costs Most People Forget</h2>
<p>Beyond the upfront build cost, consider these ongoing expenses:</p>
<ul>
  <li><strong>Domain Name</strong> – £10–£50/year depending on the extension (.co.uk, .com, etc.)</li>
  <li><strong>Hosting</strong> – £50–£300/year for shared hosting, more for dedicated or cloud hosting.</li>
  <li><strong>SSL Certificate</strong> – Usually free with hosting, but premium options cost £50–£150/year.</li>
  <li><strong>Content Updates</strong> – If you can't update your own content, expect £50–£150/hour for revisions.</li>
  <li><strong>Your Time</strong> – DIY solutions save money upfront but require significant time investment to learn and maintain.</li>
</ul>

<h2>Our Transparent Pricing Model</h2>
<p>At LD Development, we believe in honest, upfront pricing with no hidden fees. Here's how we work:</p>
<ul>
  <li><strong>£20 Deposit</strong> – Fully refundable if you're not happy with the initial mockup.</li>
  <li><strong>50/50 Payment Split</strong> – Half upfront, half on completion. No surprises.</li>
  <li><strong>£40/month Maintenance</strong> – Includes hosting, SSL, updates, security monitoring, and 2 hours of changes per month.</li>
  <li><strong>1 Month Free Revisions</strong> – After launch, we offer unlimited tweaks for 30 days to ensure you're 100% satisfied.</li>
</ul>
<p>Most of our small business clients pay between <strong>£2,000–£4,000</strong> for a fully custom website with all the features they need to grow online.</p>

<h2>Quick FAQs</h2>

<h3>Can I get a website for under £500?</h3>
<p>Yes, but it will likely be template-based with limited customization. For a professional, branded site that stands out, expect to invest £1,500–£3,000.</p>

<h3>What's the difference between a £1,000 and a £5,000 website?</h3>
<p>A £1,000 site typically uses pre-made templates with basic customization. A £5,000 site includes custom design, advanced features (booking systems, payment gateways, AI chatbots), professional copywriting, and ongoing support.</p>

<h3>Do I need to pay for hosting separately?</h3>
<p>Most professional agencies include hosting in their maintenance packages. At LD Development, our £40/month package covers hosting, SSL, backups, and updates.</p>

<h3>How long does it take to build a website?</h3>
<p>A simple 5-page site can be ready in 1–2 weeks. More complex builds with custom features take 4–8 weeks depending on scope and revisions.</p>

<div class="cta-section bg-gradient-to-br from-navy via-navy/95 to-primary/20 text-white p-12 rounded-2xl shadow-premium mt-16 text-center">
  <h2 class="text-3xl font-bold mb-4">Want a Free Mockup?</h2>
  <p class="text-lg mb-8">See exactly what your website will look like before paying a penny. Book your slot now and get started today.</p>
  <a href="/#contact" class="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-bold px-8 py-4 rounded-full shadow-button transition-all duration-300 hover:scale-105">
    Book Your Free Slot Now →
  </a>
</div>$$,
  'Website Costs & Design',
  'published',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
  now()
);

-- Get or create the category for Website Costs & Design
DO $$
DECLARE
  v_category_id uuid;
BEGIN
  -- Check if category exists
  SELECT id INTO v_category_id
  FROM blog_categories
  WHERE slug = 'website-costs-design'
  LIMIT 1;

  -- If it doesn't exist, create it
  IF v_category_id IS NULL THEN
    INSERT INTO blog_categories (name, slug, description, status)
    VALUES (
      'Website Costs & Design',
      'website-costs-design',
      'Expert insights on website pricing, design trends, and cost-effective solutions for small businesses.',
      'active'
    )
    RETURNING id INTO v_category_id;
  END IF;

  -- Update the blog post with the category_id
  UPDATE blog_posts
  SET category_id = v_category_id
  WHERE slug = 'website-cost-uk-2025'
    AND category_id IS NULL;
END $$;