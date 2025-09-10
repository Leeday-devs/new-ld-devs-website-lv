import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const MobilePerformanceOptimizer = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    // Mobile-specific performance optimizations
    const optimizations = () => {
      // 1. Reduce animation complexity on mobile
      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 767px) {
          /* Disable expensive animations on mobile */
          .animate-bounce,
          .animate-pulse-slow,
          .animate-gradient {
            animation: none !important;
          }
          
          /* Reduce blur effects */
          .backdrop-blur-md { backdrop-filter: blur(4px) !important; }
          .backdrop-blur-sm { backdrop-filter: blur(2px) !important; }
          .blur-xl { filter: blur(8px) !important; }
          
          /* Optimize shadows */
          .shadow-2xl { box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important; }
          .shadow-xl { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important; }
          
          /* Reduce transform complexity */
          .hover\\:scale-105:hover,
          .hover\\:scale-110:hover,
          .group-hover\\:scale-110 { transform: none !important; }
          
          /* Simplify gradients */
          .bg-gradient-to-br,
          .bg-gradient-to-r {
            background: solid !important;
          }
        }
      `;
      document.head.appendChild(style);

      // 2. Optimize font loading
      const preloadFont = document.createElement('link') as HTMLLinkElement;
      preloadFont.rel = 'preload';
      preloadFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      preloadFont.as = 'style';
      preloadFont.onload = function() {
        (this as HTMLLinkElement).rel = 'stylesheet';
      };
      document.head.appendChild(preloadFont);

      // 3. Disable smooth scrolling on mobile for better performance
      document.documentElement.style.scrollBehavior = 'auto';

      // 4. Optimize touch events
      document.addEventListener('touchstart', () => {}, { passive: true });
      document.addEventListener('touchmove', () => {}, { passive: true });

      // 5. Reduce repaints/reflows
      const reduceRepaints = () => {
        // Batch DOM updates
        requestAnimationFrame(() => {
          // Remove expensive visual effects on scroll
          const expensiveElements = document.querySelectorAll('.animate-pulse, .animate-spin');
          expensiveElements.forEach(el => {
            (el as HTMLElement).style.animation = 'none';
          });
        });
      };

      // 6. Memory cleanup
      const cleanupUnusedImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.complete || img.naturalWidth === 0) {
            img.loading = 'lazy';
          }
        });
      };

      // 7. Defer non-critical CSS
      const deferStyles = () => {
        const criticalStyles = ['font', 'color', 'background', 'text'];
        const allStyles = document.querySelectorAll('style, link[rel="stylesheet"]');
        
        allStyles.forEach(styleEl => {
          if (styleEl instanceof HTMLLinkElement) {
            const href = styleEl.href;
            const isCritical = criticalStyles.some(keyword => href.includes(keyword));
            
            if (!isCritical) {
              styleEl.media = 'print';
              styleEl.onload = function() {
                (this as HTMLLinkElement).media = 'all';
              };
            }
          }
        });
      };

      // Execute optimizations
      reduceRepaints();
      cleanupUnusedImages();
      
      // Defer non-critical optimizations
      setTimeout(() => {
        deferStyles();
      }, 100);
    };

    // Run optimizations after initial render
    requestAnimationFrame(optimizations);

    return () => {
      // Cleanup on component unmount
      const mobileStyles = document.head.querySelectorAll('style');
      mobileStyles.forEach(style => {
        if (style.textContent?.includes('@media (max-width: 767px)')) {
          style.remove();
        }
      });
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    // Performance monitoring and optimization
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        // Optimize based on performance metrics
        if (entry.entryType === 'largest-contentful-paint' && entry.startTime > 2500) {
          // LCP is too slow, reduce image quality
          const images = document.querySelectorAll('img');
          images.forEach(img => {
            if (img.src && !img.src.includes('?')) {
              img.src += '?quality=75'; // Reduce quality for mobile
            }
          });
        }
        
        if (entry.entryType === 'cumulative-layout-shift' && (entry as any).value > 0.1) {
          // CLS is too high, add explicit dimensions
          const lazyImages = document.querySelectorAll('img[loading="lazy"]');
          lazyImages.forEach(img => {
            if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
              img.setAttribute('width', '100%');
              img.setAttribute('height', 'auto');
            }
          });
        }
      });
    });

    // Observe performance metrics
    if ('PerformanceObserver' in window) {
      try {
        observer.observe({ 
          entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] 
        });
      } catch (e) {
        // Fallback for browsers that don't support all entry types
        console.log('Performance observer not fully supported');
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  // Don't render anything - this is just for performance optimization
  return null;
};

export default MobilePerformanceOptimizer;