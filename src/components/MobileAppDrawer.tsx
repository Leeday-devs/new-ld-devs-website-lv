import { useState, useEffect } from "react";
import { X, Star, Shield, Award, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthButton from "./AuthButton";

interface MobileAppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileAppDrawer = ({ isOpen, onClose }: MobileAppDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'unset';
      }, 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { label: "Home", href: "/", isInternal: true },
    { label: "Services", href: "#services", isInternal: false },
    { label: "Pricing", href: "/pricing", isInternal: true },
    { label: "Templates", href: "/templates", isInternal: true },
    { label: "Blog", href: "/blog", isInternal: true },
    { label: "Portfolio", href: "#portfolio", isInternal: false },
    { label: "FAQ", href: "#faq", isInternal: false }
  ];

  const handleNavClick = (item: any) => {
    if (item.isInternal) {
      onClose();
    } else {
      onClose();
      setTimeout(() => {
        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/447586266007', '_blank');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`md:hidden fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-navy/98 backdrop-blur-xl border-l border-gold/20 transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/20">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/95a8e543-b54c-4dc4-b36a-5561bf01ed41.png" 
              alt="LD Development" 
              className="h-10 w-auto"
            />
            <div>
              <h3 className="text-white font-bold text-lg">LD Development</h3>
              <p className="text-gold text-xs">Premium Web Solutions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="p-4 border-b border-gold/10">
          <div className="flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-gold">
              <Star className="h-3 w-3 fill-current" />
              <span>5.0 Rating</span>
            </div>
            <div className="flex items-center gap-1 text-gold">
              <Shield className="h-3 w-3" />
              <span>Certified</span>
            </div>
            <div className="flex items-center gap-1 text-gold">
              <Award className="h-3 w-3" />
              <span>Quality</span>
            </div>
          </div>
        </div>
        
        {/* Navigation Items */}
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="space-y-2 px-4">
            {navItems.map((item, index) => (
              item.isInternal ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`block px-4 py-4 text-white/80 hover:text-orange hover:bg-orange/10 rounded-xl transition-all duration-200 font-medium text-base border border-transparent hover:border-orange/20 transform hover:translate-x-1`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-4 py-4 text-white/80 hover:text-orange hover:bg-orange/10 rounded-xl transition-all duration-200 font-medium text-base border border-transparent hover:border-orange/20 transform hover:translate-x-1`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  {item.label}
                </button>
              )
            ))}
          </nav>
        </div>
        
        {/* Bottom CTA & Auth */}
        <div className="p-4 border-t border-gold/10 space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-4 w-4 text-gold" />
            <AuthButton />
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-orange to-gold hover:from-orange/90 hover:to-gold/90 text-navy font-bold py-4 text-base rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={handleWhatsAppClick}
          >
            Work With Lee
          </Button>
        </div>
      </div>
      
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default MobileAppDrawer;