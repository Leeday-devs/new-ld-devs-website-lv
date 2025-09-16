import { memo, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MobileOptimizedNavigation from "@/components/MobileOptimizedNavigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { CustomerInfoForm } from "@/components/CustomerInfoForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const useQuery = () => new URLSearchParams(useLocation().search);

const Checkout = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceName = query.get("serviceName") || "Quick Purchase";
  const amount = parseInt(query.get("amount") || "2000", 10);
  const paymentLink = query.get("paymentLink") || undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async (customerInfo: any) => {
    setIsSubmitting(true);
    try {
      // Save inquiry in orders for traceability
      const { error: dbError } = await supabase.from('orders').insert({
        customer_name: customerInfo.fullName,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_company: customerInfo.company,
        service_name: serviceName,
        amount: amount || 2000,
        status: 'inquiry'
      });

      if (dbError) throw dbError;

      // If we have a direct Stripe Payment Link, open it
      if (paymentLink) {
        window.open(paymentLink, '_blank');
        toast({ title: "Redirecting to Payment", description: "Opening Stripe checkout in a new tab..." });
        return;
      }

      // Else create a Stripe Checkout Session via our Edge Function
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: amount || 2000,
          serviceName,
          type: 'deposit',
          customerInfo: {
            fullName: customerInfo.fullName,
            email: customerInfo.email,
            phone: customerInfo.phone,
            company: customerInfo.company
          },
          successUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/payment-canceled`
        }
      });

      if (paymentError) throw paymentError;
      if (paymentData?.url) {
        window.open(paymentData.url, '_blank');
        toast({ title: "Redirecting to Payment", description: "Opening Stripe checkout in a new tab..." });
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({ title: "Error", description: error.message || "Failed to submit information. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead 
        title={`Checkout - ${serviceName}`}
        description={`Provide your details to get started with ${serviceName}. Secure payments via Stripe.`}
        keywords={`checkout, stripe, ${serviceName}`}
        url={`${window.location.origin}/checkout`}
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Pricing', url: '/pricing' }, { name: 'Checkout', url: '/checkout' }]}
      />
      <div className="min-h-screen">
        <MobileOptimizedNavigation />
        <main className="pt-24 pb-16 container mx-auto px-6 max-w-3xl">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-serif font-bold text-white">Checkout</h1>
            <p className="text-white/80 mt-2">You're getting started with <span className="text-orange font-semibold">{serviceName}</span></p>
          </header>
          <section aria-label="Customer information">
            <CustomerInfoForm serviceName={serviceName} onSubmit={handleFormSubmit} isLoading={isSubmitting} />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default memo(Checkout);
