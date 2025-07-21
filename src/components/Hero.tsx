import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Sparkles, Layers, Palette, Database, Shield, Rocket, Star, Users } from "lucide-react";
import { PaymentButton } from "@/components/PaymentButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/hero-image-no-bg.png";
const Hero = () => {
  const heroRef = useScrollAnimation();
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Modern layered background with mesh gradient */}
      <div className="absolute inset-0">
        {/* Modern gradient mesh */}
        <div className="absolute inset-0 bg-mesh opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
        
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

      <div className="container mx-auto px-4 relative z-10">
        <div ref={heroRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-in">
          {/* Left side - Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary backdrop-blur-md rounded-full border border-white/20 shadow-glow animate-pulse-glow">
              <Sparkles className="h-5 w-5 animate-spin" />
              <span className="font-semibold">Premium Web Development</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif leading-tight">
                <span className="block text-shimmer animate-fade-in">WE BUILD</span>
                <span className="block text-shimmer animate-fade-in stagger-delay-1">AMAZING</span>
                <span className="block bg-gradient-primary bg-clip-text text-transparent animate-fade-in stagger-delay-2">WEBSITES</span>
              </h1>
            </div>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in-up stagger-delay-3">
              Transform your business with stunning, lightning-fast websites that captivate users 
              and drive results. We craft digital experiences that make your brand unforgettable.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-delay-4">
              {[{
              icon: Zap,
              label: "Lightning Fast"
            }, {
              icon: Shield,
              label: "Ultra Secure"
            }, {
              icon: Rocket,
              label: "Modern Design"
            }].map((feature, index) => <div key={feature.label} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover-lift" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <feature.icon className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>)}
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up stagger-delay-5">
              <PaymentButton className="btn-premium text-lg px-8 py-4 rounded-2xl font-bold shadow-button hover:shadow-glow transition-all duration-300" />
              <Button variant="outline" size="lg" onClick={() => window.open('https://wa.me/447586266007', '_blank')} className="text-lg px-8 py-4 rounded-2xl font-bold bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 hover-scale">
                <ArrowRight className="mr-2 h-5 w-5" />
                Let's Talk
              </Button>
            </div>
          </div>
          
          {/* Right side - Hero Image */}
          <div className="relative animate-fade-in-right stagger-delay-2">
            {/* Image container with advanced effects */}
            <div className="relative">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-pulse-glow"></div>
              
              {/* Main image */}
              <div className="relative bg-gradient-card rounded-3xl p-8 backdrop-blur-md border border-white/20 shadow-premium hover:shadow-glow transition-all duration-500 card-float">
                <img src={heroImage} alt="Professional Web Development" className="w-full h-auto rounded-2xl shadow-2xl" />
                
                {/* Floating tech badges */}
                <div className="absolute -top-4 -left-4 bg-gradient-primary text-white px-4 py-2 rounded-xl font-semibold shadow-lg animate-float">
                  React
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-coral text-white px-4 py-2 rounded-xl font-semibold shadow-lg animate-float-delayed">
                  AI Powered
                </div>
                <div className="absolute top-1/2 -right-6 bg-gradient-purple text-white px-3 py-2 rounded-xl font-semibold shadow-lg animate-bounce-gentle">
                  Fast
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        
      </div>
    </section>;
};
export default Hero;