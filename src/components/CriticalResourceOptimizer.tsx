import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Aggressively optimizes critical resources to improve LCP and reduce render-blocking
 * Targets the specific issues shown in PageSpeed Insights
 */
const CriticalResourceOptimizer = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    // 1. ELIMINATE RENDER-BLOCKING RESOURCES
    const eliminateRenderBlocking = () => {
      // Inline critical CSS and defer the rest
      const criticalCSS = `
        /* Critical above-the-fold CSS only */
        body{margin:0;font-family:Inter,sans-serif;background:#fff;color:#0A192F}
        .container{max-width:100vw;padding:0 1rem}
        img{max-width:100%;height:auto}
        button{min-height:48px;background:#FF7A00;color:#fff;border:none;border-radius:8px;cursor:pointer}
        .hero-section{min-height:100vh;background:#0A192F;color:#fff;display:flex;align-items:center;justify-content:center}
        .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0)}
      `;

      // Remove existing stylesheets and inline critical CSS
      const styleSheets = document.querySelectorAll('link[rel="stylesheet"]');
      styleSheets.forEach((sheet, index) => {
        const link = sheet as HTMLLinkElement;
        if (index === 0) {
          // Replace first stylesheet with critical CSS
          const style = document.createElement('style');
          style.textContent = criticalCSS;
          link.parentNode?.replaceChild(style, link);
        } else {
          // Load non-critical CSS asynchronously
          link.media = 'print';
          link.onload = () => {
            link.media = 'all';
          };
        }
      });
    };

    // 2. OPTIMIZE LARGEST CONTENTFUL PAINT (LCP)
    const optimizeLCP = () => {
      // Preload hero content immediately
      const heroImage = document.querySelector('img[src*="hero"], .hero-section img') as HTMLImageElement;
      if (heroImage) {
        heroImage.loading = 'eager';
        heroImage.setAttribute('fetchPriority', 'high');
        heroImage.decoding = 'sync';
        
        // Preload the hero image
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = heroImage.src;
        preloadLink.as = 'image';
        document.head.insertBefore(preloadLink, document.head.firstChild);
      }

      // Remove hero video on mobile to improve LCP
      const heroVideo = document.querySelector('video[autoplay]') as HTMLVideoElement;
      if (heroVideo) {
        heroVideo.style.display = 'none';
        // Show fallback image instead
        const fallback = document.querySelector('#video-fallback') as HTMLElement;
        if (fallback) {
          fallback.style.opacity = '1';
        }
      }

      // Ensure hero text is visible immediately
      const heroText = document.querySelector('.hero-section h1, .hero-section .heading-xl');
      if (heroText) {
        (heroText as HTMLElement).style.opacity = '1';
        (heroText as HTMLElement).style.transform = 'none';
      }
    };

    // 3. REDUCE UNUSED JAVASCRIPT AGGRESSIVELY
    const reduceUnusedJS = () => {
      // Remove non-essential features on mobile
      const nonEssentialElements = [
        '[data-aos]',
        '.animate-pulse',
        '.animate-spin',
        '.particle-container',
        '.floating-elements',
        '[data-scroll]'
      ];

      nonEssentialElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
      });

      // Defer all scripts except the main bundle (most aggressive approach)
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        const scriptElement = script as HTMLScriptElement;
        if (!scriptElement.src.includes('main') && !scriptElement.hasAttribute('defer')) {
          scriptElement.remove(); // Remove non-essential scripts entirely on mobile
        }
      });
    };

    // 4. PROPERLY SIZE IMAGES FOR MOBILE
    const properlySizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        const image = img as HTMLImageElement;
        
        // Set explicit mobile dimensions
        const maxMobileWidth = Math.min(window.innerWidth, 768);
        
        if (image.naturalWidth > maxMobileWidth) {
          image.width = maxMobileWidth;
          image.height = (maxMobileWidth / image.naturalWidth) * image.naturalHeight;
        }

        // Add mobile-optimized srcset
        if (!image.srcset && image.src) {
          const baseSrc = image.src.split('?')[0];
          image.srcset = `
            ${baseSrc}?w=320 320w,
            ${baseSrc}?w=480 480w,
            ${baseSrc}?w=768 768w
          `;
          image.sizes = '(max-width: 320px) 320px, (max-width: 480px) 480px, 768px';
        }

        // Aggressive lazy loading for non-critical images
        if (index > 1) {
          image.loading = 'lazy';
          image.setAttribute('fetchPriority', 'low');
        }
      });
    };

    // 5. REMOVE UNUSED CSS AGGRESSIVELY
    const removeUnusedCSS = () => {
      const mobileOnlyCSS = `
        @media (max-width: 768px) {
          /* Hide all non-essential elements */
          .hidden-mobile,
          [data-aos],
          .animate-bounce,
          .animate-pulse,
          .animate-spin,
          .particle-container,
          .floating-bg { display: none !important; }
          
          /* Remove all animations */
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          /* Remove expensive visual effects */
          .backdrop-blur-sm,
          .backdrop-blur-md,
          .backdrop-blur-lg { backdrop-filter: none !important; }
          
          .shadow-xl,
          .shadow-2xl,
          .shadow-3xl { box-shadow: none !important; }
          
          /* Simplify gradients */
          .bg-gradient-to-r,
          .bg-gradient-to-br,
          .bg-gradient-to-tr { background: #fff !important; }
          
          /* Remove transforms */
          .transform,
          .rotate-1,
          .rotate-2,
          .scale-105,
          .scale-110 { transform: none !important; }
        }
      `;

      const style = document.createElement('style');
      style.textContent = mobileOnlyCSS;
      style.setAttribute('data-critical-mobile', 'true');
      document.head.appendChild(style);
    };

    // 6. OPTIMIZE FONT LOADING
    const optimizeFontLoading = () => {
      // Replace Google Fonts with system fonts on mobile
      const fontCSS = `
        @media (max-width: 768px) {
          body, .font-sans { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif !important;
          }
          .font-serif, .heading-primary {
            font-family: Georgia, 'Times New Roman', serif !important;
          }
        }
      `;

      const style = document.createElement('style');
      style.textContent = fontCSS;
      document.head.appendChild(style);

      // Remove Google Fonts link on mobile
      const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
      fontLinks.forEach(link => link.remove());
    };

    // Execute all optimizations immediately (most aggressive approach)
    eliminateRenderBlocking();
    optimizeLCP();
    reduceUnusedJS();
    properlySizeImages();
    removeUnusedCSS();
    optimizeFontLoading();

    // Run additional optimizations after a short delay
    setTimeout(() => {
      // Force layout reflow to apply all changes
      document.body.style.display = 'none';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = '';
    }, 50);

  }, [isMobile]);

  return null;
};

export default CriticalResourceOptimizer;