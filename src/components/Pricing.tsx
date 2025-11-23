import { CheckCircle, Star, Crown, Code, ShoppingCart, Server, Smartphone, Brain, Monitor, Award, Sparkles, Zap, Shield, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button as EnhancedButton } from "@/components/ui/button-enhanced";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";
import pricingHeroBg from "@/assets/pricing-hero-bg.jpg";
import { useNavigate } from "react-router-dom";
const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState('websites');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();
  const categories = [{
    id: 'websites',
    label: 'Websites',
    icon: Monitor
  }, {
    id: 'ai',
    label: 'Automation Tools',
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
      description: "Get online fast",
      buildPrice: "from £500",
      monthlyPrice: "+£40/mo",
      price: "from £500",
      paymentLink: "https://buy.stripe.com/aFa00jf1ceRsb9kceV0Ny08",
      depositAmount: 5000,
      features: ["Up to 5 pages", "Mobile friendly", "Contact form", "Found on Google"],
      ctaText: "Get Started"
    }, {
      id: 2,
      name: "Growth",
      icon: Crown,
      description: "Everything to grow",
      buildPrice: "from £1,250",
      monthlyPrice: "+£55/mo",
      price: "from £1,250",
      paymentLink: "https://buy.stripe.com/7sY14ndX86kW0uG5Qx0Ny09",
      depositAmount: 12500,
      popular: true,
      features: ["Up to 10 pages", "Blog + SEO", "Chat assistant", "Priority support"],
      ctaText: "Get Started"
    }, {
      id: 3,
      name: "Premium",
      icon: ShoppingCart,
      description: "The full package",
      buildPrice: "from £2,250",
      monthlyPrice: "+£75/mo",
      price: "from £2,250",
      paymentLink: "https://buy.stripe.com/00wcN5f1cfVw7X83Ip0Ny0a",
      depositAmount: 22500,
      features: ["Unlimited pages", "Online shop/booking", "Same-day support", "Custom design"],
      ctaText: "Get Started"
    }],
    ai: [{
      id: 1,
      name: "Starter",
      icon: Brain,
      description: "One automation",
      price: "£350",
      monthlyPrice: "+£75/mo",
      depositAmount: 3500,
      features: ["1 automated task", "Free setup support", "We host it"]
    }, {
      id: 2,
      name: "Business",
      icon: Server,
      description: "Multiple tools",
      price: "£750",
      monthlyPrice: "+£150/mo",
      popular: true,
      depositAmount: 7500,
      features: ["3 automations", "Control dashboard", "Priority support"]
    }, {
      id: 3,
      name: "Premium",
      icon: Crown,
      description: "Full automation",
      price: "£1,500",
      monthlyPrice: "+£250/mo",
      depositAmount: 15000,
      features: ["Unlimited automations", "Custom dashboard", "Dedicated support", "Quarterly reviews"]
    }],
    mobile: [{
      id: 1,
      name: "Starter",
      icon: Smartphone,
      description: "Simple app",
      price: "£1,500",
      monthlyPrice: "+£95/mo",
      depositAmount: 15000,
      features: ["Booking/info app", "App Store ready", "Ongoing updates"]
    }, {
      id: 2,
      name: "Business",
      icon: Crown,
      description: "Full-featured",
      price: "£3,000",
      monthlyPrice: "+£150/mo",
      popular: true,
      depositAmount: 30000,
      features: ["User accounts", "Admin dashboard", "Tool integrations", "Priority support"]
    }, {
      id: 3,
      name: "Premium",
      icon: Server,
      description: "Fully custom",
      price: "from £5,000",
      monthlyPrice: "+£250/mo",
      depositAmount: 50000,
      features: ["Custom built", "AI features", "Dedicated team"]
    }],
    software: [{
      id: 1,
      name: "Starter",
      icon: Code,
      description: "Basic hosting",
      price: "£40/mo",
      depositAmount: 4000,
      features: ["1 email", "Daily backups", "Security updates", "Email support"]
    }, {
      id: 2,
      name: "Business",
      icon: Server,
      description: "Priority support",
      price: "£65/mo",
      popular: true,
      depositAmount: 6500,
      features: ["3 emails", "Monthly reports", "Fast support", "Monitoring"]
    }, {
      id: 3,
      name: "Premium",
      icon: Crown,
      description: "24/7 support",
      price: "£95/mo",
      depositAmount: 9500,
      features: ["Unlimited emails", "Smart monitoring", "Marketing insights", "24/7 priority"]
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
  return <section id="pricing" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden" aria-label="Pricing plans and packages">
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
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange/10 border border-orange/20 text-orange font-semibold mb-4 sm:mb-6 animate-fade-in-up text-sm sm:text-base">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Simple, Clear Pricing</span>
          </div>

          <h1 className="font-serif font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-white animate-fade-in-up stagger-delay-1 leading-tight">
            Choose a Package That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange/80 animate-gradient-x">
              Fits Your Business
            </span>
          </h1>

          <div className="max-w-4xl mx-auto mb-8 sm:mb-12 animate-fade-in-up stagger-delay-2">
            <p className="text-body text-white/80 mb-4 sm:mb-6">
              You'll work directly with our small team—no sales reps, just dedicated people focused on your project.
            </p>

            <div className="bg-gradient-to-r from-orange/20 to-orange/10 backdrop-blur-md border border-orange/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 inline-block shadow-2xl">
              <div className="flex items-center justify-center gap-2 sm:gap-3 text-white">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-orange flex-shrink-0" />
                <span className="text-sm sm:text-base lg:text-lg font-semibold text-center">
                  Complete builds delivered - no technical knowledge required
                </span>
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-orange flex-shrink-0 hidden sm:block" />
              </div>
            </div>
          </div>

          {/* Premium Category Switcher - Centered in Middle */}
          <div className="flex justify-center mb-8 sm:mb-12 px-4 animate-fade-in-up stagger-delay-3">
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
              <div className="hidden sm:inline-flex items-center justify-center space-x-3 bg-navy/40 backdrop-blur-lg p-3 rounded-3xl border border-white/10 shadow-2xl mx-auto">
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

        {/* Compact Pricing Cards */}
        <div className={`grid gap-4 md:gap-6 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          {currentPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative group transition-all duration-300 hover:-translate-y-1 ${isPopular ? 'md:scale-105 md:z-10' : ''}`}
              >
                {/* Popular Badge - Enhanced visibility on mobile */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-orange text-white px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-orange/40 animate-pulse-slow flex items-center gap-1.5">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-white" />
                      POPULAR
                    </div>
                  </div>
                )}

                <div className={`relative ${
                  isPopular
                    ? 'bg-navy border-2 border-orange shadow-lg shadow-orange/20'
                    : 'bg-navy/90 border border-white/20'
                } rounded-2xl p-5 md:p-6 flex flex-col h-full`}>

                  <div className="relative z-10">
                    {/* Header - Name + Price on same row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isPopular ? 'bg-orange text-white' : 'bg-white/10 text-orange'}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                          <p className="text-gray-400 text-sm">{plan.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Price - Simplified */}
                    <div className="mb-4 pb-4 border-b border-white/10">
                      {activeCategory === 'websites' ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white">{plan.buildPrice}</span>
                          <span className="text-orange text-sm font-medium">{plan.monthlyPrice}</span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white">{plan.price}</span>
                          {plan.monthlyPrice && (
                            <span className="text-orange text-sm font-medium">{plan.monthlyPrice}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Features - Compact list */}
                    <ul className="space-y-2 mb-5">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-orange flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <EnhancedButton
                      variant={isPopular ? "premium" : "outline"}
                      onClick={() => handleGetStarted(plan)}
                      disabled={isSubmitting}
                      className="w-full py-2.5 rounded-xl font-semibold text-sm"
                    >
                      {plan.ctaText || "Get Started"}
                    </EnhancedButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compare Plans Button - show for websites on all devices */}
        {activeCategory === 'websites' && (
          <div className="text-center mb-12 animate-fade-in-up">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center space-x-2 text-white/80 hover:text-orange transition-colors duration-300 text-lg font-medium"
            >
              <span>Compare Plans</span>
              {showComparison ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
        )}

        {/* Comparison Table - Desktop Version */}
        {activeCategory === 'websites' && showComparison && !isMobile && (
          <div className="mb-16 animate-fade-in-up">
            <div className="bg-gradient-to-br from-navy/90 via-navy to-purple-900/30 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Plan Comparison</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4 px-4 text-white font-semibold">Features</th>
                        <th className="text-center py-4 px-4 text-white font-semibold">Starter</th>
                        <th className="text-center py-4 px-4 text-white font-semibold">Growth</th>
                        <th className="text-center py-4 px-4 text-white font-semibold">Premium</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 font-medium">Pages</td>
                        <td className="text-center py-4 px-4">Up to 5</td>
                        <td className="text-center py-4 px-4">Up to 10</td>
                        <td className="text-center py-4 px-4">Unlimited</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 font-medium">SEO</td>
                        <td className="text-center py-4 px-4">Basic</td>
                        <td className="text-center py-4 px-4">Advanced + Analytics</td>
                        <td className="text-center py-4 px-4">Advanced + Reports</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 font-medium">Blog</td>
                        <td className="text-center py-4 px-4">-</td>
                        <td className="text-center py-4 px-4">✓</td>
                        <td className="text-center py-4 px-4">✓</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 font-medium">E-commerce</td>
                        <td className="text-center py-4 px-4">-</td>
                        <td className="text-center py-4 px-4">-</td>
                        <td className="text-center py-4 px-4">✓</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 font-medium">AI/Automation</td>
                        <td className="text-center py-4 px-4">-</td>
                        <td className="text-center py-4 px-4">AI Chatbot</td>
                        <td className="text-center py-4 px-4">Advanced Workflows</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 font-medium">CRM</td>
                        <td className="text-center py-4 px-4">-</td>
                        <td className="text-center py-4 px-4">-</td>
                        <td className="text-center py-4 px-4">✓</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4 font-medium">Support</td>
                        <td className="text-center py-4 px-4">Standard</td>
                        <td className="text-center py-4 px-4">Priority</td>
                        <td className="text-center py-4 px-4">Same-day Priority</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-medium">Revisions</td>
                        <td className="text-center py-4 px-4">1 round</td>
                        <td className="text-center py-4 px-4">2 rounds</td>
                        <td className="text-center py-4 px-4">Unlimited</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Sheet - Mobile Version */}
        {activeCategory === 'websites' && showComparison && isMobile && (
          <div className="mb-16 animate-fade-in-up">
            <div className="bg-gradient-to-br from-navy/90 via-navy to-purple-900/30 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-2xl overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Plan Comparison</h3>

                <div className="space-y-6">
                  {/* Features List - Mobile Friendly */}
                  {[
                    { feature: 'Pages', starter: 'Up to 5', growth: 'Up to 10', pro: 'Unlimited' },
                    { feature: 'SEO', starter: 'Basic', growth: 'Advanced + Analytics', pro: 'Advanced + Reports' },
                    { feature: 'Blog', starter: '✗', growth: '✓', pro: '✓' },
                    { feature: 'E-commerce', starter: '✗', growth: '✗', pro: '✓' },
                    { feature: 'AI/Automation', starter: '✗', growth: 'AI Chatbot', pro: 'Advanced Workflows' },
                    { feature: 'CRM', starter: '✗', growth: '✗', pro: '✓' },
                    { feature: 'Support', starter: 'Standard', growth: 'Priority', pro: 'Same-day Priority' },
                    { feature: 'Revisions', starter: '1 round', growth: '2 rounds', pro: 'Unlimited' }
                  ].map((row) => (
                    <div key={row.feature} className="border-b border-white/10 pb-4 last:border-b-0">
                      <div className="font-semibold text-white mb-2 text-lg">{row.feature}</div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="bg-white/5 rounded-lg p-2 text-center text-gray-300">
                          <div className="text-xs text-white/60 mb-1">Starter</div>
                          {row.starter}
                        </div>
                        <div className="bg-orange/10 rounded-lg p-2 text-center text-gray-300 border border-orange/30">
                          <div className="text-xs text-orange mb-1 font-semibold">Growth</div>
                          {row.growth}
                        </div>
                        <div className="bg-white/5 rounded-lg p-2 text-center text-gray-300">
                          <div className="text-xs text-white/60 mb-1">Pro</div>
                          {row.pro}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-gray-400 text-sm mb-4">Choose a plan above to get started</p>
                  <button
                    onClick={() => setShowComparison(false)}
                    className="inline-flex items-center text-orange hover:text-orange/80 transition-colors"
                  >
                    <ChevronUp className="h-5 w-5 mr-1" />
                    Close Comparison
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Pricing Note */}
        <div className="text-center mb-16 animate-fade-in-up" style={{
          animationDelay: '1.0s'
        }}>
          <p className="text-gray-300 text-lg">
            Need something unique? We'll price it fairly after a quick chat.
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
          
          <div className="relative bg-gradient-to-br from-navy/90 via-navy to-purple-900/30 backdrop-blur-lg rounded-3xl p-12 lg:p-16 text-center border border-white/10 shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-purple-500/5"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-orange/20 border border-orange/30 text-orange font-semibold mb-8">
                <Sparkles className="h-4 w-4" />
                <span>Something Different?</span>
              </div>

              <h3 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange group-hover:to-orange/80 transition-all duration-500 leading-tight">
                Need Something{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange/80">
                  Custom Built
                </span>
                ?
              </h3>

              <p className="text-xl lg:text-2xl mb-12 text-gray-200 leading-relaxed max-w-3xl mx-auto">
                Every business is different. Tell us what you need and we'll create something that works perfectly for you.
              </p>
              
              <button className="group/btn bg-gradient-to-r from-orange to-orange/80 text-white px-12 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-orange/50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden" onClick={() => navigate('/custom-quote')}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Custom Quote</span>
                  <Zap className="h-6 w-6 group-hover/btn:rotate-12 transition-transform duration-300" />
                </span>
              </button>
              
              <p className="text-white/60 italic mt-8 text-sm">
                Not sure which option fits? Message us—we'll advise honestly.
              </p>
            </div>
          </div>
      </div>
    </div>
  </section>;
};
export default Pricing;