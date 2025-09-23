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
  return (
    <section className="py-20 bg-dark">
      <div className="container mx-auto px-6">
        <ScrollAnimated>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transform Your Business with <span className="text-highlight">Premium Websites</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              See the real impact of professional web development on your business growth
            </p>
          </div>
        </ScrollAnimated>

        {/* Dashboard Metrics Grid */}
        <ScrollAnimated>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {dashboardMetrics.map((metric, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-orange/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                      <div className={metric.color}>{metric.icon}</div>
                    </div>
                    <div className={`text-sm font-semibold ${metric.color}`}>
                      {metric.change}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white font-semibold">{metric.title}</h3>
                    <div className="text-3xl font-bold text-white">{metric.value}</div>
                    <p className="text-sm text-white/60">{metric.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollAnimated>

        {/* Chart Section */}
        <ScrollAnimated>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Business Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={websiteImpactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgb(17 24 39)', 
                        border: '1px solid rgb(75 85 99)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#f97316" fill="#f97316/20" name="Revenue %" />
                    <Area type="monotone" dataKey="leads" stackId="1" stroke="#3b82f6" fill="#3b82f6/20" name="Leads %" />
                    <Area type="monotone" dataKey="traffic" stackId="1" stroke="#10b981" fill="#10b981/20" name="Traffic %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimated>
      </div>
    </section>
  );
};
export default AIBenefitsSection;