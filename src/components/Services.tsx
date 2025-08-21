
import { Monitor, ShoppingBag, Cloud, CheckCircle, Package, Smartphone, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const Services = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: Monitor,
      title: "Website Development",
      description: "Custom websites built with modern technology. Fast, responsive, and optimized for your business needs.",
      features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Mobile Friendly", "SSL Secured"],
      pricingCategory: "websites"
    },
    {
      icon: ShoppingBag,
      title: "E-commerce Solutions",  
      description: "Complete online stores with secure payments, inventory management, and customer accounts.",
      features: ["Payment Integration", "Product Management", "Order Tracking", "Customer Accounts", "Analytics"],
      pricingCategory: "websites"
    },
    {
      icon: Package,
      title: "Pre-Built Sites",
      description: "Professional website templates ready to launch. Get online quickly with our beautiful, responsive designs.",
      features: ["Ready-Made Designs", "Fully Responsive", "Easy Customization", "Quick Setup", "Professional Look"],
      isTemplates: true
    },
    {
      icon: Cloud,
      title: "Hosting & Maintenance",
      description: "Reliable hosting with 24/7 monitoring, regular backups, and ongoing maintenance support.",
      features: ["99.9% Uptime", "Daily Backups", "Security Updates", "Performance Monitoring", "Technical Support"],
      pricingCategory: "software"
    },
    {
      icon: Smartphone,
      title: "Apps",
      description: "Native and cross-platform mobile applications that work seamlessly across all devices.",
      features: ["iOS & Android", "Cross-Platform", "App Store Deployment", "Push Notifications", "Offline Support"],
      pricingCategory: "mobile"
    },
    {
      icon: Bot,
      title: "AI Integration",
      description: "Smart automation and AI-powered features to streamline your business operations.",
      features: ["Chatbots", "Process Automation", "Data Analysis", "Smart Workflows", "AI Content"],
      pricingCategory: "ai"
    }
  ];

  const handleServiceClick = (pricingCategory?: string, isTemplates?: boolean) => {
    if (isTemplates) {
      navigate('/templates');
      return;
    }
    
    if (pricingCategory) {
      // First scroll to pricing section
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
        
        // Wait for scroll to complete, then trigger category switch
        setTimeout(() => {
          // Find and click the appropriate category button
          const categoryButtons = document.querySelectorAll('[data-category]');
          categoryButtons.forEach(button => {
            if (button.getAttribute('data-category') === pricingCategory) {
              (button as HTMLElement).click();
            }
          });
        }, 1000);
      }
    }
  };

  return (
    <section id="services" className="section-white py-20" aria-label="Our web development services">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-navy">
            Our <span className="text-orange">Premium</span> Services
          </h2>
          <p className="text-body max-w-3xl mx-auto text-text-secondary">
            From concept to launch, we provide everything you need to establish a powerful online presence
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => {
            // Premium color schemes with sophisticated gradients
            const colorSchemes = [
              { 
                bg: 'bg-gradient-to-br from-orange/8 via-orange/4 to-transparent', 
                border: 'border border-orange/20', 
                icon: 'text-orange',
                glow: 'shadow-[0_0_30px_rgba(255,122,0,0.1)]',
                hoverGlow: 'hover:shadow-[0_0_50px_rgba(255,122,0,0.25)]'
              },
              { 
                bg: 'bg-gradient-to-br from-navy/8 via-navy/4 to-transparent', 
                border: 'border border-navy/20', 
                icon: 'text-navy',
                glow: 'shadow-[0_0_30px_rgba(10,25,47,0.15)]',
                hoverGlow: 'hover:shadow-[0_0_50px_rgba(10,25,47,0.3)]'
              },
            ];
            
            const colorScheme = colorSchemes[index % colorSchemes.length];
            
            return (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-2xl bg-white ${colorScheme.bg} ${colorScheme.border} ${colorScheme.glow} ${colorScheme.hoverGlow} transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 ${service.pricingCategory || service.isTemplates ? 'cursor-pointer' : ''}`}
                onClick={() => handleServiceClick(service.pricingCategory, service.isTemplates)}
              >
                {/* Premium border gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Luxury shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                <div className="relative p-10 z-10">
                  {/* Premium Icon Container */}
                  <div className="mb-8 relative">
                    <div className={`inline-flex p-4 rounded-xl ${colorScheme.bg} ${colorScheme.border} backdrop-blur-sm`}>
                      <service.icon className={`h-8 w-8 ${colorScheme.icon} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    {/* Icon glow effect */}
                    <div className={`absolute inset-0 rounded-xl ${colorScheme.icon === 'text-orange' ? 'bg-orange/20' : 'bg-navy/20'} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  </div>

                  {/* Premium Title */}
                  <h3 className="heading-primary heading-md mb-6 text-navy group-hover:text-orange transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Enhanced Description */}
                  <p className="text-body mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Premium Features List */}
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-text-secondary group/item">
                        <div className={`p-1 rounded-full ${colorScheme.bg} ${colorScheme.border} mr-4 group-hover/item:scale-110 transition-transform duration-200`}>
                          <CheckCircle className={`h-3 w-3 ${colorScheme.icon}`} />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Premium Click Indicators */}
                  {service.pricingCategory && (
                    <div className="text-center">
                      <div className={`inline-flex items-center px-6 py-3 rounded-full ${colorScheme.bg} ${colorScheme.border} backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300`}>
                        <span className={`text-sm font-semibold ${colorScheme.icon}`}>
                          View Pricing Plans →
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {service.isTemplates && (
                    <div className="text-center">
                      <div className={`inline-flex items-center px-6 py-3 rounded-full ${colorScheme.bg} ${colorScheme.border} backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300`}>
                        <span className={`text-sm font-semibold ${colorScheme.icon}`}>
                          Browse Templates →
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Premium bottom accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorScheme.icon === 'text-orange' ? 'from-orange/50 via-orange to-orange/50' : 'from-navy/50 via-navy to-navy/50'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center`} />
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button 
            className="btn-primary px-10 py-4 text-lg font-semibold rounded-2xl"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
