import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight, Star, Users, Calendar, Sparkles, CheckCircle, TrendingUp, Award, Shield, DollarSign } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
const Portfolio = () => {
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
  return;
};
export default Portfolio;