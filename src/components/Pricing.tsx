import { CheckCircle, Star, Crown, Code, ShoppingCart, Server, Smartphone, Brain, Monitor } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState('websites');

  const categories = [
    { id: 'websites', label: 'Websites', icon: Monitor },
    { id: 'ai', label: 'AI Automations', icon: Brain },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { id: 'software', label: 'Software', icon: Code }
  ];

  const allPlans = {
    websites: [
      {
        id: 1,
        name: "Starter",
        icon: Code,
        description: "Perfect for small businesses and personal brands",
        price: "£695",
        monthlyPrice: "£40",
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
        name: "Mobile Starter",
        icon: Smartphone,
        description: "Simple mobile app for small businesses",
        price: "£1,000",
        monthlyPrice: "£60",
        features: [
          "iOS & Android apps",
          "Basic features",
          "App store submission",
          "3 months support",
          "Push notifications",
          "Basic analytics"
        ]
      },
      {
        id: 2,
        name: "Mobile Pro",
        icon: Crown,
        description: "Feature-rich mobile solution",
        price: "£2,000",
        monthlyPrice: "£100",
        features: [
          "Cross-platform apps",
          "Custom features",
          "Backend integration",
          "User accounts",
          "Payment processing",
          "6 months support",
          "Advanced analytics",
          "Push notifications"
        ]
      },
      {
        id: 3,
        name: "Mobile Enterprise",
        icon: Server,
        description: "Complete mobile ecosystem",
        price: "£4,000",
        monthlyPrice: "£150",
        features: [
          "Multiple apps",
          "Complex integrations",
          "Admin dashboard",
          "Real-time features",
          "Scalable backend",
          "12 months support",
          "Performance monitoring",
          "Custom API development"
        ]
      }
    ],
    software: [
      {
        id: 1,
        name: "Software Starter",
        icon: Code,
        description: "Custom software for small businesses",
        price: "£1,200",
        monthlyPrice: "£80",
        features: [
          "Custom application",
          "Basic functionality",
          "Database integration",
          "User management",
          "3 months support",
          "Documentation"
        ]
      },
      {
        id: 2,
        name: "Software Pro",
        icon: Server,
        description: "Advanced software solution",
        price: "£2,500",
        monthlyPrice: "£150",
        features: [
          "Complex workflows",
          "API integrations",
          "Advanced features",
          "Multi-user support",
          "Security features",
          "6 months support",
          "Training included",
          "Performance optimization"
        ]
      },
      {
        id: 3,
        name: "Software Enterprise",
        icon: Crown,
        description: "Enterprise-grade software platform",
        price: "£5,000",
        monthlyPrice: "£250",
        features: [
          "Scalable architecture",
          "Enterprise integrations",
          "Advanced security",
          "Custom modules",
          "24/7 monitoring",
          "12 months support",
          "Dedicated team",
          "Ongoing maintenance"
        ]
      }
    ]
  };

  const currentPlans = allPlans[activeCategory];

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

        {/* Category Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center space-x-6 bg-gray-50 p-2 rounded-2xl">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
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
                className="card-premium p-8 flex flex-col h-full"
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
                    className="w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 btn-secondary"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Started
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
    </section>
  );
};

export default Pricing;