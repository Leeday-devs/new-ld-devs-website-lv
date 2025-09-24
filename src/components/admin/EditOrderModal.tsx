import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface OrderForm {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  customer_company: string | null;
  customer_website_url: string | null;
  customer_project_goals: string | null;
  customer_timeline: string | null;
  customer_add_hosting: boolean | null;
  service_name: string;
  amount: number;
  status: string;
  stripe_session_id: string | null;
  created_at: string;
  updated_at: string;
}

interface EditOrderModalProps {
  order: OrderForm | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function EditOrderModal({ order, isOpen, onClose, onSaved }: EditOrderModalProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<OrderForm>>({});

  useEffect(() => {
    if (order) {
      setFormData({
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        customer_phone: order.customer_phone,
        customer_company: order.customer_company,
        customer_website_url: order.customer_website_url,
        customer_project_goals: order.customer_project_goals,
        customer_timeline: order.customer_timeline,
        customer_add_hosting: order.customer_add_hosting,
        service_name: order.service_name,
        amount: order.amount,
        status: order.status,
      });
    }
  }, [order]);

  if (!order) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('orders')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Order updated successfully.",
      });

      onSaved();
      onClose();
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof OrderForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer_name">Full Name *</Label>
                <Input
                  id="customer_name"
                  value={formData.customer_name || ''}
                  onChange={(e) => handleInputChange('customer_name', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="customer_email">Email *</Label>
                <Input
                  id="customer_email"
                  type="email"
                  value={formData.customer_email || ''}
                  onChange={(e) => handleInputChange('customer_email', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="customer_phone">Phone</Label>
                <Input
                  id="customer_phone"
                  value={formData.customer_phone || ''}
                  onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="customer_company">Company</Label>
                <Input
                  id="customer_company"
                  value={formData.customer_company || ''}
                  onChange={(e) => handleInputChange('customer_company', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="customer_website_url">Website URL</Label>
                <Input
                  id="customer_website_url"
                  type="url"
                  value={formData.customer_website_url || ''}
                  onChange={(e) => handleInputChange('customer_website_url', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">Project Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer_project_goals">Project Goals</Label>
                <Select
                  value={formData.customer_project_goals || ''}
                  onValueChange={(value) => handleInputChange('customer_project_goals', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project goals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-website">New Website</SelectItem>
                    <SelectItem value="redesign">Redesign</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="ai-tools">AI Tools</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="customer_timeline">Timeline</Label>
                <Select
                  value={formData.customer_timeline || ''}
                  onValueChange={(value) => handleInputChange('customer_timeline', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="1-2-weeks">1–2 weeks</SelectItem>
                    <SelectItem value="1-month-plus">1 month+</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="customer_add_hosting"
                checked={formData.customer_add_hosting || false}
                onCheckedChange={(checked) => handleInputChange('customer_add_hosting', checked)}
              />
              <Label 
                htmlFor="customer_add_hosting" 
                className="text-sm font-normal cursor-pointer"
              >
                Add hosting & maintenance (£40/month)
              </Label>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">Order Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service_name">Service Name</Label>
                <Input
                  id="service_name"
                  value={formData.service_name || ''}
                  onChange={(e) => handleInputChange('service_name', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="amount">Amount (in pence)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount || 0}
                  onChange={(e) => handleInputChange('amount', parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Current value: £{((formData.amount || 0) / 100).toFixed(2)}
                </p>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status || ''}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inquiry">Inquiry</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}