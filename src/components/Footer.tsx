import { Facebook, Mail, Phone, MapPin, ArrowRight, Shield, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Premium Trust Bar */}
      <div className="border-b border-primary-glow/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">5.0 Google Rating</span>
            </div>
            <div className="text-muted">•</div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-secondary" />
              <span className="font-semibold">Google Certified Partner</span>
            </div>
            <div className="text-muted">•</div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-secondary" />
              <span className="font-semibold">450+ Projects Delivered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-3xl font-black font-serif text-secondary">LD Development</h3>
              <p className="text-primary-foreground/80 leading-relaxed text-lg">
                Building legendary websites that transform businesses and deliver exceptional results for our clients across the UK.
              </p>
              
              {/* Newsletter Signup */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-secondary">Join 1,000+ Smart Business Owners</h4>
                <p className="text-primary-foreground/70 text-sm">Get exclusive web development tips and industry insights delivered to your inbox.</p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  />
                  <Button type="submit" className="bg-secondary hover:bg-secondary-glow text-primary px-6">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              <div className="flex items-center gap-4">
                <Facebook className="h-6 w-6 text-secondary hover:text-secondary-glow transition-colors cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-secondary">Services</h4>
              <ul className="space-y-3">
                <li><a href="#services" className="text-primary-foreground/80 hover:text-secondary transition-colors hover:translate-x-1 inline-block">Web Development</a></li>
                <li><a href="#services" className="text-primary-foreground/80 hover:text-secondary transition-colors hover:translate-x-1 inline-block">E-commerce Solutions</a></li>
                <li><a href="#services" className="text-primary-foreground/80 hover:text-secondary transition-colors hover:translate-x-1 inline-block">AI Automation</a></li>
                <li><a href="#services" className="text-primary-foreground/80 hover:text-secondary transition-colors hover:translate-x-1 inline-block">Premium Hosting</a></li>
                <li><a href="#services" className="text-primary-foreground/80 hover:text-secondary transition-colors hover:translate-x-1 inline-block">24/7 Support</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-secondary">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                    <Phone className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/80 group-hover:text-secondary transition-colors">+44 7586 266007</div>
                    <div className="text-xs text-primary-foreground/60">24/7 Support Line</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                    <Mail className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/80 group-hover:text-secondary transition-colors">lee@leedaydevs.com</div>
                    <div className="text-xs text-primary-foreground/60">Get Free Quote</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <MapPin className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/80">London, UK</div>
                    <div className="text-xs text-primary-foreground/60">Serving UK-wide</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-secondary">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-primary-foreground/80 hover:text-secondary transition-colors hover:translate-x-1 inline-block">About Us</a></li>
                <li><a href="#portfolio" className="text-primary-foreground/80 hover:text-secondary transition-colors hover:translate-x-1 inline-block">Case Studies</a></li>
                <li><a href="#contact" className="text-primary-foreground/80 hover:text-secondary transition-colors hover:translate-x-1 inline-block">Get Quote</a></li>
                <li><a href="/auth" className="text-primary-foreground/80 hover:text-secondary transition-colors hover:translate-x-1 inline-block">Client Portal</a></li>
                <li><a href="#faq" className="text-primary-foreground/80 hover:text-secondary transition-colors hover:translate-x-1 inline-block">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <div className="text-primary-foreground font-semibold mb-1">© {currentYear} LD Development</div>
              <div className="text-primary-foreground/70 text-sm">Part of Hosting Easy Ltd | UK Registered Company</div>
            </div>
            
            <div className="flex flex-wrap gap-6 items-center text-sm">
              <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Terms</a>
              <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Cookies</a>
              <div className="flex items-center gap-2 text-primary-foreground/60">
                <Shield className="h-3 w-3" />
                <span className="text-xs">SSL Secured</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-primary-foreground/10 text-center">
            <p className="text-xs text-primary-foreground/60">
              Crafted with passion in the UK 🇬🇧 | Trusted by businesses worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;