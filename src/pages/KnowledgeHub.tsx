import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Bot, Smartphone, ArrowRight, Sparkles, Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter posts by search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts;
    
    const query = searchQuery.toLowerCase();
    return blogPosts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      getCategoryName(post).toLowerCase().includes(query)
    );
  }, [blogPosts, searchQuery, categoryMap]);

  const costsPosts = filteredPosts.filter(p => categorizePost(p) === 'costs');
  const aiPosts = filteredPosts.filter(p => categorizePost(p) === 'ai');
  const appsPosts = filteredPosts.filter(p => categorizePost(p) === 'apps');

  const CategorySection = ({ 
    icon: Icon, 
    title,
    description,
    posts 
  }: { 
    icon: any; 
    title: string;
    description: string;
    posts: BlogPost[] 
  }) => (
    <Card className="p-8 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-premium">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 bg-gradient-primary rounded-xl">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-navy">{title}</h2>
      </div>
      
      <p className="text-sm text-text-secondary mb-6 ml-1">
        {description}
      </p>
      
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.slice(0, 4).map((post, index) => {
            const allPostsInCategory = posts;
            const nextPost = allPostsInCategory[index + 1] || allPostsInCategory[0];
            
            // Standardize excerpt to 20-30 words
            const words = post.excerpt.split(' ');
            const standardizedExcerpt = words.slice(0, 25).join(' ') + (words.length > 25 ? '...' : '.');
            
            return (
              <div key={post.id} className="block group">
                <Link
                  to={`/knowledge-hub/${post.slug}`}
                  className="block"
                >
                  <div className="p-4 rounded-lg bg-white/50 hover:bg-white transition-all duration-300 border border-transparent hover:border-primary/20">
                    <h3 className="font-semibold text-navy mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3">
                      {standardizedExcerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary font-medium inline-flex items-center gap-2">
                        Read More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
                {nextPost && nextPost.id !== post.id && (
                  <div className="mt-2 ml-4">
                    <Link 
                      to={`/knowledge-hub/${nextPost.slug}`}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      Related: {nextPost.title}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-text-secondary text-center py-8">
          {searchQuery ? 'No articles found matching your search.' : 'Coming soon...'}
        </p>
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
            "hasPart": blogPosts.map(post => {
              const words = post.excerpt.split(' ');
              const shortDescription = words.slice(0, 25).join(' ') + (words.length > 25 ? '...' : '.');
              
              return {
                "@type": "Article",
                "headline": post.title,
                "description": shortDescription,
                "url": `${baseUrl}/knowledge-hub/${post.slug}`,
                "datePublished": post.created_at
              };
            })
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

        {/* Search Bar */}
        <section className="section-white pt-12 pb-8" aria-label="Search articles">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles by keyword or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base rounded-xl border-2 border-primary/10 focus:border-primary/30 transition-all duration-300"
                />
              </div>
              {searchQuery && (
                <p className="mt-3 text-sm text-muted-foreground text-center">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Category Sections */}
        <section className="section-white py-12" aria-label="Knowledge categories">
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
                  description="Transparent pricing guides and design insights to help you plan and budget for your perfect website."
                  posts={costsPosts}
                />
                <CategorySection 
                  icon={Bot}
                  title="🤖 AI for Small Businesses"
                  description="Practical AI and automation strategies that save time and boost efficiency for small business owners."
                  posts={aiPosts}
                />
                <CategorySection 
                  icon={Smartphone}
                  title="📱 Apps & Automations"
                  description="Mobile apps, workflow automation, and digital tools to streamline your operations and scale faster."
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
