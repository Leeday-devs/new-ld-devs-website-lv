import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Code, 
  Server, 
  Search, 
  Smartphone, 
  ShoppingCart,
  ArrowRight
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Custom Web Development",
      description: "ROI-focused web applications built with modern frameworks. Scalable solutions that grow with your business.",
      features: ["React & TypeScript", "Node.js & Express", "Database Design", "API Development", "Performance Optimization"],
      price: "Starting at £3,500"
    },
    {
      icon: Server,
      title: "AI Assistant Development",
      description: "Tailored AI solutions that automate processes and enhance customer experiences with intelligent responses.",
      features: ["Custom AI Training", "Natural Language Processing", "Workflow Automation", "Integration Support", "24/7 AI Support"],
      price: "Starting at £2,800"
    },
    {
      icon: Search,
      title: "Tech Consulting",
      description: "Strategic technology guidance to optimize your digital infrastructure and drive business growth.",
      features: ["Technology Audit", "Digital Strategy", "Architecture Planning", "Process Optimization", "Team Training"],
      price: "£150/hour"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Development",
      description: "Progressive web applications that deliver native app experiences across all devices.",
      features: ["PWA Development", "Offline Functionality", "Push Notifications", "App Store Deployment"],
      price: "Starting at £4,200"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Platforms",
      description: "Complete online stores with AI-powered recommendations and automated customer service.",
      features: ["Custom Shop Build", "Payment Integration", "AI Recommendations", "Inventory Management", "Analytics Dashboard"],
      price: "Starting at £5,500"
    },
    {
      icon: Palette,
      title: "Digital Transformation",
      description: "End-to-end digitalization of your business processes with modern web technologies and AI integration.",
      features: ["Process Analysis", "Custom Software", "AI Integration", "Staff Training", "Ongoing Support"],
      price: "Project-based pricing"
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Web Development • AI Solutions • Tech Consulting
          </h2>
          <p className="text-lg text-muted-foreground">
            Driving measurable business results through tailored technology solutions. From high-performance web applications 
            to intelligent AI assistants that work 24/7 for your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="bg-gradient-card border-0 shadow-elegant hover:shadow-glow transition-smooth group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary mb-3">{service.price}</div>
                  <Button variant="outline" size="sm" className="w-full group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <p className="text-muted-foreground mb-6">
            Ready to transform your business with tailored technology solutions? Let's discuss your specific goals and ROI targets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary border-0 text-white hover:scale-105 transition-smooth shadow-glow">
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-primary/10">
              Request AI Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;