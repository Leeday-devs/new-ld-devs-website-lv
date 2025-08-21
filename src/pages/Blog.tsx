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
      <div className="min-h-screen">
        <Navigation />
        
        <div className="container mx-auto px-6 pt-20">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Blog' }
          ]} />
        </div>
        
        {/* Hero Section */}
        <section className="section-navy py-20" aria-label="Blog page hero">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="heading-primary heading-xl mb-6 text-white animate-fade-in">
                Our <span className="text-orange">Expert</span> Blog
              </h1>
              <p className="text-body text-white/90 mb-12 animate-fade-in-up max-w-2xl mx-auto">
                Insights, trends, and expert advice on web development, automation, and digital innovation to help your business thrive online
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-lg mx-auto mb-8 animate-fade-in-up">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search our expert articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange/50 transition-all duration-300 text-lg"
                  aria-label="Search articles"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="section-white py-12" aria-label="Category filters">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-navy mb-2">Browse by Category</h2>
              <p className="text-text-secondary">Find articles that match your interests</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <Button
                    key={category}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`${isSelected ? "btn-premium" : "btn-secondary hover:btn-premium"} transition-all duration-300`}
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
        <section className="section-white py-20" aria-label="Blog articles">
          <div className="container mx-auto px-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl h-72 mb-6 shimmer"></div>
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-3 shimmer" role="status" aria-label="Loading"/>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 shimmer"></div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <>
                <div className="text-center mb-16">
                  <h2 className="heading-primary heading-lg text-navy mb-4">
                    Latest <span className="text-orange">Articles</span>
                  </h2>
                  <p className="text-body text-text-secondary max-w-2xl mx-auto">
                    Discover expert insights and practical advice to help your business succeed in the digital world
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredPosts.map((post, index) => (
                    <div 
                      key={post.id} 
                      className={`animate-fade-in-up stagger-delay-${Math.min(index + 1, 5)} hover-scale`}
                      onClick={() => trackView(post.id)}
                    >
                      <BlogPostCard post={transformPostForCard(post)} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20 max-w-lg mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange/20 to-orange/40 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-orange" />
                </div>
                <h3 className="heading-secondary text-navy mb-4">No articles found</h3>
                <p className="text-body text-text-secondary mb-8">
                  {blogPosts.length === 0 
                    ? "We're working on creating amazing content for you. Check back soon!" 
                    : "Try adjusting your search terms or browse a different category to find what you're looking for."}
                </p>
                {searchTerm && (
                  <Button 
                    onClick={() => setSearchTerm("")}
                    variant="outline"
                    className="btn-secondary"
                  >
                    Clear Search
                  </Button>
                )}
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