import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { CalendarDays, User, ArrowLeft, Share2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Sample blog posts data - same as in Blog.tsx
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Web Development Trends for 2024",
    excerpt: "Discover the latest web development trends that are shaping the digital landscape in 2024. From AI integration to advanced CSS features, learn what's driving modern web development.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
    author: "LD Development Team",
    date: "March 15, 2024",
    slug: "web-development-trends-2024",
    category: "Web Development",
    readTime: "8 min read",
    content: `
      <p>The web development landscape is constantly evolving, and 2024 brings exciting new trends that are reshaping how we build and interact with digital experiences. As technology advances, developers must stay ahead of the curve to create innovative, user-centric applications.</p>

      <h2>1. AI-Powered Development Tools</h2>
      <p>Artificial Intelligence is revolutionizing web development with tools that can generate code, optimize performance, and even debug applications automatically. Developers are increasingly using AI assistants to accelerate their workflow and improve code quality.</p>

      <h2>2. Advanced CSS Features</h2>
      <p>CSS continues to evolve with powerful new features like Container Queries, CSS Grid Subgrid, and advanced color functions. These improvements allow for more responsive and visually stunning designs without relying heavily on JavaScript.</p>

      <h2>3. Web Components and Micro-Frontends</h2>
      <p>The shift towards modular architecture is gaining momentum. Web Components provide a standardized way to create reusable UI elements, while micro-frontends enable teams to work independently on different parts of large applications.</p>

      <h2>4. Performance-First Development</h2>
      <p>Core Web Vitals have become crucial ranking factors, pushing developers to prioritize performance from the ground up. Tools like Lighthouse and frameworks optimized for speed are becoming standard in the development process.</p>

      <h2>5. Progressive Web Apps (PWAs) Evolution</h2>
      <p>PWAs continue to bridge the gap between web and native applications, offering offline functionality, push notifications, and app-like experiences while maintaining the accessibility of web technologies.</p>

      <h2>Conclusion</h2>
      <p>Staying current with these trends is essential for creating competitive, modern web applications. At LD Development, we incorporate these cutting-edge technologies to deliver exceptional digital experiences for our clients.</p>
    `
  },
  {
    id: 2,
    title: "Building Scalable React Applications: Best Practices",
    excerpt: "Learn how to structure and build React applications that can grow with your business. Explore component patterns, state management, and performance optimization techniques.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=600&fit=crop",
    author: "LD Development Team",
    date: "March 10, 2024",
    slug: "scalable-react-applications",
    category: "React",
    readTime: "12 min read",
    content: `
      <p>Building scalable React applications requires careful planning, thoughtful architecture, and adherence to best practices. As your application grows, maintaining clean, performant, and maintainable code becomes increasingly important.</p>

      <h2>Project Structure and Organization</h2>
      <p>A well-organized project structure is the foundation of a scalable React application. Consider using a feature-based folder structure where related components, hooks, and utilities are grouped together.</p>

      <h2>Component Design Patterns</h2>
      <p>Implement reusable component patterns like Compound Components, Render Props, and Custom Hooks. These patterns promote code reusability and make your components more flexible and maintainable.</p>

      <h2>State Management Strategy</h2>
      <p>Choose the right state management solution for your application's complexity. While React's built-in state is sufficient for smaller apps, larger applications benefit from solutions like Redux Toolkit, Zustand, or Jotai.</p>

      <h2>Performance Optimization</h2>
      <p>Implement React.memo, useMemo, and useCallback strategically to prevent unnecessary re-renders. Use code splitting with React.lazy and Suspense to improve initial load times.</p>

      <h2>Testing Strategy</h2>
      <p>Establish a comprehensive testing strategy using tools like Jest, React Testing Library, and Cypress. Focus on testing user interactions rather than implementation details.</p>

      <h2>Developer Experience</h2>
      <p>Set up proper tooling including ESLint, Prettier, and TypeScript to maintain code quality and catch errors early in the development process.</p>
    `
  },
  // Add more blog posts as needed...
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <SEOHead 
        title={`${post.title} - LD Development Blog`}
        description={post.excerpt}
        keywords={`${post.category.toLowerCase()}, web development, ${post.title.toLowerCase()}`}
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
                <span className="bg-gradient-secondary text-white px-4 py-2 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 animate-fade-in">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 animate-fade-in-up">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Share Button */}
              <div className="mb-8 animate-fade-in-up">
                <Button variant="outline" className="hover:bg-primary/10 hover:text-primary hover:border-primary">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Article
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl shadow-elegant animate-scale-in">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

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
                dangerouslySetInnerHTML={{ __html: post.content }}
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