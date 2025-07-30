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
  return (
    <Card className="card-premium h-full overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0 flex flex-col flex-1">
        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
        </div>
        
        <Link to={`/blog/${post.slug}`} className="block">
          <Button className="w-full btn-premium">
            Read More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;