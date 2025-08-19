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
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary backdrop-blur-sm rounded-full mb-6 border border-secondary/20 shadow-glow">
            <Award className="h-4 w-4 text-secondary animate-pulse" />
            <span className="text-sm font-bold text-white">Featured Client Work</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6">
            <span className="block text-foreground">PORTFOLIO</span>
            <span className="bg-gradient-to-r from-secondary via-accent to-accent-glow bg-clip-text text-transparent">
              SHOWCASE
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            Real projects, real results. See how we've helped businesses transform their online presence and achieve remarkable growth.
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

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects
            .filter(project => activeFilter === "All" || project.category === activeFilter)
            .map((project, index) => (
            <Card key={project.title} className="portfolio-card scroll-roll group hover:shadow-premium transition-all duration-500 overflow-hidden bg-card border-0 shadow-card">
              <div className="relative overflow-hidden h-80">
                <img 
                  src={project.image} 
                  alt={`${project.title} - ${project.category} project showcasing modern web development`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Enhanced overlay with project details */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-lg">{project.title}</h4>
                    <p className="text-white/90 text-sm line-clamp-2">{project.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-secondary text-primary hover:bg-secondary/90">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Live
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-primary">
                        Case Study
                      </Button>
                    </div>
                  </div>
                </div>
                
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-gradient-secondary text-primary font-bold shadow-coral">
                    🌟 Featured Work
                  </Badge>
                )}
                
                {/* Results badge */}
                <Badge className="absolute top-4 right-4 bg-gradient-accent text-white font-bold">
                  {project.stats.revenue} Revenue ↗
                </Badge>
              </div>
              
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="border-primary/20 text-primary font-medium">{project.category}</Badge>
                  {project.stats.verified && (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-muted-foreground">Verified Client</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold font-serif mb-3 text-foreground">{project.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                
                {/* Key Results */}
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm text-primary mb-3">Key Results:</h4>
                  {project.results.slice(0, 2).map((result) => (
                    <div key={result} className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-muted-foreground">{result}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs font-medium bg-primary/5 text-primary border-primary/10">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="font-bold text-foreground">{project.stats.users}</div>
                    <div className="text-xs text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="font-bold text-foreground">{project.stats.rating}</div>
                    <div className="text-xs text-muted-foreground">Client Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Calendar className="h-4 w-4 text-accent" />
                    </div>
                    <div className="font-bold text-foreground">{project.stats.completion}</div>
                    <div className="text-xs text-muted-foreground">Delivered</div>
                  </div>
                </div>
                
                {/* Client Testimonial */}
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <p className="text-sm text-muted-foreground italic mb-2">"{project.clientTestimonial.quote}"</p>
                  <div className="text-xs font-medium text-primary">
                    — {project.clientTestimonial.name}, {project.clientTestimonial.company}
                  </div>
                </div>
                
              </CardContent>
            </Card>
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