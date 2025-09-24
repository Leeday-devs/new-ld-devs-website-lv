import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import heroPoster from "@/assets/hero-cinematic.jpg";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileOptimizedHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showHeading, setShowHeading] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriedPlay = useRef(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsVisible(true);
    
    // Faster animations on mobile for better perceived performance
    const delay1 = isMobile ? 100 : 200;
    const delay2 = isMobile ? 300 : 600;
    const delay3 = isMobile ? 500 : 900;
    
    const timer1 = setTimeout(() => setShowHeading(true), delay1);
    const timer2 = setTimeout(() => setShowSubtext(true), delay2);
    const timer3 = setTimeout(() => setShowButton(true), delay3);

    // Mobile: Skip video entirely for performance
    // Desktop: Load video with optimizations
    if (!isMobile) {
      const v = videoRef.current;
      if (v && !hasTriedPlay.current) {
        hasTriedPlay.current = true;
        v.muted = true;
        
        const tryPlay = () => {
          if (v.readyState >= 3) {
            v.play().catch(() => {});
          }
        };

        if (v.readyState >= 3) {
          tryPlay();
        } else {
          v.addEventListener('canplay', tryPlay, { once: true });
        }

        const playOnInteraction = () => {
          v.play().catch(() => {});
          window.removeEventListener('pointerdown', playOnInteraction);
          window.removeEventListener('keydown', playOnInteraction);
        };
        window.addEventListener('pointerdown', playOnInteraction, { once: true });
        window.addEventListener('keydown', playOnInteraction, { once: true });
      }
    }
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isMobile]);

  return (
    <section 
      className="bg-navy min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-4"
      aria-label="Hero section with company introduction"
    >
      {/* Desktop-Only Video Background for Performance */}
      {!isMobile && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none" // Don't preload on mobile
          poster={heroPoster}
          aria-hidden="true"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover opacity-100 z-10"
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
      )}
      
      {/* Mobile: Optimized Static Background with WebP support */}
      <div className="absolute inset-0 z-0">
        <picture>
          {/* WebP for modern browsers */}
          <source 
            srcSet="/lovable-uploads/2b71c5d0-b143-4337-b814-e4dec0c11b15.png" 
            type="image/webp" 
          />
          {/* Fallback JPEG */}
          <img 
            src={heroPoster}
            alt="Premium web development background" 
            className="w-full h-full object-cover opacity-80"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
        </picture>
      </div>
      
      {/* Fallback background */}
      <div id="video-fallback" className="absolute inset-0 bg-navy transition-opacity duration-300 z-0 opacity-100" />
      
      {/* Mobile-Optimized Overlay - Reduced complexity */}
      <div className={`absolute inset-0 z-[15] pointer-events-none ${
        isMobile 
          ? 'bg-navy/70' // Simple solid overlay on mobile
          : 'bg-navy/60 bg-gradient-to-r from-orange/5 via-transparent to-navy/10 animate-gradient bg-[length:200%_200%]'
      }`} />
      
      {/* Reduced particles on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-orange/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto relative z-20 text-center max-w-4xl">
        {/* Mobile-First Hero Heading with faster animations */}
        <div className={`transition-all duration-500 ease-out ${showHeading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-4 sm:mb-6 leading-[0.9] font-black tracking-tight">
            Premium Web Development{" "}
            <span className="text-highlight block xs:inline">Solutions</span>
            <span className="block mt-2 sm:mt-6 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Built By{" "}
              <span className="text-highlight relative">
                Me
                {!isMobile && <span className="absolute -inset-1 bg-orange/20 blur-xl animate-pulse"></span>}
              </span>
            </span>
          </h1>
        </div>
        
        {/* Mobile-Optimized Subtext - Reduced animation complexity */}
        <div className={`transition-all duration-500 ease-out ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed font-medium mb-6 sm:mb-8 px-2">
            I'm Lee, a freelance developer from London. I've been building websites since I was 13, and now I help small businesses get premium websites without the agency price tag.
          </p>
        </div>
        
        {/* Optimized CTA Button - Reduced effects on mobile */}
        <div className={`mb-8 sm:mb-16 transition-all duration-500 ease-out ${showButton ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-98'}`}>
          <Button 
            size="lg" 
            className={`btn-primary w-full xs:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl md:text-2xl font-black rounded-full shadow-2xl relative overflow-hidden group transition-all duration-300 max-w-sm mx-auto ${
              isMobile ? '' : 'hover:scale-105 animate-pulse-slow hover:animate-none'
            }`}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {/* Reduced effects on mobile for performance */}
            {!isMobile && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-orange via-orange to-orange opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-orange/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </>
            )}
            
            <span className="relative z-10 flex items-center justify-center">
              Work With Me
              <ArrowRight className="ml-2 sm:ml-3 h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </div>
        
        {/* Mobile-Optimized Trust Indicators - Simplified */}
        <div className={`transition-all duration-500 ease-out ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col xs:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-8 text-white/60">
            <div className={`flex items-center gap-2 transition-colors duration-300 ${isMobile ? '' : 'hover:text-orange'}`}>
              <Shield className="h-4 sm:h-5 w-4 sm:w-5" />
              <span className="text-xs sm:text-sm font-semibold">Secure & Fast</span>
            </div>
            <div className={`flex items-center gap-2 transition-colors duration-300 ${isMobile ? '' : 'hover:text-orange'}`}>
              <Zap className="h-4 sm:h-5 w-4 sm:w-5" />
              <span className="text-xs sm:text-sm font-semibold">Quick Delivery</span>
            </div>
            <div className={`flex items-center gap-2 transition-colors duration-300 ${isMobile ? '' : 'hover:text-orange'}`}>
              <Award className="h-4 sm:h-5 w-4 sm:w-5" />
              <span className="text-xs sm:text-sm font-semibold">Premium Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileOptimizedHero;