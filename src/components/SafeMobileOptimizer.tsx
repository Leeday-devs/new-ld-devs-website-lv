import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Safe mobile performance optimizer that doesn't break React's DOM management
 * Focuses on CSS and loading optimizations without aggressive DOM manipulation
 */
const SafeMobileOptimizer = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    // Safe performance optimizations that work with React
    const applySafeOptimizations = () => {
      
      // 1. Add mobile-specific CSS optimizations
      const addMobileCSS = () => {
        const mobileStyles = document.createElement('style');
        mobileStyles.setAttribute('data-mobile-safe', 'true');
        mobileStyles.textContent = `
          @media (max-width: 768px) {
            /* Reduce animation complexity */
            .animate-pulse,
            .animate-bounce,
            .animate-spin {
              animation-duration: 0.5s !important;
            }
            
            /* Simplify backgrounds */
            .bg-gradient-to-r,
            .bg-gradient-to-br {
              background: linear-gradient(45deg, var(--bg-white), var(--bg-grey)) !important;
            }
            
            /* Optimize shadows */
            .shadow-xl {
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
            }
            
            /* Remove expensive filters */
            .backdrop-blur-md {
              backdrop-filter: blur(4px) !important;
            }
            
            /* Touch-friendly sizing */
            button, .btn {
              min-height: 48px;
              min-width: 48px;
              touch-action: manipulation;
            }
            
            /* Prevent horizontal scroll */
            body {
              overflow-x: hidden;
            }
            
            /* Optimize fonts */
            body {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeSpeed;
            }
          }
        `;
        document.head.appendChild(mobileStyles);
      };

      // 2. Optimize image loading (safe approach)
      const optimizeImageLoading = () => {
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
          const image = img as HTMLImageElement;
          
          // Only modify loading attributes, don't remove elements
          if (index === 0) {
            image.loading = 'eager';
            image.setAttribute('fetchPriority', 'high');
          } else if (index < 3) {
            image.loading = 'lazy';
            image.setAttribute('fetchPriority', 'auto');
          } else {
            image.loading = 'lazy';
            image.setAttribute('fetchPriority', 'low');
          }

          // Add sizes for responsive images
          if (!image.sizes) {
            image.sizes = '(max-width: 768px) 100vw, 50vw';
          }
        });
      };

      // 3. Add passive event listeners for better performance
      const addPassiveListeners = () => {
        const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
        passiveEvents.forEach(eventType => {
          // Add passive event listeners without removing existing ones
          document.addEventListener(eventType, () => {}, { passive: true, once: true });
        });
      };

      // 4. Preload critical resources
      const preloadCriticalResources = () => {
        const heroImage = '/lovable-uploads/2b71c5d0-b143-4337-b814-e4dec0c11b15.png';
        
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = heroImage;
        preloadLink.as = 'image';
        preloadLink.setAttribute('fetchpriority', 'high');
        
        if (!document.querySelector(`link[href="${heroImage}"]`)) {
          document.head.appendChild(preloadLink);
        }
      };

      // 5. Optimize video for mobile
      const optimizeVideo = () => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          // Don't remove videos, just optimize them
          video.preload = 'none'; // Don't preload video on mobile
          video.muted = true; // Ensure autoplay works
          
          // Add loading="lazy" if supported
          if ('loading' in video) {
            (video as any).loading = 'lazy';
          }
        });
      };

      // Run safe optimizations
      addMobileCSS();
      optimizeImageLoading();
      addPassiveListeners();
      preloadCriticalResources();
      optimizeVideo();
    };

    // Apply optimizations after a short delay to avoid interfering with React
    const timeoutId = setTimeout(applySafeOptimizations, 100);

    return () => {
      clearTimeout(timeoutId);
      // Clean up mobile styles on unmount
      const mobileStyles = document.querySelector('style[data-mobile-safe]');
      if (mobileStyles) {
        mobileStyles.remove();
      }
    };
  }, [isMobile]);

  return null;
};

export default SafeMobileOptimizer;