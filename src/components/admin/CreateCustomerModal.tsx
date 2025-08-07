import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
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
  password: z.string().min(6, "Password must be at least 6 characters"),
  company: z.string().optional(),
  phone: z.string().optional(),
  website_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  plan_name: z.string().min(1, "Plan name is required"),
  plan_price: z.string().min(1, "Plan price is required"),
  payment_amount: z.string().min(1, "Payment amount is required"),
  next_payment_date: z.string().optional(),
  jobs_completed: z.string().min(0, "Jobs completed must be 0 or greater"),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CreateCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateCustomerModal = ({ open, onClose, onSuccess }: CreateCustomerModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      company: "",
      phone: "",
      website_url: "",
      plan_name: "Basic",
      plan_price: "99.00",
      payment_amount: "99.00",
      next_payment_date: "",
      jobs_completed: "0",
    },
  });

  const onSubmit = async (data: CustomerFormData) => {
    setLoading(true);
    
    try {
      // First, create the auth user using regular signup
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        toast({
          title: "Error",
          description: "Failed to create user account: " + authError.message,
          variant: "destructive",
        });
        return;
      }

      if (!authData.user) {
        toast({
          title: "Error",
          description: "Failed to create user account.",
          variant: "destructive",
        });
        return;
      }

      // Create user profile
      const { error: profileError } = await supabase.rpc('create_user_profile', {
        user_id_param: authData.user.id,
        full_name_param: data.name,
        role_param: 'customer'
      });

      if (profileError) {
        console.error('Profile error:', profileError);
        // Don't return here, still try to create customer record
      }

      // Create customer record with the auth user ID
      const { error: customerError } = await supabase.rpc('create_customer_bypassing_rls', {
        p_user_id: authData.user.id,
        p_name: data.name,
        p_email: data.email,
        p_company: data.company || null
      });

      if (customerError) {
        console.error('Customer error:', customerError);
        toast({
          title: "Error",
          description: "Failed to create customer record: " + customerError.message,
          variant: "destructive",
        });
        return;
      }

      // Update customer with additional fields
      const { error: updateError } = await supabase
        .from('customers')
        .update({
          phone: data.phone || null,
          website_url: data.website_url || null,
          plan_name: data.plan_name,
          plan_price: parseFloat(data.plan_price),
          payment_amount: parseFloat(data.payment_amount),
          next_payment_date: data.next_payment_date || null,
          jobs_completed: parseInt(data.jobs_completed),
          approval_status: 'approved', // Admin-created customers are auto-approved
        })
        .eq('user_id', authData.user.id);

      if (updateError) {
        console.error('Update error:', updateError);
        // Don't fail the whole process for this
      }

      toast({
        title: "Customer Created Successfully",
        description: `Customer account created for ${data.name}. They can now login with email: ${data.email}`,
      });

      // Send Discord notification
      try {
        await supabase.functions.invoke('send-discord-notification', {
          body: {
            eventType: 'admin_action',
            data: {
              action: 'Customer Created',
              adminEmail: user.email,
              details: `New customer: ${data.name} (${data.email})`,
              customerName: data.name,
              customerEmail: data.email,
              company: data.company || 'Not specified',
              planName: data.plan_name,
              planPrice: data.plan_price
            }
          }
        });
      } catch (discordError) {
        console.error('Failed to send Discord notification:', discordError);
      }

      form.reset();
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
          <DialogTitle>Add New Customer</DialogTitle>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
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

              <FormField
                control={form.control}
                name="jobs_completed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jobs Completed</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
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
                Create Customer
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomerModal;