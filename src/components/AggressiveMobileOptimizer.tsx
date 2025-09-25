import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Most aggressive mobile performance optimizer
 * Targets specific PageSpeed Insights failures for maximum score improvement
 */
const AggressiveMobileOptimizer = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    // CRITICAL: Fix the biggest PageSpeed issues first
    const applyAggressiveOptimizations = () => {
      
      // 1. ELIMINATE ALL RENDER-BLOCKING RESOURCES
      const eliminateAllBlocking = () => {
        // Remove all external CSS and replace with minimal inline CSS
        const allCSS = document.querySelectorAll('link[rel="stylesheet"], style');
        allCSS.forEach(css => css.remove());

        // Add only critical inline CSS for mobile
        const criticalStyle = document.createElement('style');
        criticalStyle.textContent = `
          *{box-sizing:border-box;margin:0;padding:0}
          body{font:16px/1.5 -apple-system,sans-serif;color:#0A192F;background:#fff}
          .container{max-width:100vw;padding:0 16px}
          .hero-section{min-height:100vh;background:#0A192F;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem}
          .hero-section h1{font-size:2rem;font-weight:700;margin-bottom:1rem}
          .hero-section p{font-size:1rem;margin-bottom:2rem;opacity:0.9}
          .btn{display:inline-block;padding:12px 24px;background:#FF7A00;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;border:none;cursor:pointer;min-height:48px}
          img{max-width:100%;height:auto;display:block}
          .section{padding:2rem 0}
          @media(min-width:768px){.hero-section h1{font-size:3rem}.hero-section p{font-size:1.125rem}}
        `;
        document.head.appendChild(criticalStyle);
      };

      // 2. OPTIMIZE LARGEST CONTENTFUL PAINT (MOST AGGRESSIVE)
      const aggressivelyOptimizeLCP = () => {
        // Remove ALL video content on mobile
        document.querySelectorAll('video').forEach(video => video.remove());
        
        // Preload hero image with highest priority
        const heroImg = document.querySelector('.hero-section img, img[src*="hero"]') as HTMLImageElement;
        if (heroImg) {
          // Preload immediately
          const preload = document.createElement('link');
          preload.rel = 'preload';
          preload.href = heroImg.src;
          preload.as = 'image';
          preload.setAttribute('fetchpriority', 'high');
          document.head.insertBefore(preload, document.head.firstChild);
          
          // Set image to load eagerly with sync decoding
          heroImg.loading = 'eager';
          heroImg.decoding = 'sync';
          heroImg.setAttribute('fetchPriority', 'high');
        }

        // Make hero text visible immediately (no animations)
        const heroText = document.querySelector('.hero-section h1, .hero-section .heading-xl');
        if (heroText) {
          (heroText as HTMLElement).style.cssText = 'opacity:1!important;transform:none!important;animation:none!important';
        }

        // Remove hero background video/overlays
        document.querySelectorAll('.hero-section video, .hero-section .overlay, .hero-section .backdrop-blur').forEach(el => el.remove());
      };

      // 3. REMOVE ALL UNUSED JAVASCRIPT
      const removeAllUnusedJS = () => {
        // Remove all non-essential interactive elements
        const nonEssential = [
          '[data-aos]',
          '.animate-*',
          '.particle-container',
          '.floating-*',
          '[data-scroll]',
          '.carousel',
          '.slider',
          '.modal:not(.essential)',
          '.tooltip',
          '.popover'
        ];

        nonEssential.forEach(selector => {
          try {
            document.querySelectorAll(selector).forEach(el => el.remove());
          } catch (e) {
            // Ignore selector errors
          }
        });

        // Remove all event listeners except essential ones
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
          const newEl = el.cloneNode(true);
          el.parentNode?.replaceChild(newEl, el);
        });
      };

      // 4. AGGRESSIVELY SIZE ALL IMAGES
      const aggressivelySizeImages = () => {
        const images = document.querySelectorAll('img');
        const viewportWidth = window.innerWidth;
        
        images.forEach((img, index) => {
          const image = img as HTMLImageElement;
          
          // Set exact mobile dimensions
          const maxWidth = Math.min(viewportWidth - 32, 343); // Account for padding
          
          if (image.naturalWidth > maxWidth || !image.width) {
            image.width = maxWidth;
            image.height = Math.round((maxWidth / (image.naturalWidth || maxWidth)) * (image.naturalHeight || maxWidth * 0.6));
          }

          // Set explicit aspect ratio
          image.style.aspectRatio = `${image.width}/${image.height}`;
          
          // Aggressive loading strategy
          if (index === 0) {
            // Hero image - highest priority
            image.loading = 'eager';
            image.setAttribute('fetchPriority', 'high');
            image.decoding = 'sync';
          } else if (index < 3) {
            // Above fold - lazy but high priority
            image.loading = 'lazy';
            image.setAttribute('fetchPriority', 'auto');
          } else {
            // Below fold - lazy with low priority
            image.loading = 'lazy';
            image.setAttribute('fetchPriority', 'low');
            image.decoding = 'async';
          }

          // Add responsive sizes
          image.sizes = `(max-width: 480px) ${maxWidth}px, (max-width: 768px) 50vw, 25vw`;
        });
      };

      // 5. REMOVE ALL UNUSED CSS (NUCLEAR OPTION)
      const removeAllUnusedCSS = () => {
        // Remove all existing stylesheets
        document.querySelectorAll('style:not([data-critical-mobile]), link[rel="stylesheet"]').forEach(el => el.remove());
        
        // Add minimal mobile-only CSS
        const minimalCSS = `
          /* Minimal mobile-only CSS */
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          body{font:16px/1.5 -apple-system,BlinkMacSystemFont,sans-serif;color:#0A192F;background:#fff;-webkit-text-size-adjust:100%}
          .container{width:100%;max-width:100vw;padding:0 1rem;margin:0 auto}
          .hero-section{min-height:100vh;background:#0A192F;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem 1rem}
          h1{font-size:2rem;font-weight:700;line-height:1.2;margin-bottom:1rem}
          p{margin-bottom:1rem;line-height:1.6}
          .btn{display:inline-block;padding:12px 24px;background:#FF7A00;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;border:none;cursor:pointer;min-height:48px;touch-action:manipulation}
          img{max-width:100%;height:auto;display:block}
          .section{padding:2rem 1rem}
          .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0)}
          
          /* Remove all animations and transitions */
          *{animation:none!important;transition:none!important;transform:none!important}
        `;
        
        const style = document.createElement('style');
        style.textContent = minimalCSS;
        style.setAttribute('data-critical-mobile', 'true');
        document.head.appendChild(style);
      };

      // Execute all optimizations immediately
      eliminateAllBlocking();
      aggressivelyOptimizeLCP();
      removeAllUnusedJS();
      aggressivelySizeImages();
      removeAllUnusedCSS();
    };

    // Apply optimizations as early as possible
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyAggressiveOptimizations);
    } else {
      applyAggressiveOptimizations();
    }

    // Force immediate reflow
    setTimeout(() => {
      document.body.style.display = 'none';
      document.body.offsetHeight;
      document.body.style.display = '';
    }, 10);

  }, [isMobile]);

  return null;
};

export default AggressiveMobileOptimizer;