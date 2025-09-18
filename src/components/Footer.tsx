import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Shield, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: email.trim() }]);

      if (error) throw error;

      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'newsletter_signup',
          data: {
            email: email.trim(),
            source: 'footer'
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
      }

      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter!",
      });
      
      setEmail("");
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="section-navy text-white">
      {/* Premium Trust Bar - Mobile Optimized */}
      <div className="border-b border-white/10 py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-gold text-gold" />
                ))}
              </div>
              <span className="font-semibold text-white text-sm sm:text-base">5.0 Google Rating</span>
            </div>
            <div className="text-white/60 hidden sm:block">•</div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-orange" />
              <span className="font-semibold text-white text-sm sm:text-base">Google Certified Partner</span>
            </div>
            <div className="text-white/60 hidden sm:block">•</div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-orange" />
              <span className="font-semibold text-white text-sm sm:text-base">450+ Projects Delivered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content - Mobile Optimized */}
      <div className="py-12 sm:py-14 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-7 lg:gap-8">
            {/* Company Info - Mobile Optimized */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-5 lg:space-y-6">
              <h3 className="text-2xl sm:text-3xl font-black font-serif text-white">LD Development</h3>
              <p className="text-white/80 leading-relaxed text-base sm:text-lg">
                Building legendary websites that transform businesses and deliver exceptional results for our clients across the UK.
              </p>
              
              {/* Newsletter Signup - Mobile Optimized */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-base sm:text-lg font-bold text-white">Join 1,000+ Smart Business Owners</h4>
                <p className="text-white/70 text-sm">Get exclusive web development tips and industry insights delivered to your inbox.</p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-orange focus:ring-orange text-sm sm:text-base flex-1"
                    style={{ minHeight: '44px' }}
                  />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-orange hover:bg-orange/90 text-white px-4 sm:px-6 touch-manipulation" 
                    style={{ minHeight: '44px' }}
                  >
                    {isSubmitting ? "..." : <ArrowRight className="h-4 w-4" />}
                  </Button>
                </form>
              </div>

              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/profile.php?id=61563893127712" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-6 w-6 text-white social-icon" />
                </a>
                <a href="https://twitter.com/leedaydevs" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-6 w-6 text-white social-icon" />
                </a>
                <a href="https://instagram.com/leedaydevs" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-6 w-6 text-white social-icon" />
                </a>
                <a href="https://linkedin.com/company/lddevelopment" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6 text-white social-icon" />
                </a>
              </div>
            </div>

            {/* Services - Mobile Optimized */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-white">Services</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#services" className="text-white/80 hover:text-orange transition-colors hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>Web Development</a></li>
                <li><a href="#services" className="text-white/80 hover:text-orange transition-colors hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>E-commerce Solutions</a></li>
                <li><a href="#services" className="text-white/80 hover:text-orange transition-colors hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>AI Automation</a></li>
                <li><a href="#services" className="text-white/80 hover:text-orange transition-colors hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>Premium Hosting</a></li>
                <li><a href="#services" className="text-white/80 hover:text-orange transition-colors hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>24/7 Support</a></li>
              </ul>
            </div>

            {/* Contact - Mobile Optimized */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-white">Contact Info</h4>
              <div className="space-y-4">
                <a href="tel:+447586266007" className="flex items-center gap-3 group cursor-pointer">
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-orange/20 transition-colors">
                    <Phone className="h-4 w-4 text-orange" />
                  </div>
                  <div>
                    <div className="text-white/80 group-hover:text-orange transition-colors">+44 7586 266007</div>
                    <div className="text-xs text-white/60">24/7 Support Line</div>
                  </div>
                </a>
                <a href="mailto:lee@leedaydevs.com?subject=Free Quote Request" className="flex items-center gap-3 group cursor-pointer">
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-orange/20 transition-colors">
                    <Mail className="h-4 w-4 text-orange" />
                  </div>
                  <div>
                    <div className="text-white/80 group-hover:text-orange transition-colors">lee@leedaydevs.com</div>
                    <div className="text-xs text-white/60">Contact Us</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <MapPin className="h-4 w-4 text-orange" />
                  </div>
                  <div>
                    <div className="text-white/80">London, UK</div>
                    <div className="text-xs text-white/60">Serving UK-wide</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links - Mobile Optimized */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-white">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#home" className="text-white/80 hover:text-orange transition-colors hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>About Us</a></li>
                <li><a href="#portfolio" className="text-white/80 hover:text-orange transition-colors hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>Case Studies</a></li>
                <li><a href="#contact" className="text-white/80 hover:text-orange transition-colors hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>Get Quote</a></li>
                <li><a href="/auth" className="text-white/80 hover:text-orange transition-colors hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>Client Portal</a></li>
                <li><a href="#faq" className="text-white/80 hover:text-orange transition-colors hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Mobile Optimized */}
      <div className="border-t border-white/10 py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <div className="text-white font-semibold mb-1 text-sm sm:text-base">© {currentYear} LD Development</div>
              <div className="text-white/70 text-xs sm:text-sm">Part of Hosting Easy Ltd | UK Registered Company</div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center text-xs sm:text-sm">
              <a href="/privacy-policy" className="text-white/70 hover:text-orange transition-colors touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>Privacy Policy</a>
              <a href="/terms" className="text-white/70 hover:text-orange transition-colors touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>Terms</a>
              <a href="/cookies" className="text-white/70 hover:text-orange transition-colors touch-manipulation" style={{ minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>Cookies</a>
              <div className="flex items-center gap-2 text-white/60">
                <Shield className="h-3 w-3" />
                <span className="text-xs">SSL Secured</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/60">
              Built, Hosted & Maintained by LD Development
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;