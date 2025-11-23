import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
  structuredData?: any | any[];
  noindex?: boolean;
  organizationSameAs?: string[];
  siteName?: string;
  locale?: string;
  breadcrumbs?: Array<{name: string; url: string}>;
  articleData?: {
    headline: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    wordCount: number;
  };
  serviceData?: {
    serviceName: string;
    serviceType: string;
    areaServed: string;
    priceRange?: string;
  };
  faqData?: Array<{question: string; answer: string}>;
}

const SEOHead = ({
  title = "LD Development - Premium Web Development & AI Solutions | London UK",
  description = "Leading web development agency in London specializing in custom websites, e-commerce, AI automation & digital solutions. Award-winning team delivering fast, secure, mobile-optimized websites for UK businesses. Get your free quote today!",
  keywords = "web development London, website design UK, e-commerce development, AI automation, React development, web hosting UK, digital agency London, custom websites, mobile app development, SEO services London, web security, responsive design",
  ogImage = "/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png", 
  url,
  structuredData,
  noindex = false,
  organizationSameAs = [
    "https://www.linkedin.com/in/lee-day",
    "https://github.com/leedaydevs", 
    "https://twitter.com/leedaydevs"
  ],
  siteName = "LD Development",
  locale = "en_GB",
  breadcrumbs,
  articleData,
  serviceData,
  faqData,
}: SEOHeadProps) => {
  const currentUrl = url || (typeof window !== "undefined" ? window.location.href : "https://leeday.uk");
  const originUrl = typeof window !== "undefined" ? window.location.origin : "https://leeday.uk";
  const sdArray = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];

  // Generate structured data
  const generateStructuredData = () => {
    const schemas = [];

    // Person Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${originUrl}#person`,
      name: "Lee Day",
      jobTitle: "Freelance Web Developer",
      brand: "LD Development",
      url: "https://leeday.uk",
      image: "https://leeday.uk/path-to-headshot.jpg",
      telephone: "07586266007",
      email: "mailto:leedaydevs@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressCountry: "GB"
      },
      sameAs: [
        "https://www.linkedin.com/in/lee-day"
      ],
      areaServed: "GB",
      knowsAbout: ["Web Development", "WordPress", "AI Automation", "Supabase", "React"]
    });

    // Website Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${originUrl}#website`,
      url: originUrl,
      name: siteName,
      description,
      publisher: {
        "@id": `${originUrl}#person`
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${originUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });

    // Service Schema for service pages
    if (serviceData) {
      schemas.push({
        "@context": "https://schema.org", 
        "@type": "Service",
        name: serviceData.serviceName,
        serviceType: serviceData.serviceType,
        provider: {
          "@id": `${originUrl}#person`
        },
        areaServed: serviceData.areaServed,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${serviceData.serviceName} Services`,
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: serviceData.serviceName
              }
            }
          ]
        },
        ...(serviceData.priceRange && { priceRange: serviceData.priceRange })
      });
    }

    // Article Schema for blog posts
    if (articleData) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: articleData.headline,
        author: {
          "@type": "Person", 
          name: articleData.author
        },
        publisher: {
          "@id": `${originUrl}#person`
        },
        datePublished: articleData.datePublished,
        dateModified: articleData.dateModified || articleData.datePublished,
        wordCount: articleData.wordCount,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": currentUrl
        },
        image: ogImage
      });
    }

    // FAQ Schema
    if (faqData && faqData.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage", 
        mainEntity: faqData.map(faq => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      });
    }

    // Breadcrumb Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${originUrl}${crumb.url}`
        }))
      });
    }

    return schemas;
  };

  const allStructuredData = [...generateStructuredData(), ...sdArray];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="LD Development" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Advanced SEO Meta Tags */}
      <meta name="theme-color" content="#0A192F" />
      <meta name="msapplication-TileColor" content="#FF7A00" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="geo.region" content="GB-LND" />
      <meta name="geo.placename" content="London" />
      <meta name="geo.position" content="51.5244;-0.0795" />
      <meta name="ICBM" content="51.5244, -0.0795" />
      
      {/* Open Graph Enhanced */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${originUrl}${ogImage}`} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta property="business:contact_data:street_address" content="3rd Floor 86-90, Paul Street" />
      <meta property="business:contact_data:locality" content="London" />
      <meta property="business:contact_data:postal_code" content="EC2A 4NE" />
      <meta property="business:contact_data:country_name" content="United Kingdom" />
      <meta property="business:contact_data:phone_number" content="07586266007" />
      <meta property="business:contact_data:email" content="leedaydevs@gmail.com" />

      {/* Twitter Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@leedaydevs" />
      <meta name="twitter:creator" content="@leedaydevs" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${originUrl}${ogImage}`} />
      <meta name="twitter:image:alt" content={title} />

      {/* Mobile Web App Meta Tags (Updated from deprecated apple-mobile-web-app-capable) */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Microsoft Meta Tags */}
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* AI Search Engine Optimization */}
      <meta name="ai-content-declaration" content="human-created" />
      <meta name="generator" content="LD Development - Professional Web Agency" />

      {/* Performance & Preload Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />

      {/* Structured Data */}
      {allStructuredData.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
