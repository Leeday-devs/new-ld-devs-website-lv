import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Loader2 } from "lucide-react";
interface PaymentButtonProps {
  className?: string;
  stripeProductId?: string;
  serviceName?: string;
  amount?: number;
  paymentLink?: string;
}
export const PaymentButton = ({
  className,
  stripeProductId,
  serviceName = "Quick Purchase",
  amount = 2000,
  paymentLink
}: PaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handlePayment = async () => {
    setLoading(true);
    
    // If a payment link is provided, redirect directly to it
    if (paymentLink) {
      window.open(paymentLink, '_blank');
      setLoading(false);
      return;
    }
    
    // Otherwise, use the existing Stripe API integration
    const requestBody: any = {
      serviceName: serviceName,
      type: stripeProductId ? 'full' : 'deposit',
      customerInfo: {
        fullName: "Guest User",
        email: "guest@ldevelopment.co.uk",
        phone: null,
        company: null
      },
      successUrl: `${window.location.origin}/business-details?session_id={CHECKOUT_SESSION_ID}&template=${encodeURIComponent(serviceName)}`,
      cancelUrl: `${window.location.origin}/payment-canceled`
    };

    // Add Stripe product ID if provided, otherwise use amount
    if (stripeProductId && !stripeProductId.includes("YOUR_STRIPE_PRODUCT_ID")) {
      requestBody.stripeProductKey = stripeProductId;
    } else {
      requestBody.amount = amount;
    }
    
    console.log('Sending payment request with body:', requestBody);
    
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('create-payment', {
        body: requestBody
      });
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