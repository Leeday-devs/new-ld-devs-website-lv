import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Palette, 
  Search, 
  ShoppingCart, 
  Server, 
  BarChart,
  ArrowRight,
  Star,
  CheckCircle,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Database,
  Smartphone,
  Layers,
  Rocket,
  Brain,
  Target
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Build Cool Websites",
      description: "We make awesome websites that work great and look amazing - just like your favorite apps!",
      features: [
        "Super Fast Websites",
        "Works on Phone & Computer", 
        "Fun Colors & Animations",
        "Easy to Use Buttons",
        "Safe & Secure"
      ],
      price: "Let's Talk!",
      gradient: "from-blue-600 via-indigo-600 to-purple-700",
      popular: false,
      technologies: ["React", "Fun Stuff", "Cool Code", "Magic"],
      icon2: Rocket
    },
    {
      icon: Brain,
      title: "Smart Computer Helpers", 
      description: "We teach computers to be really smart and help people do things faster - like a robot assistant!",
      features: [
        "Computers That Learn",
        "Chatbots That Talk",
        "Picture Recognition",
        "Smart Predictions",
        "Helpful Automation"
      ],
      price: "Let's Talk!",
      gradient: "from-pink-500 via-rose-500 to-orange-500",
      popular: true,
      technologies: ["AI Magic", "Smart Bots", "Learning", "Cool Tech"],
      icon2: Brain
    },
    {
      icon: Smartphone,
      title: "Phone & Tablet Apps",
      description: "Apps that work perfectly on phones, tablets, and computers - so everyone can use them anywhere!",
      features: [
        "Works on All Devices",
        "Touch-Friendly Buttons",
        "Pretty Animations",
        "Works Without Internet",
        "Super Easy to Use"
      ],
      price: "Let's Talk!",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      popular: false,
      technologies: ["Phone Apps", "Tablet Apps", "Easy Touch", "Fun Design"],
      icon2: Smartphone
    },
    {
      icon: Database,
      title: "Super Safe Storage",
      description: "We keep all your important stuff safe in the cloud - like a super secure treasure chest!",
      features: [
        "Cloud Storage",
        "Safe Data Keeping",
        "Password Protection",
        "Fast Loading",
        "Never Loses Stuff"
      ],
      price: "Let's Talk!",
      gradient: "from-purple-600 via-indigo-600 to-blue-700",
      popular: false,
      technologies: ["Cloud Magic", "Security", "Fast Servers", "Safe Storage"],
      icon2: Database
    },
    {
      icon: ShoppingCart,
      title: "Online Stores",
      description: "Amazing online shops where people can buy things easily - like having your own digital mall!",
      features: [
        "Easy Shopping Cart",
        "Safe Payment System",
        "Inventory Tracking",
        "Sales Reports",
        "Customer Messages"
      ],
      price: "Let's Talk!",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      popular: false,
      technologies: ["Shopping", "Payments", "Reports", "Customer Care"],
      icon2: ShoppingCart
    },
    {
      icon: Globe,
      title: "Make Old Things New",
      description: "We help make old websites and computers work like new again - like giving them superpowers!",
      features: [
        "Fix Old Websites",
        "Make Things Faster",
        "Add New Features",
        "Connect Everything",
        "Teach People How to Use"
      ],
      price: "Let's Talk!",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      popular: false,
      technologies: ["Fixing", "Upgrading", "Teaching", "Connecting"],
      icon2: Globe
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-800 via-indigo-800 to-purple-800 relative overflow-hidden">
      {/* Advanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-l from-accent/10 to-primary/10 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-orange-400/5 to-pink-400/5 rounded-full blur-xl animate-pulse"></div>
        
        {/* AI and Code themed elements */}
        <div className="absolute top-10 left-10 text-primary/15 text-5xl font-mono animate-float">🤖</div>
        <div className="absolute top-32 right-16 text-accent/15 text-4xl font-mono animate-float-delayed">console.log()</div>
        <div className="absolute bottom-40 left-16 text-primary/15 text-3xl font-mono animate-pulse">npm install</div>
        <div className="absolute bottom-20 right-20 text-accent/15 text-4xl font-mono animate-float">function()</div>
        <div className="absolute top-1/3 left-1/4 text-primary/15 text-6xl font-mono animate-float-delayed">&lt;div&gt;</div>
        <div className="absolute top-2/3 right-1/4 text-accent/15 text-5xl font-mono animate-pulse">API</div>
        
        {/* Neural network visualization */}
        <div className="absolute top-1/4 right-1/3 w-40 h-40 opacity-10">
          <svg viewBox="0 0 100 100" className="text-primary animate-pulse">
            <circle cx="20" cy="20" r="3" fill="currentColor" />
            <circle cx="50" cy="20" r="3" fill="currentColor" />
            <circle cx="80" cy="20" r="3" fill="currentColor" />
            <circle cx="35" cy="50" r="3" fill="currentColor" />
            <circle cx="65" cy="50" r="3" fill="currentColor" />
            <circle cx="50" cy="80" r="3" fill="currentColor" />
            <line x1="20" y1="20" x2="35" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="50" y1="20" x2="35" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="50" y1="20" x2="65" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="80" y1="20" x2="65" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="35" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="65" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
        
        {/* Dynamic grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-primary/20" style={{ animationDelay: `${i * 0.05}s` }}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header with capabilities showcase */}
        <div className="max-w-5xl mx-auto text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-full mb-6 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Cool Things We Make</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6">
            <span className="block">WHAT WE</span>
            <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-text-glow">
              BUILD
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            We take your ideas and turn them into amazing websites and apps that everyone will love to use! 
            It's like building with digital LEGO blocks, but way cooler!
          </p>

          {/* Capability highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { icon: Zap, label: "Super Fast" },
              { icon: Shield, label: "Safe & Secure" },
              { icon: Globe, label: "Works Everywhere" },
              { icon: Sparkles, label: "Really Cool" }
            ].map((cap, index) => (
              <div key={cap.label} className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                <cap.icon className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground font-medium">{cap.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced services grid with modern cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <Card 
                key={service.title}
                className={`group relative overflow-hidden bg-gradient-card border-0 shadow-elegant hover:shadow-glow transition-all duration-500 hover:scale-105 animate-fade-in-up stagger-delay-${index % 3 + 1} ${service.popular ? 'ring-2 ring-primary/50 ring-offset-2 ring-offset-background' : ''}`}
              >
                {/* Popular badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 z-30">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 animate-pulse">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}

                {/* Enhanced gradient background with animation */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105`}></div>
                
                {/* Overlay with subtle pattern */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10"></div>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[size:20px_20px] z-10"></div>
                
                <CardHeader className="text-center relative z-20 text-white p-6">
                  <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-sm p-4 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/30 shadow-xl">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-xl text-white font-bold mb-3 drop-shadow-lg group-hover:text-glow transition-all duration-300">
                    {service.title}
                  </CardTitle>
                  
                  <CardDescription className="text-white/90 leading-relaxed text-sm drop-shadow-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-20 text-white px-6 pb-6">
                  {/* Technology stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs bg-white/10 text-white border-white/30 hover:bg-white/20 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/25 shadow-lg">
                    <div className="grid grid-cols-1 gap-3">
                      {service.features.slice(0, 5).map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-sm text-white font-medium">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{service.price}</div>
                    <Button 
                      size="lg"
                      className="w-full bg-white/25 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-2xl font-semibold py-3 text-sm shadow-xl group"
                    >
                      Let's Make This!
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced CTA section */}
        <div className="text-center bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-12 glass animate-fade-in-up stagger-delay-4">
          <h3 className="text-3xl font-bold font-serif mb-4 text-glow">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Got a cool idea? Want to make something awesome for your school, family, or friends? Let's chat about it!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-button hover:shadow-button transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
            >
              <Zap className="mr-2 h-5 w-5" />
              Let's Talk About Your Idea!
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 hover-lift border-primary/20 hover:border-primary/40"
            >
              Show Me Cool Examples
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;