import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
  structuredData?: any | any[];
  noindex?: boolean;
}

const SEOHead = ({
  title = "LD Development - Professional Web Development & Hosting Services UK",
  description =
    "Expert web development and hosting services in London. We build custom websites, e-commerce platforms, AI automation solutions, and customer portals for UK businesses. Fast, secure, mobile-optimized websites with ongoing support.",
  keywords =
    "web development UK, website design London, web hosting UK, e-commerce development, AI automation small business, customer portal development, responsive web design, React development, web security, mobile-first design",
  ogImage = "/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png",
  url,
  structuredData,
  noindex = false,
}: SEOHeadProps) => {
  const currentUrl = url || (typeof window !== "undefined" ? window.location.href : "https://leedaydevs.com");
  const originUrl = typeof window !== "undefined" ? window.location.origin : "https://leedaydevs.com";
  const sdArray = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Lee Day Devs" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Organization structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "LD Development",
          alternateName: "Lee Day Devs",
          description,
          url: currentUrl,
          logo: `${originUrl}/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png`,
          image: `${originUrl}/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png`,
          telephone: "+447586266007",
          email: "LeeDayDevs@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "3rd Floor 86-90, Paul Street",
            addressLocality: "London",
            postalCode: "EC2A 4NE",
            addressCountry: "GB",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "150",
          },
        })}
      </script>

      {/* Page-specific structured data */}
      {sdArray.map((sd, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(sd)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
