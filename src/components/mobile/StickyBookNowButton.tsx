import { Calendar, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const StickyBookNowButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const handleBookNow = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-16 left-4 right-4 z-40 px-2">
      <div className="bg-orange text-white rounded-2xl shadow-2xl border border-orange-400/20 overflow-hidden animate-fade-in">
        <button
          onClick={handleBookNow}
          className="w-full flex items-center justify-between p-4 hover:bg-orange-600 transition-colors active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">Book Your Project</div>
              <div className="text-white/80 text-sm">Free consultation • Fast quote</div>
            </div>
          </div>
          
          <ArrowRight className="h-6 w-6 flex-shrink-0" />
        </button>
        
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white/80 hover:bg-white/30 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default StickyBookNowButton;