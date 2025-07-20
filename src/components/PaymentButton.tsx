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
    <div className="text-center space-y-4">
      {/* Price Display */}
      <div className="space-y-2">
        <div className="text-5xl font-bold text-white">£300</div>
        <div className="text-white/80">
          <span className="line-through text-red-300 mr-2">£500</span>
          <span className="text-sm">Limited Time!</span>
        </div>
      </div>

      {/* Limited Time Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-400/30 text-red-100 rounded-full text-sm font-medium animate-pulse">
        <Clock className="h-4 w-4" />
        Limited Time Only!
      </div>
      
      {/* Main CTA Button */}
      <Button
        onClick={() => {
          console.log('BUTTON CLICKED!');
          handlePayment();
        }}
        disabled={loading}
        className="w-full bg-white text-gray-900 hover:bg-gray-100 border-0 rounded-xl py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <CreditCard className="h-5 w-5" />
            Build My Website
          </div>
        )}
      </Button>

      {/* Secondary Action */}
      <Button
        variant="outline"
        className="w-full border-white/30 text-white hover:bg-white/10 rounded-xl py-3"
        size="lg"
      >
        💬 Chat with Us
      </Button>
    </div>
  );
};