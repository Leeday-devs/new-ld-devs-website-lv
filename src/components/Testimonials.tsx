import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Solutions",
      role: "CEO",
      content: "Lee Day Devs transformed our online presence completely. Their attention to detail and technical expertise is outstanding. Our website now loads faster and converts better than ever before.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=faces"
    },
    {
      name: "Michael Chen",
      company: "E-Commerce Plus",
      role: "Founder",
      content: "The e-commerce platform they built for us has increased our sales by 300%. The user experience is seamless, and the admin panel makes managing our inventory effortless.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces"
    },
    {
      name: "Emma Williams",
      company: "Creative Agency UK",
      role: "Marketing Director",
      content: "Professional, responsive, and delivered exactly what we needed. Our new website perfectly represents our brand and has significantly improved our client acquisition.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-accent/5 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
              alt="Google"
              className="h-6 w-6"
            />
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">5.0 Google Rating</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-primary mb-4" />
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name} - ${testimonial.role} at ${testimonial.company}, satisfied customer of LD Development web design services`}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Join our 150+ satisfied clients and transform your online presence with our expert web development services
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact"
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
              title="Contact LD Development for web design consultation"
            >
              Get Your Free Consultation
            </a>
            <span className="text-muted-foreground">•</span>
            <a 
              href="#services"
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
              title="View our web development and hosting services"
            >
              View Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;