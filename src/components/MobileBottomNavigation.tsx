import { Home, Briefcase, DollarSign, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useContactModal } from "@/components/PopupManager";

const MobileBottomNavigation = () => {
  const location = useLocation();
  const { openContactModal } = useContactModal();

  const navItems = [
    { 
      label: "Home", 
      icon: Home, 
      href: "/", 
      isInternal: true 
    },
    { 
      label: "Services", 
      icon: Briefcase, 
      href: "#services", 
      isInternal: false 
    },
    { 
      label: "Pricing", 
      icon: DollarSign, 
      href: "/pricing", 
      isInternal: true 
    },
    { 
      label: "Contact", 
      icon: MessageCircle, 
      action: openContactModal 
    }
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href === "/pricing") return location.pathname === "/pricing";
    return false;
  };

  const handleNavClick = (item: any) => {
    if (item.action) {
      item.action();
    } else if (!item.isInternal) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-xl border-t border-gold/20">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.href ? isActive(item.href) : false;
          
          if (item.isInternal && item.href) {
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 min-w-[60px] ${
                  active 
                    ? 'bg-orange/20 text-orange' 
                    : 'text-white/70 hover:text-orange hover:bg-orange/10'
                }`}
              >
                <Icon className={`h-5 w-5 mb-1 ${active ? 'scale-110' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          }
          
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 min-w-[60px] text-white/70 hover:text-orange hover:bg-orange/10"
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNavigation;