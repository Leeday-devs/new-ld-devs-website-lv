import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
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
    toast
  } = useToast();
  const handlePayment = async () => {
    console.log('Payment button clicked');
    setLoading(true);
    
    const requestBody = {
      amount: 2000, // £20 in pence
      serviceName: "Quick Purchase",
      type: 'deposit',
      customerInfo: {
        fullName: "Guest User",
        email: "guest@ldevelopment.co.uk",
        phone: null,
        company: null
      },
      successUrl: `${window.location.origin}/business-details?session_id={CHECKOUT_SESSION_ID}&template=Quick Purchase`,
      cancelUrl: `${window.location.origin}/payment-canceled`
    };
    
    console.log('Sending payment request with body:', requestBody);
    
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('create-payment', {
        body: requestBody
      });
      
      console.log('Payment response:', { data, error });
      
      if (error) {
        throw error;
      }
      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Payment error:', error);
      // Error popup removed as requested
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