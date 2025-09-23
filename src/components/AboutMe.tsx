import { MapPin, MessageCircle, User } from "lucide-react";

const AboutMe = () => {
  return (
    <section className="bg-transparent py-20" aria-label="About Lee - Web Developer">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-navy">
            About <span className="text-orange">Me</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Headshot Placeholder */}
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange to-orange/80 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Headshot Card */}
                <div className="relative w-64 h-64 bg-gradient-to-br from-navy/10 to-purple-900/10 rounded-full border border-orange/20 shadow-luxury overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="h-32 w-32 text-orange/40" />
                  </div>
                  {/* Placeholder for actual headshot */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange/5 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="space-y-6 mb-8">
                <p className="text-body text-lg leading-relaxed text-text-secondary">
                  Hi, I'm Lee. I've worked in web and tech since I was 13, and I help small businesses across London and beyond get premium websites without the big-agency runaround.
                </p>
                <p className="text-body text-lg leading-relaxed text-text-secondary">
                  When you work with me, you get direct communication, fast iterations, and a site that looks and performs like it costs £10k—at a fair price.
                </p>
              </div>

              {/* Stats Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8">
                <div className="flex items-center space-x-2 text-navy">
                  <MapPin className="h-5 w-5 text-orange" />
                  <span className="font-semibold">London-based</span>
                </div>
                <div className="flex items-center space-x-2 text-navy">
                  <MessageCircle className="h-5 w-5 text-orange" />
                  <span className="font-semibold">Fast replies</span>
                </div>
                <div className="flex items-center space-x-2 text-navy">
                  <User className="h-5 w-5 text-orange" />
                  <span className="font-semibold">1-to-1 work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;