import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Package, Calendar, CheckCircle, XCircle, CreditCard, Clock } from "lucide-react";

interface CustomerService {
  id: string;
  service_name: string;
  service_price: number;
  payment_type: string;
  status: string;
  created_at: string;
}

interface CustomerServicesProps {
  customerId: string;
}

const CustomerServices = ({ customerId }: CustomerServicesProps) => {
  const { toast } = useToast();
  const [services, setServices] = useState<CustomerService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customerId) {
      fetchServices();
    }
  }, [customerId]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from('customer_services')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching services:', error);
        toast({
          title: "Error",
          description: "Failed to fetch your services.",
          variant: "destructive",
        });
        return;
      }

      setServices((data as unknown as CustomerService[]) || []);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  const totalMonthlyValue = services
    .filter(service => service.status === 'active' && service.payment_type === 'monthly')
    .reduce((total, service) => total + service.service_price, 0);

  if (loading) {
    return (
      <Card className="card-premium">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your services...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Services Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Monthly Value</p>
                <p className="text-2xl font-bold">{formatCurrency(totalMonthlyValue)}</p>
                <p className="text-sm text-muted-foreground">Active services</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Services</p>
                <p className="text-2xl font-bold">
                  {services.filter(s => s.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">
                  of {services.length} total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services List */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Your Services & Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No services assigned yet</h3>
              <p className="text-muted-foreground">
                Your services and plans will appear here once they're added by our team.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <Card key={service.id} className="card-subtle border-l-4 border-l-primary/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{service.service_name}</h3>
                          <Badge 
                            variant={getStatusVariant(service.status)}
                            className="flex items-center gap-1"
                          >
                            {getStatusIcon(service.status)}
                            {service.status}
                          </Badge>
                          <Badge 
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {service.payment_type === 'monthly' ? (
                              <>
                                <CreditCard className="h-3 w-3" />
                                Monthly
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3" />
                                One-time
                              </>
                            )}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>
                              {formatCurrency(service.service_price)}
                              {service.payment_type === 'monthly' ? '/month' : ''}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Added: {new Date(service.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(service.service_price)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.payment_type === 'monthly' ? 'per month' : 'one-time'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Total Summary */}
              {services.length > 1 && (
                <Card className="card-premium bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">Total Active Services</h3>
                        <p className="text-sm text-muted-foreground">
                          {services.filter(s => s.status === 'active').length} active services
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-primary">
                          {formatCurrency(totalMonthlyValue)}
                        </p>
                        <p className="text-sm text-muted-foreground">total per month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerServices;