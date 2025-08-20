import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Sparkles, Layers, Palette, Database, Shield, Rocket, Star, Users, CreditCard, Play, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/hero-image-no-bg.png";
import cinematicBg from "@/assets/hero-cinematic.jpg";
const Hero = () => {
  const heroRef = useScrollAnimation();
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background with Real Image */}
      <div className="absolute inset-0">
        {/* Hero background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${cinematicBg})` }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/70 to-primary/80"></div>
        
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

      <div className="container mx-auto px-4 relative z-10">
        <div ref={heroRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-in">
          {/* Left side - Content */}
          <div className="text-white space-y-8">
            {/* Premium Badge with Trust Indicators */}
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold/20 to-transparent backdrop-blur-md rounded-full border border-gold/30 shadow-elegant animate-pulse-glow mb-8">
              <CheckCircle className="h-6 w-6 text-gold" />
              <span className="font-bold text-white tracking-wide">PREMIUM WEB DEVELOPMENT EXCELLENCE</span>
            </div>
            
            {/* Cinematic Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-serif leading-none tracking-tight">
                <span className="block text-white animate-fade-in drop-shadow-2xl">WE CREATE</span>
                <span className="block bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent animate-fade-in stagger-delay-1 drop-shadow-2xl">LEGENDARY</span>
                <span className="block text-white animate-fade-in stagger-delay-2 drop-shadow-2xl">WEBSITES</span>
              </h1>
            </div>
            
            {/* Powerful Single Description */}
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 leading-relaxed max-w-3xl animate-fade-in-up stagger-delay-3 font-light">
              Transform your business into a <span className="text-gold font-semibold">digital powerhouse</span> with websites that don't just look amazing—they deliver results that exceed expectations.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-delay-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover-lift">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">Google Certified</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover-lift">
                <Shield className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium">Stripe Secure</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover-lift">
                <Users className="h-4 w-4 text-accent-glow" />
                <span className="text-sm font-medium">150+ Happy Clients</span>
              </div>
            </div>

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
              label: "Premium Design"
            }].map((feature, index) => <div key={feature.label} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover-lift" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <feature.icon className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>)}
            </div>
            
            {/* Single Powerful CTA Button */}
            <div className="pt-8 animate-fade-in-up stagger-delay-5">
              <Button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-secondary via-secondary-glow to-secondary text-primary hover:shadow-[0_0_60px_hsl(var(--secondary)/0.6)] text-xl px-16 py-8 rounded-full font-black tracking-wide shadow-elegant transition-all duration-500 hover:scale-110 hover:shadow-glow group relative overflow-hidden border-2 border-secondary/20"
              >
                <span className="relative z-10 flex items-center gap-4">
                  <Rocket className="h-7 w-7 group-hover:animate-bounce" />
                  START YOUR LEGENDARY PROJECT
                  <ArrowRight className="h-7 w-7 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary-glow to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full"></div>
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
              </Button>
              
              {/* Secondary subtle link */}
              <div className="mt-6 text-center">
                <button 
                  onClick={() => window.open('https://wa.me/447586266007', '_blank')}
                  className="text-gray-300 hover:text-gold transition-colors duration-300 font-medium text-lg group"
                >
                  <Play className="inline h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Free Strategy Session
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              </div>
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
                <img 
                  src={heroImage} 
                  alt="Professional web development services showcasing modern website design, custom development, and digital solutions by LD Development" 
                  className="w-full h-auto rounded-2xl shadow-2xl" 
                  loading="eager"
                  width="600"
                  height="400"
                />
                
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