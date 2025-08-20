import { Shield, Star, Award, CheckCircle, Users, Zap } from "lucide-react";

const TrustBadges = () => {
  const clients = [
    { name: "TechCorp", logo: "https://via.placeholder.com/120x60/0a192f/d4af37?text=TechCorp" },
    { name: "InnovateCo", logo: "https://via.placeholder.com/120x60/0a192f/d4af37?text=InnovateCo" },
    { name: "StartupX", logo: "https://via.placeholder.com/120x60/0a192f/d4af37?text=StartupX" },
    { name: "GrowthLab", logo: "https://via.placeholder.com/120x60/0a192f/d4af37?text=GrowthLab" },
    { name: "ScaleUp", logo: "https://via.placeholder.com/120x60/0a192f/d4af37?text=ScaleUp" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Client Logos */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-muted-foreground mb-8">
            Trusted by Leading UK Businesses
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-80 transition-opacity duration-300">
            {clients.map((client, index) => (
              <img
                key={client.name}
                src={client.logo}
                alt={`${client.name} logo`}
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center group">
            <div className="bg-gradient-card p-6 rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="font-bold text-foreground mb-1">SSL Secured</h4>
              <p className="text-sm text-muted-foreground">Bank-level security</p>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-card p-6 rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6 text-secondary fill-secondary" />
              </div>
              <h4 className="font-bold text-foreground mb-1">5.0 Rating</h4>
              <p className="text-sm text-muted-foreground">Google Reviews</p>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-card p-6 rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="font-bold text-foreground mb-1">Certified</h4>
              <p className="text-sm text-muted-foreground">Google Partner</p>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-card p-6 rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="font-bold text-foreground mb-1">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">UK-based team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;