import { CheckCircle, Bot, Smartphone, Code, ShoppingCart, Server, Brain } from "lucide-react";
import { useState } from "react";

const Pricing = () => {
  const [selectedCategory, setSelectedCategory] = useState("websites");

  const categories = [
    { id: "websites", name: "Websites", icon: Code },
    { id: "ai", name: "AI Automations", icon: Bot },
    { id: "mobile", name: "Mobile Apps", icon: Smartphone },
    { id: "software", name: "Software", icon: Server }
  ];

  const planSets = {
    websites: [
      {
        id: 1,
        name: "Starter Website",
        icon: Code,
        description: "Perfect for small businesses and personal brands",
        price: "£500",
        monthlyPrice: "£40",
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
        icon: ShoppingCart,
        description: "Most popular choice for growing businesses",
        price: "£800",
        monthlyPrice: "£60",
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
    ],
    ai: [
      {
        id: 1,
        name: "Basic AI",
        icon: Bot,
        description: "Simple automation for everyday tasks",
        price: "£800",
        monthlyPrice: "£60",
        features: [
          "Chatbot integration",
          "Email automation",
          "Data processing",
          "Basic AI analytics",
          "API integrations",
          "3 months support"
        ]
      },
      {
        id: 2,
        name: "Smart AI",
        icon: Brain,
        description: "Advanced AI solutions for business growth",
        price: "£1,500",
        monthlyPrice: "£120",
        features: [
          "Custom AI models",
          "Predictive analytics",
          "Process automation",
          "Machine learning",
          "Advanced integrations",
          "6 months support",
          "Training & setup",
          "Performance monitoring"
        ]
      },
      {
        id: 3,
        name: "Enterprise AI",
        icon: Server,
        description: "Full-scale AI transformation",
        price: "£3,000",
        monthlyPrice: "£200",
        features: [
          "Custom AI infrastructure",
          "Multi-model integration",
          "Real-time processing",
          "Advanced security",
          "Scalable architecture",
          "12 months support",
          "Dedicated AI specialist",
          "24/7 monitoring"
        ]
      }
    ],
    mobile: [
      {
        id: 1,
        name: "Basic App",
        icon: Smartphone,
        description: "Simple mobile app for your business",
        price: "£1,200",
        monthlyPrice: "£80",
        features: [
          "iOS & Android",
          "Basic functionality",
          "Push notifications",
          "App store submission",
          "Basic analytics",
          "3 months support"
        ]
      },
      {
        id: 2,
        name: "Business App",
        icon: Smartphone,
        description: "Feature-rich mobile application",
        price: "£2,000",
        monthlyPrice: "£150",
        features: [
          "Cross-platform development",
          "Advanced features",
          "User authentication",
          "Payment integration",
          "Real-time updates",
          "6 months support",
          "Backend integration",
          "Advanced analytics"
        ]
      },
      {
        id: 3,
        name: "Enterprise App",
        icon: Server,
        description: "Complex enterprise mobile solution",
        price: "£4,000",
        monthlyPrice: "£300",
        features: [
          "Native performance",
          "Enterprise security",
          "Offline functionality",
          "Custom integrations",
          "Scalable architecture",
          "12 months support",
          "Dedicated developer",
          "Maintenance included"
        ]
      }
    ],
    software: [
      {
        id: 1,
        name: "Basic Software",
        icon: Code,
        description: "Simple desktop or web application",
        price: "£1,500",
        monthlyPrice: "£100",
        features: [
          "Custom development",
          "Basic functionality",
          "User interface",
          "Database integration",
          "Basic reporting",
          "3 months support"
        ]
      },
      {
        id: 2,
        name: "Business Software",
        icon: Server,
        description: "Comprehensive business solution",
        price: "£3,000",
        monthlyPrice: "£200",
        features: [
          "Advanced features",
          "Multi-user support",
          "Cloud deployment",
          "API integrations",
          "Advanced reporting",
          "6 months support",
          "Training included",
          "Regular updates"
        ]
      },
      {
        id: 3,
        name: "Enterprise Software",
        icon: Server,
        description: "Large-scale enterprise system",
        price: "£6,000",
        monthlyPrice: "£400",
        features: [
          "Scalable architecture",
          "Enterprise security",
          "Custom workflows",
          "Advanced integrations",
          "Performance optimization",
          "12 months support",
          "Dedicated team",
          "24/7 maintenance"
        ]
      }
    ]
  };

  const currentPlans = planSets[selectedCategory];

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
          <div className="bg-bg-grey p-2 rounded-xl">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-white text-orange shadow-sm'
                      : 'text-text-secondary hover:text-orange'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
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
                className="card-premium p-8 relative"
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

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-base">
                      <CheckCircle className="h-5 w-5 text-orange mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  className="w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 btn-secondary"
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