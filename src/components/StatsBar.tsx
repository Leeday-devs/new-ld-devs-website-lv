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
    <div ref={statsRef} className="section-dark py-20 relative overflow-hidden">
      {/* Cinematic background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-texture-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent"></div>
        
        {/* Animated elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent animate-pulse"></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-secondary/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-heading text-heading-dark text-3xl md:text-4xl mb-4">
            The Numbers Speak for Themselves
          </h2>
          <p className="text-body text-body-dark text-xl max-w-2xl mx-auto">
            Trusted by hundreds of businesses across the UK to deliver exceptional results
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-secondary/20 shadow-elegant group-hover:shadow-glow group-hover:scale-105 transition-all duration-500">
                <stat.icon className="h-12 w-12 text-accent mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                
                <div className="text-5xl md:text-6xl font-black text-secondary mb-2 font-serif">
                  {counters[index] || 0}{stat.suffix}
                </div>
                
                <div className="text-lg font-bold text-heading-dark mb-1">
                  {stat.label}
                </div>
                
                <div className="text-sm text-body-dark">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust badges */}
        <div className="flex flex-wrap gap-6 justify-center items-center mt-16 pt-8 border-t border-secondary/20">
          <div className="flex items-center gap-2 text-body-dark">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
              alt="Google"
              className="h-6 w-6"
            />
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
              ))}
            </div>
            <span className="font-semibold">5.0 Google Rating</span>
          </div>
          <div className="text-muted-dark">•</div>
          <div className="flex items-center gap-2 text-body-dark">
            <Shield className="h-5 w-5 text-secondary" />
            <span className="font-semibold">Google Certified Partner</span>
          </div>
          <div className="text-muted-dark">•</div>
          <div className="flex items-center gap-2 text-body-dark">
            <Award className="h-5 w-5 text-secondary" />
            <span className="font-semibold">Quality Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;