import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}

const SEOHead = ({ 
  title = "Lee Day Devs - Professional Web Development & Hosting",
  description = "Professional web development and hosting services in London. Custom websites, e-commerce, hosting solutions, and digital transformation for businesses.",
  keywords = "web development, website design, hosting, e-commerce, London, custom websites, digital transformation, responsive design",
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
          "@type": "WebDevelopmentBusiness",
          "name": "Lee Day Devs",
          "description": description,
          "url": url,
          "telephone": "07586266007",
          "email": "LeeDayDevs@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "3RD Floor 86-90, Paul Street",
            "addressLocality": "London",
            "postalCode": "EC2A 4NE",
            "addressCountry": "GB"
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
          "services": [
            "Web Development",
            "Website Design", 
            "Web Hosting",
            "E-commerce Development",
            "Digital Transformation"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;