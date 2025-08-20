import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Play, Award, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const videoTestimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Solutions",
      role: "CEO",
      content: "Lee Day Devs didn't just build us a website—they transformed our entire business. Our conversion rate increased by 400% in just 3 months. The results speak for themselves.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=faces",
      results: "+400% Conversion Rate",
      videoThumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
      hasVideo: true
    },
    {
      name: "Michael Chen",
      company: "E-Commerce Empire",
      role: "Founder",
      content: "From £50K to £200K monthly revenue in 6 months. Their e-commerce platform doesn't just look amazing—it sells. The ROI has been incredible.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces",
      results: "£150K+ Revenue Increase",
      videoThumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      hasVideo: true
    },
    {
      name: "Emma Williams",
      company: "Creative Agency UK",
      role: "Marketing Director",
      content: "We went from 2 client inquiries per week to 20+. The website they built positions us as the premium choice in our market. Absolute game-changer.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces",
      results: "10x More Inquiries",
      videoThumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      hasVideo: true
    }
  ];

  const companyLogos = [
    { name: "TechStart Solutions", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
    { name: "E-Commerce Empire", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=60&fit=crop" },
    { name: "Creative Agency UK", logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&h=60&fit=crop" },
    { name: "Digital Marketing Pro", logo: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=120&h=60&fit=crop" },
    { name: "Innovation Labs", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop" },
    { name: "Future Tech", logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=120&h=60&fit=crop" }
  ];

  return (
    <section className="py-24 bg-gradient-testimonials relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Dark overlay for text readability */}  
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-texture-dots opacity-20"></div>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-6">
            <Award className="h-5 w-5 text-white" />
            <span className="text-white font-semibold">CLIENT SUCCESS STORIES</span>
          </div>
          
          <h2 className="text-heading text-heading-dark text-4xl md:text-6xl mb-6 text-shadow-dark">
            Real Results, Real Impact
          </h2>
          
          <p className="text-body text-body-dark text-xl max-w-3xl mx-auto leading-relaxed text-shadow-light">
            See how we've transformed businesses across the UK with websites that don't just look great—they deliver extraordinary results.
          </p>
          
          {/* Google Rating Display */}
          <div className="flex items-center justify-center gap-4 mt-8 p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 inline-flex">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
              alt="Google"
              className="h-8 w-8"
            />
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-secondary text-secondary" />
              ))}
            </div>
            <span className="text-lg font-bold text-white">5.0</span>
            <div className="text-white/70">•</div>
            <span className="text-white/90 font-medium">47+ Reviews</span>
          </div>
        </div>

        {/* Video Testimonials - White cards with orange/gold accents */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {videoTestimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white hover:shadow-gold transition-all duration-500 hover:scale-105 border border-secondary/20 group overflow-hidden">
              <CardContent className="p-0">
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={testimonial.videoThumbnail}
                    alt={`${testimonial.company} Success Story`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-accent opacity-50 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <button className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-secondary/90 rounded-full flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-10 w-10 text-primary ml-1" fill="currentColor" />
                    </div>
                  </button>
                  
                  {/* Results Badge - Orange accent */}
                  <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-bold shadow-elegant">
                    {testimonial.results}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  
                  <Quote className="h-8 w-8 text-accent mb-4" />
                  
                  <p className="text-body text-body-light mb-6 leading-relaxed text-lg">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name} - ${testimonial.role} at ${testimonial.company}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-secondary/20"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-bold text-heading-light text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-accent font-medium">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-muted-light">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Logos Strip */}
        <div className="mb-16">
          <h3 className="text-center text-2xl font-bold text-body-dark mb-8 text-shadow-light">
            Trusted by Leading UK Businesses
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-80 hover:opacity-100 transition-opacity duration-300">
            {companyLogos.map((company, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-12 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-body text-body-dark mb-4 text-shadow-light">
            Join our 150+ satisfied clients and transform your online presence with our expert web development services
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact"
              className="text-white hover:text-secondary font-medium underline underline-offset-4 text-shadow-light"
              title="Contact LD Development for web design consultation"
            >
              Get Your Free Consultation
            </a>
            <span className="text-white/70">•</span>
            <a 
              href="#services"
              className="text-white hover:text-secondary font-medium underline underline-offset-4 text-shadow-light"
              title="View our web development and hosting services"
            >
              View Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;