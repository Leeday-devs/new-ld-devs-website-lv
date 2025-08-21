
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

        {/* Services Grid - Ultra Premium */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => {
            // Ultra-premium color schemes with glass morphism
            const isPrimary = index % 2 === 0;
            const colorScheme = isPrimary 
              ? {
                  gradient: 'bg-gradient-to-br from-orange/12 via-orange/8 via-white/95 to-orange/6',
                  border: 'border border-orange/25',
                  glass: 'backdrop-blur-xl bg-white/90',
                  icon: 'text-orange',
                  iconBg: 'bg-gradient-to-br from-orange/15 to-orange/25',
                  accent: 'bg-gradient-to-r from-orange via-orange/90 to-orange',
                  glow: 'shadow-[0_8px_32px_rgba(255,122,0,0.12),0_0_0_1px_rgba(255,122,0,0.05)]',
                  hoverGlow: 'hover:shadow-[0_20px_60px_rgba(255,122,0,0.25),0_0_0_1px_rgba(255,122,0,0.15)]'
                }
              : {
                  gradient: 'bg-gradient-to-br from-navy/12 via-navy/8 via-white/95 to-navy/6',
                  border: 'border border-navy/25',
                  glass: 'backdrop-blur-xl bg-white/90',
                  icon: 'text-navy',
                  iconBg: 'bg-gradient-to-br from-navy/15 to-navy/25',
                  accent: 'bg-gradient-to-r from-navy via-navy/90 to-navy',
                  glow: 'shadow-[0_8px_32px_rgba(10,25,47,0.15),0_0_0_1px_rgba(10,25,47,0.08)]',
                  hoverGlow: 'hover:shadow-[0_20px_60px_rgba(10,25,47,0.3),0_0_0_1px_rgba(10,25,47,0.2)]'
                };
            
            return (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-3xl ${colorScheme.gradient} ${colorScheme.border} ${colorScheme.glow} ${colorScheme.hoverGlow} transition-all duration-700 hover:scale-[1.03] hover:-translate-y-3 ${service.pricingCategory || service.isTemplates ? 'cursor-pointer' : ''}`}
                onClick={() => handleServiceClick(service.pricingCategory, service.isTemplates)}
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 80%, ${isPrimary ? 'rgba(255,122,0,0.08)' : 'rgba(10,25,47,0.08)'} 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, ${isPrimary ? 'rgba(255,122,0,0.06)' : 'rgba(10,25,47,0.06)'} 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(255,255,255,0.8) 0%, transparent 50%)
                  `
                }}
              >
                {/* Ultra-premium glass morphism overlay */}
                <div className={`absolute inset-0 rounded-3xl ${colorScheme.glass} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
                
                {/* Sophisticated light reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                
                {/* Premium shimmer animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out" />
                
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] ${colorScheme.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative p-12 z-10">
                  {/* Ultra-premium Icon Container */}
                  <div className="mb-10 relative">
                    <div className={`inline-flex p-6 rounded-2xl ${colorScheme.iconBg} backdrop-blur-md border border-white/20 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <service.icon className={`h-10 w-10 ${colorScheme.icon} drop-shadow-sm`} />
                    </div>
                    
                    {/* Floating particles effect */}
                    <div className={`absolute -top-2 -right-2 w-3 h-3 rounded-full ${colorScheme.accent} opacity-0 group-hover:opacity-60 group-hover:animate-bounce transition-all duration-500 delay-100`} />
                    <div className={`absolute -bottom-1 -left-1 w-2 h-2 rounded-full ${colorScheme.accent} opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-all duration-500 delay-200`} />
                  </div>

                  {/* Luxury Typography */}
                  <div className="mb-8">
                    <h3 className={`heading-primary text-3xl font-bold mb-3 ${colorScheme.icon} group-hover:text-navy transition-colors duration-500 leading-tight`}>
                      {service.title}
                    </h3>
                    <div className={`h-1 w-16 ${colorScheme.accent} rounded-full opacity-60 group-hover:w-24 group-hover:opacity-100 transition-all duration-500`} />
                  </div>

                  {/* Refined Description */}
                  <p className="text-lg leading-relaxed text-text-secondary mb-10 font-medium group-hover:text-text-primary transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Premium Features with enhanced styling */}
                  <ul className="space-y-5 mb-12">
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-center group/item"
                        style={{ animationDelay: `${featureIndex * 100}ms` }}
                      >
                        <div className={`relative p-2 rounded-xl ${colorScheme.iconBg} mr-5 group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300 backdrop-blur-sm border border-white/20`}>
                          <CheckCircle className={`h-4 w-4 ${colorScheme.icon}`} />
                          <div className={`absolute inset-0 rounded-xl ${colorScheme.accent} opacity-0 group-hover/item:opacity-20 blur-sm transition-opacity duration-300`} />
                        </div>
                        <span className="font-semibold text-text-primary group-hover/item:text-navy transition-colors duration-300 text-lg">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Ultra-premium Call-to-Action */}
                  {(service.pricingCategory || service.isTemplates) && (
                    <div className="text-center">
                      <div className={`inline-flex items-center px-8 py-4 rounded-2xl ${colorScheme.gradient} ${colorScheme.border} backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150 hover:scale-105`}>
                        <span className={`text-base font-bold ${colorScheme.icon} tracking-wide`}>
                          {service.pricingCategory ? 'View Luxury Packages' : 'Browse Premium Templates'} 
                          <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform duration-300">→</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Premium bottom gradient accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${colorScheme.accent} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />
                
                {/* Luxury corner accents */}
                <div className={`absolute top-6 right-6 w-6 h-6 border-r-2 border-t-2 ${isPrimary ? 'border-orange/30' : 'border-navy/30'} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                <div className={`absolute bottom-6 left-6 w-6 h-6 border-l-2 border-b-2 ${isPrimary ? 'border-orange/30' : 'border-navy/30'} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
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
