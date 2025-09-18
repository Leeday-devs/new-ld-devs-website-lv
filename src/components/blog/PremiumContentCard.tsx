import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { CheckCircle, Lightbulb, Users, Target, TrendingUp, Zap, Shield, Award } from "lucide-react";

type CardType = 'benefits' | 'steps' | 'story' | 'tip' | 'stats' | 'highlight' | 'security' | 'success';

interface PremiumContentCardProps {
  type: CardType;
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  stats?: { label: string; value: string }[];
  className?: string;
}

const cardConfigs = {
  benefits: {
    gradient: 'from-emerald-500/20 via-emerald-400/10 to-emerald-300/5',
    border: 'border-emerald-300/30',
    badge: 'from-emerald-500 to-emerald-600',
    badgeText: 'KEY BENEFITS',
    icon: <CheckCircle className="h-5 w-5 text-white" />,
    bgColor: 'bg-emerald-50/50 dark:bg-emerald-950/20'
  },
  steps: {
    gradient: 'from-blue-500/20 via-blue-400/10 to-blue-300/5',
    border: 'border-blue-300/30',
    badge: 'from-blue-500 to-blue-600',
    badgeText: 'ACTION STEPS',
    icon: <Target className="h-5 w-5 text-white" />,
    bgColor: 'bg-blue-50/50 dark:bg-blue-950/20'
  },
  story: {
    gradient: 'from-purple-500/20 via-purple-400/10 to-purple-300/5',
    border: 'border-purple-300/30',
    badge: 'from-purple-500 to-purple-600',
    badgeText: 'CLIENT STORY',
    icon: <Users className="h-5 w-5 text-white" />,
    bgColor: 'bg-purple-50/50 dark:bg-purple-950/20'
  },
  tip: {
    gradient: 'from-yellow-500/20 via-yellow-400/10 to-yellow-300/5',
    border: 'border-yellow-300/30',
    badge: 'from-yellow-500 to-yellow-600',
    badgeText: 'PRO TIP',
    icon: <Lightbulb className="h-5 w-5 text-white" />,
    bgColor: 'bg-yellow-50/50 dark:bg-yellow-950/20'
  },
  stats: {
    gradient: 'from-orange-500/20 via-orange-400/10 to-orange-300/5',
    border: 'border-orange-300/30',
    badge: 'from-[#FF7A00] to-orange-600',
    badgeText: 'KEY STATISTICS',
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    bgColor: 'bg-orange-50/50 dark:bg-orange-950/20'
  },
  highlight: {
    gradient: 'from-[#FF7A00]/20 via-[#0D6EFD]/10 to-[#FF7A00]/5',
    border: 'border-[#FF7A00]/30',
    badge: 'from-[#FF7A00] to-[#0D6EFD]',
    badgeText: 'IMPORTANT',
    icon: <Zap className="h-5 w-5 text-white" />,
    bgColor: 'bg-gradient-to-br from-orange-50/50 to-blue-50/30 dark:from-orange-950/20 dark:to-blue-950/20'
  },
  security: {
    gradient: 'from-indigo-500/20 via-indigo-400/10 to-indigo-300/5',
    border: 'border-indigo-300/30',
    badge: 'from-indigo-500 to-indigo-600',
    badgeText: 'SECURITY',
    icon: <Shield className="h-5 w-5 text-white" />,
    bgColor: 'bg-indigo-50/50 dark:bg-indigo-950/20'
  },
  success: {
    gradient: 'from-green-500/20 via-green-400/10 to-green-300/5',
    border: 'border-green-300/30',
    badge: 'from-green-500 to-green-600',
    badgeText: 'SUCCESS STORY',
    icon: <Award className="h-5 w-5 text-white" />,
    bgColor: 'bg-green-50/50 dark:bg-green-950/20'
  }
};

export const PremiumContentCard = ({ 
  type, 
  title, 
  children, 
  icon, 
  stats,
  className = "" 
}: PremiumContentCardProps) => {
  const config = cardConfigs[type];
  
  return (
    <Card className={`my-8 overflow-hidden border-none shadow-xl ${config.bgColor} ${className}`}>
      {/* Glass morphism effect */}
      <div className={`relative bg-gradient-to-br ${config.gradient} border ${config.border} rounded-lg overflow-hidden backdrop-blur-sm`}>
        <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl"></div>
        
        <div className="relative z-10 p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${config.badge} flex items-center justify-center shadow-lg flex-shrink-0`}>
              {icon || config.icon}
            </div>
            <div className="flex-1">
              <Badge className={`mb-3 bg-gradient-to-r ${config.badge} text-white font-semibold px-3 py-1 text-xs tracking-wide`}>
                {config.badgeText}
              </Badge>
              <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                {title}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            {children}
          </div>

          {/* Stats Section */}
          {stats && stats.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center bg-white/10 dark:bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};