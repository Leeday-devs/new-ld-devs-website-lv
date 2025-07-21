import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowWeBuild from "@/components/HowWeBuild";
import About from "@/components/About";
import Process from "@/components/Process";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StatsBar from "@/components/StatsBar";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const Index = () => {
  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <Navigation />
        <main>
          <section id="home">
            <Hero />
            <StatsBar />
          </section>
          <section id="how-we-build">
            <HowWeBuild />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="services">
            <Services />
          </section>
          <section id="case-studies">
            <CaseStudies />
          </section>
          <section id="portfolio">
            <Portfolio />
          </section>
          <Testimonials />
          <Newsletter />
          <section id="faq">
            <FAQ />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
        <WhatsAppWidget />
      </div>
    </>
  );
};

export default Index;
