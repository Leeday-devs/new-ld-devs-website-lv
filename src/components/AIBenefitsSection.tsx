import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimated } from '@/hooks/useScrollTrigger';
import { TrendingUp, Clock, Users, DollarSign, Zap, Target, ArrowUp, Globe, ShoppingCart, BarChart3, MessageCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
const AIBenefitsSection = () => {
  // Dashboard-style metrics data
  const websiteImpactData = [{
    month: 'Jan',
    revenue: 100,
    leads: 80,
    traffic: 120
  }, {
    month: 'Feb',
    revenue: 125,
    leads: 110,
    traffic: 145
  }, {
    month: 'Mar',
    revenue: 155,
    leads: 135,
    traffic: 170
  }, {
    month: 'Apr',
    revenue: 185,
    leads: 160,
    traffic: 195
  }, {
    month: 'May',
    revenue: 220,
    leads: 190,
    traffic: 225
  }, {
    month: 'Jun',
    revenue: 250,
    leads: 220,
    traffic: 260
  }];
  const dashboardMetrics = [{
    title: "Revenue Growth",
    value: "225%",
    change: "+125%",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    description: "Average increase in first year"
  }, {
    title: "Online Reach",
    value: "4.9B",
    change: "+∞",
    icon: <Globe className="w-5 h-5" />,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    description: "Potential customers worldwide"
  }, {
    title: "Customer Trust",
    value: "75%",
    change: "+50%",
    icon: <Users className="w-5 h-5" />,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    description: "Judge credibility by website"
  }, {
    title: "Cost Efficiency",
    value: "62%",
    change: "-38%",
    icon: <DollarSign className="w-5 h-5" />,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    description: "More cost-effective than traditional ads"
  }, {
    title: "24/7 Sales",
    value: "∞",
    change: "Always On",
    icon: <Clock className="w-5 h-5" />,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    description: "Work while you sleep"
  }, {
    title: "Conversion Rate",
    value: "3.2x",
    change: "+220%",
    icon: <ShoppingCart className="w-5 h-5" />,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    description: "Higher than no website"
  }];
  return;
};
export default AIBenefitsSection;