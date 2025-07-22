
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, Banknote, Shield, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CustomerInfoForm } from "@/components/CustomerInfoForm";

interface Service {
  title: string;
  description: string;
  features: string[];
  price: string;
  monthlyPrice: string;
  gradient: string;
  popular: boolean;
  pricingFeatures: string[];
  icon: any;
  isMonthlyOnly?: boolean;
}

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export const PricingModal = ({ isOpen, onClose, service }: PricingModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const { toast } = useToast();

  if (!service) return null;

  const handleCustomerInfoSubmit = (info: any) => {
    setCustomerInfo(info);
    handleDepositPayment(info);
  };

  const handleDepositPayment = async (info: any) => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: 2000, // £20 in pence
          serviceName: service.title,
          type: 'deposit',
          customerInfo: info
        }
      });

      if (error) {
        console.error('Payment error:', error);
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to Payment",
          description: "Please complete your payment in the new tab.",
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      // Error popup removed as requested
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayNowClick = () => {
    setShowCustomerForm(true);
  };

  const isCustomPricing = service.price === "Custom";
  const isMonthlyOnly = service.isMonthlyOnly;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <service.icon className="h-6 w-6 text-primary" />
            {service.title}
            {service.popular && (
              <Badge className="bg-orange-500 text-white">⭐ Popular</Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-base">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information Form */}
          {showCustomerForm ? (
            <CustomerInfoForm 
              onSubmit={handleCustomerInfoSubmit}
              isLoading={isProcessing}
              serviceName={service.title}
            />
          ) : (
            <>
              {/* Service Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.pricingFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

          {/* Payment Plans - Only show for non-monthly and non-custom services */}
          {!isCustomPricing && !isMonthlyOnly && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Options</CardTitle>
                <CardDescription>
                  Choose the payment plan that works best for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pay in Full */}
                  <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="h-5 w-5 text-green-500" />
                      <h4 className="font-semibold">Pay in Full</h4>
                      <Badge variant="secondary" className="text-xs">Save 5%</Badge>
                    </div>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      £{Math.round(parseInt(service.price.replace('£', '')) * 0.95)}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      One payment, 5% discount applied
                    </p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Immediate project start</li>
                      <li>• 5% discount included</li>
                      <li>• Priority support</li>
                    </ul>
                  </div>

                  {/* Split Payment */}
                  <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Banknote className="h-5 w-5 text-blue-500" />
                      <h4 className="font-semibold">Split Payment</h4>
                      <Badge variant="outline" className="text-xs">Most Popular</Badge>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mb-2">
                      {service.price}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Two payments of £{Math.round(parseInt(service.price.replace('£', '')) / 2)} each
                    </p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• 50% before work starts</li>
                      <li>• 50% when completed</li>
                      <li>• Easier on your budget</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Deposit Information */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Secure Your Spot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">£20</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Refundable Deposit</h4>
                    <p className="text-sm text-muted-foreground">
                      Pay a small £20 deposit to secure your project slot. This amount is fully refundable 
                      and will be deducted from your final payment.
                    </p>
                  </div>
                </div>

                <div className="bg-background rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">What happens next:</span>
                  </div>
                  <ul className="text-sm space-y-1 ml-6 text-muted-foreground">
                    <li>1. Pay £20 deposit to reserve your spot</li>
                    <li>2. We'll contact you within 24 hours to discuss details</li>
                    <li>3. Choose your preferred payment plan</li>
                    <li>4. Deposit is deducted from final payment</li>
                    <li>5. Get your amazing {service.title.toLowerCase()}!</li>
                  </ul>
                </div>

                {isMonthlyOnly ? (
                  <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      This is a monthly service billed at {service.price}. Contact us to get started.
                    </p>
                    <Button 
                      onClick={handlePayNowClick}
                      disabled={isProcessing}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Shield className="mr-2 h-5 w-5" />
                          Pay £20 Deposit Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                ) : !isCustomPricing ? (
                  <Button 
                    onClick={handlePayNowClick}
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Shield className="mr-2 h-5 w-5" />
                        Pay £20 Deposit Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      This service requires a custom quote. Contact us to discuss your specific needs.
                    </p>
                    <Button 
                      onClick={handlePayNowClick}
                      disabled={isProcessing}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Shield className="mr-2 h-5 w-5" />
                          Pay £20 Deposit Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}

                <p className="text-xs text-center text-muted-foreground">
                  Secure payment processed by Stripe. Your deposit is fully protected and refundable.
                </p>
              </div>
            </CardContent>
          </Card>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
