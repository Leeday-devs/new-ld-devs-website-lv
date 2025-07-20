import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight, Star, Users, Calendar, Sparkles, CheckCircle, TrendingUp, Award, Shield, DollarSign } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Portfolio = () => {
  const projects = [
    {
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
      results: [
        "300% increase in online bookings",
        "50% reduction in admin time",
        "99.9% uptime reliability",
        "Mobile-first design"
      ],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
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
      results: [
        "75% faster reporting",
        "Enterprise security compliance",
        "24/7 monitoring & support",
        "Custom integrations"
      ],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
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
      results: [
        "250% increase in online orders",
        "Integrated loyalty program",
        "Mobile ordering system",
        "Real-time analytics"
      ],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-accent/10 via-background to-primary/10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 right-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-accent/30 rounded-full blur-2xl animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header */}
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6 animate-scale-in-bounce">
            <Star className="h-4 w-4 text-accent animate-pulse-glow" />
            <span className="text-sm font-medium text-accent">Featured Work</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 animate-fade-in-up stagger-delay-1">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Our Portfolio
            </span>
            <br />
            <span className="text-foreground">Success Stories</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in-up stagger-delay-2">
            A showcase of recent projects demonstrating expertise in modern web development, 
            innovative design, and measurable business impact across various industries.
          </p>
        </div>

        {/* Projects grid with dynamic layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className={`group overflow-hidden hover-lift bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-500 animate-fade-in-up stagger-delay-${index + 1} ${project.featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            >
              {project.featured && (
                <Badge className="absolute top-4 left-4 z-20 bg-gradient-primary text-white border-0 animate-pulse-glow">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Featured Project
                </Badge>
              )}

              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${
                    project.featured ? 'h-64 lg:h-80' : 'h-48'
                  }`}
                />
                
                {/* Enhanced overlay with buttons */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between p-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="glass hover:scale-105 transition-transform duration-300">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Demo
                    </Button>
                    <Button size="sm" variant="secondary" className="glass hover:scale-105 transition-transform duration-300">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className={`p-6 ${project.featured ? 'lg:p-8' : ''}`}>
                {/* Enhanced Trust Header */}
                <div className="flex items-center justify-between mb-4">
                  <Badge 
                    variant="secondary" 
                    className="text-xs bg-primary/10 text-primary border-primary/20"
                  >
                    {project.category}
                  </Badge>
                  {project.stats.verified && (
                    <div className="flex items-center gap-1 text-green-600">
                      <Shield className="h-4 w-4" />
                      <span className="text-xs font-medium">Verified Project</span>
                    </div>
                  )}
                </div>

                {/* Enhanced Stats with Trust Indicators */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 bg-primary/5 rounded-lg p-2">
                    <Users className="h-4 w-4 text-primary" />
                    <div>
                      <span className="font-semibold text-foreground">{project.stats.users}</span>
                      <span className="text-muted-foreground"> active users</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-primary/5 rounded-lg p-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <span className="font-semibold text-foreground">{project.stats.completion}</span>
                      <span className="text-muted-foreground"> delivery</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-green-50 rounded-lg p-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <div>
                      <span className="font-semibold text-green-700">{project.stats.revenue}</span>
                      <span className="text-green-600"> revenue</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-yellow-50 rounded-lg p-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${
                            i < Math.floor(project.stats.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-yellow-700">{project.stats.rating}</span>
                  </div>
                </div>
                
                <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3 ${
                  project.featured ? 'text-2xl lg:text-3xl' : 'text-xl'
                }`}>
                  {project.title}
                </h3>
                
                <p className={`text-muted-foreground leading-relaxed mb-4 ${
                  project.featured ? 'text-base lg:text-lg' : 'text-sm'
                }`}>
                  {project.description}
                </p>

                {/* Key Results */}
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Key Results
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {project.results.slice(0, project.featured ? 4 : 2).map((result, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client Testimonial */}
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {project.clientTestimonial.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground italic mb-1">
                        "{project.clientTestimonial.quote}"
                      </p>
                      <div className="text-xs">
                        <span className="font-semibold text-foreground">{project.clientTestimonial.name}</span>
                        <span className="text-muted-foreground"> - {project.clientTestimonial.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className="text-xs hover:bg-primary/10 hover:border-primary/30 transition-colors duration-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full hover:bg-gradient-button hover:text-white hover:border-transparent transition-all duration-300 group"
                >
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced CTA section */}
        <div className="text-center bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-12 glass animate-fade-in-up stagger-delay-4">
          <h3 className="text-3xl font-bold font-serif mb-4 text-glow">
            Ready to Start Your Project?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Want to see more projects or discuss your own idea? Let's bring your vision to life 
            with cutting-edge technology and exceptional design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-button hover:shadow-button transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
            >
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 hover-lift border-primary/20 hover:border-primary/40"
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;