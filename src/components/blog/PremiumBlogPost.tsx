import { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import MobileAppLayout from '@/components/MobileAppLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import DOMPurify from 'dompurify';
import { ReadingProgress } from './ReadingProgress';
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

      const wordsPerMinute = 200;
      const wordCount = data.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      setReadTime(minutes);

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
      <MobileAppLayout showNavigation={true} showFooter={true} showBottomNav={true}>
        <div className="bg-slate-50 min-h-screen">
          <ReadingProgress />
          <div className="pt-24 pb-16">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto animate-pulse">
                <div className="h-6 bg-navy/10 rounded w-1/4 mb-6"></div>
                <div className="h-10 bg-navy/10 rounded mb-4"></div>
                <div className="h-4 bg-navy/10 rounded w-1/3 mb-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-navy/10 rounded"></div>
                  <div className="h-4 bg-navy/10 rounded w-5/6"></div>
                  <div className="h-4 bg-navy/10 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MobileAppLayout>
    );
  }

  if (!post) {
    return <Navigate to={isKnowledgeHub ? "/knowledge-hub" : "/blog"} replace />;
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://leeday.uk';

  const structuredDataArray = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      image: post.images?.[0] || post.featured_image || '',
      datePublished: post.published_at || post.created_at,
      dateModified: post.published_at || post.created_at,
      author: { "@type": "Organization", name: "Lee Day Devs" },
      publisher: {
        "@type": "Organization",
        name: "Lee Day Devs",
        logo: { "@type": "ImageObject", url: `${baseUrl}/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png` }
      },
      description: post.excerpt || post.title,
      mainEntityOfPage: { "@type": "WebPage", "@id": typeof window !== 'undefined' ? window.location.href : baseUrl }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${baseUrl}/knowledge-hub` },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": typeof window !== 'undefined' ? window.location.href : baseUrl }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title={`${post.title} | Lee Day Devs Blog`}
        description={post.excerpt || post.title}
        keywords={`${post.category?.toLowerCase()}, web development, ${post.title.toLowerCase()}`}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        ogImage={post.images?.[0] || post.featured_image}
        structuredData={structuredDataArray}
      />

      <MobileAppLayout showNavigation={true} showFooter={true} showBottomNav={true}>
        <div className="bg-slate-50 min-h-screen">
          <ReadingProgress />

          <main className="pt-24 pb-16">
            <div className="container mx-auto px-6">
              {/* Breadcrumbs */}
              <div className="max-w-3xl mx-auto mb-6">
                <Breadcrumbs items={[
                  { label: 'Home', href: '/' },
                  { label: 'Blog', href: '/knowledge-hub' },
                  { label: post.title }
                ]} />
              </div>

              {/* Back button */}
              <div className="max-w-3xl mx-auto mb-8">
                <Link to="/knowledge-hub">
                  <Button variant="outline" className="gap-2 text-navy border-navy/20 hover:bg-navy/5">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                  </Button>
                </Link>
              </div>

              {/* Article */}
              <article className="max-w-3xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                  {post.category && (
                    <span className="inline-block bg-orange/10 text-orange font-medium px-3 py-1 rounded-full text-sm mb-4">
                      {post.category}
                    </span>
                  )}

                  <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
                    {post.title}
                  </h1>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-text-secondary text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-GB', {
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
                {(post.featured_image || post.images?.[0]) && (
                  <div className="mb-8 rounded-2xl overflow-hidden">
                    <img
                      src={post.featured_image || post.images?.[0]}
                      alt={post.title}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed border-l-4 border-orange pl-4">
                    {post.excerpt}
                  </p>
                )}

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:text-navy prose-headings:font-bold
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-4
                    prose-a:text-orange prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-navy
                    prose-ul:text-text-secondary prose-ol:text-text-secondary
                    prose-li:mb-2
                    prose-blockquote:border-l-orange prose-blockquote:bg-orange/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                    prose-img:rounded-xl"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content, {
                      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'],
                      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'id'],
                      ALLOW_DATA_ATTR: false
                    })
                  }}
                />

                {/* CTA */}
                <div className="mt-12 bg-navy rounded-2xl p-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Need Help With Your Project?
                  </h2>
                  <p className="text-white/80 mb-6">
                    We're happy to chat about your ideas and see how we can help.
                  </p>
                  <button
                    onClick={() => window.location.href = '/#contact'}
                    className="bg-orange hover:bg-orange/90 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
                  >
                    Get in Touch
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </article>

              {/* Related Posts */}
              <div className="max-w-3xl mx-auto mt-16">
                <BlogRelatedPosts
                  currentPostId={post.id}
                  category={post.category}
                />
              </div>
            </div>
          </main>
        </div>
      </MobileAppLayout>
    </>
  );
};

export default PremiumBlogPost;
