import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Award, Rocket, Zap, Star, Globe, Code, Palette, Database, Shield, Sparkles } from "lucide-react";

const About = () => {
  const technologies = [
    { name: "React & Next.js", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Language" },
    { name: "Node.js & Python", level: 85, category: "Backend" },
    { name: "UI/UX Design", level: 92, category: "Design" },
    { name: "Cloud & DevOps", level: 88, category: "Infrastructure" },
    { name: "Database Design", level: 87, category: "Data" }
  ];

  const capabilities = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "End-to-end application development with modern tech stacks",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Palette,
      title: "Creative Design",
      description: "User-centered design that converts and delights",
      color: "from-pink-500 to-orange-500"
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Applications built to handle millions of users worldwide",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security and data protection",
      color: "from-red-500 to-pink-600"
    }
  ];

  const stats = [
    { icon: Users, label: "Happy Clients", value: "500+", suffix: "" },
    { icon: Award, label: "Projects Delivered", value: "1000+", suffix: "" },
    { icon: Rocket, label: "Years Experience", value: "10+", suffix: "" },
    { icon: CheckCircle, label: "Success Rate", value: "99.9", suffix: "%" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-l from-accent/10 to-primary/10 rounded-full blur-2xl animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header */}
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-full mb-6 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">About Our Expertise</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6">
            <span className="block">CRAFTING</span>
            <span className="bg-gradient-to-r from-primary via-accent to-orange-400 bg-clip-text text-transparent animate-text-glow">
              DIGITAL
            </span>
            <span className="block">EXCELLENCE</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Pioneering the future of web development with cutting-edge technologies, innovative design principles, 
            and a passion for creating digital experiences that transform businesses and delight users.
          </p>
        </div>

        {/* Core capabilities showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {capabilities.map((capability, index) => (
            <div key={capability.title} className={`group bg-gradient-card rounded-2xl p-6 shadow-elegant hover:shadow-glow transition-all duration-500 hover:scale-105 animate-fade-in-up stagger-delay-${index + 1}`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${capability.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <capability.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{capability.title}</h3>
              <p className="text-sm text-muted-foreground">{capability.description}</p>
            </div>
          ))}
        </div>

        {/* Technology expertise */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 animate-fade-in">Technology Expertise</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <div key={tech.name} className={`bg-gradient-card rounded-xl p-6 shadow-elegant animate-fade-in-up stagger-delay-${index % 2 + 1}`}>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{tech.name}</h4>
                    <span className="text-xs text-muted-foreground">{tech.category}</span>
                  </div>
                  <span className="text-sm font-bold text-primary">{tech.level}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced stats with animations */}
        <div className="grid md:grid-cols-4 gap-8 mb-16 animate-fade-in">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`text-center group animate-fade-in-up stagger-delay-${index + 1}`}>
              <div className="bg-gradient-card rounded-3xl p-8 shadow-elegant group-hover:shadow-glow transition-all duration-500 hover:scale-105 border border-primary/10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-12 glass animate-fade-in-up">
          <h3 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-glow">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-lg">
            Let's collaborate to transform your vision into a digital reality that exceeds expectations 
            and drives meaningful results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:shadow-button transition-all duration-300 hover:scale-105 text-lg px-8 py-6 group"
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
              Start Your Project
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 hover-lift border-primary/20 hover:border-primary/40"
            >
              View Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;