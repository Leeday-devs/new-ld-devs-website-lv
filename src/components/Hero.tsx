import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      className="section-hero relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section with company introduction"
    >
      {/* Luxury Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-luxury via-bg-premium to-bg-luxury" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-brand-orange/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-brand-gold/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="heading-luxury heading-xl mb-8 max-w-5xl mx-auto">
                Build Your Dream Website
                <span className="block text-gold mt-4">
                  That Actually Works
                </span>
              </h1>
              
              <p className="text-luxury mb-12 max-w-3xl mx-auto text-muted-luxury">
                Professional web development and hosting services for UK businesses. 
                We create fast, secure, and beautiful websites that drive real results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Button 
                  size="lg" 
                  className="btn-primary"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="btn-ghost"
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Our Work
                </Button>
              </div>

              {/* Premium Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-12 text-muted-luxury">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-gold" />
                  <span className="font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-gold" />
                  <span className="font-medium">Lightning Fast</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-gold" />
                  <span className="font-medium">5-Star Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;