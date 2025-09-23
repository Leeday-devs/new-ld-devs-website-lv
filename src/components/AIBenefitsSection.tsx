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
    <section className="bg-transparent py-20" aria-label="AI-powered website benefits and performance metrics">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <ScrollAnimated>
          <div className="text-center mb-16">
            <h2 className="heading-primary heading-lg mb-6 text-navy">
              Transform Your Business with <span className="text-orange">Premium Websites</span>
            </h2>
            <p className="text-body max-w-3xl mx-auto text-text-secondary">
              See the measurable impact of modern, AI-enhanced websites on real business metrics
            </p>
          </div>
        </ScrollAnimated>

        {/* Dashboard-style Metrics Grid */}
        <ScrollAnimated className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {dashboardMetrics.map((metric, index) => (
            <Card key={index} className="card-premium hover:shadow-luxury transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.bgColor} ${metric.color}`}>
                    {metric.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-navy">{metric.value}</div>
                    <div className={`text-sm font-semibold ${metric.color}`}>{metric.change}</div>
                  </div>
                </div>
                <h3 className="font-bold text-navy mb-2">{metric.title}</h3>
                <p className="text-text-secondary text-sm">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollAnimated>

        {/* Interactive Chart */}
        <ScrollAnimated>
          <Card className="card-premium mb-16">
            <CardHeader>
              <CardTitle className="text-center text-navy">
                Website Impact Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={websiteImpactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
                      }} 
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stackId="1" 
                      stroke="#f97316" 
                      fill="#f97316" 
                      fillOpacity={0.6}
                      name="Revenue Growth (%)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="leads" 
                      stackId="1" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.6}
                      name="Lead Generation (%)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="traffic" 
                      stackId="1" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.6}
                      name="Website Traffic (%)"
                    />
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