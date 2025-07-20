import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  Palette, 
  Code2, 
  TestTube, 
  Rocket, 
  HeadphonesIcon,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Sparkles
} from "lucide-react";

const Process = () => {
  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Discovery & Planning",
      description: "We chat about your ideas and figure out exactly what you want your website to do!",
      details: [
        "Understanding your goals",
        "Researching your audience", 
        "Planning the features",
        "Creating a roadmap"
      ],
      duration: "1-2 weeks",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02", 
      icon: Palette,
      title: "Design & Wireframes",
      description: "We draw and design how your website will look - making it beautiful and easy to use!",
      details: [
        "Creating wireframes",
        "Designing the look and feel",
        "Choosing colors and fonts",
        "Getting your approval"
      ],
      duration: "2-3 weeks",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      icon: Code2,
      title: "Development",
      description: "This is where the magic happens! We build your website using the latest technology.",
      details: [
        "Writing clean code",
        "Building all features",
        "Making it work on all devices",
        "Regular progress updates"
      ],
      duration: "3-6 weeks",
      color: "from-green-500 to-emerald-500"
    },
    {
      number: "04",
      icon: TestTube,
      title: "Testing & Review",
      description: "We test everything to make sure it works perfectly and you're happy with it!",
      details: [
        "Testing all features",
        "Checking on different devices",
        "Your feedback and changes",
        "Final polishing"
      ],
      duration: "1-2 weeks",
      color: "from-orange-500 to-red-500"
    },
    {
      number: "05",
      icon: Rocket,
      title: "Launch",
      description: "Time to show your amazing website to the world! We help you go live.",
      details: [
        "Final preparations",
        "Going live online",
        "Setting up analytics",
        "Celebration time!"
      ],
      duration: "1 week",
      color: "from-indigo-500 to-purple-500"
    },
    {
      number: "06",
      icon: HeadphonesIcon,
      title: "Support & Maintenance",
      description: "We don't disappear! We're here to help keep your website running smoothly.",
      details: [
        "Regular updates",
        "Security monitoring",
        "Performance optimization",
        "Ongoing support"
      ],
      duration: "Ongoing",
      color: "from-teal-500 to-blue-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-800 via-gray-800 to-blue-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-l from-accent/10 to-primary/10 rounded-full blur-2xl animate-float-delayed"></div>
        
        {/* Process flow background elements */}
        <div className="absolute top-16 left-16 text-primary/20 text-3xl font-mono animate-float">1.</div>
        <div className="absolute top-32 right-24 text-accent/20 text-4xl font-mono animate-float-delayed">2.</div>
        <div className="absolute bottom-32 left-24 text-primary/20 text-3xl font-mono animate-pulse">3.</div>
        <div className="absolute bottom-16 right-16 text-accent/20 text-4xl font-mono animate-float">→</div>
        
        {/* Flow arrows */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute text-primary/50 text-2xl font-mono animate-pulse"
              style={{
                left: `${20 + (i * 8)}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              →
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-full mb-6 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Our Process</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif mb-4">
            <span className="block">HOW WE</span>
            <span className="bg-gradient-to-r from-primary via-accent to-orange-400 bg-clip-text text-transparent animate-text-glow">
              BUILD
            </span>
            <span className="block">YOUR WEBSITE</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto">
            From your first idea to launching your amazing website, here's exactly how we work together 
            to create something incredible step by step!
          </p>
        </div>

        {/* Horizontal Process timeline */}
        <div className="relative">
          {/* Horizontal connection line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div key={step.number} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg z-10 flex items-center justify-center hidden md:flex">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Process card */}
                  <Card className={`group bg-gradient-card border-0 shadow-elegant hover:shadow-glow transition-all duration-500 hover:scale-105 animate-fade-in-up mt-20 md:mt-24`}>
                    <CardContent className="p-6 text-center">
                      {/* Icon and number */}
                      <div className="flex flex-col items-center mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} p-3 group-hover:scale-110 transition-transform duration-300 mb-3`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="outline" className="text-xs font-bold">
                          Step {step.number}
                        </Badge>
                      </div>
                      
                      {/* Content */}
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">{step.duration}</span>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                          {step.description}
                        </p>
                        
                        <div className="space-y-2">
                          {step.details.slice(0, 2).map((detail, i) => (
                            <div key={i} className="flex items-center gap-2 justify-center">
                              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                              <span className="text-xs text-muted-foreground">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Arrow for larger screens */}
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute top-16 -right-3 h-6 w-6 text-muted-foreground/50 animate-pulse hidden xl:block z-20" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center mt-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-8 glass animate-fade-in-up">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold font-serif mb-4 text-glow">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Let's begin this exciting journey together! We'll guide you through every step 
              to create the perfect website for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Expert Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Proven Process</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Amazing Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;