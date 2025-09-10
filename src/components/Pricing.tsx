import { CheckCircle, Star, Crown, Code, ShoppingCart, Server, Smartphone, Brain, Monitor, Award } from "lucide-react";
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
        ],
        trustLines: ["Cancel anytime", "SSL included", "No hidden fees"]
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
        popular: true,
        features: [
          "Up to 10 pages",
          "Blog setup",
          "SEO optimisation & analytics",
          "AI chatbot/contact assistant",
          "2 rounds of revisions",
          "2 business emails",
          "Ongoing support"
        ],
        trustLines: ["Most popular choice", "Priority support", "30-day guarantee"]
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
        ],
        trustLines: ["Enterprise grade", "Unlimited revisions", "Dedicated manager"]
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
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", 
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", 
        depositAmount: 3500, 
        features: [
          "1 automation agent (email responder or lead capture bot)",
          "1 month free support",
          "Hosting included"
        ],
        trustLines: ["AI-powered efficiency", "Quick setup", "Expert support"]
      },
      {
        id: 2,
        name: "Business Automation",
        icon: Server,
        description: "Advanced AI solutions for growing companies",
        price: "£750 setup",
        monthlyPrice: "£150",
        popular: true,
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", 
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", 
        depositAmount: 7500, 
        features: [
          "3 automation agents (CRM pipeline, social media posting, chatbot)",
          "AI dashboard access",
          "Priority support"
        ],
        trustLines: ["Most comprehensive", "Full automation", "Advanced features"]
      },
      {
        id: 3,
        name: "Premium Automation",
        icon: Crown,
        description: "Full AI transformation solution",
        price: "£1,500 setup",
        monthlyPrice: "£250",
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", 
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", 
        depositAmount: 15000, 
        features: [
          "Unlimited agents",
          "Full CRM automation & custom dashboard",
          "Dedicated support",
          "Quarterly optimisation review"
        ],
        trustLines: ["Complete transformation", "Unlimited potential", "White-glove service"]
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
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", 
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", 
        depositAmount: 15000, 
        features: [
          "Basic booking/info app",
          "Secure hosting",
          "Ongoing updates"
        ],
        trustLines: ["Native performance", "App store ready", "Secure hosting"]
      },
      {
        id: 2,
        name: "Business App",
        icon: Crown,
        description: "Feature-rich mobile solution",
        price: "£3,000",
        monthlyPrice: "£150",
        popular: true,
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", 
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", 
        depositAmount: 30000, 
        features: [
          "User accounts & forms",
          "Admin dashboard",
          "CRM & AI integrations",
          "Priority support"
        ],
        trustLines: ["Advanced features", "Custom integrations", "Professional grade"]
      },
      {
        id: 3,
        name: "Premium App",
        icon: Server,
        description: "Complete mobile ecosystem",
        price: "from £5,000",
        monthlyPrice: "£250",
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", 
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", 
        depositAmount: 50000, 
        features: [
          "Fully custom app",
          "Advanced backend (Supabase/API)",
          "AI-powered features",
          "Dedicated support team"
        ],
        trustLines: ["Fully bespoke", "Enterprise backend", "Dedicated team"]
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
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", 
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", 
        depositAmount: 4000, 
        features: [
          "1 business email",
          "SSL & backups",
          "Updates & security monitoring",
          "Support during working hours"
        ],
        trustLines: ["99.9% uptime", "Daily backups", "UK servers"]
      },
      {
        id: 2,
        name: "Business",
        icon: Server,
        description: "Professional hosting solution",
        price: "£65",
        monthlyPrice: "/month",
        popular: true,
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", 
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", 
        depositAmount: 6500, 
        features: [
          "3 business emails",
          "Priority support",
          "Monthly security & SEO report",
          "Performance monitoring"
        ],
        trustLines: ["Priority support", "Monthly reports", "Advanced monitoring"]
      },
      {
        id: 3,
        name: "Premium",
        icon: Crown,
        description: "Enterprise-grade hosting platform",
        price: "£95",
        monthlyPrice: "/month",
        stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE", 
        stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE", 
        depositAmount: 9500, 
        features: [
          "Unlimited emails",
          "AI-powered monitoring",
          "Monthly performance & marketing insights",
          "24/7 priority support"
        ],
        trustLines: ["24/7 support", "AI monitoring", "Enterprise grade"]
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
      const currentPlansArray = allPlans[activeCategory] || [];
      const planName = selectedPlan.split(' - ')[0]; 
      const selectedPlanObj = currentPlansArray.find(plan => plan.name === planName);
      
      if (!selectedPlanObj) {
        throw new Error('Selected plan not found');
      }

      const { error: dbError } = await supabase.from('orders').insert({
        customer_name: customerInfo.fullName,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_company: customerInfo.company,
        service_name: selectedPlan,
        amount: selectedPlanObj.depositAmount || 2000, 
        status: 'inquiry'
      });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save customer information');
      }

      if (activeCategory === 'websites' && selectedPlanObj.paymentLink) {
        window.open(selectedPlanObj.paymentLink, '_blank');
        setIsFormOpen(false);
        toast({
          title: "Redirecting to Payment",
          description: "Opening Stripe checkout in a new tab...",
        });
        return;
      }

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
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="font-serif font-bold text-5xl md:text-6xl mb-6 text-navy">
            Simple, <span className="text-orange">Transparent</span> Pricing
          </h2>
          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-body text-xl mb-4">
              Choose the perfect plan for your business. All plans include <span className="text-orange font-semibold">hosting, SSL, and expert support</span>.
            </p>
            <div className="bg-orange/10 border border-orange/20 rounded-2xl p-6 inline-block">
              <p className="text-navy font-semibold text-lg">
                ✨ <span className="text-orange">We build your website completely</span> - these features are all included in your finished site
              </p>
            </div>
          </div>
        </div>

        {/* Category Switcher - Mobile Optimized */}
        <div className="flex justify-center mb-12 sm:mb-16 px-4">
          <div className="w-full max-w-4xl">
            {/* Mobile: Stacked Layout */}
            <div className="grid grid-cols-2 gap-2 sm:hidden">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    data-category={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center justify-center space-x-1 px-3 py-2.5 rounded-xl font-medium transition-all duration-300 text-xs ${
                      activeCategory === category.id
                        ? 'bg-gradient-orange text-white shadow-orange-glow'
                        : 'text-navy hover:bg-white hover:shadow-md bg-gray-50'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Tablet & Desktop: Horizontal Layout */}
            <div className="hidden sm:inline-flex items-center justify-center space-x-2 md:space-x-6 bg-gray-50 p-2 rounded-2xl shadow-premium w-full sm:w-auto mx-auto">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    data-category={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm ${
                      activeCategory === category.id
                        ? 'bg-gradient-orange text-white shadow-orange-glow'
                        : 'text-navy hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <IconComponent className="h-4 sm:h-5 w-4 sm:w-5" />
                    <span className="whitespace-nowrap">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing Cards - Fully Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {currentPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            const isPopular = plan.popular;
            
            return (
              <div
                key={plan.id}
                className={`relative group transition-all duration-700 hover:-translate-y-2 ${
                  index === 1 ? 'animate-scale-in-bounce' : 'animate-fade-in-up'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Popular Badge - Mobile Optimized */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-orange text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-orange-glow flex items-center space-x-1 sm:space-x-2">
                      <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div
                  className={`${
                    isPopular 
                      ? 'bg-gradient-featured border-2 border-orange shadow-featured hover:shadow-orange-glow' 
                      : 'bg-gradient-premium-card border border-gray-200 shadow-premium hover:shadow-premium-hover'
                  } rounded-2xl p-4 sm:p-6 flex flex-col h-full relative overflow-hidden transition-all duration-500 hover:scale-105`}
                >
                  {/* Glow effect overlay */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isPopular 
                      ? 'bg-gradient-to-br from-orange/5 via-transparent to-orange/5' 
                      : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
                  }`} />
                  
                  <div className="relative z-10">
                    {/* Header - Mobile Optimized */}
                    <div className="text-center mb-4 sm:mb-6">
                      <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 sm:mb-4 ${
                        isPopular ? 'bg-orange text-white' : 'bg-orange/10 text-orange'
                      } group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      
                      <h3 className="font-serif font-bold text-xl sm:text-2xl mb-1 sm:mb-2 text-navy">
                        {plan.name}
                      </h3>
                      
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed px-2">
                        {plan.description}
                      </p>
                      
                      <div className="mb-3 sm:mb-4">
                        <span className="font-serif font-bold text-2xl sm:text-3xl text-navy">{plan.price}</span>
                        {plan.monthlyPrice && (
                          <span className="text-gray-500 ml-1 sm:ml-2 text-xs sm:text-sm">
                            + {plan.monthlyPrice}/month
                          </span>
                        )}
                        <p className="text-xs text-gray-500 mt-1 font-medium">
                          Payment Options Available
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange/10 flex items-center justify-center mr-3 mt-0.5">
                              <CheckCircle className="h-3 w-3 text-orange" />
                            </div>
                            <span className="text-gray-700 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Trust Lines */}
                      {plan.trustLines && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="text-center space-y-1">
                            {plan.trustLines.slice(0, 2).map((trustLine, trustIndex) => (
                              <p key={trustIndex} className="text-xs text-gray-600 font-medium">
                                {trustLine}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <button 
                        className={`w-full py-3 px-6 rounded-full font-bold text-base transition-all duration-300 relative overflow-hidden group/btn ${
                          isPopular
                            ? 'bg-gradient-orange-glow text-white shadow-orange-glow hover:shadow-lg hover:-translate-y-1'
                            : 'bg-navy text-white hover:bg-gray-800 shadow-lg hover:-translate-y-1'
                        }`}
                        onClick={() => handleGetStarted(plan.name)}
                      >
                        <span className="relative z-10">Get Started</span>
                        
                        {/* Hover ripple effect */}
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center text-gray-600 text-lg bg-green-50 px-6 py-3 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            30-day money-back guarantee on all plans
          </div>
        </div>

        {/* Custom Quote Section */}
        <div className="bg-gradient-premium-card rounded-3xl p-16 text-center shadow-premium hover:shadow-premium-hover transition-all duration-500 group">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-serif font-bold text-4xl mb-6 text-navy group-hover:text-orange transition-colors duration-300">
              Need Something <span className="text-orange">Custom</span>?
            </h3>
            <p className="text-body mb-10 text-xl leading-relaxed">
              Every business is unique. Let's discuss your specific requirements and create a tailored solution that perfectly fits your needs.
            </p>
            <button 
              className="bg-gradient-orange text-white px-12 py-4 text-lg font-bold rounded-full shadow-orange-glow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Custom Quote
            </button>
          </div>
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