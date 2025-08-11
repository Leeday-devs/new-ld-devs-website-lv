import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogPostCard from "@/components/BlogPostCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  featured_image: string;
  slug: string;
  category: string;
  category_id?: string | null;
  created_at: string;
  author_id: string;
}

type CategoryRecord = { id: string; name: string };

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

useEffect(() => {
  fetchBlogPosts();
  fetchCategories();
}, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        return;
      }

      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id, name, status')
        .eq('status', 'active')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      const map: Record<string, string> = {};
      const names: string[] = ['All'];
      (data || []).forEach((c: any) => {
        map[c.id] = c.name;
        names.push(c.name);
      });

      setCategoryMap(map);
      setCategories(names);
      if (!names.includes(selectedCategory)) {
        setSelectedCategory('All');
      }
    } catch (e) {
      console.error('Error fetching categories:', e);
    }
  };

  // Track blog post views
  const trackView = async (postId: string) => {
    try {
      await supabase
        .from('blog_post_views')
        .insert({
          post_id: postId,
          ip_address: null, // Will be handled by the backend
          user_agent: navigator.userAgent
        });
    } catch (error) {
      // Silent fail for analytics
      console.log('Analytics tracking failed:', error);
    }
  };

const getCategoryName = (post: BlogPost) =>
  (post.category_id && categoryMap[post.category_id]) || post.category || "";

const filteredPosts = blogPosts.filter(post => {
  const postCategory = getCategoryName(post);
  const matchesCategory = selectedCategory === "All" || postCategory === selectedCategory;
  const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
  return matchesCategory && matchesSearch;
});

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

const transformPostForCard = (post: BlogPost) => ({
  id: post.id,
  title: post.title,
  excerpt: post.excerpt || '',
  image: post.featured_image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
  author: "LD Development Team",
  date: formatDate(post.created_at),
  slug: post.slug,
  category: getCategoryName(post)
});

  return (
    <>
      <SEOHead 
        title="Our Blog - LD Development | Web Development Insights & Tips"
        description="Stay updated with the latest web development trends, tips, and insights from LD Development. Expert articles on React, automation, design, and more."
        keywords="web development blog, React tutorials, business automation, UI UX design, web security, e-commerce optimization"
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "LD Development Blog",
          "url": typeof window !== 'undefined' ? window.location.href : 'https://leedaydevs.com/blog',
          "blogPost": (blogPosts || []).slice(0, 10).map(p => ({
            "@type": "BlogPosting",
            "headline": p.title,
            "url": `${(typeof window !== 'undefined' ? window.location.origin : 'https://leedaydevs.com')}/blog/${p.slug}`,
            "datePublished": p.created_at,
          }))
        }}
        organizationSameAs={[
          "https://www.facebook.com/profile.php?id=61563893127712"
        ]}
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 pt-20">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Blog' }
          ]} />
        </div>
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 animate-fade-in">
                Our Blog
              </h1>
              <p className="text-xl text-white/90 mb-8 animate-fade-in-up">
                Insights, trends, and expert advice on web development, automation, and digital innovation
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto mb-8 animate-fade-in-up">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Search articles"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                const getPillClass = (name: string) => {
                  if (name === 'All') return 'btn-premium';
                  let hash = 0; for (let i = 0; i < name.length; i++) hash = (hash << 5) - hash + name.charCodeAt(i);
                  const idx = (Math.abs(hash) % 10) + 1;
                  return `category-pill-${idx}`;
                };
                return (
                  <Button
                    key={category}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`${isSelected ? getPillClass(category) : "hover:bg-primary/10 hover:text-primary hover:border-primary"}`}
                    aria-pressed={isSelected}
                  >
                    {category}
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-muted rounded-lg h-64 mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2" role="status" aria-label="Loading"/>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className={`animate-fade-in-up stagger-delay-${Math.min(index + 1, 5)}`}
                    onClick={() => trackView(post.id)}
                  >
                    <BlogPostCard post={transformPostForCard(post)} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  {blogPosts.length === 0 
                    ? "No blog posts have been published yet." 
                    : "Try adjusting your search or category filter."}
                </p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;