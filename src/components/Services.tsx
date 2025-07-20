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
      gradient: "from-blue-600 to-purple-600"
    },
    {
      icon: Server,
      title: "AI Assistant Development",
      description: "Tailored AI solutions that automate processes and enhance customer experiences with intelligent responses.",
      features: ["Custom AI Training", "Natural Language Processing", "Workflow Automation", "Integration Support", "24/7 AI Support"],
      price: "Starting at £2,800",
      popular: true,
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Search,
      title: "Tech Consulting",
      description: "Strategic technology guidance to optimize your digital infrastructure and drive business growth.",
      features: ["Technology Audit", "Digital Strategy", "Architecture Planning", "Process Optimization", "Team Training"],
      price: "£150/hour",
      popular: false,
      gradient: "from-green-600 to-teal-600"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Development",
      description: "Progressive web applications that deliver native app experiences across all devices.",
      features: ["PWA Development", "Offline Functionality", "Push Notifications", "App Store Deployment"],
      price: "Starting at £4,200",
      popular: false,
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Platforms",
      description: "Complete online stores with AI-powered recommendations and automated customer service.",
      features: ["Custom Shop Build", "Payment Integration", "AI Recommendations", "Inventory Management", "Analytics Dashboard"],
      price: "Starting at £5,500",
      popular: false,
      gradient: "from-pink-600 to-rose-600"
    },
    {
      icon: Palette,
      title: "Digital Transformation",
      description: "End-to-end digitalization of your business processes with modern web technologies and AI integration.",
      features: ["Process Analysis", "Custom Software", "AI Integration", "Staff Training", "Ongoing Support"],
      price: "Project-based pricing",
      popular: false,
      gradient: "from-cyan-600 to-blue-600"
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
                className={`relative overflow-hidden hover-lift group bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-500 animate-fade-in-up stagger-delay-${Math.min(index + 1, 5)} ${service.popular ? 'ring-2 ring-primary/20 scale-105' : ''}`}
              >
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-primary text-white border-0 animate-pulse-glow z-10">
                    <Target className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <CardHeader className="text-center relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-glow"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center">
                    <div className="text-lg font-semibold text-primary mb-3">{service.price}</div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group hover:bg-gradient-button hover:text-white hover:border-transparent transition-all duration-300"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
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