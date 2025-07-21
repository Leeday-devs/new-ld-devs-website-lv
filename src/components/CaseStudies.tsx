import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, 
  Users, 
  TrendingUp, 
  ShoppingCart, 
  Calendar,
  Heart,
  Star,
  ExternalLink
} from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Bella Vista Restaurant",
      category: "Restaurant",
      description: "Modern restaurant website with online reservations, loyalty program, and seamless ordering system.",
      image: "/lovable-uploads/982eca7e-4ba0-46ed-b639-371205303c94.png",
      metrics: [
        { icon: Users, label: "1,200+ active users", color: "text-orange-500" },
        { icon: TrendingUp, label: "+250% revenue", color: "text-green-500" }
      ],
      keyResults: [
        "250% increase in online orders",
        "Integrated loyalty program",
        "Mobile-first design approach"
      ],
      technologies: ["React", "Tailwind", "Supabase"],
      testimonial: {
        text: "Our online presence improved dramatically within weeks!",
        author: "Antonio Martinez",
        role: "Restaurant Owner"
      },
      link: "#"
    },
    {
      title: "TechFlow Solutions",
      category: "SaaS",
      description: "AI-powered business automation platform that streamlines workflows and boosts productivity.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      metrics: [
        { icon: Users, label: "5,000+ businesses", color: "text-blue-500" },
        { icon: TrendingUp, label: "+180% efficiency", color: "text-green-500" }
      ],
      keyResults: [
        "180% increase in workflow efficiency",
        "AI-powered automation features",
        "Enterprise-grade security"
      ],
      technologies: ["React", "Node.js", "AI/ML"],
      testimonial: {
        text: "TechFlow transformed how we manage our daily operations.",
        author: "Sarah Chen",
        role: "Operations Director"
      },
      link: "#"
    },
    {
      title: "EcoMarket Online",
      category: "E-commerce",
      description: "Sustainable products marketplace connecting eco-conscious consumers with green businesses.",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
      metrics: [
        { icon: ShoppingCart, label: "50,000+ orders", color: "text-purple-500" },
        { icon: Heart, label: "95% satisfaction", color: "text-pink-500" }
      ],
      keyResults: [
        "50,000+ successful orders",
        "95% customer satisfaction rate",
        "Zero-waste shipping system"
      ],
      technologies: ["React", "Stripe", "MongoDB"],
      testimonial: {
        text: "The platform made sustainable shopping incredibly easy and enjoyable.",
        author: "Michael Torres",
        role: "Customer"
      },
      link: "#"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-l from-accent/10 to-primary/10 rounded-full blur-2xl animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-full mb-6 border border-primary/20">
            <Star className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Success Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6">
            <span className="block">PROVEN</span>
            <span className="bg-gradient-to-r from-primary via-accent to-orange-400 bg-clip-text text-transparent animate-text-glow">
              RESULTS
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real businesses, real growth, real success. See how we've helped companies transform their digital presence and achieve amazing results.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={study.title} className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900 border-0">
                  {study.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                {/* Title & Description */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {study.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {study.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <metric.icon className={`h-4 w-4 ${metric.color}`} />
                      <span className="text-sm font-medium">{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* Key Results */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Key Results
                  </h4>
                  <ul className="space-y-1">
                    {study.keyResults.map((result, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-3 mb-4">
                  <p className="text-xs italic text-muted-foreground mb-2">"{study.testimonial.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                      {study.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-medium">{study.testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{study.testimonial.role}</p>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-12 animate-fade-in-up">
          <h3 className="text-3xl font-bold font-serif mb-4">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's create the next case study together. We're excited to help your business achieve similar amazing results!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.open('https://wa.me/447586266007', '_blank')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-6 text-lg"
            >
              Start Your Success Story
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-lg border-primary/20 hover:border-primary/40"
            >
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;