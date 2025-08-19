import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight, Sparkles, Star, Phone } from "lucide-react";

const CTABars = () => {
  return (
    <>
      {/* CTA Bar 1 - After Services */}
      <section className="py-20 bg-gradient-to-r from-navy via-primary to-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-texture-dots opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gold/20 backdrop-blur-md rounded-full border border-gold/30 mb-6">
              <Rocket className="h-5 w-5 text-gold animate-bounce" />
              <span className="text-gold font-semibold">Ready to Transform?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black font-serif text-white mb-6">
              Your Dream Website Awaits
            </h2>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Join 150+ successful businesses who chose excellence. Let's build something extraordinary together.
            </p>
            
            <Button 
              onClick={() => window.open('https://wa.me/447586266007', '_blank')}
              className="bg-gradient-to-r from-gold to-yellow-400 text-navy hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] text-xl px-10 py-5 rounded-full font-bold tracking-wide shadow-elegant transition-all duration-500 hover:scale-105 group"
            >
              <Phone className="mr-3 h-6 w-6 group-hover:animate-pulse" />
              Get Your Free Consultation
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Bar 2 - After Portfolio */}
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
        <div className="absolute inset-0">
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
              <Star className="h-5 w-5 text-yellow-300 fill-yellow-300 animate-pulse" />
              <span className="text-white font-semibold">Premium Experience Awaits</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black font-serif text-white mb-6">
              Ready to Dominate Your Market?
            </h2>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Don't let your competitors win. Get the website that converts visitors into customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-bold shadow-elegant transition-all duration-300 hover:scale-105"
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
      <section className="py-20 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 relative overflow-hidden border-y border-gold/20">
        <div className="absolute inset-0 bg-texture-lines opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black font-serif text-foreground mb-6">
              <span className="text-gold">100% Secure Payments</span> • <span className="text-navy">UK-Based Support</span> • <span className="text-gold">Always Available</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Join 1,000+ businesses getting smarter online with our premium web solutions
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>Stripe Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>Google Certified Partner</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
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