import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  projectType: string;
  result: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Marketing Director",
    company: "TechFlow Solutions",
    content: "LD Development transformed our online presence completely. The new website increased our leads by 300% in just 3 months. Their attention to detail and understanding of our business needs was exceptional.",
    rating: 5,
    projectType: "E-commerce Website",
    result: "300% increase in leads"
  },
  {
    id: "2", 
    name: "James Thompson",
    role: "CEO",
    company: "GreenSpace Architects", 
    content: "Working with LD Development was a game-changer. They delivered a stunning portfolio website that perfectly showcases our architectural projects. The site loads incredibly fast and looks amazing on all devices.",
    rating: 5,
    projectType: "Portfolio Website",
    result: "40% faster loading time"
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    role: "Owner",
    company: "Boutique Fashion Studio",
    content: "The team at LD Development created exactly what we envisioned - a beautiful, modern e-commerce platform that our customers love. Sales have increased by 250% since the launch.",
    rating: 5,
    projectType: "E-commerce Platform", 
    result: "250% sales increase"
  },
  {
    id: "4",
    name: "David Chen",
    role: "Founder",
    company: "FitLife Wellness",
    content: "Outstanding work! The booking system and client portal they built has streamlined our entire operation. What used to take hours now takes minutes. Couldn't be happier with the results.",
    rating: 5,
    projectType: "Custom Web App",
    result: "90% time savings"
  }
];

const EnhancedTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-navy">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-body text-white/80 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what business owners say about working with us.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-orange">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-white/60 text-sm font-medium">
                {currentTestimonial.projectType}
              </span>
            </div>
            
            <Quote className="h-8 w-8 text-orange mb-4" />
            
            <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-medium">
              "{currentTestimonial.content}"
            </blockquote>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange to-orange/80 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">{currentTestimonial.name}</div>
                  <div className="text-white/60 text-sm">{currentTestimonial.role}, {currentTestimonial.company}</div>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-2 bg-orange/20 px-4 py-2 rounded-full">
                <span className="text-orange text-sm font-semibold">Result:</span>
                <span className="text-white text-sm">{currentTestimonial.result}</span>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                onClick={prevTestimonial}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 border border-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-orange w-8' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                onClick={nextTestimonial}
                variant="ghost"
                size="sm" 
                className="text-white hover:bg-white/10 border border-white/20"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-orange/30"
              onMouseEnter={() => setHoveredCard(testimonial.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-orange fill-current" />
                ))}
              </div>
              
              <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-3">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange to-orange/80 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{testimonial.name}</div>
                  <div className="text-white/60 text-xs">{testimonial.company}</div>
                </div>
              </div>
              
              {hoveredCard === testimonial.id && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <span className="text-orange text-xs font-semibold">
                    {testimonial.result}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-white/80 mb-4">Ready to join our success stories?</p>
          <Button 
            className="btn-primary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Work With Lee
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;