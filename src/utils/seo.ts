// SEO utility functions for optimizing meta data and performance

export const generatePageTitle = (pageTitle: string, includeCompany = true) => {
  const company = "LD Development";
  const separator = " | ";
  
  if (!includeCompany) return pageTitle;
  
  // Ensure title doesn't exceed 60 characters for optimal SEO
  const maxLength = 60 - company.length - separator.length;
  const truncatedTitle = pageTitle.length > maxLength 
    ? pageTitle.substring(0, maxLength - 3) + "..." 
    : pageTitle;
    
  return `${truncatedTitle}${separator}${company}`;
};

export const generateMetaDescription = (description: string, maxLength = 160) => {
  if (description.length <= maxLength) return description;
  
  // Truncate at word boundary
  const truncated = description.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpaceIndex) + '...';
};

export const generateCanonicalUrl = (pathname: string, baseUrl = "https://leedaydevs.com") => {
  // Remove trailing slash and clean path
  const cleanPath = pathname.replace(/\/$/, '') || '';
  return `${baseUrl}${cleanPath}`;
};

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string; url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": generateCanonicalUrl(crumb.url)
    }))
  };
};

export const generateLocalBusinessStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LD Development",
    "alternateName": "Lee Day Devs",
    "description": "Premium web development and AI solutions for UK businesses. Custom websites, e-commerce platforms, and digital automation services.",
    "url": "https://leedaydevs.com",
    "telephone": "+447586266007",
    "email": "LeeDayDevs@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor 86-90, Paul Street",
      "addressLocality": "London",
      "addressRegion": "England",
      "postalCode": "EC2A 4NE",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5244,
      "longitude": -0.0795
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/ld-development",
      "https://github.com/leedaydevs",
      "https://twitter.com/leedaydevs"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
};

export const generateServiceStructuredData = (serviceName: string, serviceDescription: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": serviceDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "LD Development"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${serviceName} Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": serviceName,
            "description": serviceDescription
          }
        }
      ]
    }
  };
};

export const optimizeImages = () => {
  // Add loading="lazy" to images below the fold
  const images = document.querySelectorAll('img:not([loading])');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.loading = 'lazy';
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

export const prefetchCriticalResources = () => {
  // No critical resources to preload - using Google Fonts and inline CSS
  // This function is kept for future use if needed
};

// Core Web Vitals optimization
export const optimizeLCP = () => {
  // Preload hero images and videos
  const heroVideo = document.querySelector('video[src*="hero"]') as HTMLVideoElement;
  const heroImage = document.querySelector('img[src*="hero"]') as HTMLImageElement;
  
  if (heroVideo) {
    heroVideo.preload = 'auto';
  }
  
  if (heroImage && heroImage.src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = heroImage.src;
    link.as = 'image';
    document.head.appendChild(link);
  }
};

export const optimizeCLS = () => {
  // Add explicit dimensions to images to prevent layout shift
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach(img => {
    const image = img as HTMLImageElement;
    if (image.naturalWidth && image.naturalHeight) {
      image.width = image.naturalWidth;
      image.height = image.naturalHeight;
    }
  });
};

export const optimizeFID = () => {
  // Defer non-critical JavaScript
  const scripts = document.querySelectorAll('script[src]:not([defer]):not([async])');
  scripts.forEach(scriptElement => {
    const script = scriptElement as HTMLScriptElement;
    if (script.src && !script.src.includes('critical')) {
      script.setAttribute('defer', '');
    }
  });
};

// Initialize all optimizations
export const initializeSEOOptimizations = () => {
  // Run immediately
  optimizeLCP();
  
  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImages();
      optimizeCLS();
      optimizeFID();
      prefetchCriticalResources();
    });
  } else {
    optimizeImages();
    optimizeCLS();
    optimizeFID();
    prefetchCriticalResources();
  }
};