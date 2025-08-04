import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { KeyRound, Loader2 } from "lucide-react";

interface PasswordResetDialogProps {
  open: boolean;
  onClose: () => void;
  customerEmail: string;
  customerName: string;
}

const PasswordResetDialog = ({ open, onClose, customerEmail, customerName }: PasswordResetDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      toast({
        title: "Error",
        description: "Please enter a new password.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Get user by email first
      const { data: users, error: getUserError } = await supabase.auth.admin.listUsers();
      
      if (getUserError) {
        console.error('Error fetching users:', getUserError);
        toast({
          title: "Error",
          description: "Failed to find user.",
          variant: "destructive",
        });
        return;
      }

      const user = users.users.find((u: any) => u.email === customerEmail);
      
      if (!user) {
        toast({
          title: "Error",
          description: "User not found.",
          variant: "destructive",
        });
        return;
      }

      // Update user password using admin API
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        user.id,
        { password: newPassword }
      );

      if (updateError) {
        console.error('Error updating password:', updateError);
        toast({
          title: "Error",
          description: "Failed to reset password: " + updateError.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Password Reset Successfully",
        description: `Password has been reset for ${customerName}. Make sure to share the new password securely.`,
      });

      setNewPassword("");
      onClose();

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-primary" />
            Reset Password for {customerName}
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will reset the password for <strong>{customerEmail}</strong>. 
            Make sure to share the new password with the customer securely.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="newPassword"
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <Button
                type="button"
                variant="outline"
                onClick={generateRandomPassword}
                className="shrink-0"
              >
                Generate
              </Button>
            </div>
          </div>
          
          {newPassword && (
            <div className="p-3 bg-accent/50 rounded-lg">
              <p className="text-sm font-medium mb-1">New Password:</p>
              <code className="text-sm bg-background px-2 py-1 rounded border">
                {newPassword}
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                Copy this password and share it securely with the customer.
              </p>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleResetPassword}
            disabled={loading || !newPassword.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset Password
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasswordResetDialog;