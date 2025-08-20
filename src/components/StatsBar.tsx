import React, { useState, useEffect, useRef } from 'react';
import { Users, Globe, Shield, Award, CheckCircle, Star } from 'lucide-react';

const StatsBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: Users,
      value: 100,
      label: "Applications",
      description: "Built & Deployed",
      suffix: "+"
    },
    {
      icon: Globe,
      value: 500,
      label: "Websites Built",
      description: "Projects Delivered"
    },
    {
      icon: Award,
      value: 99,
      label: "Success Rate",
      description: "Client Satisfaction",
      suffix: "%"
    },
    {
      icon: CheckCircle,
      value: 24,
      label: "Support",
      description: "Hours Available",
      suffix: "/7"
    }
  ];

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
                setCounters(prev => {
                  const newCounters = [...prev];
                  newCounters[index] = end;
                  return newCounters;
                });
                clearInterval(timer);
              } else {
                setCounters(prev => {
                  const newCounters = [...prev];
                  newCounters[index] = Math.floor(start);
                  return newCounters;
                });
              }
            }, 16);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section className="bg-navy py-16 w-full" ref={statsRef}>
      <div className="container mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className={`text-center transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <IconComponent className="h-8 w-8 text-orange mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-bold text-orange mb-2 font-serif animate-fade-in">
                  {counters[index]?.toLocaleString()}{stat.suffix || ''}
                </div>
                <div className="text-white font-semibold text-lg">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;