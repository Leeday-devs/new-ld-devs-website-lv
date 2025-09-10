import { useEffect, useCallback } from 'react';
import { debounce } from '@/utils/performance';

const PerformanceOptimizer = () => {
  // Optimize images with lazy loading and proper sizing
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.removeAttribute('data-src');
          img.classList.add('opacity-100');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    images.forEach(img => {
      img.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      imageObserver.observe(img);
    });
  }, []);

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    const criticalResources = [
      { href: '/videos/hero-new.mp4', as: 'video' },
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;600;700&display=swap', as: 'style' }
    ];

    criticalResources.forEach(({ href, as }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (as === 'style') {
        link.onload = () => {
          link.rel = 'stylesheet';
        };
      }
      document.head.appendChild(link);
    });
  }, []);

  // Fix layout shifts by adding dimensions to images
  const preventLayoutShifts = useCallback(() => {
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.naturalWidth && htmlImg.naturalHeight) {
        htmlImg.setAttribute('width', htmlImg.naturalWidth.toString());
        htmlImg.setAttribute('height', htmlImg.naturalHeight.toString());
        htmlImg.style.aspectRatio = `${htmlImg.naturalWidth}/${htmlImg.naturalHeight}`;
      }
    });
  }, []);

  // Optimize scroll performance
  const optimizeScrollPerformance = useCallback(
    debounce(() => {
      // Add scroll optimizations here
      const scrollElements = document.querySelectorAll('[data-scroll]');
      scrollElements.forEach(el => {
        (el as HTMLElement).style.transform = `translateZ(0)`; // Enable hardware acceleration
      });
    }, 100),
    []
  );

  useEffect(() => {
    // Run optimizations on mount
    preloadCriticalResources();
    optimizeImages();
    
    // Run after a short delay to ensure DOM is ready
    setTimeout(() => {
      preventLayoutShifts();
    }, 100);

    // Add scroll listener
    window.addEventListener('scroll', optimizeScrollPerformance, { passive: true });

    return () => {
      window.removeEventListener('scroll', optimizeScrollPerformance);
    };
  }, [preloadCriticalResources, optimizeImages, preventLayoutShifts, optimizeScrollPerformance]);

  // Component doesn't render anything visible
  return null;
};

export default PerformanceOptimizer;