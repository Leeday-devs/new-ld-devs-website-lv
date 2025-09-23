import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimated } from '@/hooks/useScrollTrigger';
import { Bot, ShoppingCart, Calendar, BarChart3, MessageSquare, CreditCard, Users, Globe, Smartphone, Shield, Zap, ArrowRight, TrendingUp, Clock, Target, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
const ApplicationsSection = () => {
  const [activeTab, setActiveTab] = useState('ecommerce');
  const aiPerformanceData = [{
    month: 'Jan',
    ecommerce: 138,
    customer: 185,
    analytics: 200,
    automation: 160
  }, {
    month: 'Feb',
    ecommerce: 145,
    customer: 195,
    analytics: 225,
    automation: 175
  }, {
    month: 'Mar',
    ecommerce: 152,
    customer: 210,
    analytics: 245,
    automation: 190
  }, {
    month: 'Apr',
    ecommerce: 161,
    customer: 225,
    analytics: 265,
    automation: 205
  }, {
    month: 'May',
    ecommerce: 168,
    customer: 240,
    analytics: 280,
    automation: 220
  }, {
    month: 'Jun',
    ecommerce: 172,
    customer: 255,
    analytics: 295,
    automation: 235
  }];
  const dashboardMetrics = [{
    title: "AI E-Commerce",
    value: "172%",
    change: "+38%",
    icon: <ShoppingCart className="w-5 h-5" />,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    description: "Sales conversion increase",
    id: "ecommerce"
  }, {
    title: "Smart Support",
    value: "255%",
    change: "+85%",
    icon: <MessageSquare className="w-5 h-5" />,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    description: "Faster response times",
    id: "customer"
  }, {
    title: "Business Intelligence",
    value: "295%",
    change: "+200%",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    description: "Better decision making",
    id: "analytics"
  }, {
    title: "Process Automation",
    value: "235%",
    change: "+60%",
    icon: <Bot className="w-5 h-5" />,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    description: "Time savings on tasks",
    id: "automation"
  }];
  const websiteMetrics = [{
    title: "Mobile Performance",
    value: "98%",
    icon: <Smartphone className="w-5 h-5" />,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    description: "PageSpeed score"
  }, {
    title: "Security Rating",
    value: "A+",
    icon: <Shield className="w-5 h-5" />,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    description: "SSL & security grade"
  }, {
    title: "Global Reach",
    value: "5.2B",
    icon: <Globe className="w-5 h-5" />,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    description: "Internet users accessible"
  }, {
    title: "Payment Ready",
    value: "15+",
    icon: <CreditCard className="w-5 h-5" />,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    description: "Payment methods integrated"
  }, {
    title: "AI Features",
    value: "12+",
    icon: <Zap className="w-5 h-5" />,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    description: "Smart capabilities built-in"
  }, {
    title: "Customer Portals",
    value: "∞",
    icon: <Users className="w-5 h-5" />,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    description: "Unlimited user access"
  }];
  const applications = [{
    id: 'ecommerce',
    title: 'E-Commerce & Online Sales',
    icon: <ShoppingCart className="w-8 h-8" />,
    features: ['AI-powered product recommendations', 'Automated inventory management', 'Smart pricing optimization', 'Personalized customer journeys', 'Abandoned cart recovery'],
    stats: '38% increase in sales conversion'
  }, {
    id: 'customer',
    title: 'Customer Service & Support',
    icon: <MessageSquare className="w-8 h-8" />,
    features: ['24/7 AI chatbot support', 'Instant ticket routing', 'Multi-language support', 'Sentiment analysis', 'Automated FAQ responses'],
    stats: '85% faster response times'
  }, {
    id: 'analytics',
    title: 'Business Intelligence',
    icon: <BarChart3 className="w-8 h-8" />,
    features: ['Real-time analytics dashboard', 'Predictive market trends', 'Customer behavior insights', 'Performance forecasting', 'Automated reporting'],
    stats: '200% better decision making'
  }, {
    id: 'automation',
    title: 'Process Automation',
    icon: <Bot className="w-8 h-8" />,
    features: ['Workflow automation', 'Email marketing sequences', 'Social media management', 'Lead qualification', 'Data entry elimination'],
    stats: '60% time savings on tasks'
  }];
  return (
    <section className="bg-transparent py-20" aria-label="AI applications and smart website features">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <ScrollAnimated>
          <div className="text-center mb-16">
            <h2 className="heading-primary heading-lg mb-6 text-navy">
              Smart Website <span className="text-orange">Applications</span>
            </h2>
            <p className="text-body max-w-3xl mx-auto text-text-secondary">
              Discover how AI-enhanced websites and intelligent automation can transform your business operations
            </p>
          </div>
        </ScrollAnimated>

        {/* Interactive Tabs */}
        <ScrollAnimated>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {dashboardMetrics.map((metric, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(metric.id)}
                className={`p-6 rounded-2xl transition-all duration-300 text-left group ${
                  activeTab === metric.id 
                    ? 'bg-orange text-white shadow-luxury' 
                    : 'card-premium hover:shadow-luxury'
                }`}
              >
                <div className={`p-3 rounded-xl mb-4 ${
                  activeTab === metric.id ? 'bg-white/20' : metric.bgColor
                }`}>
                  <div className={activeTab === metric.id ? 'text-white' : metric.color}>
                    {metric.icon}
                  </div>
                </div>
                <div className={`text-2xl font-bold mb-2 ${
                  activeTab === metric.id ? 'text-white' : 'text-navy'
                }`}>
                  {metric.value}
                </div>
                <h3 className={`font-bold mb-2 ${
                  activeTab === metric.id ? 'text-white' : 'text-navy'
                }`}>
                  {metric.title}
                </h3>
                <p className={`text-sm ${
                  activeTab === metric.id ? 'text-white/80' : 'text-text-secondary'
                }`}>
                  {metric.description}
                </p>
              </button>
            ))}
          </div>
        </ScrollAnimated>

        {/* Performance Chart */}
        <ScrollAnimated>
          <Card className="card-premium mb-16">
            <CardHeader>
              <CardTitle className="text-center text-navy">
                AI Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={aiPerformanceData}>
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
                    <Line 
                      type="monotone" 
                      dataKey={activeTab} 
                      stroke="#f97316" 
                      strokeWidth={3}
                      dot={{ fill: '#f97316', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#f97316', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimated>

        {/* Website Features Grid */}
        <ScrollAnimated>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websiteMetrics.map((metric, index) => (
              <Card key={index} className="card-premium hover:shadow-luxury transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${metric.bgColor} ${metric.color}`}>
                      {metric.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-navy">{metric.value}</div>
                    </div>
                  </div>
                  <h3 className="font-bold text-navy mb-2">{metric.title}</h3>
                  <p className="text-text-secondary text-sm">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollAnimated>
      </div>
    </section>
  );
};
export default ApplicationsSection;