import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowWeBuild from "@/components/HowWeBuild";
import About from "@/components/About";
import Process from "@/components/Process";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="how-we-build">
          <HowWeBuild />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="process">
          <Process />
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
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
