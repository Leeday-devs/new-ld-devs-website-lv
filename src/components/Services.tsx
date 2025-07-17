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
      icon: Palette,
      title: "Web Design",
      description: "Custom, responsive designs that captivate your audience and reflect your brand identity.",
      features: ["UI/UX Design", "Brand Identity", "Responsive Layout", "Figma Prototypes"],
      price: "Starting at £1,200"
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, fast, and secure websites built with the latest technologies and best practices.",
      features: ["React & TypeScript", "Node.js Backend", "Database Integration", "API Development"],
      price: "Starting at £2,400"
    },
    {
      icon: Server,
      title: "Hosting & Maintenance",
      description: "Reliable hosting solutions with ongoing support, updates, and performance monitoring.",
      features: ["Cloud Hosting", "SSL Certificates", "Regular Backups", "24/7 Monitoring"],
      price: "Starting at £40/month"
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Improve your search rankings and drive organic traffic with comprehensive SEO strategies.",
      features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Performance Optimization"],
      price: "Starting at £640"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimization",
      description: "Ensure your website looks and performs perfectly on all devices and screen sizes.",
      features: ["Responsive Design", "Mobile-First Approach", "Touch Optimization", "App-like Experience"],
      price: "Included in all packages"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Complete online store development with payment processing and inventory management.",
      features: ["Shopping Cart", "Payment Integration", "Inventory Management", "Order Processing"],
      price: "Starting at £4,000"
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Comprehensive Web Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            From concept to launch and beyond, I provide end-to-end services to bring your digital vision to life.
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
            Need a custom solution? Let's discuss your specific requirements.
          </p>
          <Button size="lg" className="bg-gradient-primary border-0 text-white hover:scale-105 transition-smooth shadow-glow">
            Get Custom Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;