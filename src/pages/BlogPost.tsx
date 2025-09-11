import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEOHead from '@/components/SEOHead';
import BlogImageCarousel from '@/components/BlogImageCarousel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

// New blog components
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { BlogAuthor } from '@/components/blog/BlogAuthor';
import { BlogSocialShare } from '@/components/blog/BlogSocialShare';
import { BlogTableOfContents } from '@/components/blog/BlogTableOfContents';
import { BlogRelatedPosts } from '@/components/blog/BlogRelatedPosts';
import { BlogCallToAction } from '@/components/blog/BlogCallToAction';

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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readTime, setReadTime] = useState(5);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ReadingProgress />
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto animate-pulse">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                <div className="xl:col-span-8 space-y-6">
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
                <div className="xl:col-span-4 space-y-6">
                  <div className="h-40 bg-muted rounded"></div>
                  <div className="h-60 bg-muted rounded"></div>
                </div>
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
        keywords={`${post.category?.toLowerCase()}, web development, ${post.title.toLowerCase()}`}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        ogImage={post.images?.[0] || post.featured_image}
        structuredData={{
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
            logo: { "@type": "ImageObject", url: `${typeof window !== 'undefined' ? window.location.origin : 'https://leedaydevs.com'}/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png` }
          },
          description: post.excerpt || post.title,
          mainEntityOfPage: { "@type": "WebPage", "@id": typeof window !== 'undefined' ? window.location.href : 'https://leedaydevs.com' },
          articleSection: post.category
        }}
        organizationSameAs={[
          "https://www.facebook.com/profile.php?id=61563893127712"
        ]}
      />
      
      <div className="min-h-screen bg-background">
        <ReadingProgress />
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="mb-6 max-w-7xl mx-auto">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title }
            ]} />
          </div>

          <div className="mb-6 max-w-7xl mx-auto">
            <Link to="/blog">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-7xl mx-auto">
            {/* Main Content */}
            <article className="xl:col-span-8">
              {/* Hero Section with Featured Image */}
              {((post.images && post.images.length > 0) || post.featured_image) && (
                <div className="mb-8 -mx-4 sm:mx-0">
                  <div className="blog-hero relative overflow-hidden rounded-2xl">
                    <BlogImageCarousel
                      images={post.images && post.images.length > 0 ? post.images : (post.featured_image ? [post.featured_image] : [])}
                      alt={post.title}
                      className="w-full h-[400px] md:h-[500px] object-cover"
                      autoSlide={true}
                      slideInterval={6000}
                    />
                    <div className="blog-hero-content absolute inset-0 flex items-end p-8">
                      <div className="max-w-2xl">
                        {post.category && (
                          <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                            {post.category}
                          </Badge>
                        )}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white drop-shadow-lg">
                          {post.title}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Article Header (fallback if no image) */}
              {(!post.images || post.images.length === 0) && !post.featured_image && (
                <header className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    {post.category && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {post.category}
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{color: '#2563EB'}}>
                    {post.title}
                  </h1>
                </header>
              )}

              {/* Author Section */}
              <div className="mb-8">
                <BlogAuthor
                  author="LD Development Team"
                  date={post.published_at || post.created_at}
                  readTime={readTime}
                  viewCount={Math.floor(Math.random() * 1000) + 100}
                  authorBio="Expert team specializing in business automation and digital transformation."
                />
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <div className="mb-8 p-6 bg-muted/30 rounded-2xl border-l-4 border-primary">
                  <p className="text-lg text-foreground/80 leading-relaxed italic">
                    {post.excerpt}
                  </p>
                </div>
              )}

              {/* Social Share */}
              <div className="mb-8">
                <BlogSocialShare
                  url={`/blog/${slug}`}
                  title={post.title}
                  excerpt={post.excerpt}
                />
              </div>

              {/* Article Content */}
              <div className="blog-content mb-12">
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

              {/* Call to Action */}
              <div className="mt-12">
                <BlogCallToAction />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="xl:col-span-4 space-y-6">
              <div className="xl:sticky xl:top-28 xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto">
                <BlogTableOfContents />
              </div>
              
              <BlogRelatedPosts 
                currentPostId={post.id} 
                category={post.category} 
              />
              
              {/* Social Share - Non-sticky on smaller screens */}
              <div className="xl:sticky xl:top-[calc(100vh-12rem)]">
                <BlogSocialShare
                  url={`/blog/${slug}`}
                  title={post.title}
                  excerpt={post.excerpt}
                />
              </div>
            </aside>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;