import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Trash2, 
  Shield, 
  Mail, 
  AlertTriangle,
  User 
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const banEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  reason: z.string().min(1, "Please provide a reason for banning this email"),
});

type BanEmailFormData = z.infer<typeof banEmailSchema>;

interface BannedEmail {
  id: string;
  email: string;
  reason: string | null;
  created_at: string;
  banned_by: string | null;
}

const BannedEmailsManagement = () => {
  const { toast } = useToast();
  const [bannedEmails, setBannedEmails] = useState<BannedEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingEmail, setAddingEmail] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);

  const form = useForm<BanEmailFormData>({
    resolver: zodResolver(banEmailSchema),
    defaultValues: {
      email: "",
      reason: "",
    },
  });

  useEffect(() => {
    fetchBannedEmails();
  }, []);

  const fetchBannedEmails = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('banned_emails')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching banned emails:', error);
        toast({
          title: "Error",
          description: "Failed to fetch banned emails.",
          variant: "destructive",
        });
        return;
      }

      setBannedEmails(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: BanEmailFormData) => {
    setAddingEmail(true);
    try {
      const { error } = await (supabase as any)
        .from('banned_emails')
        .insert({
          email: data.email.toLowerCase(),
          reason: data.reason,
          banned_by: (await supabase.auth.getUser()).data.user?.id,
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Email Already Banned",
            description: "This email address is already in the banned list.",
            variant: "destructive",
          });
        } else {
          console.error('Error banning email:', error);
          toast({
            title: "Error",
            description: "Failed to ban email address.",
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Email Banned",
        description: "Email address has been successfully banned.",
      });

      form.reset();
      fetchBannedEmails();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setAddingEmail(false);
    }
  };

  const handleUnbanEmail = async (emailId: string) => {
    try {
      const { error } = await (supabase as any)
        .from('banned_emails')
        .delete()
        .eq('id', emailId);

      if (error) {
        console.error('Error unbanning email:', error);
        toast({
          title: "Error",
          description: "Failed to unban email address.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Email Unbanned",
        description: "Email address has been removed from the banned list.",
      });

      fetchBannedEmails();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setShowDeleteDialog(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Banned Email Addresses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading banned emails...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Banned Email Addresses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Banned Email Form */}
          <Card className="card-subtle">
            <CardHeader>
              <CardTitle className="text-lg">Ban New Email Address</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="user@example.com" 
                              type="email"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason for Banning</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Spam, abuse, etc." 
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={addingEmail}
                    className="btn-premium gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Ban Email Address
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Banned Emails List */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Currently Banned ({bannedEmails.length})
            </h3>
            
            {bannedEmails.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-medium mb-2">No banned email addresses</h3>
                <p className="text-muted-foreground">
                  No email addresses have been banned yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {bannedEmails.map((bannedEmail) => (
                  <Card key={bannedEmail.id} className="card-subtle">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Mail className="h-4 w-4 text-destructive" />
                            <span className="font-medium">{bannedEmail.email}</span>
                          </div>
                          
                          {bannedEmail.reason && (
                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>Reason:</strong> {bannedEmail.reason}
                            </p>
                          )}
                          
                          <p className="text-xs text-muted-foreground">
                            Banned on {formatDate(bannedEmail.created_at)}
                          </p>
                        </div>
                        
                        <Button
                          onClick={() => setShowDeleteDialog(bannedEmail.id)}
                          variant="destructive"
                          size="sm"
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Unban
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Unban Email Address
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this email address from the banned list? 
              This will allow users with this email to register again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => showDeleteDialog && handleUnbanEmail(showDeleteDialog)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Unban Email
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BannedEmailsManagement;