import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileChatButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const handleWhatsAppClick = () => {
    const whatsappNumber = "447586266007";
    const message = "Hi! I need help with my website project.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsExpanded(false);
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:LeeDayDevs@gmail.com?subject=Website Help Request";
    setIsExpanded(false);
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-20 right-4 z-40">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200/50 p-4 w-56 animate-scale-in">
          <div className="space-y-3">
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-medium"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Chat
            </button>
            
            <button
              onClick={handleEmailClick}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors font-medium"
            >
              <MessageCircle className="h-5 w-5" />
              Send Email
            </button>
            
            <button
              onClick={handleContactClick}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors font-medium"
            >
              <MessageCircle className="h-5 w-5" />
              Contact Form
            </button>
          </div>
        </div>
      )}

      {/* Main Chat Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-orange text-white rounded-full p-4 shadow-2xl hover:shadow-orange/20 transition-all duration-300 ${
          isExpanded ? 'rotate-45 scale-110' : 'hover:scale-110'
        }`}
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default MobileChatButton;