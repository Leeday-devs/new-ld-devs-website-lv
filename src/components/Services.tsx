
import { Monitor, ShoppingBag, Cloud, CheckCircle, Package, Smartphone, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Services = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
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
    <section 
      id="services" 
      className="relative pb-20 overflow-hidden min-h-screen" 
      aria-label="Our web development services"
    >
      {/* Rain on Glass Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-blue-100/60 to-blue-200/40" />
      
      {/* Glass texture overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Animated Raindrops - More realistic */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${15 + Math.random() * 30}px`,
              background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), rgba(59,130,246,0.1), transparent)',
              borderRadius: '50px',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              transform: `rotate(${-10 + Math.random() * 20}deg)`,
            }}
          />
        ))}
      </div>
      
      {/* Water droplets on glass */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={`droplet-${i}`}
            className="absolute rounded-full bg-gradient-radial from-blue-400/30 to-transparent animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${3 + Math.random() * 8}px`,
              height: `${3 + Math.random() * 8}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>
      
      {/* Glass distortion effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-blue-100/10 backdrop-blur-[0.5px]" />
      
      {/* Frosted glass overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 pt-20">
          <h2 className="heading-lg spacing-section text-navy drop-shadow-sm">
            Our <span className="text-highlight">Premium</span> Web Development Services
          </h2>
          <p className="text-body max-w-3xl mx-auto text-text-secondary drop-shadow-sm">
            Expert web development, e-commerce solutions, AI automation, and digital services for UK businesses. From concept to launch, we deliver premium solutions that drive real results.
          </p>
        </div>

        {/* Mobile App-Style Cards / Desktop Grid */}
        {isMobile ? (
          <div className="space-y-4">
            {services.map((service, index) => {
              const isPrimary = index % 2 === 0;
              const colorScheme = isPrimary 
                ? { icon: 'text-orange', accent: 'bg-gradient-to-r from-orange via-orange/90 to-orange' }
                : { icon: 'text-navy', accent: 'bg-gradient-to-r from-navy via-navy/90 to-navy' };
              
              return (
                <div key={index} className="mobile-app-card swipe-card">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-orange/20 to-orange/30 backdrop-blur-md border border-orange/20">
                      <service.icon className="h-6 w-6 text-orange drop-shadow-sm" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-navy mb-2 drop-shadow-sm">{service.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3 font-medium">{service.description}</p>
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="features" className="border-0">
                      <AccordionTrigger className="hover:no-underline py-2 text-sm font-medium text-gray-500">
                        View Features
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm">
                              <CheckCircle className="h-3 w-3 text-orange mr-2 flex-shrink-0 drop-shadow-sm" />
                              <span className="text-navy font-semibold">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  {(service.pricingCategory || service.isTemplates) && (
                    <button 
                      onClick={() => handleServiceClick(service.pricingCategory, service.isTemplates)}
                      className="mobile-app-button mt-4 text-base py-3 font-bold text-white shadow-lg"
                    >
                      {service.pricingCategory ? 'View Packages' : 'Browse Templates'} →
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service, index) => {
            // Premium color schemes matching pricing cards
            const isPrimary = index % 2 === 0;
            const colorScheme = isPrimary 
              ? {
                  cardBg: 'bg-gradient-to-br from-navy/95 via-navy to-purple-900/50',
                  border: 'border-2 border-orange/30',
                  shadow: 'shadow-2xl shadow-orange/10',
                  hoverShadow: 'hover:shadow-orange/30',
                  icon: 'text-white',
                  iconBg: 'bg-gradient-to-r from-orange to-orange/80',
                  accent: 'bg-gradient-to-r from-orange to-orange/80',
                  glow: 'bg-gradient-to-r from-orange to-orange/80'
                }
              : {
                  cardBg: 'bg-gradient-to-br from-navy/90 via-navy/95 to-blue-900/30',
                  border: 'border border-white/20',
                  shadow: 'shadow-2xl shadow-blue-900/20',
                  hoverShadow: 'hover:shadow-blue-400/30',
                  icon: 'text-white',
                  iconBg: 'bg-gradient-to-r from-blue-500/80 to-purple-500/80',
                  accent: 'bg-gradient-to-r from-blue-500/80 to-purple-500/80',
                  glow: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
                };
            
            return (
              <div
                key={index}
                className={`relative group transition-all duration-700 hover:-translate-y-4 animate-fade-in-up ${service.pricingCategory || service.isTemplates ? 'cursor-pointer' : ''}`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleServiceClick(service.pricingCategory, service.isTemplates)}
              >
                {/* Premium Glow Effect */}
                <div className={`absolute -inset-1 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 ${colorScheme.glow}`} />

                <div className={`relative ${colorScheme.cardBg} ${colorScheme.border} ${colorScheme.shadow} ${colorScheme.hoverShadow} rounded-3xl p-8 lg:p-10 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-3xl h-full flex flex-col`}>
                  
                  {/* Premium Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-50"></div>
                  <div className={`absolute top-0 right-0 w-32 h-32 ${isPrimary ? 'bg-gradient-to-br from-orange/10 to-transparent' : 'bg-gradient-to-br from-blue-500/10 to-transparent'} rounded-full blur-2xl`}></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Premium Icon Container */}
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${colorScheme.iconBg} shadow-xl group-hover:scale-110 transition-all duration-500`}>
                        <service.icon className={`h-8 w-8 ${colorScheme.icon}`} />
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-orange transition-colors duration-300 leading-tight">
                        {service.title}
                      </h3>
                      
                      {/* Premium accent line */}
                      <div className={`h-0.5 w-16 ${colorScheme.accent} rounded-full mx-auto opacity-60 group-hover:w-24 group-hover:opacity-100 transition-all duration-500`} />
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-lg leading-relaxed mb-6 text-center flex-grow">
                      {service.description}
                    </p>

                    {/* Premium Features List */}
                    <div className="mb-8">
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li 
                            key={featureIndex} 
                            className="flex items-start space-x-3 group/item"
                            style={{ animationDelay: `${(index * 150) + (featureIndex * 50)}ms` }}
                          >
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full ${colorScheme.accent} flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform duration-300 shadow-lg`}>
                              <CheckCircle className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-gray-200 font-medium leading-relaxed group-hover/item:text-white transition-colors duration-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Premium CTA Button */}
                    {(service.pricingCategory || service.isTemplates) && (
                      <div className="mt-auto">
                        <button className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-2xl ${colorScheme.accent} text-white ${colorScheme.hoverShadow} group/button overflow-hidden relative`}>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover/button:translate-x-[200%] transition-transform duration-1000"></div>
                          <div className="relative z-10 flex items-center justify-center space-x-2">
                            <span>{service.pricingCategory ? 'View Packages' : 'Browse Templates'}</span>
                            <span className="group-hover/button:translate-x-1 inline-block transition-transform duration-300">→</span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Premium bottom gradient accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t ${colorScheme.accent} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />
                </div>
              </div>
            );
          })}
          </div>
        )}

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
