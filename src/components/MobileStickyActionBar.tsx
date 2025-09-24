import { Button } from "@/components/ui/button";
import { MessageCircle, Briefcase } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

const MobileStickyActionBar = () => {
  const isMobile = useIsMobile();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Hide bar when keyboard is open (form typing)
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const isKeyboardVisible = window.visualViewport.height < window.innerHeight * 0.75;
        setIsKeyboardOpen(isKeyboardVisible);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      return () => window.visualViewport.removeEventListener('resize', handleResize);
    }
  }, []);

  // Analytics tracking
  const handleWorkWithMeClick = () => {
    // Analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_work_with_me_mobile', {
        event_category: 'engagement',
        event_label: 'mobile_sticky_bar'
      });
    }
    
    // Smooth scroll to contact
    const contactSection = document.getElementById('contact') || document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    // Analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_whatsapp_mobile', {
        event_category: 'engagement',
        event_label: 'mobile_sticky_bar'
      });
    }
    
    // Open WhatsApp link
    const whatsappNumber = "07722208660";
    const message = encodeURIComponent("Hi Lee! I'm interested in working with you on a project. Can we discuss?");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isMobile || isKeyboardOpen) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[70] bg-white/95 backdrop-blur-xl border-t border-orange/10 shadow-lg" 
         style={{ 
           paddingBottom: 'env(safe-area-inset-bottom, 8px)',
           paddingLeft: 'env(safe-area-inset-left, 0)',
           paddingRight: 'env(safe-area-inset-right, 0)'
         }}>
      <div className="flex items-center gap-1.5 p-2">
        {/* Work With Me - Primary Action */}
        <Button
          onClick={handleWorkWithMeClick}
          className="flex-1 btn-primary min-h-[40px] rounded-lg font-medium text-xs tracking-wide shadow-orange-glow active:scale-95 transition-all duration-200"
          aria-label="Work with Lee - Get in touch about your project"
        >
          <Briefcase className="h-3.5 w-3.5 mr-1" />
          Work With Me
        </Button>
        
        {/* WhatsApp - Secondary Action */}
        <Button
          onClick={handleWhatsAppClick}
          variant="outline"
          className="flex-1 min-h-[40px] rounded-lg font-medium text-xs tracking-wide border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white active:scale-95 transition-all duration-200"
          aria-label="Contact Lee via WhatsApp"
        >
          <MessageCircle className="h-3.5 w-3.5 mr-1" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default MobileStickyActionBar;