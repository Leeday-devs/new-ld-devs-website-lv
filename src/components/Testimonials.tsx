import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 2,
      name: "William Egan", 
      company: "We Waste Ltd",
      role: "Owner",
      quote: "We have been using LD Web Development for years now, you wont get a better service! We recommend these guys to absolutely everyone.",
      rating: 5,
      website: "https://www.wewasteltd.co.uk",
      companyLogo: "/lovable-uploads/2b71c5d0-b143-4337-b814-e4dec0c11b15.png"
    },
    {
      id: 3,
      name: "Michael Webster",
      company: "Top Ranked Ltd", 
      role: "Owner",
      quote: "This company is excellent to work with. Our website turned out exactly as we envisioned, with a few additional suggestions from Lee that enhanced the final result beyond our expectations. The process was hassle-free and communication was very good throughout. I would highly recommend LD Development.",
      rating: 5,
      website: "https://www.top-ranked.co.uk",
      companyLogo: "/lovable-uploads/19b269ec-842e-4877-b1e5-6ceebd5f1ca0.png"
    },
    {
      id: 1,
      name: "Rachael Rawsthorne",
      company: "R&A Services",
      role: "CEO",
      quote: "Lee is fantastic! He is quick at responding and is always willing to try and find a solution to the problem, even if that means creating his own software/platform. We have been throughly impressed with Lee's work and very grateful for all his help. Highly recommend!",
      rating: 5,
      website: "https://randaservices.co.uk/",
      companyLogo: "/lovable-uploads/f141e9f1-24b0-4a3b-878f-eb3a29003a7e.png"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-scroll every 5 seconds with swipe support
  useEffect(() => {
    const autoScroll = setInterval(nextSlide, 5000);
    return () => clearInterval(autoScroll);
  }, []);

  return (
    <section className="section-navy" aria-label="Client testimonials and reviews">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg spacing-section text-white">
            What Our <span className="text-highlight">Clients Say</span>
          </h2>
          <p className="text-body max-w-3xl mx-auto text-white/80">
            Don't just take our word for it. Here's what our <span className="text-highlight font-semibold">satisfied clients</span> have to say about working with us
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="card-premium p-8 flex flex-col h-[480px]"
            >
              {/* Large Orange Quote Mark */}
              <div className="text-6xl text-highlight font-serif leading-none mb-6">
                "
              </div>
              
              {/* Rating Stars (Orange) */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-highlight fill-highlight mr-1" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-8 flex-grow leading-relaxed text-base">
                "{testimonial.quote}"
              </blockquote>

              {/* Client Info - Fixed at bottom */}
              <div className="flex items-end justify-between mt-auto">
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-base mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}, {testimonial.website ? (
                      <a 
                        href={testimonial.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-highlight transition-colors underline"
                      >
                        {testimonial.company}
                      </a>
                    ) : testimonial.company}
                  </div>
                </div>
                {testimonial.companyLogo && (
                  <div className="flex-shrink-0 ml-4">
                    <img 
                      src={testimonial.companyLogo} 
                      alt={`${testimonial.company} logo`}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
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
              {/* Large Orange Quote Mark */}
              <div className="text-6xl text-highlight font-serif leading-none mb-6">
                "
              </div>
              
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-highlight fill-highlight mr-1" />
                ))}
              </div>

              <blockquote className="text-gray-700 mb-8 leading-relaxed text-base">
                "{testimonials[currentSlide].quote}"
              </blockquote>

              <div className="flex items-end justify-between">
                <div>
                  <div className="font-bold text-gray-900 text-base mb-1">
                    {testimonials[currentSlide].name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonials[currentSlide].role}, {testimonials[currentSlide].website ? (
                      <a 
                        href={testimonials[currentSlide].website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-highlight transition-colors underline"
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
                    className="h-12 w-auto object-contain ml-4"
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
                  index === currentSlide ? 'bg-highlight' : 'bg-white/30 border-2 border-highlight'
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