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
  const getCategoryClass = (name: string) => {
    if (!name) return "badge-premium";
    return "badge-premium";
  };

  return (
    <Card className="card-premium h-full overflow-hidden group transition-all duration-500 hover:shadow-elegant">
      <div className="relative overflow-hidden">
        <img 
          src={post.image} 
          alt={`Featured image for ${post.title}`}
          loading="lazy"
          className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {post.category && (
          <div className="absolute top-4 left-4">
            <span className={`${getCategoryClass(post.category)} text-white text-sm font-medium px-3 py-1.5 rounded-full`}>
              {post.category}
            </span>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-4">
        <h3 className="heading-secondary text-navy group-hover:text-orange transition-colors duration-300 line-clamp-2 leading-tight">
          {post.title}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0 flex flex-col flex-1">
        <p className="text-body text-text-secondary mb-6 line-clamp-3 flex-1 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-text-muted mb-6 border-t border-border/50 pt-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-orange" />
            <span className="font-medium">{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-orange" />
            <span>{post.date}</span>
          </div>
        </div>
        
        <Link to={`/blog/${post.slug}`} className="block">
          <Button className="w-full btn-premium group-hover:shadow-lg transition-shadow duration-300">
            Read Full Article
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;