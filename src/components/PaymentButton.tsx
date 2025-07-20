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
    <div className="flex flex-col items-center gap-4">
      {/* Price Display */}
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-1">£300</div>
        <div className="text-sm text-muted-foreground mb-2">Then £40/month</div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-lg line-through text-muted-foreground">£500</span>
          <span className="text-2xl font-bold text-primary">£300</span>
        </div>
        <span className="text-sm text-orange-500 font-medium animate-pulse">
          Limited Time Only!
        </span>
      </div>

      {/* Payment Button */}
      <Button
        onClick={() => {
          console.log('BUTTON CLICKED!');
          handlePayment();
        }}
        disabled={loading}
        className={`w-full ${className}`}
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Build MY Website
          </>
        )}
      </Button>

      {/* Chat Button */}
      <Button
        variant="outline"
        className="w-full"
        size="lg"
        onClick={() => window.open('https://wa.me/1234567890', '_blank')}
      >
        💬 Chat with Us
      </Button>
    </div>
  );
};