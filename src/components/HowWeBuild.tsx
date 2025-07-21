import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Palette, 
  Code, 
  Rocket, 
  CheckCircle,
  ArrowRight,
  Users,
  Monitor,
  Sparkles
} from "lucide-react";

const HowWeBuild = () => {
  const steps = [
    {
      step: "01",
      icon: MessageCircle,
      title: "Chat About Your Ideas",
      description: "We sit down with you (virtually or in person) and listen to what you want. Tell us about your business, your style, and what makes you special!",
      details: [
        "Understanding your business goals",
        "Learning about your target customers",
        "Discussing your favorite colors and styles",
        "Planning the features you need"
      ],
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50"
    },
    {
      step: "02", 
      icon: Palette,
      title: "Design Your Perfect Look",
      description: "Our creative team makes your website look absolutely amazing! We create designs that match your personality and make your customers smile.",
      details: [
        "Custom color schemes and branding",
        "Beautiful layouts that work on all devices",
        "Easy-to-use navigation that makes sense",
        "Professional graphics and images"
      ],
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50"
    },
    {
      step: "03",
      icon: Code,
      title: "Build with Love & Code",
      description: "This is where the magic happens! We write clean, fast code that brings your design to life. Every button, every page, every feature - built perfectly.",
      details: [
        "Lightning-fast loading speeds",
        "Mobile-friendly responsive design",
        "Secure and reliable code",
        "Easy content management system"
      ],
      color: "from-green-500 to-teal-600",
      bgColor: "bg-green-50"
    },
    {
      step: "04",
      icon: Rocket,
      title: "Launch & Celebrate!",
      description: "Your website goes live and the world can see your amazing new online presence! We help you launch and make sure everything works perfectly.",
      details: [
        "Domain setup and hosting",
        "SSL security certificates",
        "Search engine optimization",
        "Training on how to update content"
      ],
      color: "from-orange-500 to-red-600", 
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-l from-purple-200/30 to-pink-200/30 rounded-full blur-2xl animate-float-delayed"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-300/20"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-sm rounded-full mb-6 border border-blue-200">
            <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium text-blue-700">Our Process</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6">
            <span className="block text-gray-900">HOW WE BUILD</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              YOUR WEBSITE
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From your first idea to your website going live - here's exactly how we make your dreams come true, step by step!
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div key={step.step} className="relative group">
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0"></div>
                )}
                
                <Card className="relative h-full hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  {/* Step number badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className={`bg-gradient-to-r ${step.color} text-white border-0 text-sm font-bold px-3 py-1`}>
                      {step.step}
                    </Badge>
                  </div>

                  {/* Background gradient */}
                  <div className={`absolute inset-0 ${step.bgColor} opacity-50`}></div>
                  
                  <CardContent className="relative z-10 p-6 pt-16">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} p-4 mb-4 flex items-center justify-center shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12 border border-blue-100">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold font-serif mb-4 text-gray-900">
              Ready to Start Building?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Every amazing website starts with a simple conversation. Let's chat about your ideas and get started on your perfect website today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://wa.me/447586266007', '_blank')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                Let's Start Building!
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300"
              >
                <Monitor className="h-5 w-5" />
                View Our Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeBuild;