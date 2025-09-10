import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimated } from '@/hooks/useScrollTrigger';
import { TrendingUp, Clock, Users, DollarSign, Zap, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AIBenefitsSection = () => {
  const efficiencyData = [
    { name: 'Manual Tasks', value: 35, color: 'hsl(var(--destructive))' },
    { name: 'AI Automated', value: 65, color: 'hsl(var(--primary))' }
  ];

  const costSavingsData = [
    { month: 'Jan', traditional: 100, withAI: 40 },
    { month: 'Mar', traditional: 100, withAI: 35 },
    { month: 'Jun', traditional: 100, withAI: 30 },
    { month: 'Sep', traditional: 100, withAI: 25 },
    { month: 'Dec', traditional: 100, withAI: 20 }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "400% ROI Increase",
      description: "Businesses see average 400% return on AI investment within 12 months"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Save 25+ Hours/Week",
      description: "Automate repetitive tasks and focus on growing your business"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "24/7 Customer Service",
      description: "AI chatbots handle 80% of customer queries instantly"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Reduce Costs by 60%",
      description: "Lower operational expenses through intelligent automation"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimated>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Your Business Needs AI <span className="text-primary">Today</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't let competitors get ahead. See the proven benefits that AI brings to modern businesses.
            </p>
          </div>
        </ScrollAnimated>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <ScrollAnimated animationType="slide-in-left">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary" />
                  Task Automation Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={efficiencyData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {efficiencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-center text-muted-foreground mt-4">
                  65% of business tasks can be automated with AI, freeing up your team for strategic work.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimated>

          <ScrollAnimated animationType="slide-in-right">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  Cost Reduction Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costSavingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`${value}%`, name === 'traditional' ? 'Traditional Costs' : 'With AI']} />
                    <Legend />
                    <Bar dataKey="traditional" fill="hsl(var(--destructive))" name="Traditional Costs" />
                    <Bar dataKey="withAI" fill="hsl(var(--primary))" name="With AI" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-center text-muted-foreground mt-4">
                  Progressive cost reduction as AI systems learn and optimize your operations.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimated>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <ScrollAnimated key={index} delay={index * 100}>
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <div className="text-primary mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            </ScrollAnimated>
          ))}
        </div>

        <ScrollAnimated>
          <div className="text-center mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join 500+ businesses already using AI to increase profits and reduce costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Get Free AI Consultation
              </button>
              <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        </ScrollAnimated>
      </div>
    </section>
  );
};

export default AIBenefitsSection;