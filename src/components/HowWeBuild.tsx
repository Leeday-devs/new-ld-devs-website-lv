import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Palette, Code, Rocket, CheckCircle, ArrowRight, Users, Monitor, Sparkles } from "lucide-react";
const HowWeBuild = () => {
  const steps = [{
    step: "01",
    icon: MessageCircle,
    title: "Chat About Your Ideas",
    description: "We sit down with you (virtually or in person) and listen to what you want. Tell us about your business, your style, and what makes you special!",
    details: ["Understanding your business goals", "Learning about your target customers", "Discussing your favorite colors and styles", "Planning the features you need"],
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50"
  }, {
    step: "02",
    icon: Palette,
    title: "Design Your Perfect Look",
    description: "Our creative team makes your website look absolutely amazing! We create designs that match your personality and make your customers smile.",
    details: ["Custom color schemes and branding", "Beautiful layouts that work on all devices", "Easy-to-use navigation that makes sense", "Professional graphics and images"],
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50"
  }, {
    step: "03",
    icon: Code,
    title: "Build with Love & Code",
    description: "This is where the magic happens! We write clean, fast code that brings your design to life. Every button, every page, every feature - built perfectly.",
    details: ["Lightning-fast loading speeds", "Mobile-friendly responsive design", "Secure and reliable code", "Easy content management system"],
    color: "from-green-500 to-teal-600",
    bgColor: "bg-green-50"
  }, {
    step: "04",
    icon: Rocket,
    title: "Launch & Celebrate!",
    description: "Your website goes live and the world can see your amazing new online presence! We help you launch and make sure everything works perfectly.",
    details: ["Domain setup and hosting", "SSL security certificates", "Search engine optimization", "Training on how to update content"],
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50"
  }];
  return <section className="py-24 bg-white">

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 text-navy">
            <span className="block">OUR</span>
            <span className="text-orange">
              PLANS
            </span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            From your first idea to your website going live - here's exactly how we make your dreams come true, step by step!
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
          const Icon = step.icon;
          return <div key={step.step} className="relative group">
                
                <Card className="relative h-full hover:shadow-xl hover:scale-105 transition-all duration-300 border border-border-light bg-white">
                  {/* Step number badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-orange text-white border-0 text-sm font-bold px-3 py-1">
                      {step.step}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6 pt-16">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-orange p-4 mb-4 flex items-center justify-center shadow-lg">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-navy">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-orange mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-text-secondary">{detail}</span>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>;
        })}
        </div>

        {/* Bottom CTA */}
        
      </div>
    </section>;
};
export default HowWeBuild;