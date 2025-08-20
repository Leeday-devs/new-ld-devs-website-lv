import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";
import { useState, useEffect } from "react";
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <section className="section-hero relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-luxury via-bg-premium to-bg-luxury" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-brand-orange/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-brand-gold/5 via-transparent to-transparent rounded-full blur-3xl" />
        
        {/* Animated overlay with particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        {/* Geometric moving lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent animate-slide-across"></div>
          <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent animate-slide-across-delayed"></div>
          <div className="absolute top-2/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent animate-slide-across-slow"></div>
        </div>
        
        {/* Floating geometric elements */}
        <div className="absolute inset-0">
          {/* Large floating shapes */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-full blur-xl animate-pulse"></div>
          
          {/* Modern geometric patterns */}
          <div className="absolute top-10 right-10 w-32 h-32 opacity-20 animate-rotate-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
              <polygon points="50,15 80,30 80,70 50,85 20,70 20,30" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1" />
              <polygon points="50,25 70,35 70,65 50,75 30,65 30,35" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" />
            </svg>
          </div>
          
          {/* Animated code elements */}
          <div className="absolute top-20 left-20 text-primary/20 text-4xl font-mono animate-float">{'<>'}</div>
          <div className="absolute top-40 right-20 text-secondary/20 text-3xl font-mono animate-float-delayed">AI</div>
          <div className="absolute bottom-40 left-16 text-accent/20 text-2xl font-mono animate-float">API</div>
          <div className="absolute bottom-20 right-32 text-primary/20 text-3xl font-mono animate-float-delayed">{'</>'}</div>
          
          {/* Neural network visualization */}
          <div className="absolute top-1/3 right-1/3 w-40 h-40 opacity-15 animate-pulse">
            <svg viewBox="0 0 100 100" className="text-primary">
              <circle cx="20" cy="20" r="3" fill="currentColor" />
              <circle cx="50" cy="20" r="3" fill="currentColor" />
              <circle cx="80" cy="20" r="3" fill="currentColor" />
              <circle cx="35" cy="50" r="3" fill="currentColor" />
              <circle cx="65" cy="50" r="3" fill="currentColor" />
              <circle cx="50" cy="80" r="3" fill="currentColor" />
              <line x1="20" y1="20" x2="35" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="50" y1="20" x2="35" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="50" y1="20" x2="65" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="80" y1="20" x2="65" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="35" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="65" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>
        </div>
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
    </section>;
};
export default Hero;