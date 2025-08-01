import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, DollarSign, CreditCard, Calendar } from "lucide-react";

interface CustomerService {
  id: string;
  service_name: string;
  service_price: number;
  payment_type: string;
  status: string;
  created_at: string;
}

interface CustomerServicesModalProps {
  open: boolean;
  onClose: () => void;
  customerId: string;
  customerName: string;
}

const CustomerServicesModal = ({ open, onClose, customerId, customerName }: CustomerServicesModalProps) => {
  const { toast } = useToast();
  const [services, setServices] = useState<CustomerService[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<CustomerService | null>(null);
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [paymentType, setPaymentType] = useState("monthly");

  useEffect(() => {
    if (open && customerId) {
      fetchServices();
    }
  }, [open, customerId]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('customer_services' as any)
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching services:', error);
        toast({
          title: "Error",
          description: "Failed to fetch customer services.",
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

  const handleAddService = async () => {
    if (!serviceName.trim() || !servicePrice) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await (supabase as any)
        .from('customer_services')
        .insert({
          customer_id: customerId,
          service_name: serviceName.trim(),
          service_price: parseFloat(servicePrice),
          payment_type: paymentType,
          status: 'active'
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add service.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Service added successfully!",
      });

      setServiceName("");
      setServicePrice("");
      setShowAddForm(false);
      fetchServices();
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleEditService = async () => {
    if (!editingService || !serviceName.trim() || !servicePrice) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await (supabase as any)
        .from('customer_services')
        .update({
          service_name: serviceName.trim(),
          service_price: parseFloat(servicePrice),
          payment_type: paymentType
        })
        .eq('id', editingService.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update service.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Service updated successfully!",
      });

      setServiceName("");
      setServicePrice("");
      setEditingService(null);
      fetchServices();
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteService = async (serviceId: string, serviceName: string) => {
    if (!confirm(`Are you sure you want to delete "${serviceName}"?`)) {
      return;
    }

    try {
      const { error } = await (supabase as any)
        .from('customer_services')
        .delete()
        .eq('id', serviceId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete service.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Service deleted successfully.",
      });

      fetchServices();
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const toggleServiceStatus = async (serviceId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

    try {
      const { error } = await (supabase as any)
        .from('customer_services')
        .update({ status: newStatus })
        .eq('id', serviceId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update service status.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Service marked as ${newStatus}.`,
      });

      fetchServices();
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

  const startEdit = (service: CustomerService) => {
    setEditingService(service);
    setServiceName(service.service_name);
    setServicePrice(service.service_price.toString());
    setPaymentType(service.payment_type);
    setShowAddForm(false);
  };

  const cancelEdit = () => {
    setEditingService(null);
    setServiceName("");
    setServicePrice("");
    setPaymentType("monthly");
  };

  const startAdd = () => {
    setShowAddForm(true);
    setEditingService(null);
    setServiceName("");
    setServicePrice("");
    setPaymentType("monthly");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Services for {customerName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add/Edit Form */}
          {(showAddForm || editingService) && (
            <Card className="card-subtle">
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input
                    id="serviceName"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="e.g., Web Development, SEO Package"
                  />
                </div>
                <div>
                  <Label htmlFor="servicePrice">Price (£)</Label>
                  <Input
                    id="servicePrice"
                    type="number"
                    step="0.01"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="paymentType">Payment Type</Label>
                  <Select value={paymentType} onValueChange={setPaymentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly Recurring</SelectItem>
                      <SelectItem value="one-time">One-time Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={editingService ? handleEditService : handleAddService}
                    className="btn-premium"
                  >
                    {editingService ? 'Update Service' : 'Add Service'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={editingService ? cancelEdit : () => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Services List */}
          <Card className="card-premium">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Current Services</CardTitle>
              {!showAddForm && !editingService && (
                <Button onClick={startAdd} className="btn-premium gap-2">
                  <Plus className="h-4 w-4" />
                  Add Service
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading services...</p>
                </div>
              ) : services.length === 0 ? (
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No services yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add services to track pricing for this customer.
                  </p>
                  {!showAddForm && (
                    <Button onClick={startAdd} className="btn-premium">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Service
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 bg-accent/5 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium">{service.service_name}</h4>
                          <Badge 
                            variant={service.status === 'active' ? 'default' : 'secondary'}
                            className="cursor-pointer"
                            onClick={() => toggleServiceStatus(service.id, service.status)}
                          >
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
                                <Calendar className="h-3 w-3" />
                                One-time
                              </>
                            )}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(service.service_price)}
                          {service.payment_type === 'monthly' ? '/month' : ''}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Added: {new Date(service.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteService(service.id, service.service_name)}
                          className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerServicesModal;