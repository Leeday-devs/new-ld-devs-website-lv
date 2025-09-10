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
  ArrowRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ApplicationsSection = () => {
  const [activeTab, setActiveTab] = useState('ecommerce');

  const conversionData = [
    { month: 'Jan', without: 2.1, with: 4.8 },
    { month: 'Feb', without: 2.3, with: 5.2 },
    { month: 'Mar', without: 2.0, with: 5.6 },
    { month: 'Apr', without: 2.4, with: 6.1 },
    { month: 'May', without: 2.2, with: 6.8 },
    { month: 'Jun', without: 2.5, with: 7.2 }
  ];

  const revenueGrowthData = [
    { quarter: 'Q1', revenue: 100 },
    { quarter: 'Q2', revenue: 125 },
    { quarter: 'Q3', revenue: 165 },
    { quarter: 'Q4', revenue: 220 }
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

  const websiteFeatures = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Professional Design',
      description: 'Modern, conversion-optimized layouts that work on all devices'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile-First Approach',
      description: 'Perfect experience on smartphones, tablets, and desktops'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Security & Performance',
      description: 'Fast loading, secure hosting, and SEO optimization included'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Payment Integration',
      description: 'Accept payments instantly with Stripe, PayPal, and more'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Customer Portals',
      description: 'Give customers access to orders, invoices, and support tickets'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI-Powered Features',
      description: 'Chatbots, recommendations, and smart analytics built-in'
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollAnimated>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful <span className="text-primary">AI Applications</span> & Modern Websites
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From intelligent automation to stunning websites, we build solutions that drive real business results.
            </p>
          </div>
        </ScrollAnimated>

        {/* AI Applications Tabs */}
        <div className="mb-20">
          <ScrollAnimated>
            <h3 className="text-3xl font-bold text-center mb-12">AI Solutions That Drive Growth</h3>
          </ScrollAnimated>
          
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {applications.map((app) => (
              <ScrollAnimated key={app.id}>
                <button
                  onClick={() => setActiveTab(app.id)}
                  className={`p-4 text-left rounded-lg transition-all duration-300 w-full ${
                    activeTab === app.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-card hover:bg-muted border border-border'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {app.icon}
                    <span className="font-semibold">{app.title}</span>
                  </div>
                  <p className={`text-sm ${
                    activeTab === app.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}>
                    {app.stats}
                  </p>
                </button>
              </ScrollAnimated>
            ))}
          </div>

          <ScrollAnimated>
            <Card className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-6">
                    {applications.find(app => app.id === activeTab)?.title}
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {applications.find(app => app.id === activeTab)?.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="font-semibold text-primary">
                      {applications.find(app => app.id === activeTab)?.stats}
                    </p>
                  </div>
                </div>
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    {activeTab === 'ecommerce' ? (
                      <LineChart data={conversionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                        <Line 
                          type="monotone" 
                          dataKey="without" 
                          stroke="hsl(var(--destructive))" 
                          name="Without AI"
                          strokeWidth={3}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="with" 
                          stroke="hsl(var(--primary))" 
                          name="With AI"
                          strokeWidth={3}
                        />
                      </LineChart>
                    ) : (
                      <AreaChart data={revenueGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Performance Improvement']} />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary)/0.3)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </ScrollAnimated>
        </div>

        {/* Website Features */}
        <div>
          <ScrollAnimated>
            <h3 className="text-3xl font-bold text-center mb-12">Complete Website Solutions</h3>
          </ScrollAnimated>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {websiteFeatures.map((feature, index) => (
              <ScrollAnimated key={index} delay={index * 100}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <div className="text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-3">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </ScrollAnimated>
            ))}
          </div>

          <ScrollAnimated>
            <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
              <h4 className="text-2xl font-bold mb-4">Complete Digital Transformation</h4>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get a professional website with AI-powered features that work together to grow your business automatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Start Your Project
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  View Live Examples
                </button>
              </div>
            </div>
          </ScrollAnimated>
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;