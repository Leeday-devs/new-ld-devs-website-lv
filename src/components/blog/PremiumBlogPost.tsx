import { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEOHead from '@/components/SEOHead';
import BlogImageCarousel from '@/components/BlogImageCarousel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, User, CheckCircle } from 'lucide-react';
import DOMPurify from 'dompurify';

// Premium blog components
import { ReadingProgress } from './ReadingProgress';
import { BlogTldrSummary } from './BlogTldrSummary';
import { BlogInThisArticle } from './BlogInThisArticle';
import { BlogFAQSection } from './BlogFAQSection';
import { StickyShareButtons } from './StickyShareButtons';
import { GradientSectionDivider } from './GradientSectionDivider';
import { PremiumContentCard } from './PremiumContentCard';
import { EnhancedTableOfContents } from './EnhancedTableOfContents';
import { BlogCallToAction } from './BlogCallToAction';
import { BlogRelatedPosts } from './BlogRelatedPosts';

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  images?: string[];
  slug: string;
  category?: string;
  created_at: string;
  published_at?: string;
  author_id?: string;
  status: string;
}

const PremiumBlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readTime, setReadTime] = useState(5);
  
  // Detect if this is a Knowledge Hub route
  const isKnowledgeHub = location.pathname.startsWith('/knowledge-hub');

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug);
    }
  }, [slug]);

  const fetchBlogPost = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Error fetching blog post');
        setPost(null);
        return;
      }

      setPost(data);
      
      // Calculate read time based on content length
      const wordsPerMinute = 200;
      const wordCount = data.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      setReadTime(minutes);

      // Track view
      trackView(data.id);
    } catch (error) {
      console.error('Error fetching blog post');
      setPost(null);
    } finally {
      setIsLoading(false);
    }
  };

  const trackView = async (postId: string) => {
    try {
      await supabase
        .from('blog_post_views')
        .insert({
          post_id: postId,
          ip_address: null,
          user_agent: navigator.userAgent
        });
    } catch (error) {
      console.log('Analytics tracking failed:', error);
    }
  };

  // Generate TL;DR summary points (this would ideally come from the database)
  const tldrPoints = [
    "Learn proven strategies that have helped 500+ businesses increase their online visibility",
    "Discover how to implement these changes without any technical knowledge required", 
    "Get access to tools and techniques used by successful companies in the UK",
    "See real-world results and case studies from similar businesses"
  ];

  // Generate FAQ data (this would ideally come from the database)
  const faqData = [
    {
      question: "How long does it take to see results from these strategies?",
      answer: "Most of our clients start seeing measurable improvements within 4-6 weeks of implementation. However, the timeline can vary depending on your current setup, competition level, and how consistently the strategies are applied."
    },
    {
      question: "Do I need technical knowledge to implement these solutions?",
      answer: "Absolutely not! Our approach is designed for business owners without technical backgrounds. We handle all the technical aspects while you focus on running your business. No technical knowledge needed, we do everything for you."
    },
    {
      question: "What makes LD Development different from other web development companies?",
      answer: "We specialize in business automation and focus on delivering measurable ROI. Our team combines technical expertise with business strategy, ensuring your website not only looks great but actually drives business growth."
    },
    {
      question: "Can these strategies work for my specific industry?",
      answer: "Yes! We've successfully implemented these strategies across various industries including restaurants, fitness studios, auto repair, plumbing, and professional services. The core principles adapt to any business model."
    },
    {
      question: "What ongoing support do you provide after implementation?",
      answer: "We offer comprehensive ongoing support including regular performance monitoring, updates, troubleshooting, and strategy refinements. Our goal is your long-term success, not just a one-time delivery."
    }
  ];

  // Generate article sections for navigation
  const articleSections = [
    { title: "Understanding the Problem", id: "understanding-problem" },
    { title: "Strategic Solutions", id: "strategic-solutions" },
    { title: "Implementation Process", id: "implementation-process" },
    { title: "Measuring Success", id: "measuring-success" },
    { title: "Next Steps", id: "next-steps" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ReadingProgress />
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="space-y-6">
                <div className="h-8 bg-muted rounded mb-4 w-1/4"></div>
                <div className="h-16 bg-muted rounded mb-6"></div>
                <div className="h-4 bg-muted rounded mb-2 w-1/3"></div>
                <div className="h-64 bg-muted rounded mb-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to={isKnowledgeHub ? "/knowledge-hub" : "/blog"} replace />;
  }

  // Build structured data array
  const structuredDataArray: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      image: post.images?.[0] || post.featured_image || '',
      datePublished: post.published_at || post.created_at,
      dateModified: post.published_at || post.created_at,
      author: { "@type": "Organization", name: "LD Development Team" },
      publisher: { 
        "@type": "Organization", 
        name: "LD Development",
        logo: { "@type": "ImageObject", url: `${typeof window !== 'undefined' ? window.location.origin : 'https://leeday.uk'}/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png` }
      },
      description: post.excerpt || post.title,
      mainEntityOfPage: { "@type": "WebPage", "@id": typeof window !== 'undefined' ? window.location.href : 'https://leeday.uk' },
      articleSection: post.category
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": typeof window !== 'undefined' ? window.location.origin : 'https://leeday.uk'
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": isKnowledgeHub ? "Knowledge Hub" : "Blog",
          "item": `${typeof window !== 'undefined' ? window.location.origin : 'https://leeday.uk'}${isKnowledgeHub ? '/knowledge-hub' : '/blog'}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": typeof window !== 'undefined' ? window.location.href : 'https://leeday.uk'
        }
      ]
    }
  ];

  // Add FAQ schema for website cost article
  if (slug === 'website-cost-uk-2025') {
    structuredDataArray.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a small business website cost in the UK in 2025?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Typically £500–£5,000 depending on scope, features, and custom design. High-end bespoke builds can exceed £10,000."
          }
        },
        {
          "@type": "Question",
          "name": "What factors affect website cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Type of site, number of pages, design quality, integrations, and hosting/maintenance."
          }
        },
        {
          "@type": "Question",
          "name": "Are there hidden costs for websites?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes—hosting & maintenance (£40/mo with us), domains (£10–£20/yr), content/photos, and future updates."
          }
        },
        {
          "@type": "Question",
          "name": "How do you structure payments at LeeDay.uk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "£20 slot deposit, 50% upfront, 50% on completion. The deposit is fully refundable if you're not happy with the mockup."
          }
        },
        {
          "@type": "Question",
          "name": "Can I start small and add features later?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes—begin with the core site, then add bookings, chat, or automations as you grow."
          }
        }
      ]
    });
  }

  return (
    <>
      <SEOHead 
        title={`${post.title} - LD Development ${isKnowledgeHub ? 'Knowledge Hub' : 'Blog'}`}
        description={post.excerpt || post.title}
        keywords={`${post.category?.toLowerCase()}, web development, ${post.title.toLowerCase()}`}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        ogImage={post.images?.[0] || post.featured_image}
        structuredData={structuredDataArray}
        organizationSameAs={[
          "https://www.facebook.com/profile.php?id=61563893127712"
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <ReadingProgress />
        <Navigation />
        <StickyShareButtons url={`${isKnowledgeHub ? '/knowledge-hub' : '/blog'}/${slug}`} title={post.title} excerpt={post.excerpt} />
        
        <main className="container mx-auto px-4 pt-28 pb-8">
          {/* Breadcrumbs */}
          <div className="mb-8 max-w-4xl mx-auto">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: isKnowledgeHub ? 'Knowledge Hub' : 'Blog', href: isKnowledgeHub ? '/knowledge-hub' : '/blog' },
              { label: post.title }
            ]} />
          </div>

          {/* Back button */}
          <div className="mb-8 max-w-4xl mx-auto">
            <Link to={isKnowledgeHub ? "/knowledge-hub" : "/blog"}>
              <Button variant="outline" className="gap-2 hover:bg-gradient-to-r hover:from-[#FF7A00]/10 hover:to-[#0D6EFD]/10 transition-all duration-200">
                <ArrowLeft className="h-4 w-4" />
                Back to {isKnowledgeHub ? 'Knowledge Hub' : 'Blog'}
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <article className="space-y-8">
              {/* Category and Title */}
              <header className="text-center space-y-6">
                {post.category && (
                  <Badge className="bg-gradient-to-r from-[#FF7A00] to-[#0D6EFD] text-white font-semibold px-4 py-2 text-sm">
                    {post.category.toUpperCase()}
                  </Badge>
                )}
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground tracking-tight">
                  {post.title}
                </h1>
                
                {/* Meta information */}
                <div className="flex items-center justify-center gap-6 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>LD Development Team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{readTime} min read</span>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              {((post.images && post.images.length > 0) || post.featured_image) && (
                <div className="my-12">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <BlogImageCarousel
                      images={post.images && post.images.length > 0 ? post.images : (post.featured_image ? [post.featured_image] : [])}
                      alt={post.title}
                      className="w-full h-[400px] md:h-[500px] object-cover"
                      autoSlide={true}
                      slideInterval={6000}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                </div>
              )}

              {/* Excerpt */}
              {post.excerpt && (
                <div className="text-center">
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed italic max-w-3xl mx-auto font-medium">
                    {post.excerpt}
                  </p>
                </div>
              )}

              <GradientSectionDivider />

              {/* TL;DR Summary */}
              <BlogTldrSummary points={tldrPoints} readTime={readTime} category={post.category} />

              {/* In This Article Navigation */}
              <BlogInThisArticle sections={articleSections} />

              <GradientSectionDivider />

              {/* Article Content with Premium Cards */}
              <div className="prose prose-lg max-w-none space-y-12">
                {/* Introduction Card */}
                <PremiumContentCard
                  type="highlight"
                  title="Why This Matters for Your Business"
                >
                  <p className="text-lg leading-relaxed mb-4">
                    In today's competitive digital landscape, having the right strategies can make the difference between a business that thrives and one that struggles to get noticed. 
                  </p>
                  <p className="text-lg leading-relaxed">
                    The techniques we'll explore in this article have been tested and proven with over 500 UK businesses, generating measurable results and sustainable growth.
                  </p>
                </PremiumContentCard>

                <div id="understanding-problem" className="scroll-mt-20">
                  <GradientSectionDivider type="with-text" text="UNDERSTANDING THE CHALLENGE" />
                </div>

                {/* Main Content - Sanitized HTML */}
                <div className="blog-content space-y-8 text-lg leading-relaxed">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: DOMPurify.sanitize(post.content, {
                        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'],
                        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'id'],
                        ALLOW_DATA_ATTR: false
                      })
                    }}
                  />
                </div>

                {/* Benefits Card */}
                <div id="strategic-solutions" className="scroll-mt-20">
                  <PremiumContentCard
                    type="benefits"
                    title="Key Benefits of Our Approach"
                    stats={[
                      { label: "Average ROI Increase", value: "340%" },
                      { label: "Client Satisfaction", value: "98%" },
                      { label: "Project Success Rate", value: "99.2%" }
                    ]}
                  >
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Rapid implementation with minimal disruption to your business</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Scalable solutions that grow with your business needs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>24/7 support and ongoing optimization</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>No technical knowledge needed - we handle everything</span>
                      </li>
                    </ul>
                  </PremiumContentCard>
                </div>

                {/* Implementation Steps */}
                <div id="implementation-process" className="scroll-mt-20">
                  <PremiumContentCard
                    type="steps"
                    title="Implementation Process"
                  >
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Discovery & Analysis</h4>
                          <p className="text-muted-foreground">We analyze your current setup and identify optimization opportunities</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Strategy Development</h4>
                          <p className="text-muted-foreground">Create a customized roadmap tailored to your business goals</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Implementation & Testing</h4>
                          <p className="text-muted-foreground">Deploy solutions with thorough testing and quality assurance</p>
                        </div>
                      </div>
                    </div>
                  </PremiumContentCard>
                </div>

                {/* Success Story */}
                <div id="measuring-success" className="scroll-mt-20">
                  <PremiumContentCard
                    type="story"
                    title="Real Results: Local Restaurant Case Study"
                  >
                    <p className="text-lg mb-4">
                      "Within 6 weeks of implementing LD Development's strategies, our online orders increased by 240% and our customer base expanded by 60%. The automated systems they built saved us 15 hours per week."
                    </p>
                    <p className="text-muted-foreground italic">
                      - Sarah Mitchell, Owner of The Garden Bistro, London
                    </p>
                  </PremiumContentCard>
                </div>

                <GradientSectionDivider />

                {/* Call to Action */}
                <div id="next-steps" className="scroll-mt-20">
                  <BlogCallToAction />
                </div>
              </div>
            </article>
          </div>

          {/* FAQ Section */}
          <BlogFAQSection faqs={faqData} />

          {/* Related Articles */}
          <div className="max-w-4xl mx-auto mt-16">
            <BlogRelatedPosts 
              currentPostId={post.id} 
              category={post.category} 
            />
          </div>

          {/* Sidebar (if needed) */}
          <div className="hidden xl:block fixed right-4 top-1/3 w-64">
            <EnhancedTableOfContents />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PremiumBlogPost;