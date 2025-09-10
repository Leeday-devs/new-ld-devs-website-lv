import { useEffect } from 'react';

const SecurityHeaders = () => {
  useEffect(() => {
    // Add security-related meta tags
    const addSecurityMeta = () => {
      const securityTags = [
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
        { httpEquiv: 'X-Frame-Options', content: 'DENY' },
        { httpEquiv: 'X-XSS-Protection', content: '1; mode=block' },
        { httpEquiv: 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=()' }
      ];

      securityTags.forEach(tag => {
        const existingMeta = tag.name 
          ? document.querySelector(`meta[name="${tag.name}"]`)
          : document.querySelector(`meta[http-equiv="${tag.httpEquiv}"]`);
          
        if (!existingMeta) {
          const meta = document.createElement('meta');
          if (tag.name) {
            meta.setAttribute('name', tag.name);
          } else if (tag.httpEquiv) {
            meta.setAttribute('http-equiv', tag.httpEquiv);
          }
          meta.setAttribute('content', tag.content);
          document.head.appendChild(meta);
        }
      });
    };

    // Add Content Security Policy (CSP) - Development friendly
    const addCSP = () => {
      const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      if (!existingCSP) {
        const csp = document.createElement('meta');
        csp.setAttribute('http-equiv', 'Content-Security-Policy');
        csp.setAttribute('content', [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://www.google-analytics.com https://www.googletagmanager.com https://vercel.live",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com data:",
          "img-src 'self' data: https: blob:",
          "media-src 'self' data: blob:",
          "connect-src 'self' https://api.lovable.dev https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com",
          "frame-ancestors 'none'",
          "form-action 'self'",
          "base-uri 'self'"
        ].join('; '));
        document.head.appendChild(csp);
      }
    };

    // Add preconnect links for performance and security
    const addPreconnectLinks = () => {
      const preconnects = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com'
      ];

      preconnects.forEach(href => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = href;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        }
      });
    };

    // Prevent clickjacking by checking if in iframe
    const preventClickjacking = () => {
      if (window !== window.top) {
        // Site is in an iframe - could be clickjacking attempt
        document.body.style.display = 'none';
        console.warn('Potential clickjacking attempt detected');
      }
    };

    // Add HTTPS upgrade for mixed content
    const upgradeInsecureRequests = () => {
      const upgrade = document.createElement('meta');
      upgrade.setAttribute('http-equiv', 'Content-Security-Policy');
      upgrade.setAttribute('content', 'upgrade-insecure-requests');
      document.head.appendChild(upgrade);
    };

    // Enhanced form security
    const enhanceFormSecurity = () => {
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        // Add CSRF protection (if token available)
        if (!form.querySelector('input[name="csrf_token"]')) {
          // In a real app, you'd get this from your backend
          const csrfToken = sessionStorage.getItem('csrf_token');
          if (csrfToken) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'csrf_token';
            input.value = csrfToken;
            form.appendChild(input);
          }
        }

        // Ensure forms use HTTPS in production
        if (form.action && form.action.startsWith('http:') && window.location.protocol === 'https:') {
          form.action = form.action.replace('http:', 'https:');
        }
      });
    };

    // Input sanitization for user inputs
    const sanitizeInputs = () => {
      const inputs = document.querySelectorAll('input[type="text"], textarea');
      inputs.forEach(input => {
        input.addEventListener('input', (e) => {
          const target = e.target as HTMLInputElement | HTMLTextAreaElement;
          // Basic XSS prevention - remove script tags and suspicious patterns
          let value = target.value;
          value = value.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
          value = value.replace(/javascript:/gi, '');
          value = value.replace(/on\w+\s*=/gi, '');
          if (value !== target.value) {
            target.value = value;
            console.warn('Potentially malicious input detected and sanitized');
          }
        });
      });
    };

    // Run all security enhancements
    addSecurityMeta();
    addPreconnectLinks();
    preventClickjacking();
    
    // Delay some operations to ensure DOM is ready
    setTimeout(() => {
      enhanceFormSecurity();
      sanitizeInputs();
    }, 500);

    // Note: CSP is commented out for development - enable in production
    // addCSP();
    // upgradeInsecureRequests();

  }, []);

  // Component doesn't render anything visible
  return null;
};

export default SecurityHeaders;