import { useState } from "react";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "FitnessPro Studio",
      category: "Fitness Business",
      description: "Complete fitness business solution with member management and booking system.",
      image: project1,
      technologies: ["React", "Node.js", "Stripe", "MongoDB"],
      liveUrl: "#",
      caseStudy: {
        challenge: "FitnessPro Studio was struggling with manual booking processes and poor online presence, losing potential clients to competitors.",
        solution: "We built a comprehensive platform with online booking, member management, payment processing, and mobile-responsive design.",
        results: [
          "300% increase in online bookings",
          "50% reduction in admin time", 
          "2,500+ active members",
          "99.9% uptime reliability"
        ]
      }
    },
    {
      id: 2,
      title: "TechCorp Dashboard",
      category: "Enterprise",
      description: "Enterprise analytics platform with real-time KPI tracking and reporting.",
      image: project2,
      technologies: ["TypeScript", "React", "D3.js", "PostgreSQL"],
      liveUrl: "#",
      caseStudy: {
        challenge: "TechCorp needed a unified dashboard to track KPIs across multiple departments and streamline decision-making processes.",
        solution: "We created an enterprise-grade analytics platform with real-time data visualization, automated reporting, and role-based access.",
        results: [
          "75% faster reporting processes",
          "500+ employees using daily",
          "Enterprise security compliance",
          "24/7 monitoring & support"
        ]
      }
    },
    {
      id: 3,
      title: "Bella Vista Restaurant",
      category: "Restaurant",
      description: "Modern restaurant website with online ordering and table reservations.",
      image: project3,
      technologies: ["React", "Tailwind", "Supabase", "Stripe"],
      liveUrl: "#",
      caseStudy: {
        challenge: "Bella Vista had no online presence and was losing customers to restaurants with online ordering capabilities.",
        solution: "We developed a modern website with online ordering, table reservations, loyalty program, and customer review system.",
        results: [
          "250% increase in online orders",
          "1,200+ registered customers",
          "Integrated loyalty program",
          "Mobile-first ordering system"
        ]
      }
    },
    {
      id: 4,
      title: "AutoRepair Pro",
      category: "Automotive",
      description: "Service booking platform for automotive repair shops.",
      image: project1,
      technologies: ["Vue.js", "Laravel", "MySQL", "PWA"],
      liveUrl: "#",
      caseStudy: {
        challenge: "Local auto shop needed to modernize their booking system and improve customer communication.",
        solution: "Built a comprehensive service booking platform with appointment scheduling, service tracking, and automated notifications.",
        results: [
          "400% increase in online bookings",
          "Reduced phone calls by 60%",
          "Improved customer satisfaction",
          "Streamlined operations"
        ]
      }
    },
    {
      id: 5,
      title: "EduLearn Platform",
      category: "Education",
      description: "Online learning management system for educational institutions.",
      image: project2,
      technologies: ["Next.js", "Prisma", "PostgreSQL", "WebRTC"],
      liveUrl: "#",
      caseStudy: {
        challenge: "Educational institution needed a robust LMS to handle remote learning during the pandemic.",
        solution: "Created a comprehensive learning platform with video conferencing, assignment management, and progress tracking.",
        results: [
          "10,000+ students enrolled",
          "95% course completion rate",
          "Seamless video integration",
          "Mobile learning support"
        ]
      }
    },
    {
      id: 6,
      title: "RetailMax E-commerce",
      category: "E-commerce",
      description: "Full-featured e-commerce platform with inventory management.",
      image: project3,
      technologies: ["Shopify", "React", "GraphQL", "AWS"],
      liveUrl: "#",
      caseStudy: {
        challenge: "Growing retail business needed a scalable e-commerce solution to handle increasing online demand.",
        solution: "Built a custom e-commerce platform with advanced inventory management, multi-channel selling, and analytics.",
        results: [
          "500% increase in online sales",
          "Automated inventory sync",
          "Multi-channel integration",
          "Advanced analytics dashboard"
        ]
      }
    }
  ];

  const openCaseStudy = (project) => {
    setSelectedProject(project);
  };

  const closeCaseStudy = () => {
    setSelectedProject(null);
  };

  return (
    <section id="portfolio" className="section-white py-20" aria-label="Portfolio of completed projects">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-navy">
            Our Recent <span className="text-orange">Projects</span>
          </h2>
          <p className="text-body max-w-3xl mx-auto text-text-secondary">
            Explore some of our latest web development projects and see how we've helped businesses transform their online presence
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {projects.slice(0, 6).map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              onClick={() => openCaseStudy(project)}
            >
              <div className="relative overflow-hidden h-80">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Orange Overlay */}
                <div className="absolute inset-0 bg-orange opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white p-6">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-sm opacity-90">{project.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button 
            className="bg-orange hover:bg-orange/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5 inline" />
          </button>
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-navy">{selectedProject.title}</h3>
                <button
                  onClick={closeCaseStudy}
                  className="text-text-secondary hover:text-navy transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Case Study Content */}
              <div className="space-y-8">
                {/* Challenge */}
                <div>
                  <h4 className="text-xl font-bold text-orange mb-4">Challenge</h4>
                  <p className="text-text-secondary leading-relaxed text-lg">
                    {selectedProject.caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-xl font-bold text-orange mb-4">Solution</h4>
                  <p className="text-text-secondary leading-relaxed text-lg">
                    {selectedProject.caseStudy.solution}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-xl font-bold text-orange mb-4">Results</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProject.caseStudy.results.map((result, index) => (
                      <div key={index} className="bg-orange/5 rounded-lg p-4 border border-orange/20">
                        <div className="text-2xl font-bold text-orange mb-1">
                          {result.split(' ')[0]}
                        </div>
                        <p className="text-text-secondary text-sm">
                          {result.split(' ').slice(1).join(' ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-border-light">
                <button
                  onClick={closeCaseStudy}
                  className="w-full bg-orange hover:bg-orange/90 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;