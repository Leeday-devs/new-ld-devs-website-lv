import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowWeBuild from "@/components/HowWeBuild";
import About from "@/components/About";
import Process from "@/components/Process";
import Services from "@/components/Services";
import CustomerPortal from "@/components/CustomerPortal";
import CaseStudies from "@/components/CaseStudies";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StatsBar from "@/components/StatsBar";
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
      />
      <div className="min-h-screen">
        <Navigation />
        <main>
          <section id="home" aria-label="Homepage hero and statistics">
            <Hero />
            <StatsBar />
          </section>
          <section id="how-we-build" aria-label="Our development process">
            <HowWeBuild />
          </section>
          <section id="about" aria-label="About LD Development team">
            <About />
          </section>
          <section id="services" aria-label="Web development services and plans">
            <Services />
          </section>
          <section aria-label="Customer portal information">
            <CustomerPortal />
          </section>
          <section id="case-studies" aria-label="Client case studies and success stories">
            <CaseStudies />
          </section>
          <section id="portfolio" aria-label="Portfolio of completed projects">
            <Portfolio />
          </section>
          <section aria-label="Client testimonials and reviews">
            <Testimonials />
          </section>
          <section aria-label="Newsletter subscription">
            <Newsletter />
          </section>
          <section id="faq" aria-label="Frequently asked questions">
            <FAQ />
          </section>
          <section id="contact" aria-label="Contact information and form">
            <Contact />
          </section>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
