import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  website_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  plan_name: z.string().min(1, "Plan name is required"),
  plan_price: z.string().min(1, "Plan price is required"),
  payment_amount: z.string().min(1, "Payment amount is required"),
  next_payment_date: z.string().optional(),
});

type CustomerFormData = z.infer<typeof customerSchema>;

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

interface EditCustomerModalProps {
  customer: Customer;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditCustomerModal = ({ customer, open, onClose, onSuccess }: EditCustomerModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: customer.name,
      email: customer.email,
      company: customer.company || "",
      phone: customer.phone || "",
      website_url: customer.website_url || "",
      plan_name: customer.plan_name,
      plan_price: customer.plan_price.toString(),
      payment_amount: customer.payment_amount.toString(),
      next_payment_date: customer.next_payment_date || "",
    },
  });

  const onSubmit = async (data: CustomerFormData) => {
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('customers')
        .update({
          name: data.name,
          email: data.email,
          company: data.company || null,
          phone: data.phone || null,
          website_url: data.website_url || null,
          plan_name: data.plan_name,
          plan_price: parseFloat(data.plan_price),
          payment_amount: parseFloat(data.payment_amount),
          next_payment_date: data.next_payment_date || null,
        })
        .eq('id', customer.id);

      if (error) {
        console.error('Error updating customer:', error);
        toast({
          title: "Error",
          description: "Failed to update customer: " + error.message,
          variant: "destructive",
        });
        return;
      }

      onSuccess();
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plan_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Basic, Premium, Enterprise" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plan_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="99.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="99.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="next_payment_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next Payment Date (Optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="btn-premium">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Customer
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCustomerModal;