import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizedLayoutProps {
  children: React.ReactNode;
}

/**
 * Mobile-optimized layout wrapper that applies performance optimizations
 * and improves Core Web Vitals for mobile devices
 */
const MobileOptimizedLayout: React.FC<MobileOptimizedLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsOptimized(true);
      return;
    }

    // Mobile-specific optimizations
    const optimizeForMobile = async () => {
      // 1. Reduce initial render complexity
      const reduceMobileComplexity = () => {
        // Hide non-essential elements during initial load
        const nonEssentialElements = document.querySelectorAll([
          '.animate-float',
          '.animate-pulse-glow', 
          '[data-aos]',
          '.particle-container'
        ].join(','));

        nonEssentialElements.forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });

        // Show them after page is interactive
        setTimeout(() => {
          nonEssentialElements.forEach(el => {
            (el as HTMLElement).style.display = '';
          });
        }, 2000);
      };

      // 2. Optimize viewport settings for mobile
      const optimizeViewport = () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.setAttribute('content', 
            'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no'
          );
        }
      };

      // 3. Preload critical mobile CSS
      const preloadCriticalCSS = () => {
        const criticalCSS = `
          /* Critical mobile-first CSS */
          body { 
            font-synthesis: none;
            text-rendering: optimizeSpeed;
            -webkit-font-smoothing: antialiased;
          }
          
          /* Mobile-optimized containers */
          .container { 
            max-width: 100vw;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          /* Touch-friendly buttons */
          button, a {
            min-height: 48px;
            min-width: 48px;
            touch-action: manipulation;
          }
          
          /* Optimized images */
          img {
            content-visibility: auto;
            contain-intrinsic-size: 300px 200px;
          }
        `;

        const style = document.createElement('style');
        style.textContent = criticalCSS;
        style.setAttribute('data-mobile-critical', 'true');
        document.head.prepend(style);
      };

      // 4. Mobile-specific resource hints
      const addMobileResourceHints = () => {
        const hints = [
          { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
          { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: 'anonymous' }
        ];

        hints.forEach(hint => {
          const existing = document.querySelector(`link[href="${hint.href}"]`);
          if (!existing) {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
            document.head.appendChild(link);
          }
        });
      };

      // 5. Reduce layout shifts on mobile
      const preventMobileLayoutShifts = () => {
        // Add placeholder dimensions for content containers
        const containers = document.querySelectorAll('.container, main, section');
        containers.forEach(container => {
          if (!(container as HTMLElement).style.minHeight) {
            (container as HTMLElement).style.minHeight = '200px';
            (container as HTMLElement).style.containIntrinsicSize = '100% 200px';
          }
        });

        // Ensure all images have dimensions
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
          const image = img as HTMLImageElement;
          if (image.src && !image.complete) {
            image.style.aspectRatio = '16/9'; // Default aspect ratio
            image.style.backgroundColor = '#f3f4f6'; // Placeholder color
          }
        });
      };

      // Run optimizations in order
      optimizeViewport();
      preloadCriticalCSS();
      addMobileResourceHints();
      
      // Defer these to avoid blocking
      requestAnimationFrame(() => {
        reduceMobileComplexity();
        preventMobileLayoutShifts();
        setIsOptimized(true);
      });
    };

    optimizeForMobile();
  }, [isMobile]);

  // Mobile-specific class names for optimization
  const mobileClasses = isMobile ? 
    'mobile-optimized touch-manipulation scroll-smooth' : 
    '';

  return (
    <div 
      className={`min-h-screen ${mobileClasses}`}
      style={{
        // Mobile-specific CSS properties
        ...(isMobile && {
          WebkitOverflowScrolling: 'touch',
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          touchAction: 'manipulation'
        })
      }}
    >
      {/* Mobile performance indicator */}
      {isMobile && !isOptimized && (
        <div 
          className="fixed top-0 left-0 w-full h-1 bg-orange z-50 transition-opacity duration-500"
          style={{ opacity: isOptimized ? 0 : 1 }}
        />
      )}
      
      {children}
    </div>
  );
};

export default MobileOptimizedLayout;