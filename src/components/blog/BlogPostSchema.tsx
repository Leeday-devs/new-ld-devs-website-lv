import { Helmet } from "react-helmet-async";

interface BlogPostSchemaProps {
  post: {
    id: string;
    title: string;
    slug: string;
    meta_title?: string | null;
    meta_description?: string | null;
    focus_keyword?: string | null;
    short_answer?: string | null;
    excerpt?: string | null;
    content: string;
    author_name?: string | null;
    published_at?: string | null;
    featured_image?: string | null;
    featured_image_alt?: string | null;
    category?: string | null;
    faqs?: Array<{ question: string; answer: string }> | null;
  };
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export const BlogPostSchema = ({ post, breadcrumbs }: BlogPostSchemaProps) => {
  const canonicalUrl = `https://leeday.uk/knowledge-hub/${post.slug}`;
  const metaTitle = post.meta_title || post.title;
  const metaDescription = post.meta_description || post.excerpt || post.short_answer || "";
  const ogImage = post.featured_image || "https://leeday.uk/og-default.jpg";
  const publishDate = post.published_at || new Date().toISOString();

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.short_answer || metaDescription,
    "author": {
      "@type": "Person",
      "name": post.author_name || "Lee Day"
    },
    "datePublished": publishDate,
    "dateModified": publishDate,
    "image": ogImage,
    "publisher": {
      "@type": "Organization",
      "name": "Lee Day Web Design",
      "logo": {
        "@type": "ImageObject",
        "url": "https://leeday.uk/logo.png"
      }
    }
  };

  // FAQ Schema (if FAQs exist)
  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {post.focus_keyword && <meta name="keywords" content={post.focus_keyword} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      {post.featured_image_alt && <meta property="og:image:alt" content={post.featured_image_alt} />}
      <meta property="article:published_time" content={publishDate} />
      <meta property="article:author" content={post.author_name || "Lee Day"} />
      {post.category && <meta property="article:section" content={post.category} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      {post.featured_image_alt && <meta name="twitter:image:alt" content={post.featured_image_alt} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};