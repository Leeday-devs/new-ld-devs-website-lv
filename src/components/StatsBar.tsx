import { Star, Users, Clock, Shield, Award, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const StatsBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: Users,
      value: 450,
      suffix: "+",
      label: "Projects Delivered",
      description: "to happy clients worldwide",
      color: "text-gold"
    },
    {
      icon: Award,
      value: 98.9,
      suffix: "%",
      label: "Success Rate",
      description: "guaranteed project delivery",
      color: "text-gold"
    },
    {
      icon: TrendingUp,
      value: 300,
      suffix: "%",
      label: "Average Growth",
      description: "client revenue increase",
      color: "text-gold"
    },
    {
      icon: Shield,
      value: 24,
      suffix: "/7",
      label: "Support",
      description: "UK-based assistance",
      color: "text-gold"
    }
  ];

  // Counter animation hook
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          // Animate counters
          stats.forEach((stat, index) => {
            let start = 0;
            const end = stat.value;
            const duration = 2000;
            const increment = end / (duration / 16);
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                start = end;
                clearInterval(timer);
              }
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(start * 10) / 10;
                return newCounters;
              });
            }, 16);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section className="section-stats" aria-label="Company statistics and achievements">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="group" ref={index === 0 ? statsRef : undefined}>
              <div className="mb-4 text-gold">
                <stat.icon className="h-10 w-10 mx-auto" />
              </div>
              <div className="stat-number mb-3">
                {counters[index] || 0}{stat.suffix}
              </div>
              <div className="stat-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;