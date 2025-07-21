import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Award, Rocket, Zap, Star, Globe, Code, Palette, Database, Shield, Sparkles } from "lucide-react";
const About = () => {
  const technologies = [{
    name: "React & Next.js",
    level: 95,
    category: "Frontend Development"
  }, {
    name: "TypeScript & JavaScript",
    level: 90,
    category: "Programming Languages"
  }, {
    name: "Node.js & Express",
    level: 85,
    category: "Backend Development"
  }, {
    name: "Tailwind CSS & Figma",
    level: 92,
    category: "UI/UX Design"
  }, {
    name: "AWS & Vercel",
    level: 88,
    category: "Cloud Hosting"
  }, {
    name: "MongoDB & PostgreSQL",
    level: 87,
    category: "Database Management"
  }];
  const capabilities = [{
    icon: Code,
    title: "Building Cool Websites",
    description: "We build complete websites from start to finish using the coolest technology",
    color: "from-blue-500 to-purple-600"
  }, {
    icon: Palette,
    title: "Making Things Pretty",
    description: "We design beautiful colors, animations, and layouts that make people smile",
    color: "from-pink-500 to-orange-500"
  }, {
    icon: Globe,
    title: "Works for Everyone",
    description: "Our websites work for millions of people all around the world",
    color: "from-green-500 to-teal-600"
  }, {
    icon: Shield,
    title: "Keeping Things Safe",
    description: "We make sure all websites are super secure and protect people's information",
    color: "from-red-500 to-pink-600"
  }];
  const stats = [{
    icon: Users,
    label: "Happy Clients",
    value: "500+",
    suffix: ""
  }, {
    icon: Award,
    label: "Projects Delivered",
    value: "1000+",
    suffix: ""
  }, {
    icon: Rocket,
    label: "Years Experience",
    value: "10+",
    suffix: ""
  }, {
    icon: CheckCircle,
    label: "Success Rate",
    value: "99.9",
    suffix: "%"
  }];
  return <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-l from-accent/10 to-primary/10 rounded-full blur-2xl animate-float-delayed"></div>
        
        {/* Tech symbols and code */}
        <div className="absolute top-16 left-16 text-primary/20 text-4xl font-mono animate-float">React</div>
        <div className="absolute top-40 right-24 text-accent/20 text-3xl font-mono animate-float-delayed">TypeScript</div>
        <div className="absolute bottom-32 left-24 text-primary/20 text-5xl font-mono animate-pulse">AI</div>
        <div className="absolute bottom-16 right-16 text-accent/20 text-4xl font-mono animate-float">Node.js</div>
        <div className="absolute top-1/2 left-10 text-primary/20 text-6xl font-mono animate-float-delayed">&lt;/&gt;</div>
        <div className="absolute top-1/3 right-10 text-accent/20 text-5xl font-mono animate-pulse">{`{}`}</div>
        
        {/* Data visualization elements */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 opacity-15">
          <svg viewBox="0 0 100 100" className="text-primary animate-pulse">
            <rect x="10" y="60" width="15" height="30" fill="currentColor" />
            <rect x="30" y="40" width="15" height="50" fill="currentColor" />
            <rect x="50" y="20" width="15" height="70" fill="currentColor" />
            <rect x="70" y="50" width="15" height="40" fill="currentColor" />
          </svg>
        </div>
        
        {/* Matrix effect */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          {Array.from({
          length: 15
        }).map((_, i) => <div key={i} className="absolute text-green-400/50 text-sm font-mono animate-pulse" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${3 + Math.random() * 3}s`
        }}>
              {['HTML', 'CSS', 'JS', 'React', 'AI', 'API', 'DB', 'UX'][Math.floor(Math.random() * 8)]}
            </div>)}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header */}
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-full mb-6 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">About Our Team</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6">
            <span className="block">WE MAKE</span>
            <span className="bg-gradient-to-r from-primary via-accent to-orange-400 bg-clip-text text-transparent animate-text-glow">
              AWESOME
            </span>
            <span className="block">STUFF</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            We're like digital builders who love making cool websites and apps! We use the newest technology 
            and fun designs to create things that people love to use every day.
          </p>
        </div>

        {/* Core capabilities showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {capabilities.map((capability, index) => <div key={capability.title} className={`group bg-gradient-card rounded-2xl p-6 shadow-elegant hover:shadow-glow transition-all duration-500 hover:scale-105 animate-fade-in-up stagger-delay-${index + 1}`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${capability.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <capability.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{capability.title}</h3>
              <p className="text-sm text-muted-foreground">{capability.description}</p>
            </div>)}
        </div>

        {/* Technology expertise */}
        

        {/* Enhanced stats with animations */}
        <div className="grid md:grid-cols-4 gap-8 mb-16 animate-fade-in">
          {stats.map((stat, index) => <div key={stat.label} className={`text-center group animate-fade-in-up stagger-delay-${index + 1}`}>
              <div className="bg-gradient-card rounded-3xl p-8 shadow-elegant group-hover:shadow-glow transition-all duration-500 hover:scale-105 border border-primary/10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            </div>)}
        </div>

        {/* Call to action */}
        
      </div>
    </section>;
};
export default About;