import React, { useState, useEffect, useRef } from 'react';
import { Users, Globe, Shield, Award, CheckCircle, Star } from 'lucide-react';

const StatsBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: Users,
      value: 250,
      label: "Happy Clients",
      description: "Businesses Served"
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
    <section className="section-navy py-16" ref={statsRef}>
      <div className="container mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
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
                <div className="text-4xl md:text-5xl font-bold text-orange mb-2 font-serif">
                  {counters[index]?.toLocaleString()}{stat.suffix || ''}
                </div>
                <div className="text-white font-semibold text-lg mb-1">
                  {stat.label}
                </div>
                <div className="text-white/60 text-sm">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="border-t border-white/20 pt-12">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* Google Certified */}
            <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-orange" />
              </div>
              <div>
                <div className="font-semibold text-sm">Google Certified</div>
                <div className="text-xs text-white/60">Partner Agency</div>
              </div>
            </div>

            {/* SSL Secured */}
            <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-orange" />
              </div>
              <div>
                <div className="font-semibold text-sm">SSL Secured</div>
                <div className="text-xs text-white/60">256-bit Encryption</div>
              </div>
            </div>

            {/* Stripe Verified */}
            <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center">
                <Award className="h-5 w-5 text-orange" />
              </div>
              <div>
                <div className="font-semibold text-sm">Stripe Verified</div>
                <div className="text-xs text-white/60">Secure Payments</div>
              </div>
            </div>

            {/* 5-Star Rating */}
            <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center">
                <Star className="h-5 w-5 text-orange fill-orange" />
              </div>
              <div>
                <div className="font-semibold text-sm">5-Star Rated</div>
                <div className="text-xs text-white/60">Client Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;