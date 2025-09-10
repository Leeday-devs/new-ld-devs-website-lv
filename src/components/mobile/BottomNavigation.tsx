import { Home, Monitor, CreditCard, Phone, Menu } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('home');
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', targetId: 'home' },
    { id: 'services', icon: Monitor, label: 'Services', targetId: 'services' },
    { id: 'pricing', icon: CreditCard, label: 'Pricing', targetId: 'pricing' },
    { id: 'contact', icon: Phone, label: 'Contact', targetId: 'contact' },
    { id: 'menu', icon: Menu, label: 'Menu', targetId: null }
  ];

  const handleNavClick = (itemId: string, targetId: string | null) => {
    setActiveTab(itemId);
    
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (itemId === 'menu') {
      // Toggle mobile menu
      const menuButton = document.querySelector('[data-mobile-menu-trigger]') as HTMLElement;
      if (menuButton) {
        menuButton.click();
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.targetId)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-300 min-w-0 ${
                isActive
                  ? 'bg-orange/10 text-orange scale-105'
                  : 'text-gray-500 hover:text-orange hover:bg-orange/5'
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? 'animate-bounce' : ''}`} />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;