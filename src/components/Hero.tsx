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
      className="section-navy min-h-screen flex items-center justify-center"
      aria-label="Hero section with company introduction"
    >

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="heading-primary heading-xl mb-8 max-w-5xl mx-auto text-white">
                Build Your Dream Website
                <span className="block text-orange mt-4">
                  That Actually Works
                </span>
              </h1>
              
              <p className="text-body mb-12 max-w-3xl mx-auto text-white/80">
                Professional web development and hosting services for UK businesses. 
                We create fast, secure, and beautiful websites that drive real results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Our Work
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-12 text-white/70">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-orange" />
                  <span className="font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-orange" />
                  <span className="font-medium">Lightning Fast</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-orange" />
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