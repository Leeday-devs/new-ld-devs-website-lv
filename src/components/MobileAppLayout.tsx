import { ReactNode } from "react";
import AppLikeNavigation from "@/components/AppLikeNavigation";
import Footer from "@/components/Footer";

interface MobileAppLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
}

const MobileAppLayout = ({
  children,
  showNavigation = true,
  showFooter = true
}: MobileAppLayoutProps) => {
  return (
    <div className="min-h-screen app-container">
      {showNavigation && <AppLikeNavigation />}
      <main className="mobile-app-main">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MobileAppLayout;