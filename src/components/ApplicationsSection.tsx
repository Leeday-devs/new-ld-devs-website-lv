import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimated } from '@/hooks/useScrollTrigger';
import { 
  Bot, 
  ShoppingCart, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  CreditCard,
  Users,
  Globe,
  Smartphone,
  Shield,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Target,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ApplicationsSection = () => {
  const [activeTab, setActiveTab] = useState('ecommerce');

  const aiPerformanceData = [
    { month: 'Jan', ecommerce: 138, customer: 185, analytics: 200, automation: 160 },
    { month: 'Feb', ecommerce: 145, customer: 195, analytics: 225, automation: 175 },
    { month: 'Mar', ecommerce: 152, customer: 210, analytics: 245, automation: 190 },
    { month: 'Apr', ecommerce: 161, customer: 225, analytics: 265, automation: 205 },
    { month: 'May', ecommerce: 168, customer: 240, analytics: 280, automation: 220 },
    { month: 'Jun', ecommerce: 172, customer: 255, analytics: 295, automation: 235 }
  ];

  const dashboardMetrics = [
    {
      title: "AI E-Commerce",
      value: "172%", 
      change: "+38%",
      icon: <ShoppingCart className="w-5 h-5" />,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      description: "Sales conversion increase",
      id: "ecommerce"
    },
    {
      title: "Smart Support",
      value: "255%",
      change: "+85%", 
      icon: <MessageSquare className="w-5 h-5" />,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      description: "Faster response times",
      id: "customer"
    },
    {
      title: "Business Intelligence", 
      value: "295%",
      change: "+200%",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      description: "Better decision making",
      id: "analytics"
    },
    {
      title: "Process Automation",
      value: "235%",
      change: "+60%",
      icon: <Bot className="w-5 h-5" />,
      color: "text-orange-400", 
      bgColor: "bg-orange-400/10",
      description: "Time savings on tasks",
      id: "automation"
    }
  ];

  const websiteMetrics = [
    {
      title: "Mobile Performance",
      value: "98%",
      icon: <Smartphone className="w-5 h-5" />,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
      description: "PageSpeed score"
    },
    {
      title: "Security Rating", 
      value: "A+",
      icon: <Shield className="w-5 h-5" />,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      description: "SSL & security grade"
    },
    {
      title: "Global Reach",
      value: "5.2B",
      icon: <Globe className="w-5 h-5" />,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10", 
      description: "Internet users accessible"
    },
    {
      title: "Payment Ready",
      value: "15+",
      icon: <CreditCard className="w-5 h-5" />,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      description: "Payment methods integrated"
    },
    {
      title: "AI Features",
      value: "12+",
      icon: <Zap className="w-5 h-5" />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      description: "Smart capabilities built-in"
    },
    {
      title: "Customer Portals",
      value: "∞",
      icon: <Users className="w-5 h-5" />,
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
      description: "Unlimited user access"
    }
  ];

  const applications = [
    {
      id: 'ecommerce',
      title: 'E-Commerce & Online Sales',
      icon: <ShoppingCart className="w-8 h-8" />,
      features: [
        'AI-powered product recommendations',
        'Automated inventory management', 
        'Smart pricing optimization',
        'Personalized customer journeys',
        'Abandoned cart recovery'
      ],
      stats: '38% increase in sales conversion'
    },
    {
      id: 'customer',
      title: 'Customer Service & Support',
      icon: <MessageSquare className="w-8 h-8" />,
      features: [
        '24/7 AI chatbot support',
        'Instant ticket routing',
        'Multi-language support',
        'Sentiment analysis',
        'Automated FAQ responses'
      ],
      stats: '85% faster response times'
    },
    {
      id: 'analytics', 
      title: 'Business Intelligence',
      icon: <BarChart3 className="w-8 h-8" />,
      features: [
        'Real-time analytics dashboard',
        'Predictive market trends',
        'Customer behavior insights',
        'Performance forecasting',
        'Automated reporting'
      ],
      stats: '200% better decision making'
    },
    {
      id: 'automation',
      title: 'Process Automation',
      icon: <Bot className="w-8 h-8" />,
      features: [
        'Workflow automation',
        'Email marketing sequences',
        'Social media management',
        'Lead qualification',
        'Data entry elimination'
      ],
      stats: '60% time savings on tasks'
    }
  ];

  return (
    <section className="py-20 bg-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--brand-orange)_0%,_transparent_50%)] opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--brand-orange)_0%,_transparent_50%)] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative">
        <ScrollAnimated>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful <span className="text-primary">AI Applications</span> & Modern Websites
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced AI solutions and professional websites that transform businesses and drive exponential growth
            </p>
          </div>
        </ScrollAnimated>

        {/* AI Dashboard Metrics */}
        <div className="mb-16">
          <ScrollAnimated>
            <h3 className="text-3xl font-bold text-center mb-12 text-white">AI Solutions Performance Dashboard</h3>
          </ScrollAnimated>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardMetrics.map((metric, index) => (
              <ScrollAnimated key={metric.id} delay={index * 100}>
                <Card 
                  className={`bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group cursor-pointer ${
                    activeTab === metric.id ? 'ring-2 ring-primary bg-white/15' : ''
                  }`}
                  onClick={() => setActiveTab(metric.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                        <div className={metric.color}>
                          {metric.icon}
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${metric.color} ${metric.color.includes('green') ? 'bg-green-400/10' : metric.color.includes('blue') ? 'bg-blue-400/10' : metric.color.includes('purple') ? 'bg-purple-400/10' : 'bg-orange-400/10'} px-2 py-1 rounded-full`}>
                        <TrendingUp className="w-3 h-3" />
                        {metric.change}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                      <div className="text-sm font-medium text-gray-300">{metric.title}</div>
                    </div>
                    <div className="text-xs text-gray-400">{metric.description}</div>
                  </CardContent>
                </Card>
              </ScrollAnimated>
            ))}
          </div>

          {/* Interactive AI Performance Chart */}
          <ScrollAnimated>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-12">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Activity className="w-6 h-6 text-primary" />
                  AI Solutions Performance Tracking
                </CardTitle>
                <p className="text-gray-400">Real-time performance metrics across all AI applications</p>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={aiPerformanceData}>
                    <defs>
                      <linearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff7a00" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ff7a00" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: 'white'
                      }}
                      formatter={(value, name) => [
                        `${value}%`, 
                        name === 'ecommerce' ? 'E-Commerce Performance' :
                        name === 'customer' ? 'Customer Support' :
                        name === 'analytics' ? 'Business Intelligence' : 'Process Automation'
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey={activeTab}
                      stroke="#ff7a00"
                      strokeWidth={3}
                      fill="url(#aiGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </ScrollAnimated>

          {/* AI Features Detail */}
          <ScrollAnimated>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-white">
                    {applications.find(app => app.id === activeTab)?.title}
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {applications.find(app => app.id === activeTab)?.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 bg-primary/20 rounded-lg border border-primary/30">
                    <p className="font-semibold text-primary">
                      {applications.find(app => app.id === activeTab)?.stats}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-2">
                      {dashboardMetrics.find(m => m.id === activeTab)?.value}
                    </div>
                    <div className="text-gray-300 mb-4">Performance Improvement</div>
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${dashboardMetrics.find(m => m.id === activeTab)?.bgColor} ${dashboardMetrics.find(m => m.id === activeTab)?.color}`}>
                      <TrendingUp className="w-4 h-4" />
                      {dashboardMetrics.find(m => m.id === activeTab)?.change}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollAnimated>
        </div>

        {/* Website Features Dashboard */}
        <div>
          <ScrollAnimated>
            <h3 className="text-3xl font-bold text-center mb-12 text-white">Complete Website Solutions Dashboard</h3>
          </ScrollAnimated>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {websiteMetrics.map((metric, index) => (
              <ScrollAnimated key={index} delay={index * 100}>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                        <div className={metric.color}>
                          {metric.icon}
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                      <div className="text-sm font-medium text-gray-300">{metric.title}</div>
                    </div>
                    <div className="text-xs text-gray-400">{metric.description}</div>
                  </CardContent>
                </Card>
              </ScrollAnimated>
            ))}
          </div>

          <ScrollAnimated>
            <div className="text-center">
              <Card className="bg-primary/10 border-primary/20 backdrop-blur-sm p-8">
                <h4 className="text-2xl font-bold mb-4 text-white">Complete Digital Transformation</h4>
                <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                  Professional websites with AI-powered features that work together to automate and scale your business
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary px-8 py-4 text-white font-semibold rounded-xl">
                    Launch Your AI-Powered Website
                  </button>
                  <button className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                    Explore Live Demos
                  </button>
                </div>
              </Card>
            </div>
          </ScrollAnimated>
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;