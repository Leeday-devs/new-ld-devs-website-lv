import { Star, Quote } from "lucide-react";

const TestimonialsCarousel = () => {
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
    }
  ];

  return (
    <section className="bg-navy py-20 relative overflow-hidden" aria-label="Client testimonials and reviews">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff7a00' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-white">
            What Our <span className="text-orange">Clients Say</span>
          </h2>
          <p className="text-body max-w-3xl mx-auto text-white/80">
            Don't just take our word for it. Here's what our <span className="text-orange font-semibold">satisfied clients</span> have to say about working with us
          </p>
        </div>

        {/* Three Card Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card-premium p-8 flex flex-col justify-between min-h-[420px] group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Quote Icon with glow */}
                <div className="relative">
                  <Quote className="h-8 w-8 text-orange mb-6 transition-all duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-orange/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Rating Stars */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5 text-orange fill-orange transition-all duration-300 hover:scale-110" 
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-body mb-8 flex-grow relative">
                  {/* Faint logo background */}
                  {testimonial.companyLogo && (
                    <img 
                      src={testimonial.companyLogo} 
                      alt=""
                      className="absolute right-0 top-0 h-16 w-auto object-contain opacity-5 pointer-events-none"
                    />
                  )}
                  <span className="relative z-10">"{testimonial.quote}"</span>
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center justify-between mt-auto">
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
                      className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-110"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;