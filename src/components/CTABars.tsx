import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight, Sparkles, Star, Phone } from "lucide-react";

const CTABars = () => {
  return (
    <>
      {/* CTA Bar 1 - After Services */}
      <section className="py-20 section-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-texture-dots opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/20 backdrop-blur-md rounded-full border border-secondary/30 mb-6">
              <Rocket className="h-5 w-5 text-secondary animate-bounce" />
              <span className="text-secondary font-semibold">Ready to Transform?</span>
            </div>
            
            <h2 className="text-heading text-heading-dark text-4xl md:text-5xl mb-6">
              Your Dream Website Awaits
            </h2>
            
            <p className="text-body text-body-dark text-xl mb-8 leading-relaxed">
              Join 150+ successful businesses who chose excellence. Let's build something extraordinary together.
            </p>
            
            <Button 
              onClick={() => window.open('https://wa.me/447586266007', '_blank')}
              className="bg-secondary text-primary hover:shadow-gold text-xl px-10 py-5 rounded-full font-bold tracking-wide shadow-elegant transition-all duration-500 hover:scale-105 group"
            >
              <Phone className="mr-3 h-6 w-6 group-hover:animate-pulse" />
              Get Your Free Consultation
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Bar 2 - Full Orange → Gold Gradient (Final CTA Banner) */}
      <section className="py-20 bg-gradient-cta relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Dark overlay for text readability (30% as specified) */}
          <div className="absolute inset-0 bg-black/30"></div>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-6">
              <Star className="h-5 w-5 text-white fill-white animate-pulse" />
              <span className="text-white font-semibold">Premium Experience Awaits</span>
            </div>
            
            <h2 className="text-heading text-heading-dark text-4xl md:text-5xl mb-6 text-shadow-dark">
              Ready to Dominate Your Market?
            </h2>
            
            <p className="text-body text-body-dark text-xl mb-8 leading-relaxed text-shadow-light">
              Don't let your competitors win. Get the website that converts visitors into customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-white border-2 border-secondary hover:bg-primary/90 hover:border-secondary text-lg px-8 py-4 rounded-full font-bold shadow-elegant transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start My Project Now
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 rounded-full font-bold backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                View Success Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bar 3 - Before Contact */}
      <section className="py-20 section-light-grey relative overflow-hidden border-y border-secondary/20">
        <div className="absolute inset-0 bg-texture-lines opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading text-heading-light text-3xl md:text-4xl mb-6">
              <span className="text-accent">100% Secure Payments</span> • <span className="text-primary">UK-Based Support</span> • <span className="text-secondary">Always Available</span>
            </h2>
            
            <p className="text-body text-body-light text-lg mb-8">
              Join 1,000+ businesses getting smarter online with our premium web solutions
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <div className="flex items-center gap-2 text-sm text-muted-light">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span>Stripe Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-light">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span>Google Certified Partner</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-light">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span>24/7 UK Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTABars;