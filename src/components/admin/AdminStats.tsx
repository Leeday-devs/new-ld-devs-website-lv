import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, FileText, Eye, Trophy } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  view_count?: number;
  status: string;
}

interface AdminStatsProps {
  posts: BlogPost[];
}

const AdminStats = ({ posts }: AdminStatsProps) => {
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(post => post.status === 'published').length;
  const totalViews = posts.reduce((sum, post) => sum + (post.view_count || 0), 0);
  const mostViewedPost = posts.reduce((max, post) => 
    (post.view_count || 0) > (max.view_count || 0) ? post : max, 
    posts[0] || { title: 'None', view_count: 0 }
  );

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
      title: "Most Viewed",
      value: mostViewedPost?.view_count || 0,
      subtitle: mostViewedPost?.title?.substring(0, 30) + (mostViewedPost?.title?.length > 30 ? '...' : '') || 'No posts yet',
      icon: Trophy,
      gradient: "bg-gradient-accent"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
  );
};

export default AdminStats;