import { CheckCircle, Star, Crown, Code, ShoppingCart, Server, Smartphone, Brain, Monitor, Award, Sparkles, Zap, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { CustomQuoteModal } from "@/components/CustomQuoteModal";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import pricingHeroBg from "@/assets/pricing-hero-bg.jpg";
import { useNavigate } from "react-router-dom";
const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState('websites');
  const [isCustomQuoteOpen, setIsCustomQuoteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const categories = [{
    id: 'websites',
    label: 'Websites',
    icon: Monitor
  }, {
    id: 'ai',
    label: 'AI Automations',
    icon: Brain
  }, {
    id: 'mobile',
    label: 'Apps',
    icon: Smartphone
  }, {
    id: 'software',
    label: 'Hosting',
    icon: Code
  }];
  const allPlans = {
    websites: [{
      id: 1,
      name: "Starter",
      icon: Code,
      description: "Perfect for small businesses and personal brands",
      price: "from £500",
      monthlyPrice: "£40",
      paymentLink: "https://buy.stripe.com/aFa00jf1ceRsb9kceV0Ny08",
      depositAmount: 5000,
      // £50 deposit in pence
      features: ["Up to 5 pages", "Mobile-friendly design", "1 business email", "Basic SEO optimisation", "Contact form integration", "SSL & hosting", "Tailored to your content and goals"],
      trustLines: ["Cancel anytime", "SSL included", "No hidden fees"]
    }, {
      id: 2,
      name: "Business Growth",
      icon: Crown,
      description: "Most popular choice for growing businesses",
      price: "from £1,250",
      monthlyPrice: "£65",
      paymentLink: "https://buy.stripe.com/7sY14ndX86kW0uG5Qx0Ny09",
      depositAmount: 12500,
      // £125 deposit in pence
      popular: true,
      features: ["Up to 10 pages", "Blog setup", "SEO optimisation & analytics", "AI chatbot/contact assistant", "2 rounds of revisions", "2 business emails", "Ongoing support", "Includes strategy call and on-page SEO basics"],
      trustLines: ["Most popular choice", "Priority support", "30-day guarantee"]
    }, {
      id: 3,
      name: "Premium Pro",
      icon: ShoppingCart,
      description: "Complete solution for established businesses",
      price: "from £2,250",
      monthlyPrice: "£95",
      paymentLink: "https://buy.stripe.com/00wcN5f1cfVw7X83Ip0Ny0a",
      depositAmount: 22500,
      // £225 deposit in pence
      features: ["Unlimited pages", "E-commerce or booking system", "Advanced SEO", "CRM automation", "Priority support (same-day)", "5 business emails", "Monthly performance report", "Bespoke design, advanced integrations, priority support"],
      trustLines: ["Enterprise grade", "Unlimited revisions", "Dedicated manager"]
    }],
    ai: [{
      id: 1,
      name: "Starter Automation",
      icon: Brain,
      description: "Basic AI automation for small businesses",
      price: "£350 setup",
      monthlyPrice: "£75",
      stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE",
      stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE",
      depositAmount: 3500,
      features: ["1 automation agent (email responder or lead capture bot)", "1 month free support", "Hosting included"],
      trustLines: ["AI-powered efficiency", "Quick setup", "Expert support"]
    }, {
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
      features: ["3 automation agents (CRM pipeline, social media posting, chatbot)", "AI dashboard access", "Priority support"],
      trustLines: ["Most comprehensive", "Full automation", "Advanced features"]
    }, {
      id: 3,
      name: "Premium Automation",
      icon: Crown,
      description: "Full AI transformation solution",
      price: "£1,500 setup",
      monthlyPrice: "£250",
      stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE",
      stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE",
      depositAmount: 15000,
      features: ["Unlimited agents", "Full CRM automation & custom dashboard", "Dedicated support", "Quarterly optimisation review"],
      trustLines: ["Complete transformation", "Unlimited potential", "White-glove service"]
    }],
    mobile: [{
      id: 1,
      name: "Starter App",
      icon: Smartphone,
      description: "Simple mobile app for small businesses",
      price: "£1,500",
      monthlyPrice: "£95",
      stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE",
      stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE",
      depositAmount: 15000,
      features: ["Basic booking/info app", "Secure hosting", "Ongoing updates"],
      trustLines: ["Native performance", "App store ready", "Secure hosting"]
    }, {
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
      features: ["User accounts & forms", "Admin dashboard", "CRM & AI integrations", "Priority support"],
      trustLines: ["Advanced features", "Custom integrations", "Professional grade"]
    }, {
      id: 3,
      name: "Premium App",
      icon: Server,
      description: "Complete mobile ecosystem",
      price: "from £5,000",
      monthlyPrice: "£250",
      stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE",
      stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE",
      depositAmount: 50000,
      features: ["Fully custom app", "Advanced backend (Supabase/API)", "AI-powered features", "Dedicated support team"],
      trustLines: ["Fully bespoke", "Enterprise backend", "Dedicated team"]
    }],
    software: [{
      id: 1,
      name: "Starter",
      icon: Code,
      description: "Essential hosting for small businesses",
      price: "£40",
      monthlyPrice: "/month",
      stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE",
      stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE",
      depositAmount: 4000,
      features: ["1 business email", "SSL & backups", "Updates & security monitoring", "Support during working hours"],
      trustLines: ["99.9% uptime", "Daily backups", "UK servers"]
    }, {
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
      features: ["3 business emails", "Priority support", "Monthly security & SEO report", "Performance monitoring"],
      trustLines: ["Priority support", "Monthly reports", "Advanced monitoring"]
    }, {
      id: 3,
      name: "Premium",
      icon: Crown,
      description: "Enterprise-grade hosting platform",
      price: "£95",
      monthlyPrice: "/month",
      stripeProductId: "prod_YOUR_STRIPE_PRODUCT_ID_HERE",
      stripePriceId: "price_YOUR_STRIPE_PRICE_ID_HERE",
      depositAmount: 9500,
      features: ["Unlimited emails", "AI-powered monitoring", "Monthly performance & marketing insights", "24/7 priority support"],
      trustLines: ["24/7 support", "AI monitoring", "Enterprise grade"]
    }]
  };
  const currentPlans = allPlans[activeCategory];
  const handleGetStarted = (plan: any) => {
    const serviceName = `${plan.name} - ${activeCategory}`;
    const params = new URLSearchParams({
      serviceName,
      amount: String(plan.depositAmount || 2000)
    });
    if (plan.paymentLink) params.set('paymentLink', plan.paymentLink);
    navigate(`/checkout?${params.toString()}`);
    toast({
      title: "Opening checkout...",
      description: `Getting started with ${plan.name}`
    });
  };
  return <section id="pricing" className="relative py-32 overflow-hidden" aria-label="Pricing plans and packages">
      {/* Premium Background with Hero Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${pricingHeroBg})`
    }}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-purple-900/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl animate-pulse"></div>
      
      <div className="relative container mx-auto px-6">
        {/* Premium Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange font-semibold mb-6 animate-fade-in-up">
            <Sparkles className="h-4 w-4" />
            <span>Premium Pricing Plans</span>
          </div>
          
          <h1 className="font-serif font-bold text-6xl md:text-7xl lg:text-8xl mb-8 text-white animate-fade-in-up stagger-delay-1">
            Investment in Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange/80 animate-gradient-x">
              Digital Future
            </span>
          </h1>
          
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up stagger-delay-2">
            <p className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed">
              You'll work directly with me—no sales reps, just one freelancer dedicated to your project.
            </p>
            
            <div className="bg-gradient-to-r from-orange/20 to-orange/10 backdrop-blur-xl border border-orange/30 rounded-2xl p-8 inline-block shadow-2xl">
              <div className="flex items-center justify-center gap-3 text-white">
                <Shield className="h-6 w-6 text-orange" />
                <span className="text-lg font-semibold">
                  Complete builds delivered - no technical knowledge required
                </span>
                <Zap className="h-6 w-6 text-orange" />
              </div>
            </div>
          </div>

          {/* Premium Category Switcher - Centered in Middle */}
          <div className="flex justify-center mb-16 px-4 animate-fade-in-up stagger-delay-3">
            <div className="w-full max-w-5xl">
              {/* Mobile: Stacked Layout */}
              <div className="grid grid-cols-2 gap-3 sm:hidden">
                {categories.map((category, index) => {
                const IconComponent = category.icon;
                return <button key={category.id} data-category={category.id} onClick={() => setActiveCategory(category.id)} className={`group relative overflow-hidden flex items-center justify-center space-x-1.5 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-500 text-sm ${activeCategory === category.id ? 'bg-gradient-to-r from-orange to-orange/80 text-white shadow-2xl scale-105' : 'text-white/80 hover:text-white bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:shadow-xl hover:scale-105'}`} style={{
                  animationDelay: `${index * 100}ms`
                }}>
                      {activeCategory === category.id && <div className="absolute inset-0 bg-gradient-to-r from-orange/20 to-orange/10 animate-pulse"></div>}
                      <IconComponent className="h-5 w-5 relative z-10" />
                      <span className="relative z-10">{category.label}</span>
                    </button>;
              })}
              </div>
              
              {/* Desktop: Horizontal Layout */}
              <div className="hidden sm:inline-flex items-center justify-center space-x-3 bg-navy/40 backdrop-blur-2xl p-3 rounded-3xl border border-white/10 shadow-2xl mx-auto">
                {categories.map((category, index) => {
                const IconComponent = category.icon;
                return <button key={category.id} data-category={category.id} onClick={() => setActiveCategory(category.id)} className={`group relative overflow-hidden flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-500 text-base ${activeCategory === category.id ? 'bg-gradient-to-r from-orange to-orange/80 text-white shadow-2xl scale-105' : 'text-white/80 hover:text-white hover:bg-white/10 hover:shadow-xl hover:scale-105'}`} style={{
                  animationDelay: `${index * 100}ms`
                }}>
                      {activeCategory === category.id && <>
                          <div className="absolute inset-0 bg-gradient-to-r from-orange/20 to-orange/10 animate-pulse"></div>
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange to-orange/80 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        </>}
                      <IconComponent className="h-6 w-6 relative z-10" />
                      <span className="whitespace-nowrap relative z-10">{category.label}</span>
                    </button>;
              })}
              </div>
            </div>
          </div>
        </div>

        {/* Premium Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {currentPlans.map((plan, index) => {
          const IconComponent = plan.icon;
          const isPopular = plan.popular;
          return <div key={plan.id} className={`relative group transition-all duration-700 hover:-translate-y-4 animate-fade-in-up`} style={{
            animationDelay: `${(index + 4) * 150}ms`
          }}>
                {/* Most Popular Badge */}
                {isPopular && <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="relative">
                      {/* Badge Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange via-yellow-400 to-orange rounded-full blur-sm opacity-75 animate-pulse"></div>
                      
                      {/* Premium Badge */}
                      <div className="relative bg-gradient-to-r from-orange via-yellow-400 to-orange text-white px-8 py-3 rounded-full text-sm font-bold shadow-2xl flex items-center space-x-2 border border-yellow-300/30 backdrop-blur-sm">
                        <Award className="h-4 w-4 text-white/90" />
                        <span className="tracking-wide">MOST POPULAR</span>
                        <Sparkles className="h-4 w-4 text-white/90" />
                      </div>
                    </div>
                  </div>}

                {/* Enhanced Glow Effect for Popular Card */}
                <div className={`absolute -inset-1 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 ${isPopular ? 'bg-gradient-to-r from-orange via-yellow-400 to-orange' : 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'}`} />
                
                {/* Additional Popular Card Glow */}
                {isPopular && <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange/20 via-yellow-400/20 to-orange/20 blur-xl opacity-60"></div>}

                <div className={`relative ${isPopular ? 'bg-gradient-to-br from-navy/95 via-navy to-purple-900/50 border-2 border-orange/50 shadow-2xl shadow-orange/20' : 'bg-gradient-to-br from-navy/90 via-navy/95 to-blue-900/30 border border-white/10 shadow-2xl'} rounded-3xl p-8 lg:p-10 flex flex-col h-full backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-3xl`}>
                  {/* Premium Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-50"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange/10 to-transparent rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    {/* Premium Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${isPopular ? 'bg-gradient-to-r from-orange to-orange/80 text-white shadow-xl' : 'bg-gradient-to-r from-blue-400/20 to-purple-400/20 text-orange border border-orange/30'} group-hover:scale-110 transition-all duration-500 shadow-2xl`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-orange transition-colors duration-300">
                        {plan.name}
                      </h3>
                      
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        {plan.description}
                      </p>

                      {/* Premium Pricing Display */}
                      <div className="mb-8">
                        <div className="flex items-baseline justify-center gap-2 mb-2">
                          <span className="text-5xl lg:text-6xl font-bold text-white">
                            {plan.price}
                          </span>
                          {plan.monthlyPrice}
                        </div>
                        {plan.monthlyPrice && plan.monthlyPrice !== "/month" && <p className="text-orange/80 text-sm font-medium">
                            Then {plan.monthlyPrice}/month
                          </p>}
                      </div>
                    </div>

                    {/* Premium Features List */}
                    <div className="flex-grow mb-8">
                      <ul className="space-y-4">
                        {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-start space-x-3 group/item" style={{
                      animationDelay: `${index * 150 + featureIndex * 50}ms`
                    }}>
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-orange to-orange/80 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform duration-300">
                              <CheckCircle className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-gray-200 font-medium leading-relaxed group-hover/item:text-white transition-colors duration-300">
                              {feature}
                            </span>
                          </li>)}
                      </ul>
                    </div>

                    {/* Premium Trust Indicators */}
                    <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className="space-y-2">
                        {plan.trustLines.map((trustLine, trustIndex) => <div key={trustIndex} className="flex items-center space-x-2 text-sm">
                            <Shield className="h-4 w-4 text-orange flex-shrink-0" />
                            <span className="text-gray-300 font-medium">{trustLine}</span>
                          </div>)}
                      </div>
                    </div>

                    {/* Premium CTA Button */}
                    <button onClick={() => handleGetStarted(plan)} disabled={isSubmitting} className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-2xl ${isPopular ? 'bg-gradient-to-r from-orange to-orange/80 text-white hover:shadow-orange/50 hover:shadow-2xl' : 'bg-gradient-to-r from-white/10 to-white/5 text-white border-2 border-orange/30 hover:border-orange hover:bg-orange/10 hover:shadow-orange/30'} group/button overflow-hidden relative`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover/button:translate-x-[200%] transition-transform duration-1000"></div>
                      <div className="relative z-10 flex items-center justify-center space-x-2">
                        <span>{isSubmitting ? 'Processing...' : "Let's Build Your Project"}</span>
                        <Zap className="h-5 w-5 group-hover/button:rotate-12 transition-transform duration-300" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>;
        })}
        </div>
        
        {/* Custom Pricing Note */}
        <div className="text-center mb-16 animate-fade-in-up" style={{
          animationDelay: '1.0s'
        }}>
          <p className="text-gray-300 text-lg">
            Need something unique? I'll price it fairly after a quick chat.
          </p>
        </div>
        
        {/* Premium Guarantee & Trust Section */}
        <div className="text-center mb-20 animate-fade-in-up" style={{
        animationDelay: '1.2s'
      }}>
          <div className="inline-flex items-center justify-center space-x-3 text-white/90 text-xl bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur-xl border border-green-400/30 px-8 py-4 rounded-2xl shadow-2xl">
            <Shield className="h-6 w-6 text-green-400" />
            <span className="font-semibold">30-day money-back guarantee on all plans</span>
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
        </div>

        {/* Premium Custom Quote Section */}
        <div className="relative group animate-fade-in-up" style={{
        animationDelay: '1.4s'
      }}>
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange to-orange/80 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          
          <div className="relative bg-gradient-to-br from-navy/90 via-navy to-purple-900/30 backdrop-blur-2xl rounded-3xl p-12 lg:p-16 text-center border border-white/10 shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-purple-500/5"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-orange/20 border border-orange/30 text-orange font-semibold mb-8">
                <Sparkles className="h-4 w-4" />
                <span>Bespoke Solutions</span>
              </div>
              
              <h3 className="font-serif font-bold text-5xl lg:text-6xl mb-8 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange group-hover:to-orange/80 transition-all duration-500">
                Need Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange/80">Extraordinary Built</span>?
              </h3>
              
              <p className="text-xl lg:text-2xl mb-12 text-gray-200 leading-relaxed max-w-3xl mx-auto">
                Every business has unique challenges. Let's create a tailored solution that perfectly fits your vision and exceeds your expectations.
              </p>
              
              <button className="group/btn bg-gradient-to-r from-orange to-orange/80 text-white px-12 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-orange/50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden" onClick={() => setIsCustomQuoteOpen(true)}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Custom Quote</span>
                  <Zap className="h-6 w-6 group-hover/btn:rotate-12 transition-transform duration-300" />
                </span>
              </button>
              
              <p className="text-white/60 italic mt-8 text-sm">
                Not sure which option fits? Message me—I'll advise honestly.
              </p>
            </div>
          </div>
      </div>
    </div>
    
    {/* Custom Quote Modal */}
    <CustomQuoteModal isOpen={isCustomQuoteOpen} onOpenChange={setIsCustomQuoteOpen} />
  </section>;
};
export default Pricing;