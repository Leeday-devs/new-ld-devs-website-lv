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
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-sm rounded-full mb-6 border border-blue-200">
            <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium text-blue-700">Our Work</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block text-gray-900">PORTFOLIO</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              SHOWCASE
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real projects, real results. See how we've helped businesses transform their online presence.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="transition-all duration-200"
            >
              {filter}
            </Button>
          ))}
        </div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects
            .filter(project => activeFilter === "All" || project.category === activeFilter)
            .map((project, index) => (
            <Card key={project.title} className="portfolio-card scroll-roll group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{project.category}</Badge>
                  {project.stats.verified && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>{project.stats.users}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{project.stats.rating}</span>
                  </div>
                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;