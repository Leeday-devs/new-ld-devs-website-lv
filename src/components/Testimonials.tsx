import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStart Solutions",
      role: "CEO",
      quote: "Lee Day Devs transformed our entire business. Our conversion rate increased by 400% in just 3 months. The results speak for themselves.",
      rating: 5,
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen", 
      company: "E-Commerce Empire",
      role: "Founder",
      quote: "From £50K to £200K monthly revenue in 6 months. Their e-commerce platform doesn't just look amazing—it sells. The ROI has been incredible.",
      rating: 5,
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emma Williams",
      company: "Creative Agency UK", 
      role: "Marketing Director",
      quote: "We went from 2 client inquiries per week to 20+. The website they built positions us as the premium choice in our market. Absolute game-changer.",
      rating: 5,
      avatar: "EW"
    },
    {
      id: 4,
      name: "David Rodriguez",
      company: "Restaurant Deluxe",
      role: "Owner",
      quote: "Our online orders increased by 300% after the new website launch. The booking system works flawlessly and customers love the modern design.",
      rating: 5,
      avatar: "DR"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      company: "Fitness Pro Studio",
      role: "Founder",
      quote: "The member portal and class booking system streamlined our entire operation. We've saved 20 hours per week on admin tasks.",
      rating: 5,
      avatar: "LT"
    },
    {
      id: 6,
      name: "James Wilson",
      company: "Legal Associates",
      role: "Partner",
      quote: "Professional, responsive, and delivered exactly what we needed. Our new website has significantly improved our credibility with potential clients.",
      rating: 5,
      avatar: "JW"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-grey py-20" aria-label="Client testimonials and reviews">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-navy">
            What Our <span className="text-orange">Clients Say</span>
          </h2>
          <p className="text-body max-w-3xl mx-auto text-text-secondary">
            Don't just take our word for it. Here's what our satisfied clients have to say about working with us
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
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
              <blockquote className="text-text-secondary leading-relaxed mb-8 text-lg">
                "{testimonial.quote}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-navy text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-text-muted text-sm">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative">
            {/* Testimonial Card */}
            <div className="bg-white rounded-xl p-8 shadow-sm mx-4">
              <Quote className="h-8 w-8 text-orange mb-6" />
              
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-orange fill-orange" />
                ))}
              </div>

              <blockquote className="text-text-secondary leading-relaxed mb-8 text-lg">
                "{testimonials[currentSlide].quote}"
              </blockquote>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonials[currentSlide].avatar}
                </div>
                <div>
                  <div className="font-semibold text-navy text-lg">
                    {testimonials[currentSlide].name}
                  </div>
                  <div className="text-text-muted text-sm">
                    {testimonials[currentSlide].role}, {testimonials[currentSlide].company}
                  </div>
                </div>
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
                  index === currentSlide ? 'bg-orange' : 'bg-bg-grey border-2 border-orange'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="heading-primary text-2xl mb-4 text-navy">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-text-secondary mb-6">
              Let's create something amazing together and get results like these.
            </p>
            <button 
              className="bg-orange hover:bg-orange/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Success Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;