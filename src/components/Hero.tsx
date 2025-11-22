import { Button } from "@/components/ui/button";
import { Button as EnhancedButton } from "@/components/ui/button-enhanced";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import heroPoster from "@/assets/hero-cinematic.jpg";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showHeading, setShowHeading] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriedPlay = useRef(false);

  useEffect(() => {
    setIsVisible(true);

    // Parallax scroll listener with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Staggered animations
    const timer1 = setTimeout(() => setShowHeading(true), 300);
    const timer2 = setTimeout(() => setShowSubtext(true), 800);
    const timer3 = setTimeout(() => setShowButton(true), 1200);

    // Optimized video playback - prevent repeated calls
    const v = videoRef.current;
    if (v && !hasTriedPlay.current) {
      hasTriedPlay.current = true;
      v.muted = true;
      
      const tryPlay = () => {
        if (v.readyState >= 3) { // HAVE_FUTURE_DATA
          v.play().catch(() => {
            // Silent fail - poster image will show
          });
        }
      };

      // Try play when video is ready
      if (v.readyState >= 3) {
        tryPlay();
      } else {
        v.addEventListener('canplay', tryPlay, { once: true });
      }

      // Fallback: attempt play on first user interaction
      const playOnInteraction = () => {
        v.play().catch(() => {});
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
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      className="bg-navy min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-16"
      aria-label="Hero section with company introduction"
    >
      {/* Subtle Video Background - Local video for reliability with parallax */}
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
        className="absolute inset-0 w-full h-full object-cover opacity-100 z-10 transition-transform duration-300"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          willChange: 'transform'
        }}
        onCanPlay={() => {
          if (!videoLoaded) {
            setVideoLoaded(true);
            document.getElementById('video-fallback')?.classList.add('opacity-0');
          }
        }}
        onLoadedData={() => {
          if (!videoLoaded) {
            setVideoLoaded(true);
            document.getElementById('video-fallback')?.classList.add('opacity-0');
          }
        }}
        onPlay={() => {
          document.getElementById('video-fallback')?.classList.add('opacity-0');
        }}
        onError={(e) => {
          (e.target as HTMLVideoElement).style.display = 'none';
          document.getElementById('video-fallback')?.classList.remove('opacity-0');
        }}
      >
        <source src="/videos/hero-new.mp4" type="video/mp4" />
      </video>
      
      {/* Fallback background while video loads */}
      <div id="video-fallback" className={`absolute inset-0 bg-navy transition-opacity duration-700 z-0 ${true ? '' : ''} opacity-100`} />
      {/* 40% Navy Overlay for readability */}
      <div className="absolute inset-0 bg-navy/40 z-[15] pointer-events-none" />
      
      

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-6xl mx-auto text-center px-4" style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          willChange: 'transform'
        }}>
          {/* Hero Heading with staggered animation - Mobile Optimized */}
          <div className={`transition-all duration-1000 ease-out ${showHeading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`} style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            willChange: 'transform'
          }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-4 sm:mb-6 leading-[0.9] font-black tracking-tight">
              Premium Web Development <span className="text-highlight block sm:inline">Solutions</span>
              <span className="block mt-3 sm:mt-6">
                Built For <span className="text-highlight">You</span>
              </span>
            </h1>
          </div>
          
          {/* Subtext with delayed animation - Mobile Optimized */}
          <div className={`transition-all duration-1000 ease-out delay-300 ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto text-white/90 leading-relaxed font-medium mb-6 sm:mb-8 px-2">
              Premium <span className="text-highlight font-bold">Website</span> development and <span className="text-highlight font-bold">AI</span> services from the <span className="text-highlight font-bold">UK</span> for businesses. 
              <span className="block mt-2">I create fast, secure, and beautiful websites that drive real results.</span>
              <span className="block mt-3 text-highlight font-bold">No technical knowledge needed, I do everything for you.</span>
            </p>
          </div>
          
          {/* CTA Buttons with pill shape, glow effect and delayed animation - Mobile Optimized */}
          <div className={`mb-8 sm:mb-16 transition-all duration-1000 ease-out delay-500 ${showButton ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <EnhancedButton
                variant="premium"
                size="lg"
                className="px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 text-base sm:text-lg md:text-xl lg:text-2xl font-black rounded-full w-full sm:w-auto max-w-xs sm:max-w-none"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center justify-center">
                  <span className="hidden sm:inline">Work With Us</span>
                  <span className="sm:hidden">Work With Us</span>
                  <ArrowRight className="ml-2 sm:ml-3 h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7" />
                </span>
              </EnhancedButton>
              
              <Button 
                variant="outline"
                size="lg" 
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 text-base sm:text-lg md:text-xl lg:text-2xl font-black rounded-full shadow-lg relative overflow-hidden group hover:scale-105 transition-all duration-300 w-full sm:w-auto max-w-xs sm:max-w-none backdrop-blur-sm"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span>See Our Work</span>
                </span>
              </Button>
            </div>
          </div>
          
          {/* Trust indicators with animation - Mobile Optimized */}
          <div className={`transition-all duration-1000 ease-out delay-700 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-white/60">
              <div className="flex items-center gap-2 hover:text-orange transition-colors duration-300">
                <Shield className="h-4 sm:h-5 w-4 sm:w-5" />
                <span className="text-xs sm:text-sm font-semibold">Secure & Fast</span>
              </div>
              <div className="flex items-center gap-2 hover:text-orange transition-colors duration-300">
                <Zap className="h-4 sm:h-5 w-4 sm:w-5" />
                <span className="text-xs sm:text-sm font-semibold">Quick Delivery</span>
              </div>
              <div className="flex items-center gap-2 hover:text-orange transition-colors duration-300">
                <Award className="h-4 sm:h-5 w-4 sm:w-5" />
                <span className="text-xs sm:text-sm font-semibold">Premium Quality</span>
              </div>
            </div>
          </div>
          
          {/* Personal signature */}
          <div className={`mt-12 transition-all duration-1000 ease-out delay-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-white/40 italic text-sm font-light">— Lee</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;