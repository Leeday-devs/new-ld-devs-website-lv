import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PricingModal } from "@/components/PricingModal";
import { ContactOptionsModal } from "@/components/ContactOptionsModal";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";
import { Code, Palette, Search, ShoppingCart, Server, BarChart, ArrowRight, Star, CheckCircle, Sparkles, Zap, Shield, Globe, Database, Smartphone, Layers, Rocket, Brain, Target } from "lucide-react";
const Services = () => {
  const containerRef = useStaggeredScrollAnimation('.service-card', 150);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleCardClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleChatClick = (e) => {
    e.stopPropagation(); // Prevent card click
    setIsContactModalOpen(true);
  };
  const services = [{
    icon: Server,
    title: "Hosting and Maintenance",
    description: "We keep your website running perfectly 24/7 and make sure everything works smoothly - like having a tech guardian!",
    features: ["Website Always Online", "Regular Updates", "Security Protection", "Fast Performance", "24/7 Monitoring", "Free Website Transfer"],
    price: "£40pm",
    monthlyPrice: "£40pm",
    isMonthlyOnly: true,
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    popular: false,
    technologies: ["Cloud Hosting", "Security", "Monitoring", "Support"],
    icon2: Server,
    pricingFeatures: ["99.9% Uptime Guarantee", "Daily Backups", "SSL Security Certificate", "Regular Updates", "Technical Support"]
  }, {
    icon: Code,
    title: "Build Me a Website",
    description: "We will build you an awesome website that works and looks amazing - just how you want it!",
    features: ["Up to 5 Pages", "Super Fast Website", "Mobile Friendly", "Free SSL Certificate", "24/7 Hosting Support", "1 Months Free Revisions", "Works on Phone & Computer", "Easy to Use Buttons", "Safe & Secure", "Free Website Transfer"],
    price: "£500",
    monthlyPrice: "£40",
    gradient: "from-blue-600 via-indigo-600 to-purple-700",
    popular: true,
    technologies: ["WordPress", "HTML/CSS", "Responsive", "SEO Ready"],
    icon2: Rocket,
    pricingFeatures: ["5 Pages Website", "Mobile Responsive Design", "Contact Form", "Basic SEO Setup", "Social Media Integration"]
  }, {
    icon: ShoppingCart,
    title: "Create Me a Online Store",
    description: "Build your online store! Sell anything from cupcakes to custom art - we make it super easy for customers to buy from you!",
    features: ["Beautiful Product Pages", "Easy Shopping Cart", "Secure Payment System", "Order Management", "Customer Account Area", "Mobile Shopping Ready", "Inventory Tracking", "Sales Reports & Analytics"],
    price: "£800",
    monthlyPrice: "£60",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    popular: false,
    technologies: ["E-commerce", "Stripe Payments", "Mobile Ready", "Analytics"],
    icon2: ShoppingCart,
    pricingFeatures: ["Unlimited Products", "Payment Gateway Setup", "Customer Management", "Order Tracking System", "SEO Optimized Store"]
  }, {
    icon: Brain,
    title: "AI Automations",
    description: "Smart AI helpers that work 24/7 to make your business run smoother - like having a super smart assistant!",
    features: ["Smart Chatbots", "Auto Customer Support", "Data Analysis", "Task Automation", "AI Content Creation"],
    price: "£600",
    monthlyPrice: "£75",
    gradient: "from-purple-600 via-indigo-600 to-blue-700",
    popular: false,
    technologies: ["AI Magic", "Automation", "Smart Bots", "Machine Learning"],
    icon2: Brain,
    pricingFeatures: ["Custom AI Assistant", "Automated Workflows", "Data Processing", "Smart Integrations", "24/7 AI Support"]
  }, {
    icon: Smartphone,
    title: "Phone & Tablet Apps",
    description: "Apps that work perfectly on phones, tablets, and computers - so everyone can use them anywhere!",
    features: ["Works on All Devices", "Touch-Friendly Buttons", "Pretty Animations", "Works Without Internet", "Super Easy to Use"],
    price: "Custom",
    monthlyPrice: "Contact us",
    gradient: "from-green-500 via-emerald-500 to-teal-600",
    popular: false,
    technologies: ["Phone Apps", "Tablet Apps", "Easy Touch", "Fun Design"],
    icon2: Smartphone,
    pricingFeatures: ["Unlimited Pages", "Custom Design & Development", "E-commerce Integration", "Advanced User Authentication", "Multi-language Support"]
  }, {
    icon: Globe,
    title: "Make Old Sites New",
    description: "We help make old websites work like new again - giving them superpowers with modern features and lightning-fast speed!",
    features: ["Fix Old Websites", "Make Things Faster", "Add New Features", "Connect Everything", "Teach People How to Use"],
    price: "Custom",
    monthlyPrice: "Contact us",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    popular: false,
    technologies: ["Fixing", "Upgrading", "Teaching", "Connecting"],
    icon2: Globe,
    pricingFeatures: ["Unlimited Pages", "Custom Design & Development", "E-commerce Integration", "Advanced User Authentication", "Multi-language Support"]
  }];
  return <section id="services" className="section-luxury py-20" aria-label="Our web development services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="heading-luxury heading-lg mb-6">
            Our <span className="text-gold">Premium</span> Services
          </h2>
          <p className="text-luxury max-w-3xl mx-auto">
            From concept to launch, we provide everything you need to establish a powerful online presence
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`card-luxury group cursor-pointer ${
                service.popular ? 'featured' : ''
              }`}
            >
              <div className="text-brand-orange mb-6 group-hover:text-brand-gold transition-colors">
                <service.icon className="h-14 w-14" />
              </div>
              <h3 className="heading-luxury heading-md mb-4">
                {service.title}
              </h3>
              <p className="text-muted-luxury mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-muted-luxury">
                    <CheckCircle className="h-5 w-5 text-brand-orange mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              {service.popular && (
                <div className="mt-6">
                  <span className="bg-gradient-luxury text-on-dark px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="btn-premium"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <PricingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />

      <ContactOptionsModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>;
};
export default Services;