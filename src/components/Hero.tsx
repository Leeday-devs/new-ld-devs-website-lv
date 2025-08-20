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
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="heading-primary heading-xl mb-8 text-white leading-tight">
              Build Your Dream Website
              <span className="block text-orange mt-4 font-bold">
                That Actually Works
              </span>
            </h1>
            
            <p className="text-body mb-12 max-w-2xl mx-auto text-white/70 text-xl leading-relaxed">
              Professional web development and hosting services for UK businesses. 
              We create fast, secure, and beautiful websites that drive real results.
            </p>
            
            <div className="mb-16">
              <Button 
                size="lg" 
                className="bg-orange hover:bg-orange/90 text-white font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-200 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-12 text-white/60">
              <div className="flex items-center gap-3 hover:text-white/80 transition-colors">
                <Shield className="h-6 w-6 text-orange" />
                <span className="font-medium">SSL Secured</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white/80 transition-colors">
                <Zap className="h-6 w-6 text-orange" />
                <span className="font-medium">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white/80 transition-colors">
                <Award className="h-6 w-6 text-orange" />
                <span className="font-medium">5-Star Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;