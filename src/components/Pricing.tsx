import { CheckCircle, Star, Crown, Code, ShoppingCart, Server } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      id: 1,
      name: "Starter Website",
      icon: Code,
      description: "Perfect for small businesses and personal brands",
      price: "£500",
      monthlyPrice: "£40",
      popular: false,
      features: [
        "Up to 5 pages",
        "Mobile responsive design",
        "Basic SEO setup",
        "Contact form",
        "SSL certificate",
        "3 months support"
      ]
    },
    {
      id: 2,
      name: "Business Pro",
      icon: Crown,
      description: "Most popular choice for growing businesses",
      price: "£800",
      monthlyPrice: "£60",
      popular: true,
      features: [
        "Up to 10 pages",
        "Premium design",
        "Advanced SEO",
        "Contact & booking forms",
        "Analytics integration",
        "6 months support",
        "Blog functionality",
        "Social media integration"
      ]
    },
    {
      id: 3,
      name: "E-commerce Store",
      icon: ShoppingCart, 
      description: "Complete online store solution",
      price: "£1,200",
      monthlyPrice: "£80",
      popular: false,
      features: [
        "Unlimited products",
        "Payment gateway setup",
        "Inventory management",
        "Customer accounts",
        "Order tracking",
        "12 months support",
        "Marketing tools",
        "Advanced analytics"
      ]
    }
  ];

  return (
    <section id="pricing" className="section-white py-20" aria-label="Pricing plans and packages">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-navy">
            Simple, <span className="text-orange">Transparent</span> Pricing
          </h2>
          <p className="text-body max-w-3xl mx-auto text-text-secondary">
            Choose the perfect plan for your business. All plans include hosting, SSL, and our expert support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  plan.popular 
                    ? 'border-2 border-orange transform scale-105' 
                    : 'border border-border-light hover:border-orange/30'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-orange text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <Star className="h-4 w-4 fill-white" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-orange" />
                  </div>
                </div>

                {/* Plan Info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-navy mb-2">{plan.name}</h3>
                  <p className="text-text-secondary text-sm mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-navy">{plan.price}</span>
                    <span className="text-text-muted">one-time</span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    + {plan.monthlyPrice}/month hosting
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-text-secondary">
                      <CheckCircle className="h-5 w-5 text-orange mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:-translate-y-1 shadow-md hover:shadow-lg ${
                    plan.popular
                      ? 'bg-orange hover:bg-orange/90 text-white'
                      : 'bg-orange hover:bg-orange/90 text-white'
                  }`}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                </button>

                {plan.popular && (
                  <p className="text-center text-xs text-text-muted mt-3">
                    Most businesses choose this plan
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="bg-bg-grey rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-navy mb-4">
              Need Something Custom?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Every business is unique. If none of our standard plans fit your needs, 
              let's discuss a custom solution tailored specifically for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="bg-navy hover:bg-navy/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Request Custom Quote
              </button>
              <p className="text-sm text-text-muted">
                Free consultation • No obligation
              </p>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-white border border-border-light rounded-full px-6 py-3 shadow-sm">
            <div className="w-8 h-8 bg-orange/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-orange" />
            </div>
            <span className="text-sm font-medium text-navy">
              30-day money-back guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;