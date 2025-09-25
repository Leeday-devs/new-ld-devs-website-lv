import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Loader2 } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Dedicated checkout page for pre-built templates (avoids modal issues)
export default function TemplateCheckout() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const name = params.get("name") || "Website Template";
  const productKey = params.get("productKey") || undefined;
  const price = params.get("price") || undefined; // e.g. "£350"

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    businessType: "",
    services: "",
    targetAudience: "",
    preferredColors: "",
    logoDetails: "",
    contentRequirements: "",
    specialFeatures: "",
    launchDate: "",
    socialMedia: "",
    additionalInfo: "",
  });

  useEffect(() => {
    // Basic guard: if no name/productKey provided, send back to templates
    if (!name) {
      navigate("/templates");
    }
  }, [name, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.email || !details.ownerName || !details.businessName || !details.phone) {
      toast({ title: "Missing info", description: "Please fill the required fields.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Notify Discord with business details
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'business_details',
          data: {
            ...details,
            templateName: name,
            templatePrice: price
          }
        }
      });
      if (discordError) console.error('Discord notification error:', discordError);

      // Build payment request
      const requestBody: any = {
        type: 'payment',
        customerInfo: {
          fullName: details.ownerName,
          email: details.email,
          phone: details.phone,
          company: details.businessName,
        },
        successUrl: `${window.location.origin}/payment-success?template=${encodeURIComponent(name)}`,
        cancelUrl: `${window.location.origin}/payment-canceled`,
      };

      if (productKey) {
        requestBody.stripeProductKey = productKey;
        requestBody.serviceName = `${name} Website Template`;
        if (price) requestBody.templatePrice = price;
      } else {
        // fallback if no product key
        const amount = price ? parseInt(price.replace('£', '')) * 100 : 35000;
        requestBody.amount = amount;
        requestBody.serviceName = `${name} Website Template`;
      }

      const { data, error } = await supabase.functions.invoke('create-payment', { body: requestBody });
      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url; // redirect to Stripe in same tab
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast({ title: "Payment Error", description: "Failed to process payment. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`Checkout ${name} | L-Development`}
        description={`Provide your business details to customize the ${name} template, then complete secure payment.`}
        keywords={`checkout, ${name}, website template payment`}
      />
      <Navigation />

      <main className="section-navy">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="heading-primary heading-lg text-white mb-2">Customize & Checkout</h1>
          <p className="text-white/80 mb-8">Template: <span className="text-primary font-semibold">{name}</span>{price ? ` • ${price}` : ''}</p>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-luxury space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Business/Company Name *" value={details.businessName} onChange={(e) => setDetails({ ...details, businessName: e.target.value })} required />
              <Input placeholder="Owner/Manager Name *" value={details.ownerName} onChange={(e) => setDetails({ ...details, ownerName: e.target.value })} required />
              <Input type="email" placeholder="Email Address *" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} required />
              <Input type="tel" placeholder="Phone Number *" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} required />
            </div>

            <Input placeholder="Business Address" value={details.address} onChange={(e) => setDetails({ ...details, address: e.target.value })} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Business Type" value={details.businessType} onChange={(e) => setDetails({ ...details, businessType: e.target.value })} />
              <Input placeholder="Target Audience" value={details.targetAudience} onChange={(e) => setDetails({ ...details, targetAudience: e.target.value })} />
            </div>

            <Textarea placeholder="Services/Products you offer" rows={3} value={details.services} onChange={(e) => setDetails({ ...details, services: e.target.value })} />

            <Input placeholder="Preferred Colors" value={details.preferredColors} onChange={(e) => setDetails({ ...details, preferredColors: e.target.value })} />
            <Textarea placeholder="Logo details" rows={2} value={details.logoDetails} onChange={(e) => setDetails({ ...details, logoDetails: e.target.value })} />

            <Textarea placeholder="Content requirements" rows={3} value={details.contentRequirements} onChange={(e) => setDetails({ ...details, contentRequirements: e.target.value })} />
            <Textarea placeholder="Special features needed" rows={2} value={details.specialFeatures} onChange={(e) => setDetails({ ...details, specialFeatures: e.target.value })} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Desired Launch Date" value={details.launchDate} onChange={(e) => setDetails({ ...details, launchDate: e.target.value })} />
              <Input placeholder="Social Media Links" value={details.socialMedia} onChange={(e) => setDetails({ ...details, socialMedia: e.target.value })} />
            </div>

            <Textarea placeholder="Additional information or special requests" rows={3} value={details.additionalInfo} onChange={(e) => setDetails({ ...details, additionalInfo: e.target.value })} />

            <div className="text-center">
              <Button type="submit" size="lg" className="btn-primary px-8 py-3" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
                {loading ? 'Processing…' : 'Proceed to Payment'}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
