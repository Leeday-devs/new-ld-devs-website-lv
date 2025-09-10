import { X, Home, Monitor, CreditCard, Phone, User, Mail, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawerMenu = ({ isOpen, onClose }: MobileDrawerMenuProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const handleNavClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', targetId: 'home' },
    { id: 'services', icon: Monitor, label: 'Services', targetId: 'services' },
    { id: 'pricing', icon: CreditCard, label: 'Pricing', targetId: 'pricing' },
    { id: 'contact', icon: Phone, label: 'Contact', targetId: 'contact' }
  ];

  const contactInfo = [
    { icon: Mail, label: 'LeeDayDevs@gmail.com', href: 'mailto:LeeDayDevs@gmail.com' },
    { icon: Phone, label: '07586 266007', href: 'tel:07586266007' },
    { icon: MapPin, label: 'London, UK', href: '#' }
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-navy">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6">
            <div className="space-y-4 mb-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.targetId)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-orange/10 hover:text-orange transition-all duration-300 text-left group"
                  >
                    <div className="bg-white rounded-xl p-2 group-hover:bg-orange/20 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-lg">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full bg-orange text-white rounded-2xl p-4 font-bold text-lg hover:bg-orange-600 transition-colors mb-8"
            >
              Get Instant Quote
            </button>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 mb-4">Quick Contact</h3>
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-orange" />
                    <span className="text-sm text-gray-600">{info.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileDrawerMenu;