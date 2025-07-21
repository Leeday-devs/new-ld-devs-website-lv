import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Sparkles, Layers, Palette, Database, Shield, Rocket } from "lucide-react";
import { PaymentButton } from "@/components/PaymentButton";
import heroImage from "@/assets/hero-image-no-bg.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Professional layered background */}
      <div className="absolute inset-0">
        {/* Sophisticated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-indigo-900/30 to-purple-900/50"></div>
        
        {/* Professional geometric patterns */}
        <div className="absolute inset-0">
          {/* Large geometric shapes */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-10">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <polygon points="0,0 400,100 300,400 0,300" fill="url(#grad1)" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'rgb(59, 130, 246)', stopOpacity:0.3}} />
                  <stop offset="100%" style={{stopColor:'rgb(147, 51, 234)', stopOpacity:0.1}} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Professional grid overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-20 grid-rows-12 h-full w-full">
              {Array.from({ length: 240 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border border-white/20"
                  style={{ 
                    animationDelay: `${i * 0.02}s`,
                    animation: `pulse 3s ease-in-out infinite`
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Floating hexagonal patterns */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
              <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-300"/>
              <polygon points="50,15 80,30 80,70 50,85 20,70 20,30" fill="none" stroke="currentColor" strokeWidth="1" className="text-indigo-300"/>
            </svg>
          </div>
          
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 opacity-15">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-float-delayed">
              <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-300"/>
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-300"/>
            </svg>
          </div>
          
          {/* Professional tech elements */}
          <div className="absolute top-20 left-10 text-blue-300/30 text-4xl font-mono animate-float">&lt;/&gt;</div>
          <div className="absolute top-32 right-20 text-indigo-300/30 text-3xl font-mono animate-float-delayed">{`{}`}</div>
          <div className="absolute bottom-32 left-16 text-purple-300/30 text-3xl font-mono animate-pulse">API</div>
          <div className="absolute bottom-20 right-16 text-blue-300/30 text-2xl font-mono animate-float">[ ]</div>
          
          {/* Subtle code snippets */}
          <div className="absolute top-1/3 right-10 text-indigo-200/20 text-xs font-mono animate-float-delayed">
            function() {`{`}<br/>
            &nbsp;&nbsp;return magic;<br/>
            {`}`}
          </div>
          
          {/* Professional connection lines */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="rgb(59, 130, 246)" strokeWidth="1" opacity="0.5"/>
              <line x1="70%" y1="30%" x2="90%" y2="60%" stroke="rgb(147, 51, 234)" strokeWidth="1" opacity="0.5"/>
              <line x1="20%" y1="70%" x2="40%" y2="90%" stroke="rgb(59, 130, 246)" strokeWidth="1" opacity="0.5"/>
              <circle cx="30%" cy="40%" r="2" fill="rgb(59, 130, 246)" opacity="0.6"/>
              <circle cx="90%" cy="60%" r="2" fill="rgb(147, 51, 234)" opacity="0.6"/>
              <circle cx="40%" cy="90%" r="2" fill="rgb(59, 130, 246)" opacity="0.6"/>
            </svg>
          </div>
          
          {/* Abstract flowing shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gradient-to-l from-indigo-500/10 to-blue-500/10 rounded-full blur-2xl animate-float-delayed"></div>
          </div>
          
          {/* Professional mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/20 to-purple-900/30"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm text-white/90 font-medium">LD Development</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="block">BUILDING</span>
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-text-glow">
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
                { icon: Code, label: "Websites" },
                { icon: Database, label: "Hosting" },
                { icon: Sparkles, label: "AI Integration" },
                { icon: Shield, label: "Security" }
              ].map((feature, index) => (
                <div key={feature.label} className="flex flex-col items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs text-white/80 font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={() => window.open('https://wa.me/447586266007', '_blank')}
                className="bg-gradient-to-r from-primary to-accent text-white border-0 hover:scale-105 transition-all duration-300 shadow-2xl group"
              >
                <Zap className="mr-2 h-5 w-5" />
                Help
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-white/30 text-foreground bg-white/90 hover:bg-white hover:text-foreground backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                <Layers className="mr-2 h-5 w-5" />
                Plans
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