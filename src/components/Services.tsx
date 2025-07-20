import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaymentButton } from "@/components/PaymentButton";
import { 
  Code, 
  Palette, 
  Search, 
  ShoppingCart, 
  Server, 
  BarChart,
  ArrowRight,
  Star,
  CheckCircle,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Database,
  Smartphone,
  Layers,
  Rocket,
  Brain,
  Target
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Build Me a Website",
      description: "We will build you an awesome website that works and looks amazing - just how you want it!",
      features: [
        "5 Page Website",
        "Super Fast Website",
        "Mobile Friendly",
        "Free SSL Certificate",
        "24/7 Hosting Support",
        "1 Months Free Revisions",
        "Works on Phone & Computer",
        "Easy to Use Buttons",
        "Safe & Secure",
        "Free Website Transfer",
        "Free SSL & Monthly Backup"
      ],
      price: "£300",
      monthlyPrice: "£40",
      gradient: "from-blue-600 via-indigo-600 to-purple-700",
      popular: false,
      technologies: ["React", "Fun Stuff", "Cool Code", "Magic"],
      icon2: Rocket,
      pricingFeatures: [
        "5 Pages Website",
        "Mobile Responsive Design",
        "Contact Form",
        "Basic SEO Setup",
        "Social Media Integration"
      ]
    },
    {
      icon: Server,
      title: "Hosting and Maintenance", 
      description: "We keep your website running perfectly 24/7 and make sure everything works smoothly - like having a tech guardian!",
      features: [
        "Website Always Online",
        "Regular Updates",
        "Security Protection",
        "Fast Performance",
        "24/7 Monitoring",
        "Free Website Transfer"
      ],
      price: "£40",
      monthlyPrice: "£40",
      gradient: "from-pink-500 via-rose-500 to-orange-500",
      popular: true,
      technologies: ["Cloud Hosting", "Security", "Monitoring", "Support"],
      icon2: Server,
      pricingFeatures: [
        "99.9% Uptime Guarantee",
        "Daily Backups",
        "SSL Security Certificate",
        "Regular Updates",
        "Technical Support"
      ]
    },
    {
      icon: Smartphone,
      title: "Phone & Tablet Apps",
      description: "Apps that work perfectly on phones, tablets, and computers - so everyone can use them anywhere!",
      features: [
        "Works on All Devices",
        "Touch-Friendly Buttons",
        "Pretty Animations",
        "Works Without Internet",
        "Super Easy to Use"
      ],
      price: "Custom",
      monthlyPrice: "Contact us",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      popular: false,
      technologies: ["Phone Apps", "Tablet Apps", "Easy Touch", "Fun Design"],
      icon2: Smartphone,
      pricingFeatures: [
        "Unlimited Pages",
        "Custom Design & Development",
        "E-commerce Integration",
        "Advanced User Authentication",
        "Multi-language Support"
      ]
    },
    {
      icon: Brain,
      title: "AI Automations",
      description: "Smart AI helpers that work 24/7 to make your business run smoother - like having a super smart robot assistant!",
      features: [
        "Smart Chatbots",
        "Auto Customer Support",
        "Data Analysis",
        "Task Automation",
        "AI Content Creation"
      ],
      price: "£500",
      monthlyPrice: "£75",
      gradient: "from-purple-600 via-indigo-600 to-blue-700",
      popular: false,
      technologies: ["AI Magic", "Automation", "Smart Bots", "Machine Learning"],
      icon2: Brain,
      pricingFeatures: [
        "Custom AI Assistant",
        "Automated Workflows",
        "Data Processing",
        "Smart Integrations",
        "24/7 AI Support"
      ]
    },
    {
      icon: ShoppingCart,
      title: "Online Stores",
      description: "Amazing online shops where people can buy things easily - like having your own digital mall!",
      features: [
        "Easy Shopping Cart",
        "Safe Payment System",
        "Inventory Tracking",
        "Sales Reports",
        "Customer Messages"
      ],
      price: "£800",
      monthlyPrice: "£60",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      popular: false,
      technologies: ["Shopping", "Payments", "Reports", "Customer Care"],
      icon2: ShoppingCart,
      pricingFeatures: [
        "Up to 10 Pages",
        "Advanced Contact Forms",
        "Complete SEO Package",
        "Custom Animations",
        "Database Integration"
      ]
    },
    {
      icon: Globe,
      title: "Make Old Things New",
      description: "We help make old websites and computers work like new again - like giving them superpowers!",
      features: [
        "Fix Old Websites",
        "Make Things Faster",
        "Add New Features",
        "Connect Everything",
        "Teach People How to Use"
      ],
      price: "Custom",
      monthlyPrice: "Contact us",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      popular: false,
      technologies: ["Fixing", "Upgrading", "Teaching", "Connecting"],
      icon2: Globe,
      pricingFeatures: [
        "Unlimited Pages",
        "Custom Design & Development",
        "E-commerce Integration",
        "Advanced User Authentication",
        "Multi-language Support"
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-accent/5 to-primary/10 relative overflow-hidden">
      {/* Advanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-l from-accent/10 to-primary/10 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-orange-400/5 to-pink-400/5 rounded-full blur-xl animate-pulse"></div>
        
        {/* AI and Code themed elements */}
        <div className="absolute top-10 left-10 text-primary/15 text-5xl font-mono animate-float">🤖</div>
        <div className="absolute top-32 right-16 text-accent/15 text-4xl font-mono animate-float-delayed">console.log()</div>
        <div className="absolute bottom-40 left-16 text-primary/15 text-3xl font-mono animate-pulse">npm install</div>
        <div className="absolute bottom-20 right-20 text-accent/15 text-4xl font-mono animate-float">function()</div>
        <div className="absolute top-1/3 left-1/4 text-primary/15 text-6xl font-mono animate-float-delayed">&lt;div&gt;</div>
        <div className="absolute top-2/3 right-1/4 text-accent/15 text-5xl font-mono animate-pulse">API</div>
        
        {/* Neural network visualization */}
        <div className="absolute top-1/4 right-1/3 w-40 h-40 opacity-10">
          <svg viewBox="0 0 100 100" className="text-primary animate-pulse">
            <circle cx="20" cy="20" r="3" fill="currentColor" />
            <circle cx="50" cy="20" r="3" fill="currentColor" />
            <circle cx="80" cy="20" r="3" fill="currentColor" />
            <circle cx="35" cy="50" r="3" fill="currentColor" />
            <circle cx="65" cy="50" r="3" fill="currentColor" />
            <circle cx="50" cy="80" r="3" fill="currentColor" />
            <line x1="20" y1="20" x2="35" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="50" y1="20" x2="35" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="50" y1="20" x2="65" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="80" y1="20" x2="65" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="35" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="65" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
        
        {/* Dynamic grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-primary/20" style={{ animationDelay: `${i * 0.05}s` }}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header with capabilities showcase */}
        <div className="max-w-5xl mx-auto text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-full mb-6 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Cool Things We Make</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6">
            <span className="block">WHAT WE</span>
            <span className="bg-gradient-to-r from-primary via-accent to-orange-400 bg-clip-text text-transparent animate-text-glow">
              BUILD
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            We take your ideas and turn them into amazing websites and apps that everyone will love to use! 
            It's like building with digital LEGO blocks, but way cooler!
          </p>

          {/* Capability highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { icon: Zap, label: "Super Fast" },
              { icon: Shield, label: "Safe & Secure" },
              { icon: Globe, label: "Works Everywhere" },
              { icon: Sparkles, label: "Really Cool" }
            ].map((cap, index) => (
              <div key={cap.label} className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                <cap.icon className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground font-medium">{cap.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced services grid with flip cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div key={service.title} className="group">
                <Card className={`relative h-[620px] overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${service.popular ? 'ring-2 ring-primary ring-offset-4' : ''}`}>
                  {/* Background with solid gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}></div>
                  
                  {/* Popular badge */}
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-orange-500 text-white border-0 shadow-lg">
                        ⭐ Popular
                      </Badge>
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col text-white p-6">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm p-4 mb-6 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 text-white">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/90 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Technology badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/30">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Features list */}
                    <div className="flex-grow mb-6">
                      <div className="space-y-3">
                        {service.features.slice(0, 3).map((feature) => (
                          <div key={feature} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-3 h-3 text-green-800" />
                            </div>
                            <span className="text-white text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6 text-center">
                      <div className="text-3xl font-bold text-white mb-1">{service.price}</div>
                      {service.monthlyPrice !== "Contact us" && (
                        <div className="text-white/80 text-sm">
                          Then {service.monthlyPrice}/month
                        </div>
                      )}
                    </div>
                    
                    {/* Buttons */}
                    <div className="space-y-3 mt-auto">
                      {service.title === "Build Me a Website" ? (
                        <PaymentButton className="w-full bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-xl font-semibold py-3 text-sm shadow-lg border-0" />
                      ) : (
                        <Button 
                          onClick={() => console.log('Buy Now clicked for:', service.title)}
                          className="w-full bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-xl font-semibold py-3 text-sm shadow-lg border-0"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Buy Now - {service.price}
                        </Button>
                      )}
                      <Button 
                        variant="outline"
                        onClick={() => {
                          console.log('WhatsApp clicked');
                          window.open('https://wa.me/447586266007', '_blank');
                        }}
                        className="w-full bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-gray-900 transition-all duration-200 rounded-xl font-semibold py-3 text-sm"
                      >
                        💬 Chat with Us
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA section */}
        <div className="text-center bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-12 glass animate-fade-in-up stagger-delay-4">
          <h3 className="text-3xl font-bold font-serif mb-4 text-glow">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Got a cool idea? Want to make something awesome for your school, family, or friends? Let's chat about it!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.open('https://wa.me/447586266007', '_blank')}
              className="bg-gradient-button hover:shadow-button transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
            >
              <Zap className="mr-2 h-5 w-5" />
              Let's Talk About Your Idea!
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 hover-lift border-primary/20 hover:border-primary/40"
            >
              Show Me Cool Examples
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;