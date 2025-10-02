import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featured_image?: string | null;
  category?: string | null;
}

interface BlogRelatedArticlesProps {
  articleIds: string[];
}

export const BlogRelatedArticles = ({ articleIds }: BlogRelatedArticlesProps) => {
  const [articles, setArticles] = useState<RelatedArticle[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!articleIds || articleIds.length === 0) return;
      
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, featured_image, category')
        .in('id', articleIds)
        .eq('status', 'published')
        .limit(6);
      
      if (data) setArticles(data);
    };

    fetchArticles();
  }, [articleIds]);

  if (articles.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} to={`/knowledge-hub/${article.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              {article.featured_image && (
                <img 
                  src={article.featured_image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                {article.category && (
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {article.category}
                  </span>
                )}
                <h3 className="font-semibold mt-2 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                )}
                <div className="flex items-center text-sm text-primary font-medium">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};