import { memo, useEffect } from "react";
import MobileOptimizedNavigation from "@/components/MobileOptimizedNavigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Pricing from "@/components/Pricing";
import pricingHeroBg from "@/assets/pricing-hero-bg.jpg";

const PricingPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        title="Pricing - LD Development | Premium Web Development Packages UK"
        description="Transparent pricing for premium web development services. Website packages from £500, AI automation from £350, mobile apps from £1,500. All prices include hosting, SSL & support. UK based agency with 150+ happy clients."
        keywords="web development pricing UK, website cost, app development pricing, AI automation cost, web design packages London, affordable websites UK, premium web development rates"
        url="https://leeday.uk/pricing"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Pricing", url: "/pricing" }
        ]}
      />
      <div className="min-h-screen">
        <MobileOptimizedNavigation />
        <main className="pt-20">
          <Pricing />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default memo(PricingPage);