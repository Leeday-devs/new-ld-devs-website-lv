import { memo, useEffect } from "react";
import MobileAppLayout from "@/components/MobileAppLayout";
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
import FAQ from "@/components/FAQ";
import AboutMe from "@/components/AboutMe";
import LiveChatWidget from "@/components/LiveChatWidget";
import MobilePerformanceOptimizer from "@/components/MobilePerformanceOptimizer";
import CriticalCSS from "@/components/CriticalCSS";
import SEOEnhancements from "@/components/SEOEnhancements";
const Index = () => {
  const faqData = [{
    question: "How long does it take to build a website?",
    answer: "Most websites are completed within 2-4 weeks, depending on complexity. Simple websites can be delivered in as little as 1 week, while complex e-commerce or custom applications may take 6-8 weeks."
  }, {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes, we offer comprehensive maintenance packages including security updates, backups, performance monitoring, and content updates. All our websites come with 30 days of free support after launch."
  }, {
    question: "Can you help improve my website's search engine rankings?",
    answer: "Absolutely! All our websites are built with SEO best practices, including fast loading times, mobile optimization, clean code structure, and proper meta tags. We also offer dedicated SEO services to improve your rankings."
  }, {
    question: "What technologies do you use for web development?",
    answer: "We use modern technologies including React, TypeScript, Node.js, and cloud hosting services. This ensures your website is fast, secure, scalable, and future-proof."
  }, {
    question: "Do you work with businesses outside of London?",
    answer: "Yes, while we're based in London, we work with businesses throughout the UK and internationally. We conduct meetings via video calls and provide the same high-quality service regardless of location."
  }];

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <>
      <SEOHead title="Lee Day — London Freelance Web Developer | Premium Websites Without Agency Hassle" description="I'm Lee, a London-based freelance web developer. I build premium, high-converting websites with fast, direct communication—no middlemen. Pricing from £500." keywords="London freelance web developer, freelance website developer, premium websites UK, web developer London, direct web development, no agency middlemen, affordable web development, fast web developer" url="https://leedaydevs.com" serviceData={{
      serviceName: "Freelance Web Development",
      serviceType: "Website Development",
      areaServed: "United Kingdom",
      priceRange: "££-£££"
    }} faqData={faqData} breadcrumbs={[{
      name: "Home",
      url: "/"
    }]} />
      <MobileAppLayout showNavigation={true} showFooter={true} showBottomNav={true}>
        <BreadcrumbsNavigation />
        <main className="mobile-scroll">
          {/* Hero (navy) - Mobile Optimized */}
          <section id="home" aria-label="Homepage hero">
            <MobileOptimizedHero />
          </section>
          
          {/* Trust/Stats (navy band, count-up) */}
          <section aria-label="Company statistics and trust indicators">
            <StatsBar />
          </section>
          
          {/* Trusted By Logos - Social Proof */}
          <TrustedByLogos />
          
          {/* Services (dark background) - Premium spacing */}
          <section id="services" aria-label="Web development services" className="bg-transparent">
            <Services />
          </section>
          
          {/* Portfolio / Case Studies (dark background) - Premium spacing */}
          <section id="portfolio" aria-label="Portfolio of completed projects" className="bg-transparent">
            <Portfolio />
          </section>
          
          {/* Pricing (dark background) - Premium spacing */}
          <section id="pricing" aria-label="Pricing plans and packages" className="bg-transparent">
            <Pricing />
          </section>
          
          {/* Testimonials (navy band, carousel with auto-scroll) - Premium spacing */}
          <section aria-label="Client testimonials and reviews" className="section-navy">
            <TestimonialsCarousel />
          </section>
          
          {/* About Me Section */}
          <AboutMe />
          
          {/* FAQ (dark background) - Premium spacing */}
          <FAQ />
          
          {/* Final CTA (navy band) */}
          <FinalCTA />
          
        {/* Contact form if needed */}
        <section id="contact" aria-label="Contact information and form" className="section-navy mx-0 py-0">
          <Contact />
        </section>
        </main>
        <LiveChatWidget />
      </MobileAppLayout>
      <CriticalCSS />
      <MobilePerformanceOptimizer />
      <SEOEnhancements />
    </>;
};
export default memo(Index);