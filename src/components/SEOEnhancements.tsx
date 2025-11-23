import { useEffect } from 'react';

const SEOEnhancements = () => {
  useEffect(() => {
    // Add structured data for LocalBusiness
    const addLocalBusinessSchema = () => {
      const existingScript = document.querySelector('#local-business-schema');
      if (existingScript) return;

      const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://leeday.uk/#organization",
        "name": "LD Development",
        "alternateName": "Lee Day Development",
        "description": "Premium web development and AI solutions for UK businesses. Custom websites, e-commerce platforms, and digital automation services.",
        "url": "https://leeday.uk",
        "telephone": "07586266007",
        "email": "hello@leeday.uk",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "London",
          "addressCountry": "GB"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "51.5074",
          "longitude": "-0.1278"
        },
        "priceRange": "££-£££",
        "openingHours": "Mo-Fr 09:00-18:00",
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        },
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "51.5074",
            "longitude": "-0.1278"
          },
          "geoRadius": "100000"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Web Development Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Website Development",
                "description": "Bespoke website development using modern technologies"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "E-commerce Development",
                "description": "Complete online store solutions with payment integration"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "AI Automation Services",
                "description": "Business process automation using artificial intelligence"
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "150",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Sarah Mitchell"
            },
            "reviewBody": "LD Development transformed our online presence completely. The new website increased our leads by 300% in just 3 months."
          }
        ]
      };

      const script = document.createElement('script');
      script.id = 'local-business-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    // Add WebSite schema for sitelinks search box
    const addWebSiteSchema = () => {
      const existingScript = document.querySelector('#website-schema');
      if (existingScript) return;

      const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://leeday.uk/#website",
        "url": "https://leeday.uk",
        "name": "LD Development - Premium Web Development & AI Solutions",
        "description": "Award-winning web development agency in London specializing in custom websites, e-commerce, and AI automation for UK businesses.",
        "publisher": {
          "@id": "https://leeday.uk/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://leeday.uk/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "sameAs": [
          "https://www.linkedin.com/company/ld-development",
          "https://twitter.com/lddevelopment", 
          "https://github.com/lddevelopment"
        ]
      };

      const script = document.createElement('script');
      script.id = 'website-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    // Add Service schema
    const addServiceSchema = () => {
      const existingScript = document.querySelector('#service-schema');
      if (existingScript) return;

      const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://leeday.uk/#service",
        "name": "Web Development Services",
        "description": "Professional web development and AI automation services for businesses across the UK.",
        "provider": {
          "@id": "https://leeday.uk/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Development Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Responsive Website Design",
                "description": "Mobile-first, responsive websites that work perfectly on all devices"
              },
              "priceRange": "££"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "E-commerce Development",
                "description": "Complete online store solutions with secure payment processing"
              },
              "priceRange": "£££"
            }
          ]
        }
      };

      const script = document.createElement('script');
      script.id = 'service-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    // Optimize images for better SEO
    const optimizeImageSEO = () => {
      const images = document.querySelectorAll('img:not([alt])');
      images.forEach((img) => {
        const htmlImg = img as HTMLImageElement;
        if (!htmlImg.alt && htmlImg.src) {
          // Generate alt text from src or context
          const altText = htmlImg.src.includes('hero') ? 'Professional web development services showcase' :
                         htmlImg.src.includes('logo') ? 'Company logo' :
                         htmlImg.src.includes('testimonial') ? 'Client testimonial profile' :
                         'Web development related image';
          htmlImg.alt = altText;
        }
      });
    };

    // Add meta tags for better SEO
    const addMetaTags = () => {
      const addMeta = (property: string, content: string) => {
        if (!document.querySelector(`meta[property="${property}"]`) && 
            !document.querySelector(`meta[name="${property}"]`)) {
          const meta = document.createElement('meta');
          if (property.startsWith('og:') || property.startsWith('twitter:')) {
            meta.setAttribute('property', property);
          } else {
            meta.setAttribute('name', property);
          }
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      };

      // Open Graph tags
      addMeta('og:type', 'website');
      addMeta('og:site_name', 'LD Development');
      addMeta('og:locale', 'en_GB');
      
      // Twitter Card tags
      addMeta('twitter:card', 'summary_large_image');
      addMeta('twitter:site', '@lddevelopment');
      
      // Additional SEO tags
      addMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      addMeta('googlebot', 'index, follow');
      addMeta('geo.region', 'GB-LND');
      addMeta('geo.placename', 'London');
    };

    // Run all optimizations
    addLocalBusinessSchema();
    addWebSiteSchema(); 
    addServiceSchema();
    addMetaTags();
    
    // Delay image optimization to ensure DOM is ready
    setTimeout(optimizeImageSEO, 1000);
    
    // Add canonical URL if missing
    if (!document.querySelector('link[rel="canonical"]')) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = window.location.href.split('#')[0].split('?')[0];
      document.head.appendChild(canonical);
    }

  }, []);

  // Component doesn't render anything visible
  return null;
};

export default SEOEnhancements;