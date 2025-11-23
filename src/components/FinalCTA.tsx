import { ArrowRight, Star } from "lucide-react";

const FinalCTA = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-navy relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Headline */}
          <h2 className="heading-primary heading-lg mb-6 text-white">
            Ready to <span className="text-orange">Get Started</span>?
          </h2>

          {/* Subheading */}
          <p className="text-body max-w-2xl mx-auto text-white/80 mb-8">
            Let's talk about your project. We respond within 24 hours.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-8 text-white/70 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 md:h-5 md:w-5 text-orange fill-orange" />
              <span className="font-medium">5 Star Rated</span>
            </div>
            <div className="w-px h-5 bg-white/20 hidden sm:block"></div>
            <div className="font-medium">50+ Projects</div>
            <div className="w-px h-5 bg-white/20 hidden sm:block"></div>
            <div className="font-medium">Quick Response</div>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToContact}
            className="bg-orange hover:bg-orange/90 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-2xl hover:shadow-orange/20 inline-flex items-center gap-3"
          >
            Get in Touch
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
