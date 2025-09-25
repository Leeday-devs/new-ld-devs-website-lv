// Mobile-specific performance optimizations targeting PageSpeed issues

/**
 * Eliminate render-blocking resources on mobile
 */
export const eliminateRenderBlocking = () => {
  // Convert synchronous CSS to asynchronous loading
  const cssLinks = document.querySelectorAll('link[rel="stylesheet"]:not([media])');
  cssLinks.forEach((link, index) => {
    const linkElement = link as HTMLLinkElement;
    if (index > 0) { // Keep the first CSS file synchronous
      linkElement.media = 'print';
      linkElement.onload = () => {
        linkElement.media = 'all';
      };
    }
  });

  // Defer non-critical JavaScript
  const scripts = document.querySelectorAll('script[src]:not([defer]):not([async])');
  scripts.forEach(script => {
    const scriptElement = script as HTMLScriptElement;
    if (!scriptElement.src.includes('main') && !scriptElement.src.includes('critical')) {
      scriptElement.defer = true;
    }
  });
};

/**
 * Reduce unused CSS specifically for mobile
 */
export const reduceUnusedCSS = () => {
  const mobileCSS = `
    @media (max-width: 768px) {
      /* Hide desktop-only elements */
      .hidden-mobile { display: none !important; }
      
      /* Disable expensive effects */
      * {
        text-shadow: none !important;
        filter: none !important;
        backdrop-filter: none !important;
      }
      
      /* Simplify animations */
      @keyframes fadeIn { 
        from { opacity: 0; } 
        to { opacity: 1; } 
      }
      
      /* Remove unused hover states */
      *:hover { 
        transform: none !important;
        transition: none !important;
      }
      
      /* Optimize fonts */
      body { font-synthesis: none; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = mobileCSS;
  style.setAttribute('data-mobile-unused-css', 'true');
  document.head.appendChild(style);
};

/**
 * Optimize images for mobile (next-gen formats, proper sizing)
 */
export const optimizeMobileImages = () => {
  const images = document.querySelectorAll('img');
  
  images.forEach((img, index) => {
    const image = img as HTMLImageElement;
    
    // Add WebP support detection
    const supportsWebP = (() => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      return canvas.toDataURL('image/webp').startsWith('data:image/webp');
    })();

    // Optimize loading based on position
    if (index === 0) {
      // Hero image - highest priority
      image.loading = 'eager';
      image.setAttribute('fetchPriority', 'high');
      image.decoding = 'sync';
    } else if (index < 3) {
      // Above fold - high priority
      image.loading = 'eager';
      image.setAttribute('fetchPriority', 'auto');
    } else {
      // Below fold - lazy load
      image.loading = 'lazy';
      image.setAttribute('fetchPriority', 'low');
      image.decoding = 'async';
    }

    // Add responsive sizes for mobile
    if (!image.sizes) {
      const rect = image.getBoundingClientRect();
      if (rect.width > 300) {
        image.sizes = '(max-width: 768px) 100vw, 50vw';
      } else {
        image.sizes = '(max-width: 768px) 50vw, 25vw';
      }
    }

    // Prevent layout shifts
    if (!image.width && !image.height) {
      image.style.aspectRatio = '16/9'; // Default aspect ratio
      image.style.backgroundColor = '#f3f4f6'; // Placeholder
    }
  });
};

/**
 * Reduce initial server response time optimizations
 */
export const optimizeServerResponse = () => {
  // Preconnect to critical domains
  const criticalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  criticalDomains.forEach(domain => {
    const existing = document.querySelector(`link[href="${domain}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      if (domain.includes('gstatic')) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    }
  });

  // Add resource hints for mobile
  const dnsHints = [
    'https://cdn.jsdelivr.net',
    'https://unpkg.com'
  ];

  dnsHints.forEach(domain => {
    const existing = document.querySelector(`link[href="${domain}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    }
  });
};

/**
 * Mobile-specific Core Web Vitals optimizations
 */
export const optimizeMobileCoreWebVitals = () => {
  // LCP optimization
  const optimizeLCP = () => {
    // Preload hero content
    const heroElements = document.querySelectorAll('[data-hero], .hero-section img, video[autoplay]');
    heroElements.forEach(element => {
      if (element.tagName === 'IMG') {
        const img = element as HTMLImageElement;
        img.loading = 'eager';
        img.setAttribute('fetchPriority', 'high');
      }
      
      if (element.tagName === 'VIDEO') {
        const video = element as HTMLVideoElement;
        video.preload = 'metadata'; // Not 'auto' to save mobile bandwidth
      }
    });
  };

  // CLS optimization
  const optimizeCLS = () => {
    // Add explicit dimensions to prevent layout shifts
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      const image = img as HTMLImageElement;
      
      // Use natural dimensions if available
      if (image.naturalWidth && image.naturalHeight) {
        const maxWidth = Math.min(image.naturalWidth, 768); // Mobile max width
        const aspectRatio = image.naturalHeight / image.naturalWidth;
        
        image.width = maxWidth;
        image.height = maxWidth * aspectRatio;
        image.style.aspectRatio = `${image.naturalWidth}/${image.naturalHeight}`;
      } else {
        // Fallback dimensions
        image.style.aspectRatio = '16/9';
        image.style.width = '100%';
        image.style.height = 'auto';
      }
    });

    // Reserve space for dynamic content
    const containers = document.querySelectorAll('.container, main, section');
    containers.forEach(container => {
      const element = container as HTMLElement;
      if (!element.style.minHeight && element.children.length === 0) {
        element.style.minHeight = '200px';
      }
    });
  };

  // FID optimization
  const optimizeFID = () => {
    // Use passive event listeners
    const addPassiveListeners = () => {
      const events = ['scroll', 'touchstart', 'touchmove', 'wheel'];
      events.forEach(eventType => {
        document.addEventListener(eventType, () => {}, { passive: true });
      });
    };

    // Defer non-critical JavaScript
    if ('requestIdleCallback' in window) {
      requestIdleCallback(addPassiveListeners);
    } else {
      setTimeout(addPassiveListeners, 100);
    }
  };

  // Run optimizations
  optimizeLCP();
  optimizeCLS();
  optimizeFID();
};

/**
 * Complete mobile optimization suite
 */
export const initializeMobileOptimizations = () => {
  // Check if mobile
  const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (!isMobile) return;

  // Run optimizations in order of priority
  eliminateRenderBlocking();
  optimizeServerResponse();
  
  // Defer less critical optimizations
  requestAnimationFrame(() => {
    reduceUnusedCSS();
    optimizeMobileImages();
    optimizeMobileCoreWebVitals();
  });

  // Re-optimize after load
  window.addEventListener('load', () => {
    setTimeout(() => {
      optimizeMobileImages(); // Catch any late-loaded images
    }, 1000);
  });
};