import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import AppLikeNavigation from "@/components/AppLikeNavigation";
import MobileBottomNavigation from "@/components/MobileBottomNavigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface MobileAppLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
  showWhatsApp?: boolean;
  showBottomNav?: boolean;
}

const MobileAppLayout = ({ 
  children, 
  showNavigation = true, 
  showFooter = true,
  showWhatsApp = true,
  showBottomNav = true
}: MobileAppLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen app-container">
      {showNavigation && <AppLikeNavigation />}
      <main className={`mobile-app-main ${isMobile && showBottomNav ? 'pb-20' : ''}`}>
        {children}
      </main>
      {showFooter && <Footer />}
      {showWhatsApp && <WhatsAppButton />}
      {isMobile && showBottomNav && <MobileBottomNavigation />}
    </div>
  );
};

export default MobileAppLayout;