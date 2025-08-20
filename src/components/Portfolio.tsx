import { useState } from "react";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import fitnessImage from "@/assets/case-study-fitness.jpg";
import enterpriseImage from "@/assets/case-study-enterprise.jpg";
import restaurantImage from "@/assets/case-study-restaurant.jpg";
import autoRepairImage from "@/assets/case-study-autorepair.jpg";
import educationImage from "@/assets/case-study-education.jpg";
import ecommerceImage from "@/assets/case-study-ecommerce.jpg";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "FitnessPro Studio",
      category: "Fitness Business",
      description: "Complete fitness business solution with member management and booking system.",
      image: fitnessImage,
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
      image: enterpriseImage,
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
      image: restaurantImage,
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
      image: autoRepairImage,
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
      image: educationImage,
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
      image: ecommerceImage,
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
    <section id="portfolio" className="section-white py-20" aria-label="Case studies showing real business results">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-navy">
            Case <span className="text-orange">Studies</span>
          </h2>
          <p className="text-body max-w-3xl mx-auto text-text-secondary">
            Real business challenges we've solved. See how we transform problems into profitable solutions with measurable results.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {projects.slice(0, 6).map((project) => (
            <div
              key={project.id}
              className="card-premium overflow-hidden cursor-pointer group transform transition-all duration-300 hover:shadow-luxury hover:-translate-y-2"
              onClick={() => openCaseStudy(project)}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} case study`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Orange Overlay */}
                <div className="absolute inset-0 bg-orange opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center text-white p-6">
                    <h3 className="heading-primary heading-md mb-3 text-white">{project.title}</h3>
                    <p className="text-lg opacity-90 mb-2">{project.category}</p>
                    <div className="text-sm opacity-75 font-medium">Click to view case study →</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button 
            className="btn-primary px-10 py-4 text-lg font-semibold rounded-2xl"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Project
          </button>
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-luxury">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="heading-primary heading-lg text-navy mb-2">{selectedProject.title}</h3>
                  <p className="text-orange font-semibold text-lg">{selectedProject.category} • Case Study</p>
                </div>
                <button
                  onClick={closeCaseStudy}
                  className="text-text-secondary hover:text-navy transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Case Study Content */}
              <div className="space-y-10">
                {/* Challenge */}
                <div className="bg-red-50 p-8 rounded-2xl border-l-4 border-red-400">
                  <h4 className="heading-primary heading-md text-red-600 mb-4 flex items-center">
                    🎯 The Challenge
                  </h4>
                  <p className="text-body text-gray-700 leading-relaxed">
                    {selectedProject.caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="bg-blue-50 p-8 rounded-2xl border-l-4 border-blue-400">
                  <h4 className="heading-primary heading-md text-blue-600 mb-4 flex items-center">
                    🛠️ Our Solution
                  </h4>
                  <p className="text-body text-gray-700 leading-relaxed">
                    {selectedProject.caseStudy.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="bg-green-50 p-8 rounded-2xl border-l-4 border-green-400">
                  <h4 className="heading-primary heading-md text-green-600 mb-6 flex items-center">
                    📈 Business Results
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedProject.caseStudy.results.map((result, index) => (
                      <div key={index} className="bg-white p-6 rounded-xl shadow-subtle border border-green-200">
                        <div className="text-3xl font-bold text-orange mb-2">
                          {result.split(' ')[0]}
                        </div>
                        <p className="text-gray-600 font-medium">
                          {result.split(' ').slice(1).join(' ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                <button
                  onClick={closeCaseStudy}
                  className="btn-primary px-8 py-4 rounded-2xl font-semibold"
                >
                  Get Similar Results for Your Business
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Ready to solve your business challenges? Let's discuss your project.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;