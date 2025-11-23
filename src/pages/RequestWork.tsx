import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, ArrowLeft } from "lucide-react";

const requestSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  notes: z.string().optional(),
});

type RequestFormData = z.infer<typeof requestSchema>;

const RequestWork = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      title: "",
      description: "",
      notes: "",
    },
  });

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
      const { data: customerData, error } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching customer data:', error);
        toast({
          title: "Access Error",
          description: "Unable to access work request form.",
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

      setCustomerId(customerData.id);
    } catch (error) {
      console.error('Error:', error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: RequestFormData) => {
    if (!customerId) return;
    
    setSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('work_requests')
        .insert({
          customer_id: customerId,
          title: data.title,
          description: data.description,
          notes: data.notes || null,
          status: 'pending',
        });

      if (error) {
        console.error('Error submitting request:', error);
        toast({
          title: "Error",
          description: "Failed to submit work request: " + error.message,
          variant: "destructive",
        });
        return;
      }

      // Send Discord notification
      try {
        await supabase.functions.invoke('send-discord-notification', {
          body: {
            eventType: 'work_request',
            data: {
              customerEmail: user?.email,
              customerName: user?.user_metadata?.full_name || user?.email,
              title: data.title,
              description: data.description.substring(0, 200) + (data.description.length > 200 ? '...' : ''),
              notes: data.notes
            }
          }
        });
      } catch (discordError) {
        // Fail silently for Discord notifications
        console.error('Failed to send Discord notification:', discordError);
      }

      toast({
        title: "Success",
        description: "Your work request has been submitted successfully!",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Send className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading work request form...</p>
        </div>
      </div>
    );
  }

  if (!customerId) {
    return null;
  }

  return (
    <>
      <SEOHead 
        title="Submit Work Request - LD Development Customer Portal"
        description="Submit a new work request through our customer portal. Get professional web development services with transparent project management and secure communication."
        keywords="work request, customer portal, web development services, project management, LD Development"
        url="https://leeday.uk/request-work"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-primary rounded-lg shadow-glow">
                <Send className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">
                  Submit Work Request
                </h1>
                <p className="text-muted-foreground">
                  Tell us about the work you need completed
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Work Request Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Request Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Brief summary of what you need (e.g., 'Update contact page')"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a detailed description of the work you need completed. Include any specific requirements, deadlines, or preferences."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional information, context, or special instructions."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="btn-premium"
                    >
                      {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Submit Request
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

        <Footer />
      </div>
    </>
  );
};

export default RequestWork;