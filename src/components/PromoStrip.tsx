import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const PromoStrip = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set countdown to 7 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = endDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-orange to-orange/80 text-white py-2 px-4 shadow-lg relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 relative z-10">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 animate-pulse" />
          <span className="font-bold text-sm sm:text-base">
            🚀 All Website Plans 20% OFF Build Price - Limited Time Only!
          </span>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-3 text-xs sm:text-sm font-semibold">
          <span className="hidden sm:inline">Ends in:</span>
          <div className="flex gap-1 sm:gap-2">
            <div className="bg-white/20 px-1.5 sm:px-2 py-1 rounded text-center min-w-[24px] sm:min-w-[32px]">
              <span className="block font-bold">{timeLeft.days}</span>
              <span className="text-xs opacity-80 hidden sm:block">d</span>
            </div>
            <span className="self-center">:</span>
            <div className="bg-white/20 px-1.5 sm:px-2 py-1 rounded text-center min-w-[24px] sm:min-w-[32px]">
              <span className="block font-bold">{timeLeft.hours}</span>
              <span className="text-xs opacity-80 hidden sm:block">h</span>
            </div>
            <span className="self-center">:</span>
            <div className="bg-white/20 px-1.5 sm:px-2 py-1 rounded text-center min-w-[24px] sm:min-w-[32px]">
              <span className="block font-bold">{timeLeft.minutes}</span>
              <span className="text-xs opacity-80 hidden sm:block">m</span>
            </div>
            <span className="self-center">:</span>
            <div className="bg-white/20 px-1.5 sm:px-2 py-1 rounded text-center min-w-[24px] sm:min-w-[32px]">
              <span className="block font-bold">{timeLeft.seconds}</span>
              <span className="text-xs opacity-80 hidden sm:block">s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoStrip;