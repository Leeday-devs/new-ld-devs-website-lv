import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogPostCard from "@/components/BlogPostCard";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

// Sample blog posts data - you can later replace this with API calls
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Web Development Trends for 2024",
    excerpt: "Discover the latest web development trends that are shaping the digital landscape in 2024. From AI integration to advanced CSS features, learn what's driving modern web development.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    author: "LD Development Team",
    date: "March 15, 2024",
    slug: "web-development-trends-2024",
    category: "Web Development"
  },
  {
    id: 2,
    title: "Building Scalable React Applications: Best Practices",
    excerpt: "Learn how to structure and build React applications that can grow with your business. Explore component patterns, state management, and performance optimization techniques.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
    author: "LD Development Team",
    date: "March 10, 2024",
    slug: "scalable-react-applications",
    category: "React"
  },
  {
    id: 3,
    title: "The Power of Automation in Business Processes",
    excerpt: "Discover how automation can transform your business operations, reduce costs, and improve efficiency. Real-world examples and implementation strategies included.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    author: "LD Development Team",
    date: "March 5, 2024",
    slug: "business-process-automation",
    category: "Automation"
  },
  {
    id: 4,
    title: "Modern UI/UX Design Principles That Convert",
    excerpt: "Explore the fundamental design principles that create engaging user experiences and drive conversions. From color psychology to user journey optimization.",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c11f?w=800&h=600&fit=crop",
    author: "LD Development Team",
    date: "February 28, 2024",
    slug: "modern-ui-ux-design-principles",
    category: "Design"
  },
  {
    id: 5,
    title: "Securing Your Web Applications: A Complete Guide",
    excerpt: "Learn essential security practices to protect your web applications from common vulnerabilities. Comprehensive guide covering authentication, data protection, and more.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop",
    author: "LD Development Team",
    date: "February 22, 2024",
    slug: "web-application-security-guide",
    category: "Security"
  },
  {
    id: 6,
    title: "E-commerce Optimization: Boosting Sales with Technology",
    excerpt: "Discover how to leverage technology to optimize your e-commerce platform for better conversions, user experience, and sales performance.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    author: "LD Development Team",
    date: "February 15, 2024",
    slug: "ecommerce-optimization-technology",
    category: "E-commerce"
  }
];

const categories = ["All", "Web Development", "React", "Automation", "Design", "Security", "E-commerce"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEOHead 
        title="Our Blog - LD Development | Web Development Insights & Tips"
        description="Stay updated with the latest web development trends, tips, and insights from LD Development. Expert articles on React, automation, design, and more."
        keywords="web development blog, React tutorials, business automation, UI UX design, web security, e-commerce optimization"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
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
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category 
                      ? "btn-premium" 
                      : "hover:bg-primary/10 hover:text-primary hover:border-primary"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <div key={post.id} className={`animate-fade-in-up stagger-delay-${Math.min(index + 1, 5)}`}>
                    <BlogPostCard post={post} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
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