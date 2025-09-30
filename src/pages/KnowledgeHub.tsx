import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { BookOpen, Bot, Smartphone, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/CTAButton";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category?: string;
  category_id?: string | null;
  created_at: string;
}

const KnowledgeHub = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [postsResult, categoriesResult] = await Promise.all([
        supabase
          .from('blog_posts')
          .select('id, title, excerpt, slug, category, category_id, created_at')
          .eq('status', 'published')
          .order('published_at', { ascending: false }),
        supabase
          .from('blog_categories')
          .select('id, name')
          .eq('status', 'active')
      ]);

      if (postsResult.data) {
        setBlogPosts(postsResult.data);
      }

      if (categoriesResult.data) {
        const map: Record<string, string> = {};
        categoriesResult.data.forEach((c: any) => {
          map[c.id] = c.name;
        });
        setCategoryMap(map);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryName = (post: BlogPost) => {
    // Try to get category from category_id mapping first, then fall back to text category field
    if (post.category_id && categoryMap[post.category_id]) {
      return categoryMap[post.category_id];
    }
    return post.category || "";
  };

  const categorizePost = (post: BlogPost) => {
    const category = getCategoryName(post).toLowerCase();
    if (category.includes('cost') || category.includes('design') || category.includes('website') || category.includes('web development') || category.includes('ld info')) {
      return 'costs';
    } else if (category.includes('ai') || category.includes('automation')) {
      return 'ai';
    } else if (category.includes('app') || category.includes('mobile')) {
      return 'apps';
    }
    return 'general';
  };

  const costsPosts = blogPosts.filter(p => categorizePost(p) === 'costs');
  const aiPosts = blogPosts.filter(p => categorizePost(p) === 'ai');
  const appsPosts = blogPosts.filter(p => categorizePost(p) === 'apps');

  const CategorySection = ({ 
    icon: Icon, 
    title, 
    posts 
  }: { 
    icon: any; 
    title: string; 
    posts: BlogPost[] 
  }) => (
    <Card className="p-8 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-premium">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-primary rounded-xl">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-navy">{title}</h2>
      </div>
      
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              to={`/knowledge-hub/${post.slug}`}
              className="block group"
            >
              <div className="p-4 rounded-lg bg-white/50 hover:bg-white transition-all duration-300 border border-transparent hover:border-primary/20">
                <h3 className="font-semibold text-navy mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <span className="text-sm text-primary font-medium inline-flex items-center gap-2">
                  Read More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-text-secondary text-center py-8">Coming soon...</p>
      )}
    </Card>
  );

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://leeday.uk';
  
  return (
    <>
      <SEOHead 
        title="Knowledge Hub - LD Development | Web Development Guides & Resources"
        description="Guides, FAQs, and resources to help small businesses get the most out of websites, apps, and AI automation."
        keywords="web development guides, small business resources, AI automation, website costs, app development"
        url={typeof window !== 'undefined' ? window.location.href : `${baseUrl}/knowledge-hub`}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Knowledge Hub",
            "description": "Guides, FAQs, and resources to help small businesses get the most out of websites, apps, and AI automation.",
            "url": `${baseUrl}/knowledge-hub`,
            "hasPart": blogPosts.slice(0, 9).map(post => ({
              "@type": "Article",
              "headline": post.title,
              "description": post.excerpt,
              "url": `${baseUrl}/knowledge-hub/${post.slug}`,
              "datePublished": post.created_at
            }))
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": baseUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Knowledge Hub",
                "item": `${baseUrl}/knowledge-hub`
              }
            ]
          }
        ]}
      />
      <div className="min-h-screen">
        <Navigation />
        
        <div className="container mx-auto px-6 pt-20">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Knowledge Hub' }
          ]} />
        </div>
        
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden" aria-label="Knowledge Hub hero">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-primary/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,146,60,0.1),transparent_50%)]" />
            
            {/* Animated particles */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-orange rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-orange rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-orange/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-orange/30">
                <Sparkles className="h-4 w-4 text-orange" />
                <span className="text-sm font-medium text-white">Expert Guides & Resources</span>
              </div>
              
              <h1 className="heading-primary heading-xl mb-6 text-white animate-fade-in">
                Knowledge <span className="text-orange">Hub</span>
              </h1>
              <p className="text-body text-white/90 mb-12 animate-fade-in-up max-w-2xl mx-auto text-lg">
                Guides, FAQs, and resources to help small businesses get the most out of websites, apps, and AI automation.
              </p>
            </div>
          </div>
        </section>

        {/* Category Sections */}
        <section className="section-white py-20" aria-label="Knowledge categories">
          <div className="container mx-auto px-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl h-96 shimmer"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CategorySection 
                  icon={BookOpen}
                  title="💰 Website Costs & Design"
                  posts={costsPosts}
                />
                <CategorySection 
                  icon={Bot}
                  title="🤖 AI for Small Businesses"
                  posts={aiPosts}
                />
                <CategorySection 
                  icon={Smartphone}
                  title="📱 Apps & Automations"
                  posts={appsPosts}
                />
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-navy py-20" aria-label="Get started">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-primary heading-lg text-white mb-6">
                Need a <span className="text-orange">Hand?</span>
              </h2>
              <p className="text-body text-white/90 mb-8 text-lg">
                Get a free mockup of your website today. If you're not happy, your deposit is fully refundable.
              </p>
              <CTAButton size="lg" className="gap-2">
                Get Your Free Mockup <ArrowRight className="h-5 w-5" />
              </CTAButton>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default KnowledgeHub;
