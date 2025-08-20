import { Code, Palette, Search, ShoppingCart, Server, BarChart, CheckCircle, Globe, Smartphone, Brain } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Website Development",
      description: "Custom websites built with modern technology. Fast, responsive, and optimized for your business needs.",
      features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Mobile Friendly", "SSL Secured"]
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",  
      description: "Complete online stores with secure payments, inventory management, and customer accounts.",
      features: ["Payment Integration", "Product Management", "Order Tracking", "Customer Accounts", "Analytics"]
    },
    {
      icon: Search,
      title: "SEO & Marketing",
      description: "Get found online with our SEO services and digital marketing strategies that drive results.",
      features: ["Keyword Research", "Content Strategy", "Local SEO", "Performance Tracking", "Monthly Reports"]
    },
    {
      icon: Server,
      title: "Hosting & Maintenance",
      description: "Reliable hosting with 24/7 monitoring, regular backups, and ongoing maintenance support.",
      features: ["99.9% Uptime", "Daily Backups", "Security Updates", "Performance Monitoring", "Technical Support"]
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications that work seamlessly across all devices.",
      features: ["iOS & Android", "Cross-Platform", "App Store Deployment", "Push Notifications", "Offline Support"]
    },
    {
      icon: Brain,
      title: "AI Integration",
      description: "Smart automation and AI-powered features to streamline your business operations.",
      features: ["Chatbots", "Process Automation", "Data Analysis", "Smart Workflows", "AI Content"]
    }
  ];

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
              className="bg-white rounded-xl p-8 border border-border-light shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="mb-6">
                <service.icon className="h-12 w-12 text-orange transition-transform duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-4 text-navy">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-text-secondary text-sm">
                    <CheckCircle className="h-4 w-4 text-orange mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-bg-grey rounded-2xl p-8">
            <h3 className="heading-primary text-2xl mb-4 text-navy">
              Ready to Get Started?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Let's discuss your project and create something amazing together. Get in touch for a free consultation.
            </p>
            <button 
              className="bg-orange hover:bg-orange/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;