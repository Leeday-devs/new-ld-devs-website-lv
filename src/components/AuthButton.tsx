import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AuthButton = () => {
  const { user, signOut } = useAuth();

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
            <Link to="/admin/panel" className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              Admin Panel
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary hover:border-primary">
          <User className="h-4 w-4 mr-1" />
          Login
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to="/auth" className="flex items-center gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            Customer Portal
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/admin/auth" className="flex items-center gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            Admin Login
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;