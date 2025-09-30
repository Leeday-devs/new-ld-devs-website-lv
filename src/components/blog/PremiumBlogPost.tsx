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

  // Generate short answer for Answer Box (moved after null check)
  const shortAnswer = post.excerpt || "Discover proven strategies and solutions tailored to your business needs. Our approach has helped 500+ UK businesses achieve measurable growth and sustainable success.";

  // Generate FAQ data
  const faqData = [
    {
      question: "How long does it take to see results from these strategies?",
      answer: "Most of our clients start seeing measurable improvements within 4-6 weeks of implementation. However, the timeline can vary depending on your current setup, competition level, and how consistently the strategies are applied. We provide regular progress reports so you can track improvements in real-time."
    },
    {
      question: "Do I need technical knowledge to implement these solutions?",
      answer: "Absolutely not! Our approach is designed for business owners without technical backgrounds. We handle all the technical aspects while you focus on running your business. Everything from setup to maintenance is managed by our expert team, so you don't need any technical knowledge."
    },
    {
      question: "What makes LD Development different from other web development companies?",
      answer: "We specialize in business automation and focus on delivering measurable ROI, not just pretty websites. Our team combines technical expertise with business strategy, ensuring your site drives actual business growth. We also offer transparent pricing, ongoing support, and a full refund if you're not happy with the initial mockup."
    },
    {
      question: "Can these strategies work for my specific industry?",
      answer: "Yes! We've successfully implemented these strategies across various industries including restaurants, fitness studios, auto repair, plumbing, barbershops, pet grooming, and professional services. The core principles adapt to any business model, and we customize each solution to your unique needs and goals."
    },
    {
      question: "What ongoing support do you provide after implementation?",
      answer: "We offer comprehensive ongoing support including regular performance monitoring, security updates, troubleshooting, and strategy refinements. Our goal is your long-term success, not just a one-time delivery. Support packages start at £40/month and include hosting, maintenance, and unlimited update requests."
    },
    {
      question: "How much does it cost to get started?",
      answer: "We start with a £20 slot deposit to secure your project, which is fully refundable if you're not happy with the mockup. After approval, you pay 50% upfront and 50% on completion. Final pricing depends on your specific needs, but we're transparent about costs and never surprise you with hidden fees."
    },
    {
      question: "What if I want to add features later?",
      answer: "That's completely fine! Many clients start with a core website and add features like online bookings, live chat, or custom integrations as their business grows. Our modular approach makes it easy and cost-effective to scale your site over time without rebuilding from scratch."
    }
  ];

  // Case study data
  const caseStudyData = {
    title: "Real Results: Local Restaurant Success Story",
    quote: "Within 6 weeks of implementing LD Development's strategies, our online orders increased by 240% and our customer base expanded by 60%. The automated systems they built saved us 15 hours per week.",
    author: "Sarah Mitchell, Owner of The Garden Bistro, London",
    stats: [
      { label: "Average ROI Increase", value: "340%" },
      { label: "Client Satisfaction", value: "98%" },
      { label: "Project Success Rate", value: "99.2%" }
    ]
  };

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

  // Add FAQ schema
  if (faqData && faqData.length > 0) {
    structuredDataArray.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
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

              {/* Answer Box - directly under H1 */}
              <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/10 border border-blue-200/50 dark:border-blue-800/30 rounded-2xl p-8 shadow-lg shadow-blue-100/50 dark:shadow-none">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-3">Short answer:</h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {shortAnswer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Short Intro (1-2 sentences) */}
              {post.excerpt && (
                <div className="text-center max-w-3xl mx-auto">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {post.excerpt.split('.').slice(0, 2).join('.') + (post.excerpt.split('.').length > 2 ? '.' : '')}
                  </p>
                </div>
              )}

              {/* Table of Contents - full width under intro */}
              <div className="w-full my-12">
                <EnhancedTableOfContents />
              </div>

              <GradientSectionDivider />

              {/* Main Content - Sanitized HTML with skimmable structure */}
              <div className="prose prose-lg max-w-none space-y-8">
                <div 
                  className="blog-content text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(post.content, {
                      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'],
                      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'id'],
                      ALLOW_DATA_ATTR: false
                    })
                  }}
                />
              </div>

              <GradientSectionDivider />
            </article>
          </div>

          {/* Expanded FAQ Section */}
          <BlogFAQSection faqs={faqData} />

          {/* Case Study / Success Story - moved to bottom after FAQ */}
          <div className="max-w-4xl mx-auto my-16">
            <PremiumContentCard
              type="story"
              title={caseStudyData.title}
            >
              <blockquote className="text-lg mb-6 italic border-l-4 border-gradient-to-b from-[#FF7A00] to-[#0D6EFD] pl-6">
                "{caseStudyData.quote}"
              </blockquote>
              <p className="text-muted-foreground font-semibold mb-8">
                — {caseStudyData.author}
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {caseStudyData.stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-white/50 to-blue-50/30 dark:from-white/5 dark:to-blue-900/10 rounded-xl border border-blue-200/30 dark:border-white/10">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#FF7A00] to-[#0D6EFD] bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </PremiumContentCard>
          </div>


          {/* Unified Final CTA - single strong closing block */}
          <div className="max-w-4xl mx-auto my-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF7A00] via-[#FF8A1A] to-[#0D6EFD] p-12 shadow-2xl">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
              <div className="relative text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Get Your Free Mockup Today
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  See how your website could look before committing to anything. Fully refundable deposit.
                </p>
                <div className="pt-4">
                  <Link to="/contact">
                    <Button size="lg" className="bg-white text-[#FF7A00] hover:bg-white/90 font-bold px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      Book My Free Mockup →
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-white/80 pt-2">
                  💰 Only £20 deposit • 100% refundable • No obligation
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="max-w-4xl mx-auto mt-16">
            <BlogRelatedPosts 
              currentPostId={post.id} 
              category={post.category} 
            />
          </div>

          {/* Sidebar TOC for desktop - now hidden since we moved it to main content */}
          <div className="hidden">
            <EnhancedTableOfContents />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PremiumBlogPost;