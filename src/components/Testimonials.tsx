import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 1 }
      }
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
    },
    {
      id: 4,
      name: "Sarah Johnson",
      company: "Green Tech Solutions",
      role: "Marketing Director",
      quote: "Working with Lee was a game-changer for our business. He delivered a stunning website that perfectly captured our brand vision and significantly improved our online presence.",
      rating: 5,
      website: "#",
      companyLogo: null
    },
    {
      id: 5,
      name: "David Martinez",
      company: "Urban Fitness Studio",
      role: "Owner",
      quote: "The booking system Lee built for us has streamlined our operations completely. Our clients love the easy online scheduling, and we've seen a 40% increase in bookings.",
      rating: 5,
      website: "#",
      companyLogo: null
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="section-navy" aria-label="Client testimonials and reviews">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg spacing-section text-white">
            What My <span className="text-highlight">Clients Say</span>
          </h2>
          <p className="text-body max-w-3xl mx-auto text-white/80">
            Don't just take my word for it. Here's what my <span className="text-highlight font-semibold">satisfied clients</span> have to say about working with me
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="testimonials-carousel relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                >
                  <div className="card-premium p-8 flex flex-col h-[480px]">
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
                          {testimonial.role}, {testimonial.website && testimonial.website !== "#" ? (
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
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={scrollPrev}
              className="bg-white rounded-full p-3 shadow-luxury hover:shadow-premium transition-all duration-300 hover:scale-110 group"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-6 w-6 text-navy group-hover:text-highlight transition-colors" />
            </button>
            
            <button
              onClick={scrollNext}
              className="bg-white rounded-full p-3 shadow-luxury hover:shadow-premium transition-all duration-300 hover:scale-110 group"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-6 w-6 text-navy group-hover:text-highlight transition-colors" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex 
                    ? 'bg-highlight scale-125 shadow-glow' 
                    : 'bg-white/30 border-2 border-highlight hover:bg-white/50 hover:scale-110'
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