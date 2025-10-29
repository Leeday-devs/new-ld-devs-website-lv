import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Mail,
  Plus,
  Trash2,
  Edit,
  Loader2,
  Search,
  Shield,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Copy
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AdminUser {
  id: string;
  full_name: string | null;
  role: string | null;
  email: string;
  user_id: string;
  created_at: string;
  last_activity: string | null;
}

export function TeamManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminRole, setNewAdminRole] = useState("moderator");

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    filterAdmins();
  }, [admins, searchTerm, roleFilter]);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      // Fetch profiles with admin roles
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .in('role', ['admin', 'moderator', 'viewer'])
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Convert to AdminUser format
      const adminUsers: AdminUser[] = (data || []).map(profile => ({
        id: profile.id,
        full_name: profile.full_name,
        role: profile.role,
        email: '', // Will need to fetch from auth
        user_id: profile.user_id,
        created_at: profile.created_at,
        last_activity: null
      }));

      setAdmins(adminUsers);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admin team.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterAdmins = () => {
    let filtered = admins;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(admin =>
        admin.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter(admin => admin.role === roleFilter);
    }

    setFilteredAdmins(filtered);
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);
    try {
      // Create user with email
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newAdminEmail,
        password: Math.random().toString(36).slice(-12), // Random temp password
        email_confirm: true,
      });

      if (authError) {
        if (authError.message.includes('already exists')) {
          toast({
            title: "Error",
            description: "This email is already registered.",
            variant: "destructive",
          });
        } else {
          throw authError;
        }
        setIsAdding(false);
        return;
      }

      // Create profile with role
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: authData.user.id,
            full_name: newAdminName || newAdminEmail.split('@')[0],
            role: newAdminRole,
          });

        if (profileError) throw profileError;

        toast({
          title: "Success",
          description: `Admin "${newAdminName || newAdminEmail}" added with ${newAdminRole} role.`,
        });

        // Reset form
        setNewAdminEmail("");
        setNewAdminName("");
        setNewAdminRole("moderator");

        await fetchAdmins();
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      toast({
        title: "Error",
        description: "Failed to add admin. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateRole = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: editRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin role updated.",
      });

      setEditingId(null);
      await fetchAdmins();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update role.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveAdmin = async (userId: string) => {
    try {
      // Don't allow deleting own account
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user?.id === userId) {
        toast({
          title: "Error",
          description: "You cannot remove yourself from the team.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ role: null })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin removed from team.",
      });

      setDeleteConfirm(null);
      await fetchAdmins();
    } catch (error) {
      console.error('Error removing admin:', error);
      toast({
        title: "Error",
        description: "Failed to remove admin.",
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeColor = (role: string | null) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string | null) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-3 w-3" />;
      case 'moderator':
        return <User className="h-3 w-3" />;
      case 'viewer':
        return <User className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Full access to all features and settings';
      case 'moderator':
        return 'Can manage content, customers, and moderate';
      case 'viewer':
        return 'Read-only access to dashboard and reports';
      default:
        return 'Unknown role';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading team members...</p>
        </div>
      </div>
    );
  }

  const adminCount = admins.filter(a => a.role === 'admin').length;
  const moderatorCount = admins.filter(a => a.role === 'moderator').length;
  const viewerCount = admins.filter(a => a.role === 'viewer').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage admin team members and their permissions
          </p>
        </div>
      </div>

      {/* Role Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Admin</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{adminCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Full access</p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Moderator</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{moderatorCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Limited access</p>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Viewer</p>
                <p className="text-3xl font-bold text-gray-600 mt-1">{viewerCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Read-only</p>
              </div>
              <AlertCircle className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Admin Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Add Team Member
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-4 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Email *</label>
              <Input
                placeholder="admin@example.com"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                type="email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Name</label>
              <Input
                placeholder="John Doe"
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Role *</label>
              <Select value={newAdminRole} onValueChange={setNewAdminRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleAddAdmin}
                disabled={isAdding}
                className="btn-primary w-full"
              >
                {isAdding ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              💡 New team members will receive an email invitation with login instructions.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Team Members ({filteredAdmins.length})
          </CardTitle>

          <div className="relative flex-1 mt-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>

        <CardContent>
          {filteredAdmins.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No team members found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAdmins.map((admin) => (
                <div
                  key={admin.user_id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{admin.full_name || 'Unnamed'}</h3>
                        <Badge className={getRoleBadgeColor(admin.role)}>
                          {getRoleIcon(admin.role)}
                          <span className="ml-1">{admin.role || 'Unknown'}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{admin.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getRoleDescription(admin.role || 'unknown')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {editingId === admin.user_id ? (
                      <div className="flex gap-2">
                        <Select value={editRole} onValueChange={setEditRole}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          onClick={() => handleUpdateRole(admin.user_id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(admin.user_id);
                            setEditRole(admin.role || '');
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <AlertDialog open={deleteConfirm === admin.user_id} onOpenChange={(open) => {
                          if (!open) setDeleteConfirm(null);
                        }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteConfirm(admin.user_id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <AlertDialogContent>
                            <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove {admin.full_name || admin.email} from the team? They will lose admin access.
                            </AlertDialogDescription>
                            <div className="flex gap-3">
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRemoveAdmin(admin.user_id)}
                                className="bg-red-600"
                              >
                                Remove
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <h4 className="font-semibold">Admin</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Full dashboard access</li>
                  <li>✓ Manage team members</li>
                  <li>✓ Manage all customers</li>
                  <li>✓ Email marketing</li>
                  <li>✓ Settings & configuration</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold">Moderator</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ View dashboard</li>
                  <li>✓ Manage customers</li>
                  <li>✓ Process payments</li>
                  <li>✓ Send emails</li>
                  <li>✗ Manage team</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-gray-600" />
                  <h4 className="font-semibold">Viewer</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ View dashboard</li>
                  <li>✓ View reports</li>
                  <li>✓ View customers</li>
                  <li>✗ Make changes</li>
                  <li>✗ Send emails</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
