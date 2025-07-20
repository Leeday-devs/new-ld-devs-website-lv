import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Server, 
  Search, 
  Smartphone, 
  ShoppingCart,
  Palette,
  ArrowRight,
  Sparkles,
  Zap,
  Target
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Custom Web Development",
      description: "ROI-focused web applications built with modern frameworks. Scalable solutions that grow with your business.",
      features: ["React & TypeScript", "Node.js & Express", "Database Design", "API Development", "Performance Optimization"],
      price: "Starting at £3,500",
      popular: false,
      gradient: "from-orange-500 via-orange-600 to-red-500"
    },
    {
      icon: Server,
      title: "AI Assistant Development",
      description: "Tailored AI solutions that automate processes and enhance customer experiences with intelligent responses.",
      features: ["Custom AI Training", "Natural Language Processing", "Workflow Automation", "Integration Support", "24/7 AI Support"],
      price: "Starting at £2,800",
      popular: true,
      gradient: "from-blue-600 via-blue-700 to-indigo-600"
    },
    {
      icon: Search,
      title: "Tech Consulting",
      description: "Strategic technology guidance to optimize your digital infrastructure and drive business growth.",
      features: ["Technology Audit", "Digital Strategy", "Architecture Planning", "Process Optimization", "Team Training"],
      price: "£150/hour",
      popular: false,
      gradient: "from-gray-800 via-gray-900 to-black"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Development",
      description: "Progressive web applications that deliver native app experiences across all devices.",
      features: ["PWA Development", "Offline Functionality", "Push Notifications", "App Store Deployment"],
      price: "Starting at £4,200",
      popular: false,
      gradient: "from-orange-400 via-amber-500 to-yellow-500"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Platforms",
      description: "Complete online stores with AI-powered recommendations and automated customer service.",
      features: ["Custom Shop Build", "Payment Integration", "AI Recommendations", "Inventory Management", "Analytics Dashboard"],
      price: "Starting at £5,500",
      popular: false,
      gradient: "from-blue-500 via-indigo-600 to-purple-600"
    },
    {
      icon: Palette,
      title: "Digital Transformation",
      description: "End-to-end digitalization of your business processes with modern web technologies and AI integration.",
      features: ["Process Analysis", "Custom Software", "AI Integration", "Staff Training", "Ongoing Support"],
      price: "Project-based pricing",
      popular: false,
      gradient: "from-gray-700 via-orange-600 to-red-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-secondary/20 via-background to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header */}
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-scale-in-bounce">
            <Sparkles className="h-4 w-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-primary">Our Services</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 animate-fade-in-up stagger-delay-1">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Tailored Solutions
            </span>
            <br />
            <span className="text-foreground">for Your Success</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in-up stagger-delay-2">
            Driving measurable business results through tailored technology solutions. From high-performance web applications 
            to intelligent AI assistants that work 24/7 for your success.
          </p>
        </div>

        {/* Services grid with enhanced styling */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.title} 
                className={`relative overflow-hidden group border-0 shadow-2xl transition-all duration-500 animate-fade-in-up stagger-delay-${Math.min(index + 1, 5)} rounded-3xl ${service.popular ? 'ring-4 ring-orange-400/50 scale-105' : ''}`}
              >
                {/* Solid gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}></div>
                
                {service.popular && (
                  <Badge className="absolute top-6 right-6 bg-white text-black border-0 animate-pulse-glow z-20 font-semibold px-3 py-1">
                    <Target className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                {/* Dark overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/20 z-10"></div>
                
                <CardHeader className="text-center relative z-20 text-white p-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm p-3 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30 shadow-xl">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <CardTitle className="text-lg text-white font-bold mb-2 drop-shadow-lg">
                    {service.title}
                  </CardTitle>
                  
                  <CardDescription className="text-white/90 leading-relaxed text-sm drop-shadow-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-20 text-white px-4 pb-4">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/25 shadow-lg">
                    <div className="grid grid-cols-1 gap-2">
                      {service.features.slice(0, 3).map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-xs text-white font-medium">
                          <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xl font-bold text-white mb-3 drop-shadow-lg">{service.price}</div>
                    <Button 
                      size="sm"
                      className="w-full bg-white/25 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-xl font-semibold py-2 text-sm shadow-xl"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced CTA section */}
        <div className="text-center bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-12 glass animate-fade-in-up stagger-delay-4">
          <h3 className="text-3xl font-bold font-serif mb-4 text-glow">
            Ready to Transform Your Business?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your business with tailored technology solutions? Let's discuss your specific goals and ROI targets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-button hover:shadow-button transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
            >
              <Zap className="mr-2 h-5 w-5" />
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 hover-lift border-primary/20 hover:border-primary/40"
            >
              Request AI Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;