import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { User, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AuthButton = () => {
  const { user, signOut } = useAuth();
  const [dashboardLink, setDashboardLink] = useState('/dashboard');
  const [dashboardLabel, setDashboardLabel] = useState('Dashboard');

  useEffect(() => {
    if (user) {
      checkUserRole();
    }
  }, [user]);

  const checkUserRole = async () => {
    if (!user) return;
    
    try {
      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profile?.role === 'admin') {
        setDashboardLink('/admin/panel');
        setDashboardLabel('Admin Panel');
        return;
      }

      // Default to customer dashboard
      setDashboardLink('/dashboard');
      setDashboardLabel('Dashboard');
    } catch (error) {
      console.error('Error checking user role:', error);
    }
  };

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary">
            <User className="h-4 w-4" />
            Login
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <span className="text-sm text-muted-foreground">
              {user.email}
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to={dashboardLink} className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              {dashboardLabel}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut} className="gap-2 text-destructive">
            <LogOut className="h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link to="/auth">
      <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary hover:border-primary">
        <User className="h-4 w-4 mr-1" />
        Login
      </Button>
    </Link>
  );
};

export default AuthButton;