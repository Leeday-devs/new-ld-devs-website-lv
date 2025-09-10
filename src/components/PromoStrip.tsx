import { useState, useEffect } from "react";
import { X, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PromoStripData {
  id: string;
  text: string;
  end_date: string;
  is_active: boolean;
  background_color: string;
  text_color: string;
}

const PromoStrip = () => {
  const [promoData, setPromoData] = useState<PromoStripData | null>(null);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const { data, error } = await supabase
          .from('promo_strips' as any)
          .select('*')
          .eq('is_active', true)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching promo data:', error);
        }
        
        if (data) {
          setPromoData(data as any);
        } else {
          // Set default data if no promo exists
          setPromoData({
            id: 'default',
            text: '20% OFF ALL Website Builds Limited time only!',
            end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            is_active: true,
            background_color: '#ef4444',
            text_color: '#ffffff'
          });
        }
      } catch (err) {
        console.error('Error:', err);
        // Set default data on error
        setPromoData({
          id: 'default',
          text: '20% OFF ALL Website Builds Limited time only!',
          end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          is_active: true,
          background_color: '#ef4444',
          text_color: '#ffffff'
        });
      }
    };

    fetchPromoData();
  }, []);

  useEffect(() => {
    if (!promoData) return;

    const calculateTimeLeft = () => {
      const endTime = new Date(promoData.end_date).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [promoData]);

  // Don't render if no promo data, not visible, or expired
  if (!promoData || !isVisible || isExpired) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('promoStripClosed', 'true');
  };

  // Check if user previously closed the promo
  useEffect(() => {
    const wasClosed = localStorage.getItem('promoStripClosed');
    if (wasClosed) {
      setIsVisible(false);
    }
  }, []);

  return (
    <div 
      className="relative z-60 py-2 px-4 text-center animate-pulse-gentle"
      style={{
        backgroundColor: promoData.background_color,
        color: promoData.text_color,
      }}
    >
      <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold">
        <Clock className="h-4 w-4 animate-bounce" />
        <span className="flex-1">{promoData.text}</span>
        <div className="flex items-center gap-1 sm:gap-2 font-mono bg-black/20 px-2 py-1 rounded">
          <span className="text-xs">{timeLeft.days}d</span>
          <span className="text-xs">:</span>
          <span className="text-xs">{timeLeft.hours.toString().padStart(2, '0')}h</span>
          <span className="text-xs">:</span>
          <span className="text-xs">{timeLeft.minutes.toString().padStart(2, '0')}m</span>
          <span className="text-xs">:</span>
          <span className="text-xs">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
        </div>
        <button
          onClick={handleClose}
          className="ml-2 hover:bg-white/20 p-1 rounded-full transition-colors"
          aria-label="Close promotion banner"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default PromoStrip;