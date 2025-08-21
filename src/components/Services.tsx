
import { Code, Palette, Search, ShoppingCart, Server, BarChart, CheckCircle, Globe, Smartphone, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: Code,
      title: "Website Development",
      description: "Custom websites built with modern technology. Fast, responsive, and optimized for your business needs.",
      features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Mobile Friendly", "SSL Secured"],
      pricingCategory: "websites"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",  
      description: "Complete online stores with secure payments, inventory management, and customer accounts.",
      features: ["Payment Integration", "Product Management", "Order Tracking", "Customer Accounts", "Analytics"],
      pricingCategory: "websites"
    },
    {
      icon: Globe,
      title: "Pre-Built Sites",
      description: "Professional website templates ready to launch. Get online quickly with our beautiful, responsive designs.",
      features: ["Ready-Made Designs", "Fully Responsive", "Easy Customization", "Quick Setup", "Professional Look"],
      isTemplates: true
    },
    {
      icon: Server,
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
      icon: Brain,
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`card-premium p-8 group ${service.pricingCategory || service.isTemplates ? 'cursor-pointer hover:shadow-xl transition-all duration-300' : ''}`}
              onClick={() => handleServiceClick(service.pricingCategory, service.isTemplates)}
            >
              {/* Icon */}
              <div className="mb-6">
                <service.icon className="h-12 w-12 text-orange" />
              </div>

              {/* Title */}
              <h3 className="heading-primary heading-md mb-4 text-navy">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-body mb-6">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-text-secondary text-base">
                    <CheckCircle className="h-4 w-4 text-orange mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Click indicator for cards with pricing */}
              {service.pricingCategory && (
                <div className="mt-6 text-center">
                  <span className="text-sm text-orange font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to see pricing →
                  </span>
                </div>
              )}
              
              {/* Click indicator for templates */}
              {service.isTemplates && (
                <div className="mt-6 text-center">
                  <span className="text-sm text-orange font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Templates →
                  </span>
                </div>
              )}
            </div>
          ))}
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

export default Services;
