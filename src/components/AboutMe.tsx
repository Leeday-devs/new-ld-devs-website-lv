import { MapPin, MessageCircle, User } from "lucide-react";
import leeHeadshot from "../assets/lee-headshot.jpg";
const AboutMe = () => {
  return <section className="bg-transparent py-20 large-section" aria-label="About Lee - Web Developer">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-text-secondary/70 font-medium text-sm sm:text-base mb-4 tracking-wide">
            London-based Team • Websites • Apps • AI Tools
          </p>
          <h2 className="heading-primary heading-lg mb-6 text-navy">
            Meet <span className="text-orange">Our Team</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-orange to-orange/80 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Photo Card */}
                <div className="relative w-80 h-96 bg-gradient-to-br from-navy/10 to-purple-900/10 rounded-3xl border border-orange/20 shadow-luxury overflow-hidden">
                  <img src={leeHeadshot} alt="Lee and his wife - Freelance Web Developer from London" className="absolute inset-0 w-full h-full object-cover" />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange/5 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="text-center lg:text-left">
              <div className="space-y-6 mb-8">
                <p className="text-body text-lg leading-relaxed text-text-secondary">Hi, I'm Lee, the founder of LD Development. Together with my small team, we work directly with businesses and startups to create everything from websites and apps to AI automations &amp; tools that save time, build trust, and help your business grow.</p>
                <p className="text-body text-lg leading-relaxed text-text-secondary">
                  That's me in the photo with my wife—my biggest supporter. We keep our process simple: clear communication, fast turnarounds, and solutions that deliver a premium finish without the agency price tag.
                </p>
              </div>

              {/* Stats Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8 mb-6">
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

              {/* Transparency Line */}
              <div className="text-center lg:text-left">
                <p className="text-sm text-text-secondary/70 font-medium">
                  Registered company: Hosting Easy Ltd, London.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutMe;