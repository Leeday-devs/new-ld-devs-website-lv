import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Award, Star, ChevronDown } from "lucide-react";
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

    // Mobile & Desktop: Load video with mobile optimizations
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
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isMobile]);

  return (
    <section
      className="bg-navy min-h-screen flex items-start md:items-center justify-center relative overflow-hidden pt-24 md:pt-20 px-4"
      aria-label="Hero section with company introduction"
    >
      {/* Video Background - Desktop Only (saves mobile bandwidth) */}
      {!isMobile && (
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
          : 'bg-navy/60'
      }`} />

      <div className="container mx-auto relative z-20 text-center max-w-4xl">
        {/* Mobile-First Hero Heading with faster animations */}
        <div className={`transition-all duration-500 ease-out ${showHeading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Micro-headline */}
          <div className={`transition-all duration-500 ease-out ${showHeading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} mb-4 sm:mb-6`}>
            <p className="text-xs sm:text-sm md:text-base text-orange/80 uppercase font-semibold tracking-[0.2em] text-center">
              Websites • Online Shops • Apps • Ongoing Support
            </p>
          </div>
          
          <h1 className={`text-white mb-4 sm:mb-6 leading-[1.1] font-black tracking-tight ${
            isMobile
              ? "text-3xl xs:text-4xl" // Improved mobile sizes - slightly larger for better readability
              : "text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          }`}>
            <span className="text-white">
              Websites That Help Your
            </span>
            {" "}
            <span className="text-orange block xs:inline">Business Grow</span>
          </h1>
        </div>
        
        {/* Mobile-Optimized Subtext - Reduced animation complexity */}
        <div className={`transition-all duration-500 ease-out ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed font-medium mb-6 sm:mb-8 px-2">
            We're a small London team that builds beautiful, easy-to-use websites for businesses and startups. You tell us what you need — we handle everything else.
          </p>
        </div>
        
        {/* Social Proof Badge */}
        <div className={`mb-6 transition-all duration-500 ease-out ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-white/90 text-sm font-medium">50+ Projects Delivered</span>
          </div>
        </div>

        {/* CTAs - Both Mobile and Desktop get two buttons */}
        <div className={`mb-8 sm:mb-16 transition-all duration-500 ease-out ${showButton ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-98'}`}>
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 justify-center items-center max-w-lg mx-auto`}>
            <Button
              size="lg"
              className="btn-primary w-full sm:w-auto min-h-[52px] px-8 py-4 text-lg font-black rounded-2xl shadow-orange-glow relative overflow-hidden group transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center justify-center">
                Work With Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-h-[52px] px-8 py-4 text-lg font-semibold rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300"
              onClick={() => {
                const workSection = document.getElementById('work') || document.querySelector('#portfolio');
                workSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="flex items-center justify-center">
                See Our Work
              </span>
            </Button>
          </div>
        </div>
        
        {/* Mobile-Optimized Trust Indicators - Simplified */}
        <div className={`transition-all duration-500 ease-out ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col xs:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-8 text-white/60">
            <div className={`flex items-center gap-2 transition-colors duration-300 ${isMobile ? '' : 'hover:text-orange'}`}>
              <Shield className="h-4 sm:h-5 w-4 sm:w-5" />
              <span className="text-xs sm:text-sm font-semibold">We Handle the Tech</span>
            </div>
            <div className={`flex items-center gap-2 transition-colors duration-300 ${isMobile ? '' : 'hover:text-orange'}`}>
              <Zap className="h-4 sm:h-5 w-4 sm:w-5" />
              <span className="text-xs sm:text-sm font-semibold">Ready in Weeks</span>
            </div>
            <div className={`flex items-center gap-2 transition-colors duration-300 ${isMobile ? '' : 'hover:text-orange'}`}>
              <Award className="h-4 sm:h-5 w-4 sm:w-5" />
              <span className="text-xs sm:text-sm font-semibold">Looks Professional</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-500 ${showButton ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors duration-300"
            aria-label="Scroll to services"
          >
            <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MobileOptimizedHero;