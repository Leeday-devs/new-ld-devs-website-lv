import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimated } from '@/hooks/useScrollTrigger';
import { TrendingUp, Clock, Users, DollarSign, Zap, Target, ArrowUp, Globe, ShoppingCart, BarChart3, MessageCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const AIBenefitsSection = () => {
  // Dashboard-style metrics data
  const websiteImpactData = [
    { month: 'Jan', revenue: 100, leads: 80, traffic: 120 },
    { month: 'Feb', revenue: 125, leads: 110, traffic: 145 },
    { month: 'Mar', revenue: 155, leads: 135, traffic: 170 },
    { month: 'Apr', revenue: 185, leads: 160, traffic: 195 },
    { month: 'May', revenue: 220, leads: 190, traffic: 225 },
    { month: 'Jun', revenue: 250, leads: 220, traffic: 260 }
  ];

  const dashboardMetrics = [
    {
      title: "Revenue Growth",
      value: "225%",
      change: "+125%",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      description: "Average increase in first year"
    },
    {
      title: "Online Reach", 
      value: "4.9B",
      change: "+∞",
      icon: <Globe className="w-5 h-5" />,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      description: "Potential customers worldwide"
    },
    {
      title: "Customer Trust",
      value: "75%", 
      change: "+50%",
      icon: <Users className="w-5 h-5" />,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10", 
      description: "Judge credibility by website"
    },
    {
      title: "Cost Efficiency",
      value: "62%",
      change: "-38%",
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      description: "More cost-effective than traditional ads"
    },
    {
      title: "24/7 Sales",
      value: "∞",
      change: "Always On",
      icon: <Clock className="w-5 h-5" />,
      color: "text-cyan-400", 
      bgColor: "bg-cyan-400/10",
      description: "Work while you sleep"
    },
    {
      title: "Conversion Rate",
      value: "3.2x",
      change: "+220%",
      icon: <ShoppingCart className="w-5 h-5" />,
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
      description: "Higher than no website"
    }
  ];

  return (
    <section className="py-12 bg-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--brand-orange)_0%,_transparent_50%)] opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--brand-orange)_0%,_transparent_50%)] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative">
        <ScrollAnimated>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Your Business Needs a Professional <span className="text-primary">Website</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Real data shows the transformative impact of professional websites on business growth
            </p>
          </div>
        </ScrollAnimated>

        {/* Dashboard Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {dashboardMetrics.map((metric, index) => (
            <ScrollAnimated key={index} delay={index * 50}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                      <div className={metric.color}>
                        {metric.icon}
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${metric.color} ${metric.color.includes('green') ? 'bg-green-400/10' : metric.color.includes('orange') ? 'bg-orange-400/10' : 'bg-blue-400/10'} px-2 py-1 rounded-full`}>
                      <ArrowUp className="w-3 h-3" />
                      {metric.change}
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-xs font-medium text-gray-300">{metric.title}</div>
                  </div>
                  <div className="text-xs text-gray-400">{metric.description}</div>
                </CardContent>
              </Card>
            </ScrollAnimated>
          ))}
        </div>

        {/* Main Chart Section */}
        <ScrollAnimated>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-primary" />
                Website Performance Impact
              </CardTitle>
              <p className="text-sm text-gray-400">Revenue, leads, and traffic growth with professional websites</p>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={websiteImpactData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '12px'
                    }}
                    formatter={(value, name) => [
                      `${value}%`, 
                      name === 'revenue' ? 'Revenue Growth' : 
                      name === 'leads' ? 'Lead Generation' : 'Traffic Growth'
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="#a78bfa"
                    strokeWidth={2}
                    fill="url(#leadsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </ScrollAnimated>

        {/* CTA Section */}
        <ScrollAnimated>
          <div className="text-center">
            <Card className="bg-primary/10 border-primary/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-bold mb-3 text-white">Ready to Transform Your Business?</h3>
              <p className="text-gray-300 mb-4 max-w-xl mx-auto">
                Join 1,200+ businesses already seeing these results with professional websites
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  className="btn-primary px-6 py-3 text-white font-semibold rounded-lg"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Pricing
                </button>
                <button 
                  className="border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  onClick={() => window.open('https://wa.me/447476678602', '_blank')}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>
            </Card>
          </div>
        </ScrollAnimated>
      </div>
    </section>
  );
};

export default AIBenefitsSection;