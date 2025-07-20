import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Sparkles, Layers, Palette, Database, Shield, Rocket } from "lucide-react";
import heroImage from "@/assets/hero-image-no-bg.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Advanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-60 h-60 bg-gradient-to-l from-orange-400/15 to-red-400/15 rounded-full blur-xl animate-float-delayed"></div>
        
        {/* Floating code elements */}
        <div className="absolute top-20 left-10 text-primary/20 text-6xl font-mono animate-float">&lt;/&gt;</div>
        <div className="absolute top-40 right-20 text-accent/20 text-4xl font-mono animate-float-delayed">{`{}`}</div>
        <div className="absolute bottom-32 left-20 text-primary/20 text-5xl font-mono animate-float">AI</div>
        <div className="absolute bottom-20 right-10 text-accent/20 text-3xl font-mono animate-pulse">[ ]</div>
        <div className="absolute top-60 left-1/3 text-primary/20 text-4xl font-mono animate-float-delayed">=&gt;</div>
        
        {/* Binary rain effect */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute text-green-400/30 text-xs font-mono animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
        
        {/* Circuit board patterns */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-20">
          <svg viewBox="0 0 100 100" className="text-primary animate-pulse">
            <circle cx="20" cy="20" r="2" fill="currentColor" />
            <circle cx="80" cy="20" r="2" fill="currentColor" />
            <circle cx="20" cy="80" r="2" fill="currentColor" />
            <circle cx="80" cy="80" r="2" fill="currentColor" />
            <line x1="20" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="1" />
            <line x1="80" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 rotate-45 animate-spin"></div>
        <div className="absolute bottom-40 right-40 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full animate-pulse"></div>
        
        {/* Dynamic grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-white/20 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm text-white/90 font-medium">Cool Websites for Kids!</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="block">BUILD</span>
              <span className="bg-gradient-to-r from-primary via-accent to-orange-300 bg-clip-text text-transparent animate-text-glow">
                AWESOME
              </span>
              <span className="block">WEBSITES</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              We make super cool websites and apps that are fun to use! Just like your favorite games and apps, 
              but for businesses, and anyone who wants something amazing on the internet!
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Code, label: "Cool Code" },
                { icon: Palette, label: "Pretty Colors" },
                { icon: Rocket, label: "Super Fast" },
                { icon: Shield, label: "Safe & Secure" }
              ].map((feature, index) => (
                <div key={feature.label} className="flex flex-col items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs text-white/80 font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-white border-0 hover:scale-105 transition-all duration-300 shadow-2xl group">
                <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                Let's Build Something Cool!
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-foreground bg-white/90 hover:bg-white hover:text-foreground backdrop-blur-sm hover:scale-105 transition-all duration-300">
                <Layers className="mr-2 h-5 w-5" />
                See What We Made
              </Button>
            </div>
          </div>
          
          {/* Enhanced Hero Visual */}
          <div className="relative animate-scale-in">
            {/* Advanced background effects */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-gradient-to-br from-primary/30 via-accent/30 to-purple-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute w-64 h-64 bg-gradient-to-tr from-orange-400/20 to-pink-500/20 rounded-full blur-2xl animate-float"></div>
            </div>
            
            {/* Main showcase area */}
            <div className="relative z-10 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
              <img
                src={heroImage}
                alt="Modern web development showcase"
                className="relative rounded-2xl w-full h-auto animate-float drop-shadow-2xl"
              />
              
              {/* Technology stack overlay */}
              <div className="absolute inset-0 flex items-end justify-center p-4">
                <div className="flex gap-2 opacity-80">
                  {['React', 'TypeScript', 'Tailwind', 'Node.js'].map((tech, index) => (
                    <div key={tech} className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white border border-white/20" style={{ animationDelay: `${index * 0.2}s` }}>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Enhanced floating elements */}
            <div className="absolute top-8 -right-4 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-md rounded-2xl shadow-2xl p-4 animate-float z-20 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary to-accent rounded-full p-2 shadow-lg">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/70">Database</p>
                  <p className="text-sm font-semibold text-white">Optimized</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-8 -left-4 bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-md rounded-2xl shadow-2xl p-4 z-20 border border-white/20 animate-float" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-2">
                <div className="flex text-primary text-sm">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">99.9%</p>
                  <p className="text-xs text-white/70">Uptime</p>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 right-8 bg-gradient-to-br from-orange-400/20 to-red-400/20 backdrop-blur-md rounded-xl shadow-2xl p-3 z-20 border border-white/20 animate-float" style={{animationDelay: '2s'}}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
                  <Rocket className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white">Lightning</p>
                  <p className="text-xs text-white/70">Fast</p>
                </div>
              </div>
            </div>

            {/* Interactive code snippet */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-lg shadow-2xl p-3 z-20 border border-primary/30 max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-white/70 ml-2">terminal</span>
              </div>
              <div className="font-mono text-xs text-green-400">
                $ npm create modern-website
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;