// Advanced performance optimizations for production builds

/**
 * Optimizes images for better Core Web Vitals
 */
export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add missing dimensions to prevent layout shift
    if (!img.width && !img.height && img.naturalWidth && img.naturalHeight) {
      img.width = img.naturalWidth;
      img.height = img.naturalHeight;
      img.style.aspectRatio = `${img.naturalWidth}/${img.naturalHeight}`;
    }
    
    // Optimize loading strategy
    const rect = img.getBoundingClientRect();
    const isAboveFold = rect.top < window.innerHeight;
    
    if (isAboveFold) {
      img.loading = 'eager';
      img.setAttribute('fetchPriority', 'high');
    } else {
      img.loading = 'lazy';
      img.setAttribute('fetchPriority', 'low');
    }
    
    // Add responsive image optimization
    if (!img.sizes && img.src.includes('hero')) {
      img.sizes = '100vw';
    }
  });
};

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/videos/hero-new.mp4', as: 'video', type: 'video/mp4' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;600;700&display=swap', as: 'style' }
  ];

  criticalResources.forEach(({ href, as, type }) => {
    const existingLink = document.querySelector(`link[href="${href}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      
      // For stylesheets, convert to actual stylesheet after load
      if (as === 'style') {
        link.onload = () => {
          link.rel = 'stylesheet';
        };
      }
      
      document.head.appendChild(link);
    }
  });
};

/**
 * Initialize service worker for caching
 */
export const initializeServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      
      // Update service worker when new version available
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available, could show update notification
              console.log('New version available');
            }
          });
        }
      });
      
      return registration;
    } catch (error) {
      console.log('Service worker registration failed');
    }
  }
};

/**
 * Optimize scroll performance
 */
export const optimizeScrollPerformance = () => {
  // Add passive event listeners for better scroll performance
  const passiveSupported = (() => {
    let passiveSupported = false;
    try {
      const options = {
        get passive() {
          passiveSupported = true;
          return false;
        }
      };
      window.addEventListener('test', null as any, options);
    } catch (err) {}
    return passiveSupported;
  })();

  const eventOptions = passiveSupported ? { passive: true } : false;
  
  // Remove existing scroll listeners and add optimized ones
  document.addEventListener('scroll', () => {
    // Throttled scroll handler would go here
  }, eventOptions);
  
  document.addEventListener('touchstart', () => {
    // Touch handler
  }, eventOptions);
  
  document.addEventListener('touchmove', () => {
    // Touch move handler
  }, eventOptions);
};

/**
 * Reduce JavaScript execution time
 */
export const optimizeJavaScript = () => {
  // Defer non-critical scripts
  const scripts = document.querySelectorAll('script[src]:not([defer]):not([async])');
  scripts.forEach(script => {
    const scriptElement = script as HTMLScriptElement;
    if (scriptElement.src && !scriptElement.src.includes('critical') && !scriptElement.src.includes('polyfill')) {
      scriptElement.defer = true;
    }
  });
  
  // Use requestIdleCallback for non-critical operations
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Non-critical operations can be queued here
      optimizeImages();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      optimizeImages();
    }, 1000);
  }
};

/**
 * Complete performance optimization suite
 */
export const initializePerformanceOptimizations = () => {
  // Run immediately for critical optimizations
  preloadCriticalResources();
  optimizeScrollPerformance();
  
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImages();
      optimizeJavaScript();
      initializeServiceWorker();
    });
  } else {
    optimizeImages();
    optimizeJavaScript();
    initializeServiceWorker();
  }
  
  // Re-optimize after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      optimizeImages(); // Catch any dynamically loaded images
    }, 500);
  });
};