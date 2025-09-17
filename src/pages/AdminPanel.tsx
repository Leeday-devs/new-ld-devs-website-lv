import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import AdminStats from "@/components/admin/AdminStats";
import BlogPostsList from "@/components/admin/BlogPostsList";
import CreateCategoryModal from "@/components/admin/CreateCategoryModal";
import { CustomerInformationManagement } from "@/components/admin/CustomerInformationManagement";
import CustomersManagement from "@/components/admin/CustomersManagement";
import { CustomQuotesManagement } from "@/components/admin/CustomQuotesManagement";
import WorkRequestsManagement from "@/components/admin/WorkRequestsManagement";
import PendingCustomersManagement from "@/components/admin/PendingCustomersManagement";
import BannedEmailsManagement from "@/components/admin/BannedEmailsManagement";
import { CookieConsentManagement } from "@/components/admin/CookieConsentManagement";
import { CollectedEmailsManagement } from "@/components/admin/CollectedEmailsManagement";
import DiscordWebhookSettings from "@/components/DiscordWebhookSettings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Shield, BarChart3, PenTool } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  category: string;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  view_count?: number;
}

const AdminPanel = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [activeTab, setActiveTab] = useState("customers");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab") || "customers";
    setActiveTab(tab);
  }, [location]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/auth");
      return;
    }

    if (user) {
      checkAdminStatus();
    }
  }, [user, loading, navigate]);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking admin status:', error);
        toast({
          title: "Access Error",
          description: "Unable to verify admin access.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      if (!data || data.role !== 'admin') {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchBlogPosts();
    } catch (error) {
      console.error('Error:', error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          view_count:blog_post_views(count)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error",
          description: "Failed to fetch blog posts.",
          variant: "destructive",
        });
        return;
      }

      // Process the data to include view counts
      const postsWithViews = data?.map(post => ({
        ...post,
        view_count: post.view_count?.[0]?.count || 0
      })) || [];

      setPosts(postsWithViews);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handlePostCreated = () => {
    fetchBlogPosts();
    toast({
      title: "Success",
      description: "Blog post created successfully!",
    });
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete post.",
          variant: "destructive",
        });
        return;
      }

      fetchBlogPosts();
      toast({
        title: "Success",
        description: "Post deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "customer-info":
        return <CustomerInformationManagement />;
      case "custom-quotes":
        return <CustomQuotesManagement />;
      case "customers":
        return <CustomersManagement />;
      case "pending":
        return <PendingCustomersManagement />;
      case "banned":
        return <BannedEmailsManagement />;
      case "work-requests":
        return <WorkRequestsManagement />;
      case "emails":
        return <CollectedEmailsManagement />;
      case "cookies":
        return <CookieConsentManagement />;
      case "discord":
        return <DiscordWebhookSettings />;
      case "blog":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
                <p className="text-muted-foreground mt-1">Create and manage your blog posts</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowCreateCategoryModal(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  New Category
                </Button>
                <Button 
                  onClick={() => navigate('/admin/create-blog')}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4" />
                  New Post
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-5 w-5 text-primary" />
                  Blog Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BlogPostsList 
                  posts={posts}
                  onDelete={handleDeletePost}
                />
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">LD Development</h1>
              <p className="text-muted-foreground mt-1">Overview of your system statistics</p>
            </div>
            <AdminStats posts={posts} onRefresh={fetchBlogPosts} />
          </div>
        );
    }
  };

  return (
    <AdminLayout>
      {renderContent()}

      {/* Modals */}
      <CreateCategoryModal
        open={showCreateCategoryModal}
        onClose={() => setShowCreateCategoryModal(false)}
        onSuccess={() => {
          setShowCreateCategoryModal(false);
          toast({ title: "Success", description: "Category created successfully!" });
        }}
      />
    </AdminLayout>
  );
};

export default AdminPanel;