import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface PageLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
  showWhatsApp?: boolean;
}

const PageLayout = ({ 
  children, 
  showNavigation = true, 
  showFooter = true,
  showWhatsApp = true 
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      {showNavigation && <Navigation />}
      <main>{children}</main>
      {showFooter && <Footer />}
      {showWhatsApp && <WhatsAppButton />}
    </div>
  );
};

export default PageLayout;