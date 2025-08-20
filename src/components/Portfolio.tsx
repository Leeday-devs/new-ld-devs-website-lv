import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";
import { ExternalLink, Github, ArrowRight, Star, Users, Calendar, Sparkles, CheckCircle, TrendingUp, Award, Shield, DollarSign, Filter } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useStaggeredScrollAnimation('.portfolio-card', 150);
  
  const filters = ["All", "E-commerce", "Business", "Restaurant", "Fitness", "Enterprise"];
  const projects = [{
    title: "FitnessPro Studio",
    description: "Complete fitness business solution with member management, class booking, payment processing, and mobile app integration. Increased client bookings by 300%.",
    image: project1,
    technologies: ["React", "Node.js", "Stripe", "MongoDB", "Mobile App"],
    category: "Fitness Business",
    clientTestimonial: {
      name: "Sarah Johnson",
      company: "FitnessPro Studio Owner",
      quote: "This platform transformed our business completely!"
    },
    stats: {
      users: "2,500+",
      rating: 4.9,
      completion: "6 weeks",
      revenue: "+300%",
      verified: true
    },
    results: ["300% increase in online bookings", "50% reduction in admin time", "99.9% uptime reliability", "Mobile-first design"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  }, {
    title: "TechCorp Business Dashboard",
    description: "Enterprise-grade analytics platform with real-time KPI tracking, automated reporting, and team collaboration tools. Streamlined decision-making for 500+ employees.",
    image: project2,
    technologies: ["TypeScript", "React", "D3.js", "PostgreSQL", "AWS"],
    category: "Enterprise",
    clientTestimonial: {
      name: "Michael Chen",
      company: "TechCorp CTO",
      quote: "Exceptional quality and performance. Exceeded expectations!"
    },
    stats: {
      users: "500+",
      rating: 4.8,
      completion: "8 weeks",
      revenue: "+150%",
      verified: true
    },
    results: ["75% faster reporting", "Enterprise security compliance", "24/7 monitoring & support", "Custom integrations"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  }, {
    title: "Bella Vista Restaurant",
    description: "Modern restaurant website with online ordering, table reservations, loyalty program, and customer reviews. Boosted online orders by 250% during launch month.",
    image: project3,
    technologies: ["React", "Tailwind", "Supabase", "Stripe", "PWA"],
    category: "Restaurant",
    clientTestimonial: {
      name: "Antonio Martinez",
      company: "Bella Vista Owner",
      quote: "Our online presence went from zero to amazing in just weeks!"
    },
    stats: {
      users: "1,200+",
      rating: 4.7,
      completion: "4 weeks",
      revenue: "+250%",
      verified: true
    },
    results: ["250% increase in online orders", "Integrated loyalty program", "Mobile ordering system", "Real-time analytics"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  }];
  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-primary/5 relative overflow-hidden">
      {/* Premium textured background */}
      <div className="absolute inset-0 bg-texture-dots opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-mesh"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-serif text-foreground mb-6">
            Case Studies & Transformations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results for real businesses. See how we've helped our clients achieve remarkable growth.
          </p>
        </div>

        {/* Premium Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={`transition-all duration-300 rounded-full px-6 py-3 font-semibold ${
                activeFilter === filter 
                  ? "bg-gradient-secondary text-primary shadow-coral hover:shadow-glow" 
                  : "border-primary/20 hover:bg-primary/5 hover:border-primary/40"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div key={project.title} className="group">
              <div className="bg-gradient-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500 hover:scale-105">
                {/* Case Study Header */}
                <div className="p-8 border-b border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-secondary uppercase tracking-wide">Case Study</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                {/* Before/After Images */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`${project.title} website design`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Tech Stack Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-secondary text-primary rounded-full text-sm font-bold shadow-lg">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Results Section */}
                <div className="p-8">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary mb-1">+250%</div>
                      <div className="text-sm text-muted-foreground">Traffic Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary mb-1">+180%</div>
                      <div className="text-sm text-muted-foreground">Conversions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary mb-1">98%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-secondary transition-colors cursor-pointer">
                      <span className="text-sm font-medium">View Live Site</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-primary rounded-3xl p-12 shadow-premium relative overflow-hidden">
            <div className="absolute inset-0 bg-texture-noise opacity-20"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold font-serif mb-4 text-white">
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Let's create something extraordinary together. From concept to launch, we'll turn your vision into reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-secondary text-primary hover:shadow-coral hover:scale-105 transition-all duration-300 text-lg px-8 py-4 rounded-full font-bold"
                  onClick={() => window.open('https://wa.me/447586266007', '_blank')}
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-secondary/40 text-white hover:bg-secondary hover:text-primary hover:scale-105 transition-all duration-300 text-lg px-8 py-4 rounded-full font-bold bg-white/10 backdrop-blur-md"
                >
                  View More Work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;