import { memo } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
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
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import SEOEnhancements from "@/components/SEOEnhancements";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import SecurityHeaders from "@/components/SecurityHeaders";
import LoadingStates from "@/components/LoadingStates";
import ErrorTracker, { ErrorBoundary } from "@/components/ErrorTracker";

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

  return (
    <ErrorBoundary>
      <LoadingStates />
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
        <Navigation />
        <BreadcrumbsNavigation />
        <main>
          {/* Hero (navy) */}
          <section id="home" aria-label="Homepage hero">
            <Hero />
          </section>
          
          {/* Trust/Stats (navy band, count-up) */}
          <section aria-label="Company statistics and trust indicators">
            <StatsBar />
          </section>
          
          {/* Trusted By Logos - Social Proof */}
          <TrustedByLogos />
          
          {/* AI Benefits Section - Charts and examples */}
          <AIBenefitsSection />
          
          {/* Services (white cards) - Premium spacing */}
          <section id="services" aria-label="Web development services" className="p-0 bg-transparent">
            <Services />
          </section>
          
          {/* Portfolio / Case Studies (white, 3-column grid) - Premium spacing */}
          <section id="portfolio" aria-label="Portfolio of completed projects" className="section-white">
            <Portfolio />
          </section>
          
          {/* Pricing (white cards, one highlighted) - Premium spacing */}
          <section id="pricing" aria-label="Pricing plans and packages" className="section-white">
            <Pricing />
          </section>
          
          {/* Testimonials (navy band, carousel with auto-scroll) - Premium spacing */}
          <section aria-label="Client testimonials and reviews" className="section-navy">
            <TestimonialsCarousel />
          </section>
          
          {/* Applications Section - AI and website features */}
          <ApplicationsSection />
          
          {/* FAQ (white cards) - Premium spacing */}
          <FAQ />
          
          {/* Final CTA (navy band) */}
          <FinalCTA />
          
        {/* Contact form if needed */}
        <section id="contact" aria-label="Contact information and form" className="section-navy">
          <Contact />
        </section>
        </main>
        
        {/* Footer (navy) */}
        <Footer />
        <WhatsAppButton />
        <LiveChatWidget />
      </div>
      <PerformanceOptimizer />
      <SEOEnhancements />
      <AnalyticsTracker />
      <SecurityHeaders />
      <ErrorTracker />
    </ErrorBoundary>
  );
};

export default memo(Index);
