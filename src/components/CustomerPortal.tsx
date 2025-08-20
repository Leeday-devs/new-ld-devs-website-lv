import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  FileText, 
  CreditCard,
  Clock,
  CheckCircle,
  Shield,
  BarChart3,
  Activity
} from "lucide-react";

const CustomerPortal = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Work Request Management",
      description: "Submit and track work requests with real-time status updates"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Project Timeline",
      description: "View project milestones and track progress in real-time"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Billing & Payments",
      description: "Manage invoices, view payment history, and handle subscriptions"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Project Analytics",
      description: "Access detailed reports and insights about your projects"
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Live Build Progress",
      description: "Watch your website being built every step of the way with real-time progress tracking"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Access",
      description: "Enterprise-grade security with role-based access control"
    }
  ];

  const benefits = [
    "24/7 access to your project information",
    "Direct communication with your development team",
    "Transparent pricing and billing",
    "Real-time project updates",
    "Secure document sharing",
    "Mobile-friendly interface"
  ];

  return (
    <section className="bg-navy py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-white">
            Your Project Command Center
          </h2>
          <p className="text-body max-w-3xl mx-auto text-white/70">
            Experience complete transparency and control over your projects with our powerful customer portal. 
            Stay connected, informed, and in control every step of the way.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border border-border-light shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-orange text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-navy">{feature.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="heading-primary heading-md mb-6 text-white">Why Our Customers Love It</h3>
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-orange flex-shrink-0" />
                  <span className="text-white/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Card className="bg-white border border-border-light shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="inline-flex p-4 rounded-full bg-orange/10 mb-4">
                  <Clock className="h-8 w-8 text-orange" />
                </div>
                <h4 className="heading-primary heading-md mb-2 text-navy">Save 40% of Your Time</h4>
                <p className="text-text-secondary">
                  Our portal eliminates back-and-forth emails and phone calls, 
                  giving you instant access to everything you need.
                </p>
              </div>
              <Button className="btn-primary w-full">
                Access Your Portal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CustomerPortal;