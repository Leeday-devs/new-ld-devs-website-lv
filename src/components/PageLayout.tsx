import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
}

const PageLayout = ({ 
  children, 
  showNavigation = true, 
  showFooter = true
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      {showNavigation && <Navigation />}
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default PageLayout;