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
    title: "Websites",
    description: "We build complete websites from start to finish using the latest technology",
    color: "from-primary to-primary-glow"
  }, {
    icon: Database,
    title: "Hosting",
    description: "Reliable hosting solutions that keep your website fast and always online",
    color: "from-secondary to-secondary-glow"
  }, {
    icon: Sparkles,
    title: "AI Integration",
    description: "Smart AI features that make your website more powerful and user-friendly",
    color: "from-accent to-accent-glow"
  }, {
    icon: Zap,
    title: "Automations",
    description: "Smart automation features that save time and make your business run smoothly",
    color: "from-secondary to-accent"
  }];
  const stats = [{
    icon: Users,
    label: "Happy Clients",
    value: "450+",
    suffix: ""
  }, {
    icon: Award,
    label: "Complete Websites",
    value: "200+",
    suffix: ""
  }, {
    icon: Rocket,
    label: "Automations",
    value: "100+",
    suffix: ""
  }, {
    icon: CheckCircle,
    label: "Success Rate",
    value: "98.9",
    suffix: "%"
  }];
  return <section className="py-24 bg-white">

      <div className="container mx-auto px-4">
        {/* Enhanced header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 text-navy">
            <span className="block">WE MAKE</span>
            <span className="text-orange">
              AWESOME
            </span>
            <span className="block">STUFF</span>
          </h1>
          
          <p className="text-xl text-text-secondary leading-relaxed mb-8">
            We're like digital builders who love making cool websites and apps! We use the newest technology 
            and fun designs to create things that people love to use every day.
          </p>
        </div>

        {/* Core capabilities showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {capabilities.map((capability, index) => <div key={capability.title} className="group bg-white rounded-2xl p-6 border border-border-light shadow-sm hover:shadow-lg transition-all duration-500 hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-orange p-3 mb-4 group-hover:scale-110 transition-transform duration-300">
                <capability.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{capability.title}</h3>
              <p className="text-sm text-text-secondary">{capability.description}</p>
            </div>)}
        </div>

        {/* Technology expertise */}
        

        {/* Enhanced stats with animations */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => <div key={stat.label} className="text-center group">
              <div className="bg-white rounded-3xl p-8 border border-border-light shadow-sm hover:shadow-lg transition-all duration-500 hover:scale-105">
                <div className="w-16 h-16 bg-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-navy mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-text-secondary font-medium">{stat.label}</div>
              </div>
            </div>)}
        </div>

        {/* Call to action */}
        
      </div>
    </section>;
};
export default About;