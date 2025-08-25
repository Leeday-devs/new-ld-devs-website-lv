import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Rachael Rawsthorne",
      company: "R&A Services",
      role: "CEO",
      quote: "Lee is fantastic! He is quick at responding and is always willing to try and find a solution to the problem, even if that means creating his own software/platform. We have been throughly impressed with Lee's work and very grateful for all his help. Highly recommend!",
      rating: 5,
      website: "https://randaservices.co.uk/",
      companyLogo: "/lovable-uploads/f141e9f1-24b0-4a3b-878f-eb3a29003a7e.png"
    },
    {
      id: 2,
      name: "William Egan", 
      company: "We Waste Ltd",
      role: "Owner",
      quote: "Hosting Easy host our website and social media. They are the best company we have ever worked with for this service and we highly recommend them to everyone. Value for money and a five star service!",
      rating: 5,
      website: "https://www.wewasteltd.co.uk",
      companyLogo: "/lovable-uploads/2b71c5d0-b143-4337-b814-e4dec0c11b15.png"
    },
    {
      id: 3,
      name: "Emma Williams",
      company: "Creative Agency UK", 
      role: "Marketing Director",
      quote: "We went from 2 client inquiries per week to 20+. The website they built positions us as the premium choice in our market. Absolute game-changer.",
      rating: 5
    },
    {
      id: 4,
      name: "David Rodriguez",
      company: "Restaurant Deluxe",
      role: "Owner",
      quote: "Our online orders increased by 300% after the new website launch. The booking system works flawlessly and customers love the modern design.",
      rating: 5
    },
    {
      id: 5,
      name: "Lisa Thompson",
      company: "Fitness Pro Studio",
      role: "Founder",
      quote: "The member portal and class booking system streamlined our entire operation. We've saved 20 hours per week admin tasks.",
      rating: 5
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-navy py-20" aria-label="Client testimonials and reviews">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-white">
            What Our <span className="text-orange">Clients Say</span>
          </h2>
          <p className="text-body max-w-3xl mx-auto text-white/80">
            Don't just take our word for it. Here's what our <span className="text-orange font-semibold">satisfied clients</span> have to say about working with us
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="card-premium p-8"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-orange mb-6" />
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-orange fill-orange" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-body mb-8">
                "{testimonial.quote}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-navy text-base">
                    {testimonial.name}
                  </div>
                  <div className="text-text-secondary text-sm">
                    {testimonial.role}, {testimonial.website ? (
                      <a 
                        href={testimonial.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-orange transition-colors underline"
                      >
                        {testimonial.company}
                      </a>
                    ) : testimonial.company}
                  </div>
                </div>
                {testimonial.companyLogo && (
                  <img 
                    src={testimonial.companyLogo} 
                    alt={`${testimonial.company} logo`}
                    className="h-12 w-auto object-contain"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative">
            {/* Testimonial Card */}
            <div className="card-premium p-8 mx-4">
              <Quote className="h-8 w-8 text-orange mb-6" />
              
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-orange fill-orange" />
                ))}
              </div>

              <blockquote className="text-body mb-8">
                "{testimonials[currentSlide].quote}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-navy text-base">
                    {testimonials[currentSlide].name}
                  </div>
                  <div className="text-text-secondary text-sm">
                    {testimonials[currentSlide].role}, {testimonials[currentSlide].website ? (
                      <a 
                        href={testimonials[currentSlide].website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-orange transition-colors underline"
                      >
                        {testimonials[currentSlide].company}
                      </a>
                    ) : testimonials[currentSlide].company}
                  </div>
                </div>
                {testimonials[currentSlide].companyLogo && (
                  <img 
                    src={testimonials[currentSlide].companyLogo} 
                    alt={`${testimonials[currentSlide].company} logo`}
                    className="h-12 w-auto object-contain"
                  />
                )}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-navy" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-navy" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-orange' : 'bg-white/30 border-2 border-orange'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;