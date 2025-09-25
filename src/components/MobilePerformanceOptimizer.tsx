import { useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Mobile-specific performance optimizer targeting PageSpeed issues
 * Addresses: render-blocking resources, unused CSS/JS, image optimization
 */
const MobilePerformanceOptimizer = () => {
  const isMobile = useIsMobile();

  // Critical: Optimize images specifically for mobile PageSpeed
  const optimizeMobileImages = useCallback(() => {
    if (!isMobile) return;

    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      // Mobile-specific image sizes (addresses PageSpeed "properly size images")
      if (!img.sizes) {
        if (img.src.includes('hero')) {
          img.sizes = '100vw';
        } else if (img.src.includes('testimonial') || img.src.includes('project')) {
          img.sizes = '(max-width: 768px) 100vw, 50vw';
        } else {
          img.sizes = '(max-width: 768px) 100vw, 25vw';
        }
      }

      // Loading strategy for mobile (addresses LCP issues)
      if (index < 2) {
        img.loading = 'eager';
        img.setAttribute('fetchPriority', 'high');
        img.decoding = 'sync';
      } else {
        img.loading = 'lazy';
        img.setAttribute('fetchPriority', 'low');
        img.decoding = 'async';
      }

      // Prevent layout shifts on mobile
      if (!img.width && !img.height && img.naturalWidth && img.naturalHeight) {
        const maxMobileWidth = Math.min(img.naturalWidth, 768);
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const mobileHeight = maxMobileWidth * aspectRatio;
        
        img.width = maxMobileWidth;
        img.height = mobileHeight;
        img.style.aspectRatio = `${img.naturalWidth}/${img.naturalHeight}`;
      }
    });
  }, [isMobile]);

  // Remove render-blocking and unused CSS on mobile
  const optimizeMobileCSS = useCallback(() => {
    if (!isMobile) return;

    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        /* Remove expensive animations (reduces unused CSS) */
        .animate-float,
        .animate-float-delayed,
        .animate-pulse-glow,
        .animate-gradient-shift,
        .animate-rotate-slow { animation: none !important; }
        
        /* Simplify hover effects (mobile doesn't need them) */
        .card-premium:hover,
        .card-featured:hover { 
          transform: none !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Remove backdrop blur (expensive on mobile) */
        .backdrop-blur-sm,
        .backdrop-blur-md,
        .backdrop-blur-lg { backdrop-filter: none !important; }
        
        /* Simplify gradients */
        .bg-gradient-luxury,
        .bg-gradient-premium { background: hsl(var(--bg-white)) !important; }
        
        /* Reduce shadow complexity */
        .shadow-luxury,
        .shadow-premium,
        .shadow-premium-hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important; }
        
        /* Remove 3D transforms */
        .section-white,
        .section-grey,
        .section-navy { 
          transform: none !important;
          will-change: auto !important;
        }
      }
    `;
    style.setAttribute('data-mobile-perf', 'true');
    document.head.appendChild(style);
  }, [isMobile]);

  // Defer non-critical JavaScript (addresses unused JS)
  const optimizeMobileJS = useCallback(() => {
    if (!isMobile) return;

    // Use requestIdleCallback for non-critical operations
    const runWhenIdle = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(callback, { timeout: 1000 });
      } else {
        setTimeout(callback, 500);
      }
    };

    // Defer heavy operations
    runWhenIdle(() => {
      // Remove unused event listeners on mobile
      const elements = document.querySelectorAll('[data-aos], .particle-container');
      elements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
    });
  }, [isMobile]);

  // Preload only critical resources for mobile
  const preloadMobileCritical = useCallback(() => {
    if (!isMobile) return;

    // Only preload hero image, skip video for mobile bandwidth
    const criticalResources = [
      { href: '/lovable-uploads/2b71c5d0-b143-4337-b814-e4dec0c11b15.png', as: 'image' }
    ];

    criticalResources.forEach(({ href, as }) => {
      const existing = document.querySelector(`link[href="${href}"]`);
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        document.head.appendChild(link);
      }
    });
  }, [isMobile]);

  // Initialize mobile optimizations
  useEffect(() => {
    if (!isMobile) return;

    // Run immediately for critical performance
    preloadMobileCritical();
    optimizeMobileCSS();

    // Defer non-critical optimizations
    const timeoutId = setTimeout(() => {
      optimizeMobileImages();
      optimizeMobileJS();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isMobile, preloadMobileCritical, optimizeMobileCSS, optimizeMobileImages, optimizeMobileJS]);

  return null;
};

export default MobilePerformanceOptimizer;