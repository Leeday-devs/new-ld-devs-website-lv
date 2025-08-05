import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}

const SEOHead = ({ 
  title = "LD Development - Professional Web Development & Hosting Services UK",
  description = "Expert web development and hosting services in London. We build custom websites, e-commerce platforms, AI automation solutions, and customer portals for UK businesses. Fast, secure, mobile-optimized websites with ongoing support.",
  keywords = "web development UK, website design London, web hosting UK, e-commerce development, AI automation small business, customer portal development, responsive web design, React development, web security, mobile-first design",
  ogImage = "/hero-image.jpg",
  url = "https://leedaydevs.com"
}: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Lee Day Devs" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "LD Development",
          "alternateName": "Lee Day Devs",
          "description": description,
          "url": url,
          "logo": {
            "@type": "ImageObject",
            "url": `${url}/hero-image.jpg`
          },
          "image": `${url}/hero-image.jpg`,
          "telephone": "+447586266007",
          "email": "LeeDayDevs@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "3rd Floor 86-90, Paul Street",
            "addressLocality": "London",
            "postalCode": "EC2A 4NE",
            "addressCountry": "GB"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "51.5074",
            "longitude": "-0.1278"
          },
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "51.5074",
              "longitude": "-0.1278"
            },
            "geoRadius": "50000"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "150",
            "bestRating": "5",
            "worstRating": "1"
          },
          "priceRange": "££-£££",
          "openingHours": "Mo-Su 00:00-23:59",
          "sameAs": [
            "https://www.linkedin.com/company/ld-development",
            "https://github.com/ld-development"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Web Development Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Custom Website Development",
                  "description": "Professional custom website development using modern technologies"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "E-commerce Development",
                  "description": "Complete e-commerce solutions with payment integration and inventory management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Web Hosting",
                  "description": "Fast, secure, and reliable web hosting with 24/7 support"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Automation",
                  "description": "Business process automation using artificial intelligence"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Customer Portal Development",
                  "description": "Secure customer portals for project management and billing"
                }
              }
            ]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;