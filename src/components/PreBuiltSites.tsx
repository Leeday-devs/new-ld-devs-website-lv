import { Globe, CheckCircle, Zap, Palette, Code2, Wrench } from "lucide-react";

const PreBuiltSites = () => {
  const preBuiltSites = [
    {
      icon: Globe,
      title: "Pre-Built Website Templates",
      description: "Ready-to-launch websites designed for various industries. Professional, modern, and fully customizable to match your brand.",
      features: ["Industry-Specific Designs", "Mobile Responsive", "SEO Optimized", "Easy Customization", "Quick Launch"]
    },
    {
      icon: Zap,
      title: "Express Launch Package",
      description: "Get online in 24-48 hours with our pre-designed templates. Perfect for businesses that need a professional presence fast.",
      features: ["48-Hour Setup", "Content Integration", "Basic SEO Setup", "Contact Forms", "Social Media Links"]
    },
    {
      icon: Palette,
      title: "Design Customization",
      description: "Modify colors, fonts, and layouts to perfectly match your brand identity while keeping the proven structure.",
      features: ["Brand Color Integration", "Logo Placement", "Font Selection", "Layout Adjustments", "Image Optimization"]
    },
    {
      icon: Code2,
      title: "Modern Technology Stack",
      description: "Built with the latest web technologies ensuring fast loading times, security, and excellent user experience.",
      features: ["React Framework", "Mobile-First Design", "Fast Loading", "SSL Security", "Cloud Hosting"]
    },
    {
      icon: Wrench,
      title: "Easy Content Management",
      description: "Update your content easily with our user-friendly content management system. No technical knowledge required.",
      features: ["Drag & Drop Editor", "Image Gallery", "Blog System", "Contact Management", "Analytics Dashboard"]
    }
  ];

  return (
    <section id="prebuilt-sites" className="section-light py-20" aria-label="Pre-built website templates">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-navy">
            <span className="text-orange">Pre-Built</span> Website Solutions
          </h2>
          <p className="text-body max-w-3xl mx-auto text-text-secondary">
            Launch your professional website quickly with our carefully crafted, industry-specific templates
          </p>
        </div>

        {/* Pre-Built Sites Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {preBuiltSites.map((site, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="mb-6">
                <site.icon className="h-12 w-12 text-orange" />
              </div>

              {/* Title */}
              <h3 className="heading-primary heading-md mb-4 text-navy">
                {site.title}
              </h3>

              {/* Description */}
              <p className="text-body mb-6 text-text-secondary">
                {site.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {site.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-text-secondary text-sm">
                    <CheckCircle className="h-4 w-4 text-orange mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button 
            className="btn-primary px-10 py-4 text-lg font-semibold rounded-2xl mr-4"
            onClick={() => window.location.href = '/website-templates'}
          >
            View Templates
          </button>
          <button 
            className="btn-secondary px-10 py-4 text-lg font-semibold rounded-2xl"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default PreBuiltSites;