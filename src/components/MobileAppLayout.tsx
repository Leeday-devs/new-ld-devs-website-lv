import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import AppLikeNavigation from "@/components/AppLikeNavigation";
import MobileBottomNavigation from "@/components/MobileBottomNavigation";
import MobileStickyActionBar from "@/components/MobileStickyActionBar";
import Footer from "@/components/Footer";

interface MobileAppLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
  showBottomNav?: boolean;
}

const MobileAppLayout = ({ 
  children, 
  showNavigation = true, 
  showFooter = true,
  showBottomNav = true
}: MobileAppLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen app-container">
      {showNavigation && <AppLikeNavigation />}
      <main className="mobile-app-main">
        {children}
      </main>
      {showFooter && <Footer />}
      {isMobile && showBottomNav && <MobileBottomNavigation />}
    </div>
  );
};

export default MobileAppLayout;