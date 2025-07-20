import React from 'react';
import { Check, X, Star } from 'lucide-react';
import { Button } from './ui/button';

const Pricing = () => {
  const pricingTiers = [
    {
      name: "Basic",
      price: "£300",
      period: "one-time",
      monthly: "Then £40/month for hosting & support",
      description: "Perfect for small businesses needing a professional web presence",
      popular: false,
      features: [
        "5 Pages Website",
        "Mobile Responsive Design",
        "Contact Form",
        "Basic SEO Setup",
        "Social Media Integration",
        "Google Maps Integration",
        "1 month of Revisions",
        "24/7 Hosting Support",
        "Basic Analytics Setup",
        "Loading Speed Optimization"
      ],
      notIncluded: [
        "Custom Animations",
        "E-commerce Features",
        "Database Integration",
        "User Authentication",
        "API Integration"
      ]
    },
    {
      name: "Professional",
      price: "£800",
      period: "one-time",
      monthly: "Then £60/month for hosting & support",
      description: "Ideal for growing businesses requiring advanced functionality",
      popular: true,
      features: [
        "Up to 10 Pages",
        "Mobile Responsive Design",
        "Advanced Contact Forms",
        "Complete SEO Package",
        "Social Media Integration",
        "Google Maps Integration",
        "Custom Animations",
        "Database Integration",
        "User Authentication",
        "3 Months Support",
        "Advanced Analytics",
        "Performance Optimization",
        "Content Management System",
        "SSL Certificate",
        "2 Months of Revisions"
      ],
      notIncluded: []
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      monthly: "Full-featured solution for large businesses with complex requirements",
      description: "",
      popular: false,
      features: [
        "Unlimited Pages",
        "Custom Design & Development",
        "E-commerce Integration",
        "Custom API Development",
        "Advanced User Authentication",
        "Multi-language Support",
        "Advanced Security Features",
        "Database Design & Integration",
        "Custom Admin Dashboard",
        "6 Months Support",
        "Performance Optimization",
        "Advanced Analytics Suite",
        "Load Balancing Setup",
        "CI/CD Pipeline",
        "Unlimited Revisions"
      ],
      notIncluded: []
    }
  ];

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-purple-800 to-slate-700 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-blue-500/5 to-purple-500/5" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float delay-1000" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-white">Our Pricing Plans</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6">
            <span className="block">CHOOSE YOUR</span>
            <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-text-glow">
              PACKAGE
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional web development solutions tailored to your business needs. 
            From simple websites to complex enterprise applications.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative group ${
                tier.popular 
                  ? 'transform scale-105 z-10' 
                  : 'hover:scale-105'
              } transition-all duration-500`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card */}
              <div className={`
                relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 h-full
                ${tier.popular 
                  ? 'bg-gradient-to-b from-orange-500/20 to-red-500/10 border-2 border-orange-500/50 shadow-2xl shadow-orange-500/25' 
                  : 'bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30'
                }
              `}>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl md:text-5xl font-bold text-white">{tier.price}</span>
                    {tier.period && <span className="text-gray-300 ml-2">{tier.period}</span>}
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{tier.monthly}</p>
                  {tier.description && (
                    <p className="text-gray-400 text-sm">{tier.description}</p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-6 mb-8 flex-1">
                  <div>
                    <h4 className="text-white font-semibold mb-4">Included features:</h4>
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tier.notIncluded.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-4">Not included:</h4>
                      <ul className="space-y-3">
                        {tier.notIncluded.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <X className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-500 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`
                    w-full py-3 font-semibold transition-all duration-300
                    ${tier.popular
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-orange-500/25'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50'
                    }
                  `}
                >
                  {tier.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6">
            Need something different? We can create a custom solution for your specific requirements.
          </p>
          <Button 
            variant="outline" 
            className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-3"
          >
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;