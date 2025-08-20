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
    <section className="section-dark py-20" aria-label="Client testimonials and reviews">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="heading-luxury heading-lg mb-6 text-on-dark">
            What Our <span className="text-gold">Clients Say</span>
          </h2>
          <p className="text-luxury text-on-dark max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about our services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-luxury bg-luxury group"
            >
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-gold fill-current" />
                ))}
              </div>
              <blockquote className="text-primary mb-8 leading-relaxed text-lg italic">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-bg-premium rounded-full flex items-center justify-center mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-primary text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-muted-luxury">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;