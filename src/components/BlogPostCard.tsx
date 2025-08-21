import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays, User, Tag } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  slug: string;
  category: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  // Alternate color schemes like premium services
  const getColorScheme = (index: number) => {
    const isPrimary = Math.random() > 0.5; // Random alternation for variety
    
    return isPrimary 
      ? {
          gradient: 'bg-gradient-to-br from-orange/12 via-orange/8 via-white/95 to-orange/6',
          border: 'border border-orange/25',
          glass: 'backdrop-blur-xl bg-white/90',
          icon: 'text-orange',
          iconBg: 'bg-gradient-to-br from-orange/15 to-orange/25',
          accent: 'bg-gradient-to-r from-orange via-orange/90 to-orange',
          glow: 'shadow-[0_8px_32px_rgba(255,122,0,0.12),0_0_0_1px_rgba(255,122,0,0.05)]',
          hoverGlow: 'hover:shadow-[0_20px_60px_rgba(255,122,0,0.25),0_0_0_1px_rgba(255,122,0,0.15)]'
        }
      : {
          gradient: 'bg-gradient-to-br from-navy/12 via-navy/8 via-white/95 to-navy/6',
          border: 'border border-navy/25',
          glass: 'backdrop-blur-xl bg-white/90',
          icon: 'text-navy',
          iconBg: 'bg-gradient-to-br from-navy/15 to-navy/25',
          accent: 'bg-gradient-to-r from-navy via-navy/90 to-navy',
          glow: 'shadow-[0_8px_32px_rgba(10,25,47,0.15),0_0_0_1px_rgba(10,25,47,0.08)]',
          hoverGlow: 'hover:shadow-[0_20px_60px_rgba(10,25,47,0.3),0_0_0_1px_rgba(10,25,47,0.2)]'
        };
  };

  const colorScheme = getColorScheme(0);
  const isPrimary = colorScheme.icon === 'text-orange';

  return (
    <div
      className={`relative group overflow-hidden rounded-2xl h-full ${colorScheme.gradient} ${colorScheme.border} ${colorScheme.glow} ${colorScheme.hoverGlow} transition-all duration-700 hover:scale-[1.03] hover:-translate-y-3 cursor-pointer`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, ${isPrimary ? 'rgba(255,122,0,0.08)' : 'rgba(10,25,47,0.08)'} 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${isPrimary ? 'rgba(255,122,0,0.06)' : 'rgba(10,25,47,0.06)'} 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255,255,255,0.8) 0%, transparent 50%)
        `
      }}
    >
      {/* Ultra-premium glass morphism overlay */}
      <div className={`absolute inset-0 rounded-2xl ${colorScheme.glass} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
      
      {/* Sophisticated light reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
      
      {/* Premium shimmer animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out" />
      
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${colorScheme.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative p-8 z-10 h-full flex flex-col">
        {/* Featured Image with Premium Styling */}
        <div className="mb-6 relative overflow-hidden rounded-xl">
          <img 
            src={post.image} 
            alt={`Featured image for ${post.title}`}
            loading="lazy"
            className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
          
          {/* Category Badge */}
          {post.category && (
            <div className="absolute top-4 left-4">
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${isPrimary ? 'bg-orange' : 'bg-navy'} text-white backdrop-blur-md border border-white/30 shadow-xl shadow-${isPrimary ? 'orange' : 'navy'}/30 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 font-bold`}>
                <Tag className="h-4 w-4 mr-2" />
                <span className="text-sm font-bold tracking-wide uppercase">
                  {post.category}
                </span>
              </div>
            </div>
          )}
          
          {/* Floating particles effect */}
          <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${colorScheme.accent} opacity-0 group-hover:opacity-60 group-hover:animate-bounce transition-all duration-500 delay-100`} />
          <div className={`absolute bottom-2 right-4 w-1.5 h-1.5 rounded-full ${colorScheme.accent} opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-all duration-500 delay-200`} />
        </div>

        {/* Luxury Typography */}
        <div className="mb-4 flex-1">
          <h3 className={`heading-primary text-xl font-bold mb-3 ${colorScheme.icon} group-hover:text-navy transition-colors duration-500 leading-tight line-clamp-2`}>
            {post.title}
          </h3>
          <div className={`h-0.5 w-12 ${colorScheme.accent} rounded-full opacity-60 group-hover:w-20 group-hover:opacity-100 transition-all duration-500 mb-4`} />
          
          {/* Refined Description */}
          <p className="text-base leading-relaxed text-text-secondary font-medium group-hover:text-text-primary transition-colors duration-300 line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Premium Meta Information */}
        <div className="flex items-center justify-between text-sm mb-6 border-t border-white/20 pt-4">
          <div className="flex items-center group/item">
            <div className={`relative p-1.5 rounded-lg ${colorScheme.iconBg} mr-2 group-hover/item:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20`}>
              <User className={`h-3 w-3 ${colorScheme.icon}`} />
            </div>
            <span className="font-semibold text-text-primary group-hover/item:text-navy transition-colors duration-300">
              {post.author}
            </span>
          </div>
          <div className="flex items-center group/item">
            <div className={`relative p-1.5 rounded-lg ${colorScheme.iconBg} mr-2 group-hover/item:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20`}>
              <CalendarDays className={`h-3 w-3 ${colorScheme.icon}`} />
            </div>
            <span className="font-medium text-text-secondary">
              {post.date}
            </span>
          </div>
        </div>

        {/* Ultra-premium Call-to-Action */}
        <Link to={`/blog/${post.slug}`} className="block">
          <div className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-xl ${colorScheme.gradient} ${colorScheme.border} backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150 hover:scale-105`}>
            <span className={`font-semibold ${colorScheme.icon} mr-2`}>
              Read Full Article
            </span>
            <div className={`p-1 rounded-full ${colorScheme.iconBg}`}>
              <svg className={`h-3 w-3 ${colorScheme.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;