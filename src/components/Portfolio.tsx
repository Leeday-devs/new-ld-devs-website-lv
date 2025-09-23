import { useState } from "react";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import restaurantImage from "@/assets/case-study-restaurant.jpg";
import autoRepairImage from "@/assets/case-study-autorepair.jpg";
import educationImage from "@/assets/case-study-education.jpg";
import ecommerceImage from "@/assets/case-study-ecommerce.jpg";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "R&A Services Contract Portal",
      category: "Business Management",
      description: "Secure admin portal for contract management with user authentication and monitoring.",
      image: "/lovable-uploads/ac61a595-f03a-4f0f-b2c5-e8f128a2fa16.png",
      technologies: ["React", "TypeScript", "Supabase", "Security"],
      liveUrl: "#",
      caseStudy: {
        challenge: "R&A Services needed a secure contract management system to handle client portals, admin access, and streamline their contract workflow processes.",
        solution: "We built a comprehensive contract portal with secure authentication, admin dashboard, pending customer approvals system, and real-time monitoring capabilities.",
        results: [
          "100% secure admin access",
          "Streamlined contract approvals",
          "Real-time activity monitoring",
          "Enhanced client portal experience"
        ]
      }
    },
    {
      id: 2,
      title: "Custom Website Backend",
      category: "Admin Systems",
      description: "Comprehensive backend management system with user control and analytics dashboard.",
      image: "/lovable-uploads/00d6aad9-7a15-4c0c-bc36-bd838ec3caa0.png",
      technologies: ["React", "Node.js", "Database", "Analytics"],
      liveUrl: "#",
      caseStudy: {
        challenge: "Client required a powerful backend system to manage their website operations, user accounts, content management, and business analytics from one unified dashboard.",
        solution: "We developed a custom admin backend with user management, content controls, security monitoring, and comprehensive analytics to give complete operational oversight.",
        results: [
          "Centralized admin control",
          "Enhanced security features",
          "Real-time user analytics",
          "Streamlined operations management"
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
    <section id="portfolio" className="bg-transparent py-20" aria-label="Case studies showing real business results">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-navy">
            Some of My <span className="text-orange">Recent Work</span>
          </h2>
          <p className="text-body max-w-3xl mx-auto text-text-secondary">
            As a freelancer, I work one-on-one with each client to deliver results that look premium and perform.
          </p>
        </div>

        {/* Case Studies Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="card-premium overflow-hidden cursor-pointer group transform transition-all duration-500 hover:shadow-luxury"
              onClick={() => openCaseStudy(project)}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} case study`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Orange Overlay with enhanced animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange/90 to-orange/70 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Overlay Content with enhanced styling */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105">
                  <div className="text-center text-white p-8">
                    <h3 className="heading-primary heading-md mb-4 text-white font-bold">
                      {project.title}
                    </h3>
                    <p className="text-lg opacity-90 mb-4 font-medium">
                      {project.category}
                    </p>
                    <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold tracking-wide border border-white/30">
                      View Case Study →
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="p-4 text-center">
                <p className="text-text-secondary text-sm font-medium">Built by Lee</p>
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
            Work With Lee
          </button>
        </div>
      </div>

      {/* Case Study Modal - Mobile Optimized */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-scale-in shadow-luxury border border-gray-100">
            <div className="p-4 sm:p-6 lg:p-10">
              {/* Modal Header - Mobile Optimized */}
              <div className="flex items-start justify-between mb-6 sm:mb-10">
                <div className="flex-1 mr-4">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy mb-2 sm:mb-3 leading-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-orange font-bold text-sm sm:text-lg lg:text-xl tracking-wide">
                    {selectedProject.category} • Case Study
                  </p>
                </div>
                <button
                  onClick={closeCaseStudy}
                  className="text-text-secondary hover:text-navy transition-colors p-2 sm:p-3 hover:bg-gray-100 rounded-xl flex-shrink-0 touch-manipulation"
                  style={{ minHeight: '48px', minWidth: '48px' }}
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                </button>
              </div>

              {/* Case Study Content - Mobile Optimized */}
              <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                {/* Challenge */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-3xl border-l-4 sm:border-l-6 border-red-400 shadow-subtle">
                  <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 mb-3 sm:mb-4 lg:mb-6 flex items-center">
                    🎯 The Challenge
                  </h4>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                    {selectedProject.caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-3xl border-l-4 sm:border-l-6 border-blue-400 shadow-subtle">
                  <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mb-3 sm:mb-4 lg:mb-6 flex items-center">
                    🛠️ Our Solution
                  </h4>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                    {selectedProject.caseStudy.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-3xl border-l-4 sm:border-l-6 border-green-400 shadow-subtle">
                  <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 mb-4 sm:mb-6 lg:mb-8 flex items-center">
                    📈 Business Results
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {selectedProject.caseStudy.results.map((result, index) => (
                      <div key={index} className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-premium border border-green-200 hover:shadow-luxury transition-shadow duration-300">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange mb-2 sm:mb-3 lg:mb-4 font-serif">
                          {result.split(' ')[0]}
                        </div>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-semibold">
                          {result.split(' ').slice(1).join(' ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer - Mobile Optimized */}
              <div className="mt-6 sm:mt-8 lg:mt-12 pt-6 sm:pt-8 lg:pt-10 border-t border-gray-200 text-center">
                <button
                  onClick={closeCaseStudy}
                  className="btn-primary px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg w-full sm:w-auto touch-manipulation"
                  style={{ minHeight: '48px' }}
                >
                  Get <span className="text-white/90">Similar Results</span> for Your Business
                </button>
                <p className="text-sm sm:text-base text-gray-500 mt-3 sm:mt-4 font-medium px-2">
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