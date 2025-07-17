import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Award, Rocket } from "lucide-react";

const About = () => {
  const skills = [
    "React & TypeScript", "Node.js & Express", "UI/UX Design", "Cloud Hosting",
    "SEO Optimization", "E-commerce", "Mobile Responsive", "Performance Optimization"
  ];

  const stats = [
    { icon: Users, label: "Happy Clients", value: "150+" },
    { icon: Award, label: "Projects Completed", value: "300+" },
    { icon: Rocket, label: "Years Experience", value: "8+" },
    { icon: CheckCircle, label: "Success Rate", value: "99%" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Crafting Digital Excellence
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            With over 8 years of experience in web design and development, I specialize in creating 
            stunning, high-performance websites that deliver exceptional user experiences and drive business growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-slide-up">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Why Choose My Services?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Custom Design Approach</h4>
                  <p className="text-muted-foreground">Every website is uniquely crafted to reflect your brand identity and business goals.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Performance Focused</h4>
                  <p className="text-muted-foreground">Optimized for speed, SEO, and conversion with industry best practices.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Full-Service Solution</h4>
                  <p className="text-muted-foreground">From design to hosting and maintenance, I handle everything so you can focus on your business.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-slide-up">
            <h3 className="text-2xl font-semibold text-foreground">Technical Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 animate-fade-in">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="bg-gradient-card rounded-2xl p-6 shadow-elegant group-hover:shadow-glow transition-smooth">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;