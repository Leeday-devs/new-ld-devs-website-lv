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
    <section id="portfolio" className="section-luxury py-20" aria-label="Portfolio of completed projects">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="heading-luxury heading-lg mb-6">
            Our Recent <span className="text-brand-orange">Projects</span>
          </h2>
          <p className="text-luxury max-w-3xl mx-auto">
            Explore some of our latest web development projects and see how we've helped businesses transform their online presence
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card-luxury group cursor-pointer overflow-hidden"
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-center text-on-dark">
                    <ExternalLink className="h-8 w-8 mx-auto mb-2" />
                    <span className="font-semibold">View Project</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="heading-luxury heading-md group-hover:text-brand-orange transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-luxury leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-bg-premium text-text-muted text-sm rounded-full border border-border-luxury"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="btn-primary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;