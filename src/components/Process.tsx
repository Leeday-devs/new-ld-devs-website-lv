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
    <section className="py-16 bg-gradient-to-br from-background via-accent/5 to-primary/10 relative overflow-hidden">
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

        {/* Modern Wavy Timeline */}
        <div className="relative max-w-7xl mx-auto">
          {/* Wavy SVG Path for larger screens */}
          <div className="absolute inset-0 hidden xl:block">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 1400 1000" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: "hsl(var(--primary))", stopOpacity: 0.6}} />
                  <stop offset="50%" style={{stopColor: "hsl(var(--accent))", stopOpacity: 0.8}} />
                  <stop offset="100%" style={{stopColor: "hsl(var(--primary))", stopOpacity: 0.6}} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M100,300 Q350,150 600,350 Q850,200 1100,400 Q1200,450 1300,400"
                stroke="url(#waveGradient)"
                strokeWidth="4"
                fill="none"
                filter="url(#glow)"
                className="animate-pulse"
              />
              {/* Timeline dots */}
              {[
                { x: 100, y: 300 },
                { x: 350, y: 200 },
                { x: 600, y: 350 },
                { x: 850, y: 250 },
                { x: 1100, y: 400 },
                { x: 1300, y: 400 }
              ].map((dot, index) => (
                <circle
                  key={index}
                  cx={dot.x}
                  cy={dot.y}
                  r="12"
                  fill="hsl(var(--primary))"
                  className="drop-shadow-lg animate-pulse"
                  style={{animationDelay: `${index * 0.2}s`}}
                />
              ))}
            </svg>
          </div>

          {/* Process Cards with Better Spacing */}
          <div className="space-y-8">
            {/* Row 1 - Cards 1, 2, 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
              {steps.slice(0, 3).map((step, index) => {
                const Icon = step.icon;
                
                return (
                  <div 
                    key={step.number} 
                    className={`relative ${
                      index === 1 ? 'xl:mt-16' : ''
                    }`}
                    style={{
                      animationDelay: `${index * 0.15}s`
                    }}
                  >
                    {/* Enhanced Process Card */}
                    <Card className="group bg-gradient-to-br from-background via-primary/5 to-accent/10 border border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 animate-fade-in-up backdrop-blur-sm">
                      <CardContent className="p-6 relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl transform translate-x-8 -translate-y-8"></div>
                        
                        {/* Step number badge */}
                        <div className="absolute top-4 right-4">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                            {step.number}
                          </div>
                        </div>
                        
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="text-center space-y-4">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {step.title}
                          </h3>
                          
                          <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">{step.duration}</span>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {step.description}
                          </p>
                          
                          {/* Key features */}
                          <div className="space-y-2 pt-2">
                            {step.details.slice(0, 3).map((detail, i) => (
                              <div key={i} className="flex items-center gap-2 text-left">
                                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Bottom decoration */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* Spacing between rows */}
            <div className="h-8"></div>

            {/* Row 2 - Cards 4, 5, 6 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
              {steps.slice(3, 6).map((step, index) => {
                const Icon = step.icon;
                
                return (
                  <div 
                    key={step.number} 
                    className={`relative ${
                      index === 1 ? 'xl:-mt-8' : ''
                    }`}
                    style={{
                      animationDelay: `${(index + 3) * 0.15}s`
                    }}
                  >
                    {/* Enhanced Process Card */}
                    <Card className="group bg-gradient-to-br from-background via-primary/5 to-accent/10 border border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 animate-fade-in-up backdrop-blur-sm">
                      <CardContent className="p-6 relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl transform translate-x-8 -translate-y-8"></div>
                        
                        {/* Step number badge */}
                        <div className="absolute top-4 right-4">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                            {step.number}
                          </div>
                        </div>
                        
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="text-center space-y-4">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {step.title}
                          </h3>
                          
                          <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">{step.duration}</span>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {step.description}
                          </p>
                          
                          {/* Key features */}
                          <div className="space-y-2 pt-2">
                            {step.details.slice(0, 3).map((detail, i) => (
                              <div key={i} className="flex items-center gap-2 text-left">
                                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Bottom decoration */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
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