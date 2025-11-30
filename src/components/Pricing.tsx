import { CheckCircle, Star, Crown, Code, ShoppingCart, Server, Smartphone, Brain, Monitor, Sparkles, Zap, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { Button as EnhancedButton } from "@/components/ui/button-enhanced";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import pricingHeroBg from "@/assets/pricing-hero-bg.jpg";
import { useNavigate } from "react-router-dom";
import { PricingAccordionSection } from "@/components/pricing/PricingAccordionSection";
import { FeatureExplainer } from "@/components/pricing/FeatureExplainer";
import { GetStartedModal } from "@/components/pricing/GetStartedModal";
import {
  websitePackages,
  automationPackages,
  appPackages,
  hostingPackages,
} from "@/data/pricingData";
import { EnhancedPackage } from "@/types/pricing";

const Pricing = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<EnhancedPackage | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGetStarted = (plan: EnhancedPackage) => {
    console.log('Get Started clicked:', plan.name);
    setSelectedPackage(plan);
    setShowGetStartedModal(true);
    console.log('Modal state set to true');
  };

  const handlePayNow = () => {
    if (!selectedPackage) return;

    const serviceName = `${selectedPackage.name} - Websites`;
    const params = new URLSearchParams({
      serviceName,
      amount: String(selectedPackage.depositAmount || 5000)
    });
    if (selectedPackage.paymentLink) params.set('paymentLink', selectedPackage.paymentLink);
    navigate(`/checkout?${params.toString()}`);
    toast({
      title: "Opening checkout...",
      description: `Getting started with ${selectedPackage.name}`
    });
  };

  return (
    <section id="pricing" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden" aria-label="Pricing plans and packages">
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
        </div>

        {/* WEBSITES SECTION - Prominent Position */}
        <div className="mb-16 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/20 border border-orange/30 text-orange font-semibold mb-4">
              <Monitor className="h-5 w-5" />
              <span>Most Popular for Small Businesses</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-2">
              Website Packages
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Get online with a professional website that works for your business
            </p>
          </div>

          {/* Website Pricing Cards */}
          <div className={`grid gap-4 md:gap-6 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            {websitePackages.map((plan) => {
              const IconComponent = plan.icon;
              const isPopular = plan.popular;

              return (
                <div
                  key={plan.id}
                  className={`relative group transition-all duration-300 hover:-translate-y-1 ${isPopular ? 'md:scale-105 md:z-10' : ''}`}
                >
                  {/* Popular Badge */}
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
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${isPopular ? 'bg-orange text-white' : 'bg-white/10 text-orange'}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                            <p className="text-gray-400 text-sm">{plan.tagline}</p>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-4 pb-4 border-b border-white/10">
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-2xl font-bold text-white">{plan.buildPrice}</span>
                              <span className="text-gray-400 text-xs">one-time</span>
                            </div>
                            <p className="text-gray-400 text-xs">
                              We design and build your complete website
                            </p>
                          </div>
                          <div>
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-lg font-semibold text-orange">{plan.monthlyPrice}</span>
                            </div>
                            <p className="text-gray-400 text-xs">
                              Hosting, security, updates & support
                            </p>
                            {plan.dailyCost && (
                              <p className="text-gray-500 text-xs mt-0.5 italic">{plan.dailyCost}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Benefits - Show plain language benefits with tooltips */}
                      <ul className="space-y-3 mb-5">
                        {plan.benefits.map((benefit, index) => (
                          <li key={index}>
                            <FeatureExplainer
                              icon={benefit.icon}
                              title={benefit.title}
                              description={benefit.description}
                              tooltip={benefit.tooltip}
                              variant="compact"
                            />
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <EnhancedButton
                        variant={isPopular ? "premium" : "outline"}
                        onClick={() => handleGetStarted(plan)}
                        className="w-full py-2.5 rounded-xl font-semibold text-sm"
                      >
                        Get Started
                      </EnhancedButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compare Plans Button - Always visible for websites */}
          <div className="text-center mb-12 animate-fade-in-up">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center space-x-2 text-white/80 hover:text-orange transition-colors duration-300 text-lg font-medium"
            >
              <span>Compare Website Plans</span>
              {showComparison ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {/* Comparison Table - Desktop Version */}
          {showComparison && !isMobile && (
            <div className="mb-16 animate-fade-in-up">
              <div className="bg-gradient-to-br from-navy/90 via-navy to-purple-900/30 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-8 text-center">Website Plan Comparison</h3>

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
                          <td className="py-4 px-4 font-medium">SEO (Get Found on Google)</td>
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
                          <td className="py-4 px-4 font-medium">E-commerce / Booking</td>
                          <td className="text-center py-4 px-4">-</td>
                          <td className="text-center py-4 px-4">-</td>
                          <td className="text-center py-4 px-4">✓</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-4 px-4 font-medium">AI Chat Assistant</td>
                          <td className="text-center py-4 px-4">-</td>
                          <td className="text-center py-4 px-4">✓</td>
                          <td className="text-center py-4 px-4">✓ Advanced</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-4 px-4 font-medium">Support Response Time</td>
                          <td className="text-center py-4 px-4">24-48 hours</td>
                          <td className="text-center py-4 px-4">Within 4 hours</td>
                          <td className="text-center py-4 px-4">Same day</td>
                        </tr>
                        <tr>
                          <td className="py-4 px-4 font-medium">Design Revisions</td>
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
          {showComparison && isMobile && (
            <div className="mb-16 animate-fade-in-up">
              <div className="bg-gradient-to-br from-navy/90 via-navy to-purple-900/30 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-2xl overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Website Plan Comparison</h3>

                  <div className="space-y-6">
                    {[
                      { feature: 'Pages', starter: 'Up to 5', growth: 'Up to 10', premium: 'Unlimited' },
                      { feature: 'SEO', starter: 'Basic', growth: 'Advanced', premium: 'Advanced + Reports' },
                      { feature: 'Blog', starter: '✗', growth: '✓', premium: '✓' },
                      { feature: 'E-commerce/Booking', starter: '✗', growth: '✗', premium: '✓' },
                      { feature: 'AI Chat', starter: '✗', growth: '✓', premium: '✓ Advanced' },
                      { feature: 'Support', starter: '24-48h', growth: '4 hours', premium: 'Same day' },
                      { feature: 'Revisions', starter: '1 round', growth: '2 rounds', premium: 'Unlimited' }
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
                            <div className="text-xs text-white/60 mb-1">Premium</div>
                            {row.premium}
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
        </div>

        {/* OTHER SERVICES - Collapsed Accordions */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white mb-2">
              Other Services
            </h2>
            <p className="text-gray-300 text-lg">
              Additional services to grow your business
            </p>
          </div>

          <PricingAccordionSection
            title="Automation Tools (AI)"
            description="Save time with automated workflows"
            packages={automationPackages}
            onSelectPackage={handleGetStarted}
          />

          <PricingAccordionSection
            title="Mobile Apps"
            description="Custom mobile apps for iOS and Android"
            packages={appPackages}
            onSelectPackage={handleGetStarted}
          />

          <PricingAccordionSection
            title="Hosting & Maintenance"
            description="Keep your website running smoothly"
            packages={hostingPackages}
            onSelectPackage={handleGetStarted}
          />
        </div>

        {/* Custom Pricing Note */}
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-gray-300 text-lg">
            Need something unique? We'll price it fairly after a quick chat.
          </p>
        </div>

        {/* Premium Guarantee & Trust Section */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center justify-center space-x-3 text-white/90 text-xl bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur-xl border border-green-400/30 px-8 py-4 rounded-2xl shadow-2xl">
            <Shield className="h-6 w-6 text-green-400" />
            <span className="font-semibold">30-day money-back guarantee on all plans</span>
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
        </div>

        {/* Premium Custom Quote Section */}
        <div className="relative group animate-fade-in-up">
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

              <button
                className="group/btn bg-gradient-to-r from-orange to-orange/80 text-white px-12 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-orange/50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                onClick={() => navigate('/custom-quote')}
              >
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

      {/* Get Started Modal */}
      <GetStartedModal
        open={showGetStartedModal}
        onOpenChange={setShowGetStartedModal}
        selectedPackage={selectedPackage}
        onPayNow={handlePayNow}
      />
    </section>
  );
};

export default Pricing;
