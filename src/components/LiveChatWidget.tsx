import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppWidget = () => {
  const handleWhatsAppClick = () => {
    const whatsappNumber = "447586266007";
    const message = "Hi Lee! I'm interested in your web development services and would like to discuss my project.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="rounded-full w-14 h-14 shadow-lg transition-all duration-300 bg-green-500 hover:bg-green-600 text-white hover:scale-110 border-2 border-green-400"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default WhatsAppWidget;