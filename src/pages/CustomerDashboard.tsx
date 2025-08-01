import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomerProfileModal from "@/components/CustomerProfileModal";
import ProjectAnalytics from "@/components/customer/ProjectAnalytics";
import NotificationCenter from "@/components/customer/NotificationCenter";
import BillingHistory from "@/components/customer/BillingHistory";
import CustomerServices from "@/components/customer/CustomerServices";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Globe, 
  CreditCard, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  ExternalLink,
  AlertCircle,
  Edit,
  BarChart3,
  Bell,
  FileText,
  Package
} from "lucide-react";

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
}

interface WorkRequest {
  id: string;
  title: string;
  description: string | null;
  notes: string | null;
  status: 'pending' | 'approved' | 'declined' | 'completed';
  hours_logged: number;
  quote_price: number | null;
  requested_at: string;
}

const CustomerDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [workRequests, setWorkRequests] = useState<WorkRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      fetchCustomerData();
    }
  }, [user, loading, navigate]);

  const fetchCustomerData = async () => {
    try {
      // Fetch customer profile
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (customerError) {
        console.error('Error fetching customer data:', customerError);
        toast({
          title: "Access Error",
          description: "Unable to access customer dashboard.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      if (!customerData) {
        toast({
          title: "Access Denied",
          description: "You don't have customer access.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setCustomer(customerData);

      // Fetch work requests
      const { data: requestsData, error: requestsError } = await supabase
        .from('work_requests')
        .select('id, title, description, notes, status, hours_logged, quote_price, requested_at')
        .eq('customer_id', customerData.id)
        .order('requested_at', { ascending: false });

      if (requestsError) {
        console.error('Error fetching work requests:', requestsError);
      } else {
        setWorkRequests((requestsData || []) as any);
      }
    } catch (error) {
      console.error('Error:', error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusIcon = (status: WorkRequest['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'declined': return <XCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: WorkRequest['status']) => {
    switch (status) {
      case 'pending': return 'secondary' as const;
      case 'approved': return 'default' as const;
      case 'declined': return 'destructive' as const;
      case 'completed': return 'secondary' as const;
    }
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

  const handleProfileUpdated = () => {
    setShowEditProfile(false);
    fetchCustomerData();
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <User className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return null;
  }

  const paymentStatus = getPaymentStatus(customer.next_payment_date);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-primary rounded-lg shadow-glow">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">
                  Welcome back, {customer.name}
                </h1>
                <p className="text-muted-foreground">
                  Your customer dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <Card className="card-premium mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
              <Button 
                onClick={() => setShowEditProfile(true)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                  <p className="font-medium">{customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Company</p>
                  <p className="font-medium">{customer.company || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{customer.phone || 'Not specified'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Website</p>
                  {customer.website_url ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(customer.website_url!, '_blank')}
                      className="p-0 h-auto text-primary hover:text-primary/80 font-medium"
                    >
                      {customer.website_url} <ExternalLink className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <p className="font-medium">Not specified</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-premium">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Globe className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Your Website</p>
                    <div className="flex items-center gap-2">
                      {customer.website_url ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(customer.website_url!, '_blank')}
                          className="p-0 h-auto text-primary hover:text-primary/80"
                        >
                          View Site <ExternalLink className="h-4 w-4 ml-1" />
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not set</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Plan</p>
                    <p className="font-semibold">{customer.plan_name}</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(customer.plan_price)}/month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Next Payment</p>
                    <p className="font-semibold">{formatDate(customer.next_payment_date)}</p>
                    <Badge variant={paymentStatus.variant} className="text-xs">
                      {paymentStatus.label}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Jobs Completed</p>
                    <p className="font-semibold">
                      {workRequests.filter(req => req.status === 'completed').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Total completed projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Portal Features */}
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Services
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Requests
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="mt-6">
              <CustomerServices customerId={customer.id} />
            </TabsContent>

            <TabsContent value="requests" className="mt-6">
              <Card className="card-premium">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Your Work Requests
                  </CardTitle>
                  <Button 
                    onClick={() => navigate("/request-work")}
                    className="btn-premium gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    New Request
                  </Button>
                </CardHeader>
                <CardContent>
                  {workRequests.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">No work requests yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Submit your first work request to get started.
                      </p>
                      <Button onClick={() => navigate("/request-work")} className="btn-premium">
                        <Plus className="h-4 w-4 mr-2" />
                        Submit Request
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {workRequests.map((request) => (
                        <Card key={request.id} className="card-subtle">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-lg">{request.title}</h3>
                                  <Badge variant={getStatusVariant(request.status)} className="flex items-center gap-1">
                                    {getStatusIcon(request.status)}
                                    {request.status}
                                  </Badge>
                                </div>
                                
                                {request.description && (
                                  <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                                )}
                                
                                {request.notes && (
                                  <div className="mb-2">
                                    <p className="text-sm font-medium">Notes:</p>
                                    <p className="text-sm text-muted-foreground">{request.notes}</p>
                                  </div>
                                )}
                                
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                  <span>Requested: {new Date(request.requested_at).toLocaleDateString()}</span>
                                  <span>Hours logged: {request.hours_logged}</span>
                                  {request.quote_price && (
                                    <span>Quote: {formatCurrency(request.quote_price)}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <ProjectAnalytics 
                workRequests={workRequests} 
                customerData={{
                  plan_price: customer.plan_price,
                  payment_amount: customer.payment_amount,
                  next_payment_date: customer.next_payment_date
                }}
              />
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <NotificationCenter 
                workRequests={workRequests}
                customerData={{
                  next_payment_date: customer.next_payment_date,
                  plan_name: customer.plan_name
                }}
              />
            </TabsContent>

            <TabsContent value="billing" className="mt-6">
              <BillingHistory 
                customerData={{
                  plan_name: customer.plan_name,
                  plan_price: customer.plan_price,
                  payment_amount: customer.payment_amount,
                  next_payment_date: customer.next_payment_date
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />

      {/* Edit Profile Modal */}
      {customer && (
        <CustomerProfileModal 
          open={showEditProfile}
          onClose={() => setShowEditProfile(false)}
          customer={customer}
          onSuccess={handleProfileUpdated}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;