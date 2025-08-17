import { Mail, Phone, MapPin, Github, Linkedin, Star, Shield, Award, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      "Web Hosting",
      "Web Development", 
      "AI Tools",
      "Blog"
    ],
    contact: [
      { icon: Phone, text: "07586 266007", href: "tel:07586266007" },
      { icon: Mail, text: "LeeDayDevs@gmail.com", href: "mailto:LeeDayDevs@gmail.com" },
      { icon: MapPin, text: "3RD Floor 86-90, Paul Street, London EC2A 4NE", href: "#" }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-background via-background/98 to-primary/5 border-t border-border/50 shadow-premium">
      <div className="container mx-auto px-4 py-20">
        {/* Premium Trust Bar */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-16 p-6 bg-gradient-primary rounded-2xl text-white shadow-premium">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-left">
              <div className="font-bold">5.0 Google Rating</div>
              <div className="text-xs opacity-90">From 47+ Reviews</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <div className="text-left">
              <div className="font-bold">Google Certified</div>
              <div className="text-xs opacity-90">Partner Status</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6" />
            <div className="text-left">
              <div className="font-bold">Quality Focused</div>
              <div className="text-xs opacity-90">Every Project Matters</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-12">
          {/* Premium Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/ad9d84ce-4f33-408f-a0e5-a6439e818048.png" 
                alt="LD Development - Premium Web Development Company" 
                className="w-16 h-16 object-contain hover-scale"
              />
              <div>
                <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">LD Development</span>
                <div className="text-sm text-muted-foreground font-medium">Premium Web Development Excellence</div>
              </div>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed">
              Transforming businesses through cutting-edge web development, exceptional design, and innovative digital solutions. Your trusted partner for premium online experiences.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center hover-lift shadow-button transition-smooth"
              >
                <Github className="h-6 w-6 text-white" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center hover-lift shadow-button transition-smooth"
              >
                <Linkedin className="h-6 w-6 text-white" />
              </a>
              <a
                href="mailto:LeeDayDevs@gmail.com"
                className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center hover-lift shadow-button transition-smooth"
              >
                <Mail className="h-6 w-6 text-white" />
              </a>
            </div>
          </div>

          {/* Premium Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-foreground flex items-center gap-2">
              Our Services
              <div className="w-8 h-0.5 bg-gradient-primary"></div>
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((service, index) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-muted-foreground hover:text-primary transition-smooth font-medium flex items-center gap-2 group animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-foreground flex items-center gap-2">
              Get In Touch
              <div className="w-8 h-0.5 bg-gradient-secondary"></div>
            </h3>
            <ul className="space-y-4">
              {footerLinks.contact.map((contact, index) => (
                <li key={contact.text}>
                  <a
                    href={contact.href}
                    className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-smooth font-medium group animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                      <contact.icon className="h-4 w-4 flex-shrink-0" />
                    </div>
                    <span className="text-sm leading-relaxed">{contact.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-foreground flex items-center gap-2">
              Quick Links
              <div className="w-8 h-0.5 bg-gradient-accent"></div>
            </h3>
            <div className="space-y-3">
              <a href="#portfolio" className="block text-muted-foreground hover:text-primary transition-smooth font-medium">Portfolio</a>
              <a href="#testimonials" className="block text-muted-foreground hover:text-primary transition-smooth font-medium">Reviews</a>
              <a href="/blog" className="block text-muted-foreground hover:text-primary transition-smooth font-medium">Blog</a>
              <a href="/templates" className="block text-muted-foreground hover:text-primary transition-smooth font-medium">Templates</a>
            </div>
          </div>

          {/* Premium Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-foreground flex items-center gap-2">
              Support
              <div className="w-8 h-0.5 bg-gradient-primary"></div>
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-card rounded-xl border border-border/30 hover-lift">
                <div className="text-sm font-semibold text-foreground mb-1">24/7 Support</div>
                <div className="text-xs text-muted-foreground">We're always here to help</div>
              </div>
              <div className="p-4 bg-gradient-card rounded-xl border border-border/30 hover-lift">
                <div className="text-sm font-semibold text-foreground mb-1">Free Consultation</div>
                <div className="text-xs text-muted-foreground">Let's discuss your project</div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Bottom Bar */}
        <div className="border-t border-border/30 mt-16 pt-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <div className="text-foreground font-semibold mb-2">© {currentYear} LD Development</div>
              <div className="text-muted-foreground text-sm">Part of Hosting Easy Ltd | UK Registered Company</div>
              <div className="text-muted-foreground text-xs mt-1">Company Number: 15169743</div>
            </div>
            
            <div className="flex flex-wrap gap-8 items-center">
              <div className="flex gap-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  Privacy Policy
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  Terms of Service
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  Cookie Policy
                </a>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>SSL Secured</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border/20 text-center">
            <p className="text-xs text-muted-foreground">
              Crafted with passion in the UK 🇬🇧 | Trusted by businesses worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;