import SEOHead from "@/components/SEOHead";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const paymentType = searchParams.get('type');
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    // In a real app, you might want to verify the payment on the backend
    if (sessionId) {
      setIsConfirmed(true);
    }
  }, [sessionId]);

  const isDeposit = paymentType === 'deposit';

  return (
    <>
      <SEOHead title="Payment Successful | LD Development" description="Your payment was successful." noindex />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {isDeposit ? 'Deposit Payment Successful!' : 'Payment Successful!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {isDeposit 
                ? "Thank you for your £20 deposit. We'll contact you within 24 hours to discuss your project details."
                : "Thank you for your purchase. Your payment has been processed successfully."
              }
            </p>
            {sessionId && (
              <p className="text-sm text-muted-foreground">
                Transaction ID: {sessionId.slice(-12)}
              </p>
            )}
            {isDeposit && (
              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                <p className="font-semibold mb-2">What happens next:</p>
                <ul className="text-left space-y-1">
                  <li>✓ Your project slot is now secured</li>
                  <li>✓ We'll contact you within 24 hours</li>
                  <li>✓ Discuss project details and timeline</li>
                  <li>✓ Your £20 deposit will be deducted from the final payment</li>
                </ul>
              </div>
            )}
            <div className="pt-4">
              <Button asChild className="w-full">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
