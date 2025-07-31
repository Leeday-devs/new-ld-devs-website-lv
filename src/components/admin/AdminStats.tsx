import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, FileText, Eye, Trophy, RefreshCw, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  view_count?: number;
  status: string;
}

interface AdminStatsProps {
  posts: BlogPost[];
  onRefresh?: () => void;
}

const AdminStats = ({ posts, onRefresh }: AdminStatsProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [monthlyViews, setMonthlyViews] = useState(0);
  const [mostViewedThisMonth, setMostViewedThisMonth] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  const totalPosts = posts.length;
  const publishedPosts = posts.filter(post => post.status === 'published').length;
  const totalViews = posts.reduce((sum, post) => sum + (post.view_count || 0), 0);
  const mostViewedPost = posts.reduce((max, post) => 
    (post.view_count || 0) > (max.view_count || 0) ? post : max, 
    posts[0] || { title: 'None', view_count: 0 }
  );

  const fetchMonthlyStats = async () => {
    try {
      setIsRefreshing(true);
      
      // Get current month start and end dates
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

      // Fetch monthly views
      const { data: monthlyViewsData, error: monthlyError } = await supabase
        .from('blog_post_views')
        .select('*')
        .gte('viewed_at', monthStart.toISOString())
        .lte('viewed_at', monthEnd.toISOString());

      if (monthlyError) throw monthlyError;

      setMonthlyViews(monthlyViewsData?.length || 0);

      // Get most viewed post this month
      if (monthlyViewsData && monthlyViewsData.length > 0) {
        const postViewCounts = monthlyViewsData.reduce((acc, view) => {
          acc[view.post_id] = (acc[view.post_id] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const mostViewedPostId = Object.entries(postViewCounts)
          .sort(([,a], [,b]) => b - a)[0]?.[0];

        if (mostViewedPostId) {
          const mostViewedPost = posts.find(post => post.id === mostViewedPostId);
          if (mostViewedPost) {
            setMostViewedThisMonth({
              ...mostViewedPost,
              view_count: postViewCounts[mostViewedPostId]
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching monthly stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch monthly statistics",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    await fetchMonthlyStats();
    if (onRefresh) {
      onRefresh();
    }
    toast({
      title: "Success",
      description: "Analytics refreshed successfully"
    });
  };

  // Load monthly stats on component mount
  useEffect(() => {
    fetchMonthlyStats();
  }, [posts]);

  const stats = [
    {
      title: "Total Posts",
      value: totalPosts,
      subtitle: `${publishedPosts} published`,
      icon: FileText,
      gradient: "bg-gradient-primary"
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      subtitle: "All time",
      icon: Eye,
      gradient: "bg-gradient-secondary"
    },
    {
      title: "Monthly Views",
      value: monthlyViews.toLocaleString(),
      subtitle: "This month",
      icon: Calendar,
      gradient: "bg-gradient-accent"
    },
    {
      title: "Top Post This Month",
      value: mostViewedThisMonth?.view_count || 0,
      subtitle: mostViewedThisMonth?.title?.substring(0, 25) + (mostViewedThisMonth?.title?.length > 25 ? '...' : '') || 'No views yet',
      icon: Trophy,
      gradient: "bg-gradient-primary"
    }
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Analytics Overview</h2>
        <Button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="card-premium overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.gradient} opacity-10 rounded-full -translate-y-6 translate-x-6`}></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 ${stat.gradient} rounded-lg shadow-button`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;