import { memo } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StatsBar from "@/components/StatsBar";
import TrustedByLogos from "@/components/TrustedByLogos";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="LD Development - Professional Web Development & Hosting Services UK"
        description="Expert web development and hosting services in London. We build custom websites, e-commerce platforms, AI automation solutions, and customer portals for UK businesses. Fast, secure, mobile-optimized websites with ongoing support."
        keywords="web development UK, website design London, web hosting UK, e-commerce development, AI automation small business, customer portal development, responsive web design, React development, web security, mobile-first design"
        url="https://leedaydevs.com"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "LD Development",
          url: "https://leedaydevs.com"
        }}
        organizationSameAs={[
          "https://www.facebook.com/profile.php?id=61563893127712"
        ]}
      />
      <div className="min-h-screen">
        <Navigation />
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
          
          {/* Services (white cards) - Premium spacing */}
          <section id="services" aria-label="Web development services" className="section-white">
            <Services />
          </section>
          
          {/* Portfolio / Case Studies (white, 3-column grid) - Premium spacing */}
          <section id="portfolio" aria-label="Portfolio of completed projects" className="section-white">
            <Portfolio />
          </section>
          
          {/* Testimonials (navy band, cards with headshots) - Premium spacing */}
          <section aria-label="Client testimonials and reviews" className="section-navy">
            <Testimonials />
          </section>
          
          {/* Pricing (white cards, one highlighted) - Premium spacing */}
          <section id="pricing" aria-label="Pricing plans and packages" className="section-white">
            <Pricing />
          </section>
          
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
      </div>
    </>
  );
};

export default memo(Index);
