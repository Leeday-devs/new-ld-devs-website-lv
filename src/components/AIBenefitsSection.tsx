import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimated } from '@/hooks/useScrollTrigger';
import { TrendingUp, Clock, Users, DollarSign, Zap, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AIBenefitsSection = () => {
  const businessPresenceData = [
    { name: 'No Website', value: 25, color: 'hsl(var(--destructive))' },
    { name: 'Professional Website', value: 75, color: 'hsl(var(--primary))' }
  ];

  const revenueGrowthData = [
    { month: 'Jan', noWebsite: 100, withWebsite: 115 },
    { month: 'Mar', noWebsite: 100, withWebsite: 135 },
    { month: 'Jun', noWebsite: 100, withWebsite: 160 },
    { month: 'Sep', noWebsite: 100, withWebsite: 190 },
    { month: 'Dec', noWebsite: 100, withWebsite: 225 }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "225% Revenue Growth",
      description: "Businesses with professional websites see 2.25x more revenue within their first year"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Work 24/7 for You",
      description: "Your website generates leads and sales even while you sleep"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Reach 4.9B People",
      description: "Connect with billions of potential customers online worldwide"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Lower Marketing Costs",
      description: "Digital marketing is 62% more cost-effective than traditional advertising"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimated>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Your Business Needs a Professional <span className="text-primary">Website</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In today's digital world, your website is your most powerful business tool. See how the right website drives real results.
            </p>
          </div>
        </ScrollAnimated>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <ScrollAnimated animationType="slide-in-left">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary" />
                  Customer Trust Factor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={businessPresenceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {businessPresenceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-center text-muted-foreground mt-4">
                  75% of consumers judge business credibility based on website design and functionality.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimated>

          <ScrollAnimated animationType="slide-in-right">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  Revenue Growth Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`${value}%`, name === 'noWebsite' ? 'Without Website' : 'With Professional Website']} />
                    <Legend />
                    <Bar dataKey="noWebsite" fill="hsl(var(--destructive))" name="Without Website" />
                    <Bar dataKey="withWebsite" fill="hsl(var(--primary))" name="With Professional Website" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-center text-muted-foreground mt-4">
                  Businesses with professional websites consistently outperform competitors without online presence.
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
            <h3 className="text-2xl font-bold mb-4">Ready to Get Your Professional Website?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join 1,200+ businesses already growing their revenue with our professional websites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Get Free Website Quote
              </button>
              <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                View Live Examples
              </button>
            </div>
          </div>
        </ScrollAnimated>
      </div>
    </section>
  );
};

export default AIBenefitsSection;