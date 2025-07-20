import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Loader2 } from "lucide-react";

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
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm line-through text-muted-foreground">£500</span>
            <span className="font-bold text-lg">£300</span>
          </div>
          <span className="text-xs text-orange-500 font-medium">Limited Time Only!</span>
          <div className="flex items-center gap-2 mt-1">
            <CreditCard className="h-4 w-4" />
            <span>Build My Website</span>
          </div>
        </div>
      )}
    </Button>
  );
};