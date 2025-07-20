import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Loader2, Clock } from "lucide-react";

interface PaymentButtonProps {
  className?: string;
}

export const PaymentButton = ({ className }: PaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePayment = async () => {
    console.log('Payment button clicked');
    console.log('User:', user);
    
    if (!user) {
      console.log('No user found, showing auth error');
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase our service.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment');
      
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
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      {/* Limited Time Offer Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-3 animate-pulse">
        <Clock className="h-4 w-4" />
        Limited Time Only!
      </div>
      
      <Button
        onClick={() => {
          console.log('BUTTON CLICKED!');
          handlePayment();
        }}
        disabled={loading}
        className={className}
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Build My Website</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="line-through text-red-300 text-sm">£500</span>
              <span className="text-lg font-bold">£300</span>
            </div>
          </div>
        )}
      </Button>
    </div>
  );
};