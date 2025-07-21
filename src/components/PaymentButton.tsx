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
  return <div className="space-y-3">
      {/* Limited Time Badge */}
      
      
      {/* Crossed out price */}
      

      {/* Payment Button */}
      <Button onClick={() => {
      console.log('BUTTON CLICKED!');
      handlePayment();
    }} disabled={loading} className={`w-full bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-xl font-semibold shadow-lg border-0 ${className}`}>
        {loading ? <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </> : <>
            <CreditCard className="mr-2 h-4 w-4" />
            Build MY Website
          </>}
      </Button>
    </div>;
};