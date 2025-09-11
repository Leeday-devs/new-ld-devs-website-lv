import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Calendar, Clock, TrendingUp } from "lucide-react";
import { OptimizedImage } from "@/components/PerformanceOptimizedImages";

interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  images?: string[];
  category?: string;
  created_at: string;
}

interface BlogRelatedPostsProps {
  currentPostId: string;
  category?: string;
}

export const BlogRelatedPosts = ({ currentPostId, category }: BlogRelatedPostsProps) => {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, excerpt, slug, images, category, created_at')
          .eq('status', 'published')
          .neq('id', currentPostId)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching related posts:', error);
          setRelatedPosts([]);
        } else {
          setRelatedPosts(data || []);
        }
      } catch (error) {
        console.error('Error fetching related posts:', error);
        setRelatedPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPostId, category]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Related Articles</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-muted rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (relatedPosts.length === 0) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-muted/20 border-border/50">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg text-foreground">Related Articles</h3>
      </div>
      
      <div className="space-y-4">
        {relatedPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0">
              <Link 
                to={`/blog/${post.slug}`}
                className="flex gap-4 p-4 hover:bg-muted/30 transition-colors duration-200"
              >
                <div className="relative w-20 h-20 flex-shrink-0">
                  <OptimizedImage
                    src={post.images?.[0] || '/placeholder.svg'}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-lg"
                    priority={false}
                  />
                </div>
                
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm leading-tight line-clamp-2 text-foreground hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {post.category && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        {post.category}
                      </Badge>
                    )}
                    
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{calculateReadTime(post.excerpt || '')} min</span>
                    </div>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  );
};