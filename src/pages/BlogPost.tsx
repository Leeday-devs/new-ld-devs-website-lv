import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { CalendarDays, User, ArrowLeft, Share2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import DOMPurify from 'dompurify';

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  slug: string;
  category: string;
  created_at: string;
  published_at: string;
  author_id: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readTime, setReadTime] = useState("5 min read");

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
        // Don't log detailed error information
        console.error('Error fetching blog post');
        setPost(null);
        return;
      }

      setPost(data);
      
      // Calculate read time based on content length
      const wordsPerMinute = 200;
      const wordCount = data.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      setReadTime(`${minutes} min read`);

      // Track view
      trackView(data.id);
    } catch (error) {
      // Don't log detailed error information
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
      // Silent fail for analytics
      console.log('Analytics tracking failed:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="h-8 bg-muted rounded mb-4 w-1/4"></div>
              <div className="h-12 bg-muted rounded mb-6"></div>
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
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <SEOHead 
        title={`${post.title} - LD Development Blog`}
        description={post.excerpt || post.title}
        keywords={`${post.category.toLowerCase()}, web development, ${post.title.toLowerCase()}`}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        ogImage={post.featured_image}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "image": post.featured_image ? [post.featured_image] : undefined,
          "datePublished": post.published_at || post.created_at,
          "author": { "@type": "Organization", "name": "LD Development" },
          "publisher": { "@type": "Organization", "name": "LD Development" },
          "description": post.excerpt || post.title,
        }}
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-20 pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-8">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              {/* Category Badge */}
              <div className="mb-4">
                {(() => {
                  const name = post.category || '';
                  let hash = 0; for (let i = 0; i < name.length; i++) hash = (hash << 5) - hash + name.charCodeAt(i);
                  const idx = (Math.abs(hash) % 10) + 1;
                  const cls = `category-badge-${idx}`;
                  return <span className={`${cls} text-white text-sm`}>{post.category}</span>;
                })()}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 animate-fade-in">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 animate-fade-in-up">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>LD Development Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatDate(post.published_at || post.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{readTime}</span>
                </div>
              </div>

              {/* Share Button */}
              <div className="mb-8 animate-fade-in-up">
                <Button 
                  variant="outline" 
                  className="hover:bg-primary/10 hover:text-primary hover:border-primary"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Article
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featured_image && (
          <section className="pb-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-2xl shadow-elegant animate-scale-in">
                  <img 
                    src={post.featured_image} 
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div 
                className="prose prose-lg max-w-none animate-fade-in-up"
                style={{
                  '--tw-prose-body': 'hsl(var(--foreground))',
                  '--tw-prose-headings': 'hsl(var(--foreground))',
                  '--tw-prose-links': 'hsl(var(--primary))',
                  '--tw-prose-bold': 'hsl(var(--foreground))',
                  '--tw-prose-quotes': 'hsl(var(--muted-foreground))',
                } as React.CSSProperties}
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(post.content, {
                    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'],
                    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel'],
                    ALLOW_DATA_ATTR: false
                  })
                }}
              />
              
              {/* Call to Action */}
              <div className="mt-12 p-8 bg-gradient-card rounded-2xl border border-border animate-fade-in-up">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  Ready to Transform Your Digital Presence?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let LD Development help you implement these cutting-edge solutions for your business. 
                  Our expert team is ready to bring your vision to life.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/#contact">
                    <Button className="btn-premium">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/blog">
                    <Button variant="outline" className="hover:bg-primary/10 hover:text-primary hover:border-primary">
                      Read More Articles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;