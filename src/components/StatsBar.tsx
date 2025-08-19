import { Star, Users, Clock, Shield } from "lucide-react";

const StatsBar = () => {
  const stats = [
    {
      icon: Star,
      value: "5.0",
      label: "Google Rating",
      description: "From 47+ Reviews",
      color: "text-secondary",
      isGoogle: true
    },
    {
      icon: Users,
      value: "150+",
      label: "Happy Clients",
      description: "Projects Completed",
      color: "text-secondary"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Support",
      description: "Always Available",
      color: "text-secondary"
    },
    {
      icon: Shield,
      value: "100%",
      label: "Secure",
      description: "SSL Protected",
      color: "text-secondary"
    }
  ];

  return (
    <div className="bg-primary text-primary-foreground py-12 relative overflow-hidden">
      {/* Premium background with subtle texture */}
      <div className="absolute inset-0 bg-texture-dots opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center group hover:scale-110 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                {stat.isGoogle ? (
                  <div className="flex items-center gap-2">
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
                  </div>
                ) : (
                  <stat.icon className={`h-8 w-8 ${stat.color} group-hover:text-secondary transition-colors`} />
                )}
              </div>
              
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-secondary font-serif">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-white">
                  {stat.label}
                </div>
                <div className="text-xs text-white/70">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;