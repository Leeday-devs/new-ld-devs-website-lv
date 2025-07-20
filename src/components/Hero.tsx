import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Glowing background elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-15"></div>
      <div className="absolute top-1/2 right-1/3 w-60 h-60 bg-orange-400 rounded-full blur-xl opacity-10 animate-float"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-purple-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="text-sm text-white/80 mb-4 font-medium tracking-wide">
              LD Development - London-Based Tech Solutions
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              WEB DEV &
              <br />
              <span className="bg-gradient-to-r from-primary to-orange-300 bg-clip-text text-transparent">
                AI SOLUTIONS
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              ROI-focused web development and tailored AI assistants that drive real business results. 
              From custom web applications to intelligent automation solutions that scale with your growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary/20 backdrop-blur-sm border border-primary/30 text-white hover:bg-primary/30 shadow-2xl" asChild>
                <a href="/auth">Get Started</a>
              </Button>
              <Button size="lg" className="bg-primary/20 backdrop-blur-sm border border-primary/30 text-white hover:bg-primary/30 shadow-2xl">
                Book Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                Request AI Demo
              </Button>
            </div>
          </div>
          
          {/* Hero Image with floating elements */}
          <div className="relative animate-scale-in">
            {/* Large glowing circle behind image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-xl animate-pulse"></div>
            </div>
            
            {/* Main hero image */}
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Professional web designer showcase"
                className="relative rounded-3xl w-full h-auto animate-float drop-shadow-2xl"
              />
            </div>
            
            {/* Floating UI elements with glow */}
            <div className="absolute top-16 -right-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-4 animate-float z-20 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary to-orange-400 rounded-full p-2 shadow-lg">
                  <span className="text-white font-bold text-sm">2K+</span>
                </div>
                <div>
                  <p className="text-xs text-white/70">Projects</p>
                  <p className="text-sm font-semibold text-white">Completed</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-16 -left-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-4 z-20 border border-white/20" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-2">
                <div className="flex text-primary text-sm">
                  ★★★★★
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">4.8</p>
                  <p className="text-xs text-white/70">Satisfaction</p>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 right-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-3 z-20 border border-white/20" style={{animationDelay: '2s'}}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                  <Code className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white">Web Designer</p>
                  <p className="text-xs text-white/70">Expert</p>
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