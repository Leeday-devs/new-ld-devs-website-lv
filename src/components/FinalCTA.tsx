import { ArrowRight, Star } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="section-navy py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h2 className="heading-primary text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Ready to Build Something
            <span className="block text-gold mt-2">
              Extraordinary?
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful businesses who trust us to create 
            websites that not only look amazing but deliver real results.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-white/70">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-gold fill-gold" />
              <span className="font-medium">5-Star Rated</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="font-medium">250+ Happy Clients</div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="font-medium">99.9% Uptime</div>
          </div>

          {/* Email Input and CTA */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-lg"
              />
              <button 
                className="bg-gold hover:bg-gold/90 text-navy font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-2xl hover:shadow-gold/20 inline-flex items-center gap-3 whitespace-nowrap"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <p className="text-white/60 text-sm">
            Free consultation • No obligation • Quick response
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;