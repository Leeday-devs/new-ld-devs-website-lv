import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Loader2 } from "lucide-react";
interface PaymentButtonProps {
  className?: string;
}
export const PaymentButton = ({
  className
}: PaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const {
    user
  } = useAuth();
  const {
    toast
  } = useToast();
  const handlePayment = async () => {
    console.log('Payment button clicked');
    console.log('User:', user);
    if (!user) {
      console.log('No user found, showing auth error');
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase our service.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('create-payment');
      if (error) {
        throw error;
      }
      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <CreditCard className="mr-2 h-4 w-4" />
      )}
      {loading ? 'Processing...' : 'Buy Now'}
    </Button>
  );
};