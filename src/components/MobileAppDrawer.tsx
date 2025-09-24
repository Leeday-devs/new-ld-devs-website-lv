import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
      
      {/* Drawer - Ultra Compact */}
      <div className={`md:hidden fixed top-0 right-0 bottom-0 z-50 w-56 max-w-[70vw] bg-navy/98 backdrop-blur-xl border-l border-gold/20 transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header - Ultra Compact */}
        <div className="flex items-center justify-between p-3 border-b border-gold/20">
          <div className="flex items-center gap-1.5">
            <img 
              src="/lovable-uploads/95a8e543-b54c-4dc4-b36a-5561bf01ed41.png" 
              alt="LD Development" 
              className="h-6 w-auto"
            />
            <div>
              <h3 className="text-white font-bold text-sm">LD Development</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
        
        {/* Navigation Items - Ultra Compact */}
        <div className="flex-1 py-2 overflow-y-auto">
          <nav className="space-y-0.5 px-2">
            {navItems.map((item, index) => (
              item.isInternal ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`block px-3 py-2.5 text-white/80 hover:text-orange hover:bg-orange/10 rounded-md transition-all duration-200 font-medium text-sm border border-transparent hover:border-orange/20`}
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
                  className={`block w-full text-left px-3 py-2.5 text-white/80 hover:text-orange hover:bg-orange/10 rounded-md transition-all duration-200 font-medium text-sm border border-transparent hover:border-orange/20`}
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