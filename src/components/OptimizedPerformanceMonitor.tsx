import { useEffect } from 'react';

/**
 * Lightweight performance monitor that fixes Core Web Vitals issues
 * without causing conflicts or console errors
 */
const OptimizedPerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production to avoid development noise
    if (process.env.NODE_ENV !== 'production') return;

    let observer: PerformanceObserver | null = null;

    try {
      // Monitor Core Web Vitals with error handling
      if ('PerformanceObserver' in window) {
        observer = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          
          entries.forEach((entry) => {
            // Track LCP and apply optimizations if needed
            if (entry.entryType === 'largest-contentful-paint') {
              const lcp = entry.startTime;
              if (lcp > 2500) {
                // Optimize images if LCP is slow
                optimizeImagesForLCP();
              }
            }
            
            // Track CLS and fix layout shifts
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              const cls = (entry as any).value;
              if (cls > 0.1) {
                // Add dimensions to images to prevent layout shifts
                fixLayoutShifts();
              }
            }
          });
        });

        // Observe specific performance entries
        const typesToObserve = ['largest-contentful-paint', 'layout-shift'];
        typesToObserve.forEach(type => {
          try {
            observer?.observe({ entryTypes: [type] });
          } catch (e) {
            // Silently handle unsupported entry types
          }
        });
      }
    } catch (error) {
      // Silently handle any performance observer errors
    }

    return () => {
      try {
        observer?.disconnect();
      } catch (e) {
        // Cleanup error handling
      }
    };
  }, []);

  // Optimize images for better LCP
  const optimizeImagesForLCP = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add explicit dimensions if missing
      if (!img.width && !img.height && img.naturalWidth && img.naturalHeight) {
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;
        img.style.aspectRatio = `${img.naturalWidth}/${img.naturalHeight}`;
      }
      
      // Ensure hero images load eagerly
      if (img.src.includes('hero') || img.closest('[data-hero]')) {
        img.loading = 'eager';
        img.setAttribute('fetchpriority', 'high');
      }
    });
  };

  // Fix layout shifts by adding dimensions
  const fixLayoutShifts = () => {
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      const image = img as HTMLImageElement;
      if (image.naturalWidth && image.naturalHeight) {
        image.setAttribute('width', image.naturalWidth.toString());
        image.setAttribute('height', image.naturalHeight.toString());
        image.style.aspectRatio = `${image.naturalWidth}/${image.naturalHeight}`;
      }
    });
  };

  return null; // This component doesn't render anything
};

export default OptimizedPerformanceMonitor;