import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, ExternalLink, Calendar, DollarSign, Trash2, Settings, KeyRound, CheckCircle } from "lucide-react";
import CreateCustomerModal from "./CreateCustomerModal";
import EditCustomerModal from "./EditCustomerModal";
import CustomerServicesModal from "./CustomerServicesModal";
import PasswordResetDialog from "./PasswordResetDialog";

interface Customer {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  website_url: string | null;
  plan_name: string;
  plan_price: number;
  payment_amount: number;
  next_payment_date: string | null;
  jobs_completed: number;
  created_at: string;
}

const CustomersManagement = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [servicesCustomer, setServicesCustomer] = useState<Customer | null>(null);
  const [resetPasswordCustomer, setResetPasswordCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching customers:', error);
        toast({
          title: "Error",
          description: "Failed to fetch customers.",
          variant: "destructive",
        });
        return;
      } else {
        // Add fallback for jobs_completed if it doesn't exist yet
        const customersWithFallback = (data || []).map(customer => ({
          ...customer,
          jobs_completed: (customer as any).jobs_completed || 0
        })) as Customer[];
        setCustomers(customersWithFallback);
      }
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

  const handleCustomerCreated = () => {
    setShowCreateModal(false);
    fetchCustomers();
    toast({
      title: "Success",
      description: "Customer created successfully!",
    });
  };

  const handleCustomerUpdated = () => {
    setEditingCustomer(null);
    fetchCustomers();
    toast({
      title: "Success",
      description: "Customer updated successfully!",
    });
  };

  const handleDeleteCustomer = async (customerId: string, customerName: string) => {
    if (!confirm(`Are you sure you want to delete ${customerName}? This action cannot be undone and will also delete all associated work requests.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete customer.",
          variant: "destructive",
        });
        return;
      }

      fetchCustomers();
      toast({
        title: "Success",
        description: "Customer deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  const getPaymentStatus = (nextPaymentDate: string | null) => {
    if (!nextPaymentDate) return { label: 'No date set', variant: 'secondary' as const };
    
    const today = new Date();
    const paymentDate = new Date(nextPaymentDate);
    const diffTime = paymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { label: 'Overdue', variant: 'destructive' as const };
    if (diffDays <= 7) return { label: 'Due soon', variant: 'default' as const };
    return { label: 'Current', variant: 'secondary' as const };
  };

  const handleMarkAsPaid = async (customer: Customer) => {
    try {
      const baseDate = customer.next_payment_date ? new Date(customer.next_payment_date) : new Date();
      const newDate = new Date(baseDate);
      newDate.setMonth(newDate.getMonth() + 1);
      const isoDate = newDate.toISOString().slice(0, 10);

      const { error } = await supabase
        .from('customers')
        .update({
          next_payment_date: isoDate,
          payment_amount: customer.plan_price,
        })
        .eq('id', customer.id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to mark as paid.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Marked as paid',
        description: `Next payment set to ${newDate.toLocaleDateString()}`,
      });

      fetchCustomers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };
  if (loading) {
    return (
      <Card className="card-premium">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading customers...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="card-premium">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Customers Management
          </CardTitle>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="btn-premium gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </CardHeader>
        <CardContent>
          {customers.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No customers yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by adding your first customer to track their projects and payments.
              </p>
              <Button onClick={() => setShowCreateModal(true)} className="btn-premium">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {customers.map((customer) => {
                const paymentStatus = getPaymentStatus(customer.next_payment_date);
                
                return (
                  <Card key={customer.id} className="card-subtle">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{customer.name}</h3>
                            <Badge variant="outline">{customer.plan_name}</Badge>
                            <Badge variant={paymentStatus.variant}>
                              {paymentStatus.label}
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>{customer.email}</p>
                            {customer.company && <p>{customer.company}</p>}
                            {customer.phone && <p>{customer.phone}</p>}
                          </div>
                          
                          <div className="flex flex-wrap gap-4 mt-3 text-sm">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{formatCurrency(customer.payment_amount)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Next: {formatDate(customer.next_payment_date)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {customer.website_url && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(customer.website_url!, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setServicesCustomer(customer)}
                            title="Manage Services"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setResetPasswordCustomer(customer)}
                            title="Reset Password"
                          >
                            <KeyRound className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="btn-premium gap-1"
                            onClick={() => handleMarkAsPaid(customer)}
                            title="Mark as Paid"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Mark Paid
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingCustomer(customer)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCustomer(customer.id, customer.name)}
                            className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <CreateCustomerModal 
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCustomerCreated}
      />

      {editingCustomer && (
        <EditCustomerModal 
          customer={editingCustomer}
          open={!!editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onSuccess={handleCustomerUpdated}
        />
      )}

      {servicesCustomer && (
        <CustomerServicesModal 
          open={!!servicesCustomer}
          onClose={() => setServicesCustomer(null)}
          customerId={servicesCustomer.id}
          customerName={servicesCustomer.name}
        />
      )}

      {resetPasswordCustomer && (
        <PasswordResetDialog 
          open={!!resetPasswordCustomer}
          onClose={() => setResetPasswordCustomer(null)}
          customerEmail={resetPasswordCustomer.email}
          customerName={resetPasswordCustomer.name}
        />
      )}
    </>
  );
};

export default CustomersManagement;