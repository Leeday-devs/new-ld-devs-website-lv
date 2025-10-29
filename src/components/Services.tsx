
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
      title: "Web Design & Development",
      description: "I design and build fast, modern websites tailored to your goals.",
      features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Mobile Friendly", "SSL Secured"],
      pricingCategory: "websites"
    },
    {
      icon: ShoppingBag,
      title: "Ecommerce Solutions",  
      description: "I set up high-converting shops with secure payments and simple management.",
      features: ["Payment Integration", "Product Management", "Order Tracking", "Customer Accounts", "Analytics"],
      pricingCategory: "websites"
    },
    {
      icon: Package,
      title: "Re-Designs",
      description: "I overhaul outdated sites into premium, trustworthy experiences.",
      features: ["Ready-Made Designs", "Fully Responsive", "Easy Customization", "Quick Setup", "Professional Look"],
      isTemplates: true
    },
    {
      icon: Cloud,
      title: "Hosting & Maintenance",
      description: "I host, secure, and maintain your site with updates and backups.",
      features: ["99.9% Uptime", "Daily Backups", "Security Updates", "Performance Monitoring", "Technical Support"],
      pricingCategory: "software"
    },
    {
      icon: Bot,
      title: "AI & Automation",
      description: "I build AI tools and automations that save you hours each week.",
      features: ["Chatbots", "Process Automation", "Data Analysis", "Smart Workflows", "AI Content"],
      pricingCategory: "ai"
    },
    {
      icon: Smartphone,
      title: "Integrations",
      description: "I connect your site to CRMs, calendars, and payment systems.",
      features: ["iOS & Android", "Cross-Platform", "App Store Deployment", "Push Notifications", "Offline Support"],
      pricingCategory: "mobile"
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
            What <span className="text-highlight">I Can Build</span> For You
          </h2>
          <p className="text-body max-w-3xl mx-auto text-text-secondary drop-shadow-sm">
            Work directly with me from strategy to launch—fast replies, clear milestones, premium finish.
          </p>
        </div>

        {/* Services Grid/Accordion - Ultra Premium */}
        {isMobile ? (
          <Accordion type="single" collapsible className="w-full">
            {services.map((service, index) => {
              const isPrimary = index % 2 === 0;
              const colorScheme = isPrimary 
                ? { icon: 'text-orange', accent: 'bg-gradient-to-r from-orange via-orange/90 to-orange' }
                : { icon: 'text-navy', accent: 'bg-gradient-to-r from-navy via-navy/90 to-navy' };
              
              return (
                <AccordionItem key={index} value={`item-${index}`} className="border-orange/20 mb-4">
                  <AccordionTrigger className="hover:no-underline p-4 bg-white/90 rounded-t-xl border border-orange/25">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-orange/15 to-orange/25 backdrop-blur-md">
                        <service.icon className={`h-5 w-5 ${colorScheme.icon}`} />
                      </div>
                      <span className={`font-bold ${colorScheme.icon} text-left`}>{service.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-white/95 border-x border-b border-orange/25 rounded-b-xl p-4">
                    <p className="text-text-secondary mb-4 text-sm leading-relaxed">{service.description}</p>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className={`h-3 w-3 ${colorScheme.icon} mr-2 flex-shrink-0`} />
                          <span className="text-text-primary font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {(service.pricingCategory || service.isTemplates) && (
                      <button 
                        onClick={() => handleServiceClick(service.pricingCategory, service.isTemplates)}
                        className={`w-full text-center py-2 px-4 rounded-lg ${colorScheme.accent} text-white font-semibold text-sm hover:opacity-90 transition-opacity`}
                      >
                        {service.pricingCategory ? 'View Packages' : 'Browse Templates'} →
                      </button>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className={`relative group overflow-hidden rounded-2xl ${colorScheme.gradient} ${colorScheme.border} ${colorScheme.glow} ${colorScheme.hoverGlow} transition-all duration-700 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl ${service.pricingCategory || service.isTemplates ? 'cursor-pointer' : ''}`}
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
                <div className={`absolute inset-0 rounded-2xl ${colorScheme.glass} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
                
                {/* Sophisticated light reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                
                {/* Premium shimmer animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out" />
                
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] ${colorScheme.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative p-8 z-10">
                  {/* Ultra-premium Icon Container with enhanced animations */}
                  <div className="mb-6 relative">
                    <div className={`inline-flex p-4 rounded-xl ${colorScheme.iconBg} backdrop-blur-md border border-white/20 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-2xl`}>
                      <service.icon className={`h-7 w-7 ${colorScheme.icon} drop-shadow-sm transition-all duration-500 group-hover:text-orange group-hover:animate-pulse`} />
                    </div>
                    
                    {/* Floating particles effect */}
                    <div className={`absolute -top-2 -right-2 w-2 h-2 rounded-full ${colorScheme.accent} opacity-0 group-hover:opacity-60 group-hover:animate-bounce transition-all duration-500 delay-100`} />
                    <div className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full ${colorScheme.accent} opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-all duration-500 delay-200`} />
                  </div>

                   {/* Luxury Typography */}
                  <div className="mb-6">
                    <h3 className={`heading-md font-bold mb-2 ${colorScheme.icon} group-hover:text-navy transition-colors duration-500 leading-tight`}>
                      {service.title}
                    </h3>
                    <div className={`h-0.5 w-12 ${colorScheme.accent} rounded-full opacity-60 group-hover:w-20 group-hover:opacity-100 transition-all duration-500`} />
                  </div>

                  {/* Refined Description */}
                  <p className="text-base leading-relaxed text-text-secondary mb-6 font-medium group-hover:text-text-primary transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Premium Features with enhanced styling */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-center group/item"
                        style={{ animationDelay: `${featureIndex * 100}ms` }}
                      >
                        <div className={`relative p-1.5 rounded-lg ${colorScheme.iconBg} mr-3 group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300 backdrop-blur-sm border border-white/20`}>
                          <CheckCircle className={`h-3 w-3 ${colorScheme.icon}`} />
                          <div className={`absolute inset-0 rounded-lg ${colorScheme.accent} opacity-0 group-hover/item:opacity-20 blur-sm transition-opacity duration-300`} />
                        </div>
                        <span className="font-semibold text-text-primary group-hover/item:text-navy transition-colors duration-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Ultra-premium Call-to-Action */}
                  {(service.pricingCategory || service.isTemplates) && (
                    <div className="text-center">
                      <div className={`inline-flex items-center px-6 py-3 rounded-xl ${colorScheme.gradient} ${colorScheme.border} backdrop-blur-md shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 transition-all duration-500 delay-150 hover:scale-105`}>
                        <span className={`text-sm font-bold ${colorScheme.icon} tracking-wide`}>
                          {service.pricingCategory ? 'View Luxury Packages' : 'Browse Premium Templates'}
                          <span className="ml-2 sm:group-hover:translate-x-1 inline-block transition-transform duration-300">→</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Premium bottom gradient accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t ${colorScheme.accent} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />
                
                {/* Luxury corner accents */}
                <div className={`absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 ${isPrimary ? 'border-orange/30' : 'border-navy/30'} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                <div className={`absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 ${isPrimary ? 'border-orange/30' : 'border-navy/30'} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
              </div>
            );
          })}
          </div>
        )}

        {/* Direct Contact Guarantee */}
        <div className="text-center mt-12 mb-8">
          <p className="text-lg font-medium text-navy">
            You'll always deal directly with me—no middlemen.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button 
            className="btn-primary px-10 py-4 text-lg font-semibold rounded-2xl"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Work With Lee
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
