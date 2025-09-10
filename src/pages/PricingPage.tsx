import { memo } from "react";
import MobileOptimizedNavigation from "@/components/MobileOptimizedNavigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import WhatsAppButton from "@/components/WhatsAppButton";
import Pricing from "@/components/Pricing";

const PricingPage = () => {
  return (
    <>
      <SEOHead 
        title="Pricing - LD Development | Premium Web Development Packages UK"
        description="Transparent pricing for premium web development services. Website packages from £500, AI automation from £350, mobile apps from £1,500. All prices include hosting, SSL & support. UK-based agency with 150+ happy clients."
        keywords="web development pricing UK, website cost, app development pricing, AI automation cost, web design packages London, affordable websites UK, premium web development rates"
        url="https://leedaydevs.com/pricing"
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
        <WhatsAppButton />
      </div>
    </>
  );
};

export default memo(PricingPage);