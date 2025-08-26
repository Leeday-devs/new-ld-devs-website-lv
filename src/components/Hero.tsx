import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import heroPoster from "@/assets/hero-cinematic.jpg";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showHeading, setShowHeading] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Staggered animations
    const timer1 = setTimeout(() => setShowHeading(true), 300);
    const timer2 = setTimeout(() => setShowSubtext(true), 800);
    const timer3 = setTimeout(() => setShowButton(true), 1200);

    // Try to force video playback for browsers that block autoplay
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      const tryPlay = () => v.play().catch((err) => {
        console.warn('Hero video autoplay blocked', err);
      });
      tryPlay();
      setTimeout(tryPlay, 300);

      // Fallback: attempt play on first user interaction
      const playOnInteraction = () => {
        v.play().catch((err) => console.warn('Hero video play on interaction failed', err));
        window.removeEventListener('pointerdown', playOnInteraction);
        window.removeEventListener('keydown', playOnInteraction);
      };
      window.addEventListener('pointerdown', playOnInteraction, { once: true });
      window.addEventListener('keydown', playOnInteraction, { once: true });
    }
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section 
      className="bg-navy min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-label="Hero section with company introduction"
    >
      {/* Subtle Video Background - Local video for reliability */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={heroPoster}
        aria-hidden="true"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover opacity-100 z-10"
        onCanPlay={() => { console.log('Hero video can play'); document.getElementById('video-fallback')?.classList.add('opacity-0'); }}
        onLoadedData={() => { console.log('Hero video loaded'); document.getElementById('video-fallback')?.classList.add('opacity-0'); }}
        onPlay={() => { console.log('Hero video playing'); document.getElementById('video-fallback')?.classList.add('opacity-0'); }}
        onError={(e) => {
          console.error('Hero video error', e);
          (e.target as HTMLVideoElement).style.display = 'none';
          document.getElementById('video-fallback')?.classList.remove('opacity-0');
        }}
      >
        <source src="/videos/hero.mp4?v=3" type="video/mp4" />
      </video>
      
      {/* Fallback background while video loads */}
      <div id="video-fallback" className={`absolute inset-0 bg-navy transition-opacity duration-700 z-0 ${true ? '' : ''} opacity-100`} />
      {/* 40% Navy Overlay for readability */}
      <div className="absolute inset-0 bg-navy/40 z-[15] pointer-events-none" />
      
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange/10 via-transparent to-navy/20 animate-gradient bg-[length:200%_200%] z-[15] pointer-events-none" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Heading with staggered animation */}
          <div className={`transition-all duration-1000 ease-out ${showHeading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <h1 className="heading-xl text-white mb-6 leading-[0.9] font-black tracking-tight">
              We Build Your <span className="text-highlight animate-pulse">Dream Website</span>
              <span className="block mt-6">
                That Actually <span className="text-highlight relative">
                  Works
                  <span className="absolute -inset-1 bg-orange/20 blur-xl animate-pulse"></span>
                </span>
              </span>
            </h1>
          </div>
          
          {/* Subtext with delayed animation */}
          <div className={`transition-all duration-1000 ease-out delay-300 ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="text-body spacing-luxury max-w-4xl mx-auto text-white/90 leading-relaxed font-medium">
              Premium <span className="text-highlight font-bold">Website</span> development and <span className="text-highlight font-bold">AI</span> services from the <span className="text-highlight font-bold">UK</span> for businesses. 
              We create fast, secure, and beautiful websites that drive real results.
            </p>
          </div>
          
          {/* CTA Button with pill shape, glow effect and delayed animation */}
          <div className={`mb-16 transition-all duration-1000 ease-out delay-500 ${showButton ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
            <Button 
              size="lg" 
              className="btn-primary px-10 md:px-12 py-5 md:py-6 text-xl md:text-2xl font-black rounded-full shadow-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300 animate-pulse-slow hover:animate-none"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {/* Enhanced Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange via-orange to-orange opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 group-hover:scale-110"></div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 bg-orange/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              
              <span className="relative z-10 flex items-center">
                Start Your Project
                <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>
          
          {/* Trust indicators with animation */}
          <div className={`transition-all duration-1000 ease-out delay-700 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
              <div className="flex items-center gap-2 hover:text-orange transition-colors duration-300">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-semibold">Secure & Fast</span>
              </div>
              <div className="flex items-center gap-2 hover:text-orange transition-colors duration-300">
                <Zap className="h-5 w-5" />
                <span className="text-sm font-semibold">Quick Delivery</span>
              </div>
              <div className="flex items-center gap-2 hover:text-orange transition-colors duration-300">
                <Award className="h-5 w-5" />
                <span className="text-sm font-semibold">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;