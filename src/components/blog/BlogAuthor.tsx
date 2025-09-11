import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye } from "lucide-react";

interface BlogAuthorProps {
  author: string;
  date: string;
  readTime: number;
  viewCount?: number;
  authorImage?: string;
  authorBio?: string;
}

export const BlogAuthor = ({ 
  author, 
  date, 
  readTime, 
  viewCount,
  authorImage,
  authorBio 
}: BlogAuthorProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-muted/30 rounded-2xl border border-border/50">
      <div className="flex items-center gap-4 flex-1">
        <Avatar className="h-12 w-12 ring-2 ring-primary/20">
          <AvatarImage src={authorImage} alt={author} />
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
            {author.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h4 className="font-semibold text-foreground">{author}</h4>
            <Badge variant="secondary" className="text-xs">Author</Badge>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime} min read</span>
            </div>
            
            {viewCount && (
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{viewCount.toLocaleString()} views</span>
              </div>
            )}
          </div>
          
          {authorBio && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {authorBio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};