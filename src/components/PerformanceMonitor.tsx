import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const measurePerformance = () => {
      // First Contentful Paint (FCP)
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          if (process.env.NODE_ENV === 'development') {
            console.log('LCP:', lastEntry.startTime);
          }
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // Fallback for browsers that don't support LCP
        }

        // Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0;
          
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          
          if (process.env.NODE_ENV === 'development') {
            console.log('CLS:', clsValue);
          }
        });
        
        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          // Fallback for browsers that don't support CLS
        }
      }

      // Log performance metrics in development
      if (process.env.NODE_ENV === 'development' && fcp) {
        console.log('FCP:', fcp.startTime);
        
        // Total Blocking Time approximation
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as any;
          if (navigation) {
            console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart);
          }
        }, 0);
      }
    };

    // Run after the page has loaded
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;