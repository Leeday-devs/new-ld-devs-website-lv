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
              Looking for Something 
              <span className="block mt-4">
                <span className="text-orange">Extraordinary?</span>
              </span>
            </h1>
            
            <p className="text-body mb-12 max-w-3xl mx-auto text-white/80 text-xl leading-relaxed">
              Join hundreds of successful businesses who trust us to create 
              websites that not only look amazing but deliver real results.
            </p>

            {/* Trust Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-5 w-5 bg-orange rounded-full mr-1" />
                  ))}
                </div>
                <span className="text-white font-semibold">5-Star Rated</span>
              </div>
              <div className="text-white/60 hidden sm:block">•</div>
              <div className="text-white font-semibold">250+ Happy Clients</div>
              <div className="text-white/60 hidden sm:block">•</div>
              <div className="text-white font-semibold">99.9% Uptime</div>
            </div>

            {/* Contact Form */}
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1 border border-white/20">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email for a free consultation"
                    className="flex-1 bg-transparent text-white placeholder:text-white/60 px-6 py-4 outline-none text-lg"
                  />
                  <Button 
                    size="lg" 
                    className="bg-orange hover:bg-orange/90 text-white px-8 py-4 rounded-xl font-bold"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <p className="text-white/60 text-sm">
              Free consultation • No obligation • Quick response
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;