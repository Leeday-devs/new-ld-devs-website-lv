import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Check, 
  X, 
  Clock, 
  User, 
  Mail, 
  Building, 
  Phone, 
  Globe,
  AlertTriangle 
} from "lucide-react";
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

interface PendingCustomer {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  website_url: string | null;
  plan_name: string;
  plan_price: number;
  approval_status: 'pending' | 'approved' | 'declined';
  created_at: string;
}

const PendingCustomersManagement = () => {
  const { toast } = useToast();
  const [pendingCustomers, setPendingCustomers] = useState<PendingCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showDeclineDialog, setShowDeclineDialog] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingCustomers();
  }, []);

  const fetchPendingCustomers = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('customers')
        .select('id, name, email, company, phone, website_url, plan_name, plan_price, approval_status, created_at')
        .eq('approval_status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pending customers:', error);
        toast({
          title: "Error",
          description: "Failed to fetch pending customers.",
          variant: "destructive",
        });
        return;
      }

      setPendingCustomers(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveCustomer = async (customerId: string) => {
    setActionLoading(customerId);
    try {
      // Find the customer to get their details
      const customer = pendingCustomers.find(c => c.id === customerId);
      if (!customer) {
        toast({
          title: "Error",
          description: "Customer not found.",
          variant: "destructive",
        });
        return;
      }

      // Update customer status
      const { error } = await (supabase as any)
        .from('customers')
        .update({
          approval_status: 'approved',
          approved_at: new Date().toISOString(),
          approved_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .eq('id', customerId);

      if (error) {
        console.error('Error approving customer:', error);
        toast({
          title: "Error",
          description: "Failed to approve customer.",
          variant: "destructive",
        });
        return;
      }

      // Send approval email
      try {
        await supabase.functions.invoke('send-approval-email', {
          body: {
            customerEmail: customer.email,
            customerName: customer.name,
            status: 'approved'
          }
        });
      } catch (emailError) {
        console.error('Error sending approval email:', emailError);
        // Don't fail the approval if email fails
      }

      toast({
        title: "Success",
        description: `${customer.name} has been approved and notified via email.`,
      });

      fetchPendingCustomers();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeclineCustomer = async (customerId: string) => {
    setActionLoading(customerId);
    try {
      // Find the customer to get their details
      const customer = pendingCustomers.find(c => c.id === customerId);
      if (!customer) {
        toast({
          title: "Error",
          description: "Customer not found.",
          variant: "destructive",
        });
        return;
      }

      // Update customer status
      const { error } = await (supabase as any)
        .from('customers')
        .update({
          approval_status: 'declined',
          approved_at: new Date().toISOString(),
          approved_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .eq('id', customerId);

      if (error) {
        console.error('Error declining customer:', error);
        toast({
          title: "Error",
          description: "Failed to decline customer.",
          variant: "destructive",
        });
        return;
      }

      // Send decline email
      try {
        await supabase.functions.invoke('send-approval-email', {
          body: {
            customerEmail: customer.email,
            customerName: customer.name,
            status: 'declined',
            reason: 'After review, we are unable to approve your registration at this time.'
          }
        });
      } catch (emailError) {
        console.error('Error sending decline email:', emailError);
        // Don't fail the decline if email fails
      }

      toast({
        title: "Customer Declined",
        description: `${customer.name} has been declined and notified via email.`,
      });

      fetchPendingCustomers();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setActionLoading(null);
      setShowDeclineDialog(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Pending Customer Approvals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading pending customers...</p>
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
            <Clock className="h-5 w-5 text-primary" />
            Pending Customer Approvals
            {pendingCustomers.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pendingCustomers.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Check className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-medium mb-2">No pending approvals</h3>
              <p className="text-muted-foreground">
                All customer registrations have been reviewed.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingCustomers.map((customer) => (
                <Card key={customer.id} className="card-subtle">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-gradient-primary rounded-lg">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{customer.name}</h3>
                            <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                              <Clock className="h-3 w-3" />
                              Pending Approval
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{customer.email}</span>
                          </div>
                          
                          {customer.company && (
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              <span>{customer.company}</span>
                            </div>
                          )}
                          
                          {customer.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{customer.phone}</span>
                            </div>
                          )}
                          
                          {customer.website_url && (
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <a 
                                href={customer.website_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 truncate"
                              >
                                {customer.website_url}
                              </a>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Plan:</span>
                            <span>{customer.plan_name} - {formatCurrency(customer.plan_price)}/month</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Registered:</span>
                            <span>{formatDate(customer.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApproveCustomer(customer.id)}
                          disabled={actionLoading === customer.id}
                          className="btn-premium gap-2"
                        >
                          <Check className="h-4 w-4" />
                          Approve
                        </Button>
                        
                        <Button
                          onClick={() => setShowDeclineDialog(customer.id)}
                          disabled={actionLoading === customer.id}
                          variant="destructive"
                          className="gap-2"
                        >
                          <X className="h-4 w-4" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!showDeclineDialog} onOpenChange={() => setShowDeclineDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Decline Customer Registration
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to decline this customer's registration? This action cannot be undone.
              The customer will not be able to access their dashboard until approved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => showDeclineDialog && handleDeclineCustomer(showDeclineDialog)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Decline Customer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PendingCustomersManagement;