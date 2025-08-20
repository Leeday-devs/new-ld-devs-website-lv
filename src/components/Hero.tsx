import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";
import { useState, useEffect } from "react";
import heroBusiness from "@/assets/hero-business-tech.jpg";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      className="bg-navy min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-label="Hero section with company introduction"
    >
      {/* Premium business photo with navy overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBusiness})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-orange/20" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange/10 via-transparent to-navy/20 animate-gradient bg-[length:200%_200%]" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className={`transition-all duration-1500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="heading-primary heading-xl mb-8 text-white leading-tight font-bold">
              Build Your <span className="text-orange">Dream Website</span>
              <span className="block mt-4">
                That Actually <span className="text-orange">Works</span>
              </span>
            </h1>
            
            <p className="text-body mb-12 max-w-3xl mx-auto text-white/80 text-xl leading-relaxed">
              Premium web development and hosting services for UK businesses. 
              We create <span className="text-orange font-semibold">fast, secure, and beautiful</span> websites that drive real results.
            </p>
            
            <div className="mb-16">
              <Button 
                size="lg" 
                className="btn-primary px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Your Project
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;