import { useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "447586266007";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const handleWhatsAppClick = () => {
    console.log("Opening WhatsApp:", whatsappUrl);
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleToggleClick = () => {
    console.log("Toggle clicked, isOpen:", !isOpen);
    if (!isOpen) {
      // If widget is closed, open WhatsApp directly
      handleWhatsAppClick();
    } else {
      // If widget is open, just close it
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Widget Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Expanded Chat Options */}
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-80 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Lee Day Devs</h3>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Online now
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700 mb-2">
                  👋 Hi there! Need help with your website project?
                </p>
                <p className="text-xs text-gray-500">
                  We typically reply in a few minutes
                </p>
              </div>
              
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-medium"
              >
                <MessageCircle className="h-5 w-5" />
                Start Chat on WhatsApp
              </Button>
              
              <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Free consultation
                </div>
                <div>•</div>
                <div>Quick response</div>
              </div>
            </div>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <div className="relative">
          <Button
            onClick={handleToggleClick}
            className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group"
          >
            {isOpen ? (
              <X className="h-8 w-8 text-white" />
            ) : (
              <MessageCircle className="h-8 w-8 text-white group-hover:animate-bounce" />
            )}
          </Button>
          
          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-xs text-white font-bold">1</span>
            </div>
          )}
          
          {/* Ripple Effect */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
          )}
        </div>

        {/* Helper Text for New Visitors */}
        {!isOpen && (
          <div className="bg-white rounded-lg shadow-lg px-3 py-2 max-w-48 animate-fade-in mr-2 hidden lg:block">
            <p className="text-sm text-gray-700 font-medium">💬 Need help?</p>
            <p className="text-xs text-gray-500">Chat with us instantly!</p>
            {/* Arrow pointing to button */}
            <div className="absolute right-1 top-1/2 transform translate-x-full -translate-y-1/2">
              <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default WhatsAppWidget;