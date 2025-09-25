import { useEffect } from 'react';

/**
 * Enhances accessibility and fixes common issues found in accessibility audits
 */
const AccessibilityEnhancer = () => {
  useEffect(() => {
    const enhanceAccessibility = () => {
      // Add missing alt attributes to images
      const images = document.querySelectorAll('img:not([alt])');
      images.forEach(img => {
        const src = img.getAttribute('src') || '';
        let altText = 'Image';
        
        // Generate meaningful alt text based on src
        if (src.includes('hero')) altText = 'Professional web development services hero image';
        else if (src.includes('testimonial')) altText = 'Customer testimonial photo';
        else if (src.includes('project')) altText = 'Portfolio project screenshot';
        else if (src.includes('case-study')) altText = 'Case study example';
        else if (src.includes('logo')) altText = 'Company logo';
        
        img.setAttribute('alt', altText);
      });

      // Add ARIA labels to interactive elements without proper labels
      const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      buttons.forEach(button => {
        const text = button.textContent?.trim();
        if (!text || text.length < 2) {
          // Generic buttons need descriptive labels
          if (button.querySelector('svg')) {
            button.setAttribute('aria-label', 'Action button');
          }
        }
      });

      // Enhance form accessibility
      const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
      inputs.forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        const type = input.getAttribute('type');
        
        if (placeholder && !input.getAttribute('aria-label')) {
          input.setAttribute('aria-label', placeholder);
        } else if (type === 'email') {
          input.setAttribute('aria-label', 'Email address');
        } else if (type === 'password') {
          input.setAttribute('aria-label', 'Password');
        }
      });

      // Add skip links for keyboard navigation
      if (!document.querySelector('[data-skip-link]')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.setAttribute('data-skip-link', 'true');
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded focus:z-50';
        document.body.insertBefore(skipLink, document.body.firstChild);
      }

      // Ensure main content area is properly marked
      const main = document.querySelector('main');
      if (main && !main.id) {
        main.id = 'main-content';
      }

      // Add proper heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let hasH1 = false;
      headings.forEach(heading => {
        if (heading.tagName === 'H1') {
          hasH1 = true;
        }
      });

      // Ensure there's exactly one H1 per page
      if (!hasH1) {
        const firstHeading = document.querySelector('h2, h3');
        if (firstHeading && firstHeading.textContent) {
          const h1 = document.createElement('h1');
          h1.textContent = firstHeading.textContent;
          h1.className = firstHeading.className;
          firstHeading.parentNode?.replaceChild(h1, firstHeading);
        }
      }
    };

    // Run immediately and after dynamic content loads
    enhanceAccessibility();
    
    // Re-run after a delay to catch dynamically loaded content
    const timeoutId = setTimeout(enhanceAccessibility, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
};

export default AccessibilityEnhancer;