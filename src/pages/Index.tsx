import { memo, useEffect } from "react";
import MobileOptimizedNavigation from "@/components/MobileOptimizedNavigation";
import MobileOptimizedHero from "@/components/MobileOptimizedHero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Portfolio from "@/components/Portfolio";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Contact from "@/components/Contact";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import BreadcrumbsNavigation from "@/components/BreadcrumbsNavigation";
import StatsBar from "@/components/StatsBar";
import TrustedByLogos from "@/components/TrustedByLogos";
import WhatsAppButton from "@/components/WhatsAppButton";
import FAQ from "@/components/FAQ";
import AIBenefitsSection from "@/components/AIBenefitsSection";
import ApplicationsSection from "@/components/ApplicationsSection";
import LiveChatWidget from "@/components/LiveChatWidget";
import MobilePerformanceOptimizer from "@/components/MobilePerformanceOptimizer";
import CriticalCSS from "@/components/CriticalCSS";
import SEOEnhancements from "@/components/SEOEnhancements";

const Index = () => {
  const faqData = [
    {
      question: "How long does it take to build a website?",
      answer: "Most websites are completed within 2-4 weeks, depending on complexity. Simple websites can be delivered in as little as 1 week, while complex e-commerce or custom applications may take 6-8 weeks."
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes, we offer comprehensive maintenance packages including security updates, backups, performance monitoring, and content updates. All our websites come with 30 days of free support after launch."
    },
    {
      question: "Can you help improve my website's search engine rankings?",
      answer: "Absolutely! All our websites are built with SEO best practices, including fast loading times, mobile optimization, clean code structure, and proper meta tags. We also offer dedicated SEO services to improve your rankings."
    },
    {
      question: "What technologies do you use for web development?",
      answer: "We use modern technologies including React, TypeScript, Node.js, and cloud hosting services. This ensures your website is fast, secure, scalable, and future-proof."
    },
    {
      question: "Do you work with businesses outside of London?",
      answer: "Yes, while we're based in London, we work with businesses throughout the UK and internationally. We conduct meetings via video calls and provide the same high-quality service regardless of location."
    }
  ];

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        title="LD Development - Premium Web Development & AI Solutions | London UK"
        description="Award-winning web development agency in London. Custom websites, e-commerce, AI automation & digital solutions. Fast, secure, mobile-optimized websites for UK businesses. 5-star rated with 150+ happy clients. Get your free quote today!"
        keywords="web development London, website design UK, e-commerce development, AI automation, React development, web hosting UK, digital agency London, custom websites, mobile app development, SEO services London"
        url="https://leedaydevs.com"
        serviceData={{
          serviceName: "Web Development Services",
          serviceType: "Website Development",
          areaServed: "United Kingdom",
          priceRange: "££-£££"
        }}
        faqData={faqData}
        breadcrumbs={[
          { name: "Home", url: "/" }
        ]}
      />
      <div className="min-h-screen">
        <MobileOptimizedNavigation />
        <BreadcrumbsNavigation />
        <main className="mobile-scroll">
          {/* Hero (navy) - Mobile Optimized */}
          <section id="home" aria-label="Homepage hero">
            <MobileOptimizedHero />
          </section>
          
          {/* Trust/Stats (navy band, count-up) - Mobile Compact */}
          <section aria-label="Company statistics and trust indicators" className="section-mobile-compact">
            <StatsBar />
          </section>
          
          {/* Trusted By Logos - Social Proof - Mobile Minimal */}
          <div className="section-mobile-minimal">
            <TrustedByLogos />
          </div>
          
          {/* AI Benefits Section - Charts and examples - Mobile Compact */}
          <div className="section-mobile-compact">
            <AIBenefitsSection />
          </div>
          
          {/* Services (dark background) - Mobile Compact */}
          <section id="services" aria-label="Web development services" className="bg-transparent section-mobile-compact">
            <Services />
          </section>
          
          {/* Portfolio / Case Studies (dark background) - Mobile Compact */}
          <section id="portfolio" aria-label="Portfolio of completed projects" className="bg-transparent section-mobile-compact">
            <Portfolio />
          </section>
          
          {/* Pricing (dark background) - Mobile Compact */}
          <section id="pricing" aria-label="Pricing plans and packages" className="bg-transparent section-mobile-compact">
            <Pricing />
          </section>
          
          {/* Testimonials (navy band, carousel with auto-scroll) - Mobile Minimal */}
          <section aria-label="Client testimonials and reviews" className="section-navy section-mobile-minimal">
            <TestimonialsCarousel />
          </section>
          
          {/* Applications Section - AI and website features - Mobile Compact */}
          <div className="section-mobile-compact">
            <ApplicationsSection />
          </div>
          
          {/* FAQ (dark background) - Mobile Compact */}
          <div className="section-mobile-compact">
            <FAQ />
          </div>
          
          {/* Final CTA (navy band) - Mobile Minimal */}
          <div className="section-navy section-mobile-minimal">
            <FinalCTA />
          </div>
          
        {/* Contact form if needed - Mobile Compact */}
        <section id="contact" aria-label="Contact information and form" className="section-navy section-mobile-compact">
          <Contact />
        </section>
        </main>
        
        {/* Footer (navy) */}
        <Footer />
        <WhatsAppButton />
        <LiveChatWidget />
      </div>
      <CriticalCSS />
      <MobilePerformanceOptimizer />
      <SEOEnhancements />
    </>
  );
};

export default memo(Index);
