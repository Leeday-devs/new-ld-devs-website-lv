import { Star, Users, Clock, Shield } from "lucide-react";

const StatsBar = () => {
  const stats = [
    {
      icon: Star,
      value: "5.0",
      label: "Rating",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      value: "150+",
      label: "Happy Clients",
      color: "text-green-500"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Support",
      color: "text-blue-500"
    },
    {
      icon: Shield,
      value: "100%",
      label: "Secure",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2 text-center">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <div className="flex items-baseline gap-1">
                <span className="text-lg md:text-xl font-bold">{stat.value}</span>
                <span className="text-sm opacity-90">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;