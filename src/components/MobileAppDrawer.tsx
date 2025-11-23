import { useState, useEffect } from "react";
import { X, Home, Briefcase, CreditCard, LayoutGrid, BookOpen, FolderOpen, HelpCircle, MessageCircle, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MobileAppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileAppDrawer = ({ isOpen, onClose }: MobileAppDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

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
    { label: "Home", href: "/", isInternal: true, icon: Home },
    { label: "Services", href: "#services", isInternal: false, icon: Briefcase },
    { label: "Pricing", href: "/pricing", isInternal: true, icon: CreditCard },
    { label: "Pre-Built", href: "/templates", isInternal: true, icon: LayoutGrid },
    { label: "Knowledge Hub", href: "/knowledge-hub", isInternal: true, icon: BookOpen },
    { label: "Portfolio", href: "#portfolio", isInternal: false, icon: FolderOpen },
    { label: "FAQ", href: "#faq", isInternal: false, icon: HelpCircle },
    { label: "Contact", href: "#contact", isInternal: false, icon: MessageCircle }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
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
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[80vw] bg-gradient-to-b from-navy via-navy/98 to-navy/95 backdrop-blur-xl border-l border-gold/30 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gold/20 bg-navy/50">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/95a8e543-b54c-4dc4-b36a-5561bf01ed41.png"
              alt="LD Development"
              className="h-10 w-auto"
            />
            <div>
              <h3 className="text-white font-bold text-base">LD Development</h3>
              <p className="text-orange/80 text-xs">Premium Web Solutions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 hover:rotate-90 transition-all duration-300"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="space-y-1 px-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = item.isInternal && isActive(item.href);

              return item.isInternal ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium text-[15px] group ${
                    active
                      ? 'bg-gradient-to-r from-orange/20 to-gold/10 text-orange border border-orange/30'
                      : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10'
                  }`}
                  style={{
                    opacity: 0,
                    animation: isOpen ? `slideInRight 0.3s ease-out ${index * 50}ms forwards` : 'none'
                  }}
                >
                  <Icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${active ? 'text-orange' : 'text-white/60 group-hover:text-orange'}`} />
                  <span>{item.label}</span>
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange" />}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="flex items-center gap-3 w-full text-left px-4 py-3.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium text-[15px] border border-transparent hover:border-white/10 group"
                  style={{
                    opacity: 0,
                    animation: isOpen ? `slideInRight 0.3s ease-out ${index * 50}ms forwards` : 'none'
                  }}
                >
                  <Icon className="h-5 w-5 text-white/60 group-hover:text-orange transition-transform duration-200 group-hover:scale-110" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* CTA Section */}
        <div className="p-4 border-t border-gold/20 bg-navy/50 space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-orange to-gold hover:from-orange/90 hover:to-gold/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange/20 transition-all duration-300 hover:shadow-xl hover:shadow-orange/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            onClick={handleWhatsAppClick}
          >
            <Phone className="h-4 w-4" />
            Work With Lee
          </Button>
          <p className="text-center text-white/50 text-xs">
            Free consultation available
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
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