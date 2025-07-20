import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, FileText, MessageSquare, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  full_name: string | null;
  company: string | null;
  phone: string | null;
  created_at: string;
}

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, loading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            full_name: user.user_metadata?.full_name || null
          })
          .select()
          .single();

        if (!createError) {
          setProfile(newProfile);
        }
      } else if (!error) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initials = profile?.full_name 
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email?.charAt(0).toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">DevCraft Studio</h1>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.full_name || user.email}!
          </h2>
          <p className="text-muted-foreground">
            Manage your projects and account from your dashboard.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Projects
              </CardTitle>
              <CardDescription>
                View and manage your development projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Projects</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Consultations
              </CardTitle>
              <CardDescription>
                Schedule and track your consultation sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Book Consultation</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Analytics
              </CardTitle>
              <CardDescription>
                Track your project progress and metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">View Analytics</Button>
            </CardContent>
          </Card>
        </div>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-sm">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="text-sm">{profile?.full_name || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Company</label>
                <p className="text-sm">{profile?.company || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                <p className="text-sm">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="pt-4">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;