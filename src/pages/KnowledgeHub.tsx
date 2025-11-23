import { Link } from "react-router-dom";
import MobileAppLayout from "@/components/MobileAppLayout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { BookOpen, ArrowRight, Search, FileText, Lightbulb, HelpCircle } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";

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
    if (post.category_id && categoryMap[post.category_id]) {
      return categoryMap[post.category_id];
    }
    return post.category || "";
  };

  const [dbCategories, setDbCategories] = useState<Array<{
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
    display_order: number;
  }>>([]);

  useEffect(() => {
    const fetchDbCategories = async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id, name, description, icon, display_order')
        .eq('status', 'active')
        .order('display_order', { ascending: true });

      if (!error && data) {
        setDbCategories(data);
      }
    };
    fetchDbCategories();
  }, []);

  const categorizePost = (post: BlogPost) => {
    const categoryName = getCategoryName(post);
    const matchedCategory = dbCategories.find(c =>
      c.name.toLowerCase() === categoryName.toLowerCase()
    );
    return matchedCategory?.id || 'general';
  };

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts;

    const query = searchQuery.toLowerCase();
    return blogPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      getCategoryName(post).toLowerCase().includes(query)
    );
  }, [blogPosts, searchQuery, categoryMap]);

  const postsByCategory = useMemo(() => {
    const grouped: Record<string, BlogPost[]> = {};
    dbCategories.forEach(cat => {
      grouped[cat.id] = filteredPosts.filter(p => categorizePost(p) === cat.id);
    });
    return grouped;
  }, [filteredPosts, dbCategories]);

  // Map category names to icons
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('guide') || name.includes('tutorial')) return Lightbulb;
    if (name.includes('faq') || name.includes('question')) return HelpCircle;
    if (name.includes('news') || name.includes('update')) return FileText;
    return BookOpen;
  };

  const CategorySection = ({
    title,
    description,
    posts,
    categoryName
  }: {
    title: string;
    description: string;
    posts: BlogPost[];
    categoryName: string;
  }) => {
    const Icon = getCategoryIcon(categoryName);

    // Truncate excerpt to ~25 words
    const truncateExcerpt = (text: string) => {
      const words = text.split(' ');
      return words.slice(0, 25).join(' ') + (words.length > 25 ? '...' : '');
    };

    return (
      <div className="bg-white rounded-2xl border border-navy/10 p-6 hover:border-orange/30 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-orange" />
          </div>
          <h2 className="text-xl font-bold text-navy">{title}</h2>
        </div>

        {description && (
          <p className="text-sm text-text-secondary mb-5">
            {description}
          </p>
        )}

        {posts.length > 0 ? (
          <div className="space-y-3">
            {posts.slice(0, 4).map((post) => (
              <Link
                key={post.id}
                to={`/knowledge-hub/${post.slug}`}
                className="block p-4 rounded-xl bg-slate-50 hover:bg-orange/5 border border-transparent hover:border-orange/20 transition-all duration-200 group"
              >
                <h3 className="font-semibold text-navy mb-2 group-hover:text-orange transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                  {truncateExcerpt(post.excerpt)}
                </p>
                <span className="text-sm text-orange font-medium inline-flex items-center gap-1">
                  Read article <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary text-center py-8">
            {searchQuery ? 'No articles found.' : 'Coming soon...'}
          </p>
        )}
      </div>
    );
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://leeday.uk';

  return (
    <>
      <SEOHead
        title="Blog - Lee Day Devs | Guides & Resources for Small Businesses"
        description="Helpful guides and resources to help small businesses get the most out of websites, apps, and digital tools."
        keywords="web development guides, small business resources, website tips, app development"
        url={typeof window !== 'undefined' ? window.location.href : `${baseUrl}/knowledge-hub`}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Blog",
            "description": "Helpful guides and resources for small businesses.",
            "url": `${baseUrl}/knowledge-hub`,
            "hasPart": blogPosts.map(post => ({
              "@type": "Article",
              "headline": post.title,
              "description": post.excerpt.split(' ').slice(0, 25).join(' '),
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
                "name": "Blog",
                "item": `${baseUrl}/knowledge-hub`
              }
            ]
          }
        ]}
      />
      <MobileAppLayout showNavigation={true} showFooter={true}>
        <div className="bg-slate-50">
          <div className="container mx-auto px-6 pt-20">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Blog' }
            ]} />
          </div>

        {/* Hero Section - Simplified */}
        <section className="bg-navy py-16 md:py-20" aria-label="Blog hero">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Guides & <span className="text-orange">Resources</span>
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Helpful articles to help you understand websites, apps, and how we can help your business grow.
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-8 bg-slate-50" aria-label="Search articles">
          <div className="container mx-auto px-6">
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-base rounded-xl border border-navy/10 focus:border-orange/50 bg-white"
                />
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-text-secondary text-center">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Category Sections - Simple 3-column grid */}
        <section className="py-12 bg-slate-50" aria-label="Blog categories">
          <div className="container mx-auto px-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-white rounded-2xl h-80 border border-navy/10"></div>
                  </div>
                ))}
              </div>
            ) : dbCategories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-secondary">No articles yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dbCategories.map((category) => (
                  <CategorySection
                    key={category.id}
                    title={category.name}
                    description={category.description || ''}
                    posts={postsByCategory[category.id] || []}
                    categoryName={category.name}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section - Simplified */}
        <section className="bg-navy py-16" aria-label="Get in touch">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Need Help With Your Project?
              </h2>
              <p className="text-white/80 mb-6">
                We're happy to answer questions and talk through your ideas.
              </p>
              <button
                onClick={() => window.location.href = '/#contact'}
                className="bg-orange hover:bg-orange/90 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
              >
                Get in Touch
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        </div>
      </MobileAppLayout>
    </>
  );
};

export default KnowledgeHub;
