import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Portfolio = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Modern online store with advanced filtering, payment integration, and inventory management.",
      image: project1,
      technologies: ["React", "Node.js", "Stripe", "MongoDB"],
      category: "E-commerce",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Corporate Dashboard",
      description: "Data visualization platform for business analytics with real-time reporting and insights.",
      image: project2,
      technologies: ["TypeScript", "D3.js", "Express", "PostgreSQL"],
      category: "Dashboard",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Restaurant Website",
      description: "Elegant restaurant website with online reservations, menu showcase, and customer reviews.",
      image: project3,
      technologies: ["React", "Tailwind", "Firebase", "Framer Motion"],
      category: "Restaurant",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            A showcase of recent projects demonstrating expertise in modern web development and design.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="bg-gradient-card border-0 shadow-elegant hover:shadow-glow transition-smooth group overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-smooth duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <p className="text-muted-foreground mb-6">
            Want to see more projects or discuss your own idea?
          </p>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-smooth">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;