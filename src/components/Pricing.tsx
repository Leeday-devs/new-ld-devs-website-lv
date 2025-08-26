import { CheckCircle, Star, Crown, Code, ShoppingCart, Server, Smartphone, Brain, Monitor } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomerInfoForm } from "@/components/CustomerInfoForm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState('websites');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: 'websites', label: 'Websites', icon: Monitor },
    { id: 'ai', label: 'AI Automations', icon: Brain },
    { id: 'mobile', label: 'Apps', icon: Smartphone },
    { id: 'software', label: 'Hosting', icon: Code }
  ];

  const allPlans = {
    websites: [
      {
        id: 1,
        name: "Starter",
        icon: Code,
        description: "Perfect for small businesses and personal brands",
        price: "£500",
        monthlyPrice: "£40",
        paymentLink: "https://buy.stripe.com/aFa00jf1ceRsb9kceV0Ny08",
        depositAmount: 5000, // £50 deposit in pence
        features: [
          "Up to 5 pages",
          "Mobile-friendly design",
          "1 business email",
          "Basic SEO optimisation",
          "Contact form integration",
          "SSL & hosting"
        ]
      },
      {
        id: 2,
        name: "Business Growth",
        icon: Crown,
        description: "Most popular choice for growing businesses",
        price: "£1,250",
        monthlyPrice: "£65",
        paymentLink: "https://buy.stripe.com/7sY14ndX86kW0uG5Qx0Ny09",
        depositAmount: 12500, // £125 deposit in pence
        features: [
          "Up to 10 pages",
          "Blog setup",
          "SEO optimisation & analytics",
          "AI chatbot/contact assistant",
          "2 rounds of revisions",
          "2 business emails",
          "Ongoing support"
        ]
      },
      {
        id: 3,
        name: "Premium/Pro",
        icon: ShoppingCart, 
        description: "Complete solution for established businesses",
        price: "from £2,250",
        monthlyPrice: "£95",
        paymentLink: "https://buy.stripe.com/00wcN5f1cfVw7X83Ip0Ny0a",
        depositAmount: 22500, // £225 deposit in pence
        features: [
          "Unlimited pages",
          "E-commerce or booking system",
          "Advanced SEO",
          "CRM automation",
          "Priority support (same-day)",
          "5 business emails",
          "Monthly performance report"
        ]
      }
    ],
    ai: [
      {
        id: 1,
        name: "Starter Automation",
        icon: Brain,
        description: "Basic AI automation for small businesses",
        price: "£350 setup",
        monthlyPrice: "£75",
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", // Add your Stripe product ID
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", // Add your Stripe price ID
        depositAmount: 3500, // £35 deposit in pence
        features: [
          "1 automation agent (email responder or lead capture bot)",
          "1 month free support",
          "Hosting included"
        ]
      },
      {
        id: 2,
        name: "Business Automation",
        icon: Server,
        description: "Advanced AI solutions for growing companies",
        price: "£750 setup",
        monthlyPrice: "£150",
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", // Add your Stripe product ID
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", // Add your Stripe price ID
        depositAmount: 7500, // £75 deposit in pence
        features: [
          "3 automation agents (CRM pipeline, social media posting, chatbot)",
          "AI dashboard access",
          "Priority support"
        ]
      },
      {
        id: 3,
        name: "Premium Automation",
        icon: Crown,
        description: "Full AI transformation solution",
        price: "£1,500 setup",
        monthlyPrice: "£250",
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", // Add your Stripe product ID
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", // Add your Stripe price ID
        depositAmount: 15000, // £150 deposit in pence
        features: [
          "Unlimited agents",
          "Full CRM automation & custom dashboard",
          "Dedicated support",
          "Quarterly optimisation review"
        ]
      }
    ],
    mobile: [
      {
        id: 1,
        name: "Starter App",
        icon: Smartphone,
        description: "Simple mobile app for small businesses",
        price: "£1,500",
        monthlyPrice: "£95",
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", // Add your Stripe product ID
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", // Add your Stripe price ID
        depositAmount: 15000, // £150 deposit in pence
        features: [
          "Basic booking/info app",
          "Secure hosting",
          "Ongoing updates"
        ]
      },
      {
        id: 2,
        name: "Business App",
        icon: Crown,
        description: "Feature-rich mobile solution",
        price: "£3,000",
        monthlyPrice: "£150",
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", // Add your Stripe product ID
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", // Add your Stripe price ID
        depositAmount: 30000, // £300 deposit in pence
        features: [
          "User accounts & forms",
          "Admin dashboard",
          "CRM & AI integrations",
          "Priority support"
        ]
      },
      {
        id: 3,
        name: "Premium App",
        icon: Server,
        description: "Complete mobile ecosystem",
        price: "from £5,000",
        monthlyPrice: "£250",
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", // Add your Stripe product ID
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", // Add your Stripe price ID
        depositAmount: 50000, // £500 deposit in pence
        features: [
          "Fully custom app",
          "Advanced backend (Supabase/API)",
          "AI-powered features",
          "Dedicated support team"
        ]
      }
    ],
    software: [
      {
        id: 1,
        name: "Starter",
        icon: Code,
        description: "Essential hosting for small businesses",
        price: "£40",
        monthlyPrice: "/month",
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", // Add your Stripe product ID
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", // Add your Stripe price ID
        depositAmount: 4000, // £40 first month in pence
        features: [
          "1 business email",
          "SSL & backups",
          "Updates & security monitoring",
          "Support during working hours"
        ]
      },
      {
        id: 2,
        name: "Business",
        icon: Server,
        description: "Professional hosting solution",
        price: "£65",
        monthlyPrice: "/month",
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", // Add your Stripe product ID
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", // Add your Stripe price ID
        depositAmount: 6500, // £65 first month in pence
        features: [
          "3 business emails",
          "Priority support",
          "Monthly security & SEO report",
          "Performance monitoring"
        ]
      },
      {
        id: 3,
        name: "Premium",
        icon: Crown,
        description: "Enterprise-grade hosting platform",
        price: "£95",
        monthlyPrice: "/month",
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", // Add your Stripe product ID
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", // Add your Stripe price ID
        depositAmount: 9500, // £95 first month in pence
        features: [
          "Unlimited emails",
          "AI-powered monitoring",
          "Monthly performance & marketing insights",
          "24/7 priority support"
        ]
      }
    ]
  };

  const currentPlans = allPlans[activeCategory];

  const handleGetStarted = (planName: string) => {
    setSelectedPlan(`${planName} - ${activeCategory}`);
    setIsFormOpen(true);
    toast({ title: "Opening form...", description: `Getting started with ${planName}` });
  };

  const handleFormSubmit = async (customerInfo: any) => {
    setIsSubmitting(true);
    try {
      // Find the selected plan to get plan information
      const currentPlansArray = allPlans[activeCategory] || [];
      const planName = selectedPlan.split(' - ')[0]; // Extract plan name from "Plan - category"
      const selectedPlanObj = currentPlansArray.find(plan => plan.name === planName);
      
      if (!selectedPlanObj) {
        throw new Error('Selected plan not found');
      }

      // Save customer info to database for admin panel
      const { error: dbError } = await supabase.from('orders').insert({
        customer_name: customerInfo.fullName,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_company: customerInfo.company,
        service_name: selectedPlan,
        amount: selectedPlanObj.depositAmount || 2000, // Use plan's deposit amount
        status: 'inquiry'
      });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save customer information');
      }

      // Check if this is a website plan with a payment link
      if (activeCategory === 'websites' && selectedPlanObj.paymentLink) {
        // For website plans, redirect directly to Stripe Payment Link
        window.open(selectedPlanObj.paymentLink, '_blank');
        setIsFormOpen(false);
        toast({
          title: "Redirecting to Payment",
          description: "Opening Stripe checkout in a new tab...",
        });
        return;
      }

      // For other categories (AI, Apps, Hosting), use existing Stripe API integration
      const paymentBody: any = {
        amount: selectedPlanObj.depositAmount || 2000,
        serviceName: selectedPlan,
        type: 'deposit',
        customerInfo: {
          fullName: customerInfo.fullName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          company: customerInfo.company
        },
        successUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-canceled`
      };

      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment', {
        body: paymentBody
      });

      if (paymentError) {
        console.error('Payment error:', paymentError);
        throw new Error('Failed to create payment session');
      }

      if (paymentData?.url) {
        // Redirect to Stripe checkout
        window.open(paymentData.url, '_blank');
        setIsFormOpen(false);
        toast({
          title: "Redirecting to Payment",
          description: "Opening Stripe checkout in a new tab...",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="pricing" 
      className="py-32 bg-white" 
      aria-label="Pricing plans and packages"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-navy">
            Simple, <span className="text-orange">Transparent</span> Pricing
          </h2>
          <p className="text-body max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include <span className="text-orange font-semibold">hosting, SSL, and expert support</span>.
          </p>
        </div>

        {/* Category Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center space-x-6 bg-gray-50 p-2 rounded-2xl">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  data-category={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-orange text-white shadow-lg'
                      : 'text-navy hover:bg-white hover:shadow-md'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {currentPlans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.id}
                className={`card-premium p-8 flex flex-col h-full group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  plan.name === 'Business Growth' ? 'ring-2 ring-orange/20 hover:ring-orange/50 hover:shadow-[0_0_30px_rgba(255,122,0,0.3)] animate-pulse hover:animate-none' : ''
                }`}
              >
                <div className="text-center mb-8">
                  <IconComponent className="h-12 w-12 text-orange mx-auto mb-4" />
                  <h3 className="heading-primary heading-md mb-4 text-navy">
                    {plan.name}
                  </h3>
                  <p className="text-body mb-6">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-navy">{plan.price}</span>
                    {plan.monthlyPrice && (
                      <span className="text-text-secondary ml-2">
                        + {plan.monthlyPrice}/month
                      </span>
                    )}
                    <p className="text-sm text-text-secondary mt-2">
                      Payment Options Available
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-base">
                      <CheckCircle className="h-5 w-5 text-orange mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <button 
                    className="w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 btn-secondary group/btn hover:scale-105 hover:shadow-xl relative overflow-hidden"
                    onClick={() => handleGetStarted(plan.name)}
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange to-orange/80 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">Get Started</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Quote Section */}
        <div className="card-premium p-12 text-center">
          <h3 className="heading-primary heading-lg mb-6 text-navy">
            Need Something <span className="text-orange">Custom</span>?
          </h3>
          <p className="text-body mb-8 max-w-2xl mx-auto">
            Every business is unique. Let's discuss your specific requirements and create a tailored solution that perfectly fits your needs.
          </p>
          <button 
            className="btn-primary px-10 py-4 text-lg font-semibold rounded-2xl"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Custom Quote
          </button>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <p className="text-text-secondary text-lg">
            <CheckCircle className="h-5 w-5 text-orange inline mr-2" />
            30-day money-back guarantee on all plans
          </p>
        </div>
      </div>
      
      {/* Customer Info Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Get Started with {selectedPlan}</DialogTitle>
          </DialogHeader>
          <CustomerInfoForm
            serviceName={selectedPlan}
            onSubmit={handleFormSubmit}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Pricing;
