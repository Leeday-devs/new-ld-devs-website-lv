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
    <section 
      id="pricing" 
      className="py-20 bg-white" 
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

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.id}
                className={`${plan.popular ? 'card-featured' : 'card-premium'} p-8 relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

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
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-base">
                      <CheckCircle className="h-5 w-5 text-orange mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    plan.popular ? 'btn-primary' : 'btn-secondary'
                  }`}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                </button>
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
    </section>
  );
};

export default Pricing;