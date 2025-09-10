import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CriticalCSS = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Inject critical CSS for mobile performance
    const criticalCSS = `
      /* Critical CSS for mobile performance */
      @media (max-width: 767px) {
        /* Optimize fonts for mobile */
        * {
          font-synthesis: none;
          text-rendering: optimizeSpeed;
        }
        
        /* Reduce expensive properties */
        .animate-bounce,
        .animate-pulse,
        .animate-spin {
          animation: none !important;
        }
        
        /* Simplify shadows */
        .shadow-2xl,
        .shadow-xl,
        .shadow-lg {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
        }
        
        /* Reduce blur effects */
        .backdrop-blur-md,
        .backdrop-blur-sm {
          backdrop-filter: none !important;
          background-color: rgba(255, 255, 255, 0.8) !important;
        }
        
        /* Optimize transforms */
        .hover\\:scale-105:hover,
        .hover\\:scale-110:hover,
        .group-hover\\:scale-110 {
          transform: none !important;
        }
        
        /* Remove expensive gradients on mobile */
        .bg-gradient-to-br,
        .bg-gradient-to-r {
          background: var(--bg-white) !important;
        }
        
        /* Optimize video performance */
        video {
          will-change: auto;
          transform: translateZ(0);
        }
        
        /* Reduce repaints */
        .animate-gradient {
          animation: none !important;
        }
      }
      
      /* Font display optimization */
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Playfair Display';
        font-display: swap;
      }
    `;

    if (isMobile) {
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      style.id = 'mobile-critical-css';
      document.head.insertBefore(style, document.head.firstChild);
    }

    return () => {
      const existingStyle = document.getElementById('mobile-critical-css');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [isMobile]);

  return null;
};

export default CriticalCSS;