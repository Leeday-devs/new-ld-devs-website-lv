import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminStats from "@/components/admin/AdminStats";
import BlogPostsList from "@/components/admin/BlogPostsList";
import CreatePostModal from "@/components/admin/CreatePostModal";
import EditPostModal from "@/components/admin/EditPostModal";
import CreateCategoryModal from "@/components/admin/CreateCategoryModal";
import CustomersManagement from "@/components/admin/CustomersManagement";
import WorkRequestsManagement from "@/components/admin/WorkRequestsManagement";
import PendingCustomersManagement from "@/components/admin/PendingCustomersManagement";
import BannedEmailsManagement from "@/components/admin/BannedEmailsManagement";
import { CookieConsentManagement } from "@/components/admin/CookieConsentManagement";
import { CollectedEmailsManagement } from "@/components/admin/CollectedEmailsManagement";
import DiscordWebhookSettings from "@/components/DiscordWebhookSettings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Shield, BarChart3, Users, Clock, AlertTriangle, Settings, Cookie, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

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
    setShowCreateModal(false);
    fetchBlogPosts();
    toast({
      title: "Success",
      description: "Blog post created successfully!",
    });
  };

  const handlePostUpdated = () => {
    setEditingPost(null);
    fetchBlogPosts();
    toast({
      title: "Success",
      description: "Blog post updated successfully!",
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-primary rounded-lg shadow-glow">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">
                  Admin Panel
                </h1>
                <p className="text-muted-foreground">
                  Manage your blog posts and view analytics
                </p>
              </div>
            </div>

            <AdminStats posts={posts} onRefresh={fetchBlogPosts} />
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="customers" className="w-full">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="customers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Customers
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending
              </TabsTrigger>
              <TabsTrigger value="banned" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Banned Emails
              </TabsTrigger>
              <TabsTrigger value="work-requests" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Work Requests
              </TabsTrigger>
              <TabsTrigger value="emails" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Emails
              </TabsTrigger>
              <TabsTrigger value="cookies" className="flex items-center gap-2">
                <Cookie className="h-4 w-4" />
                Cookies
              </TabsTrigger>
              <TabsTrigger value="discord" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Discord
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Blog Posts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="customers" className="mt-6">
              <CustomersManagement />
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <PendingCustomersManagement />
            </TabsContent>

            <TabsContent value="banned" className="mt-6">
              <BannedEmailsManagement />
            </TabsContent>

            <TabsContent value="work-requests" className="mt-6">
              <WorkRequestsManagement />
            </TabsContent>

            <TabsContent value="emails" className="mt-6">
              <CollectedEmailsManagement />
            </TabsContent>

            <TabsContent value="cookies" className="mt-6">
              <CookieConsentManagement />
            </TabsContent>

            <TabsContent value="discord" className="mt-6">
              <DiscordWebhookSettings />
            </TabsContent>

            <TabsContent value="blog" className="mt-6">
              <div className="flex justify-end mb-6">
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
                    onClick={() => setShowCreateModal(true)}
                    className="btn-premium gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    New Post
                  </Button>
                </div>
              </div>

              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Blog Posts Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BlogPostsList 
                    posts={posts}
                    onEdit={setEditingPost}
                    onDelete={handleDeletePost}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modals */}
      <CreatePostModal 
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handlePostCreated}
      />

      <CreateCategoryModal
        open={showCreateCategoryModal}
        onClose={() => setShowCreateCategoryModal(false)}
        onSuccess={() => {
          setShowCreateCategoryModal(false);
          toast({ title: "Success", description: "Category created successfully!" });
        }}
      />

      {editingPost && (
        <EditPostModal 
          post={editingPost}
          open={!!editingPost}
          onClose={() => setEditingPost(null)}
          onSuccess={handlePostUpdated}
        />
      )}

      <Footer />
    </div>
  );
};

export default AdminPanel;