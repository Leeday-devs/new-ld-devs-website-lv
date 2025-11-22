import React from 'react';
import { Users, Globe, Shield, Award, CheckCircle, Star } from 'lucide-react';
import { useScrollTrigger, useCountUp } from '@/hooks/useScrollTrigger';

const StatsBar = () => {
  const { elementRef, isVisible } = useScrollTrigger({ threshold: 0.3 });
  
  const stats = [
    {
      icon: Users,
      value: 50,
      label: "Happy Clients",
      description: "Projects Delivered",
      suffix: "+"
    },
    {
      icon: Globe,
      value: 8,
      label: "Years Experience",
      description: "In Web Development",
      suffix: "+"
    },
    {
      icon: Award,
      value: 100,
      label: "Satisfaction",
      description: "Client Rating",
      suffix: "%"
    },
    {
      icon: CheckCircle,
      value: 24,
      label: "Response Time",
      description: "Hours or Less",
      suffix: "hr"
    }
  ];

  return (
    <section className="section-navy" ref={elementRef}>
      <div className="container mx-auto px-6">
        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const { count, startCounting } = useCountUp(stat.value, 2000);
            
            // Start counting when visible
            React.useEffect(() => {
              if (isVisible) {
                startCounting();
              }
            }, [isVisible, startCounting]);
            
            return (
              <div 
                key={index} 
                className={`text-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <IconComponent className="h-8 w-8 text-highlight mx-auto mb-4" />
                <div className="heading-lg text-highlight mb-2 font-serif animate-fade-in">
                  {count?.toLocaleString()}{stat.suffix || ''}
                </div>
                <div className="text-white font-semibold text-lg">
                  {stat.label}
                </div>
                <div className="text-white/70 text-sm">
                  {stat.description}
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