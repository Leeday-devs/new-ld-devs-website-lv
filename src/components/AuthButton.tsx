import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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

  const handleGoDashboard = () => {
    console.log('[AuthButton] navigate to', dashboardLink);
    navigate(dashboardLink);
  };

  const handleSignOut = async () => {
    console.log('[AuthButton] sign out clicked');
    await signOut();
    navigate('/');
  };
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 bg-navy/20 border-orange/20 text-white hover:bg-orange/10 hover:text-orange hover:border-orange/40 transition-all duration-200"
          >
            <User className="h-4 w-4" />
            {dashboardLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="bg-navy/95 pointer-events-auto backdrop-blur-xl border border-orange/20 shadow-luxury rounded-xl z-[9999] min-w-[200px]"
        >
          <DropdownMenuItem className="text-white/60 cursor-default hover:bg-transparent focus:bg-transparent">
            <span className="text-sm truncate">
              {user.email}
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem
            onClick={handleGoDashboard}
            className="flex items-center gap-2 cursor-pointer text-white/80 hover:text-orange hover:bg-orange/10 transition-all duration-200 px-3 py-2 rounded-lg"
          >
            <User className="h-4 w-4" />
            {dashboardLabel}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem 
            onClick={handleSignOut}
            className="gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 cursor-pointer px-3 py-2 rounded-lg"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link to="/auth">
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2 bg-navy/20 border-orange/20 text-white hover:bg-orange/10 hover:text-orange hover:border-orange/40 transition-all duration-200"
      >
        <User className="h-4 w-4" />
        Login
      </Button>
    </Link>
  );
};

export default AuthButton;