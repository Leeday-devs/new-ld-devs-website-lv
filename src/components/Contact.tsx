import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isRateLimited, sanitizeInput, isValidEmail, logSecureError } from "@/utils/security";
const Contact = () => {
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const contactInfo = [{
    icon: Mail,
    label: "Email",
    value: "LeeDayDevs@gmail.com",
    href: "mailto:LeeDayDevs@gmail.com"
  }, {
    icon: Phone,
    label: "Phone",
    value: "07586 266007",
    href: "tel:07586266007"
  }, {
    icon: MapPin,
    label: "Location",
    value: "3RD Floor 86-90, Paul Street, London EC2A 4NE",
    href: "#"
  }];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sanitize and validate inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name.trim()),
      email: sanitizeInput(formData.email.trim()),
      subject: sanitizeInput(formData.subject.trim()),
      message: sanitizeInput(formData.message.trim())
    };
    
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!isValidEmail(sanitizedData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    if (sanitizedData.message.length > 2000) {
      toast({
        title: "Error",
        description: "Message is too long. Please keep it under 2000 characters.",
        variant: "destructive"
      });
      return;
    }

    // Rate limiting
    if (isRateLimited(`contact-${sanitizedData.email}`, 3, 300000)) { // 5 minutes
      toast({
        title: "Error",
        description: "Too many attempts. Please wait 5 minutes before trying again.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Store in database
      const {
        error: dbError
      } = await supabase.from('contact_submissions').insert([sanitizedData]);
      if (dbError) throw dbError;

      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'contact',
          data: {
            name: sanitizedData.name,
            email: sanitizedData.email,
            subject: sanitizedData.subject,
            message: sanitizedData.message.substring(0, 200) + (sanitizedData.message.length > 200 ? '...' : '')
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
        // Don't throw error - form submission was successful
      }
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon!"
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error: any) {
      logSecureError('Contact form submission', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="section-navy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-primary heading-lg mb-6 text-white">
            Let's Build Something <span className="text-orange">Amazing</span>
          </h2>
          <p className="text-body text-white/80 max-w-3xl mx-auto">
            Ready to start your project? Get in touch and let's discuss how we can bring your <span className="text-orange font-semibold">vision to life</span>.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-luxury overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[400px] lg:min-h-[600px]">
              
              {/* Left Sidebar - Contact Info - Mobile Optimized */}
              <div className="lg:col-span-2 bg-navy p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="heading-primary heading-md text-white mb-8 font-bold">
                    Get in Touch
                  </h3>
                  
                  <div className="space-y-8">
                    {contactInfo.map((info) => (
                      <a
                        key={info.label}
                        href={info.href}
                        className="flex items-start gap-6 group transition-all duration-300 hover:transform hover:translate-x-2"
                      >
                        <div className="bg-orange/20 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:bg-orange/30 transition-all duration-300 group-hover:scale-110">
                          <info.icon className="h-7 w-7 text-orange" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-white/60 uppercase tracking-wider font-medium mb-2">
                            {info.label}
                          </div>
                          <div className="text-lg font-semibold text-white group-hover:text-orange transition-colors duration-300 leading-relaxed">
                            {info.value}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Response Box */}
                <div className="bg-navy/50 border border-orange/20 rounded-2xl p-8 mt-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-orange/20 rounded-full w-12 h-12 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-orange" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Quick Response</h4>
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    ⚡ We usually reply within <span className="text-orange font-semibold">1 hour</span> during business hours.
                  </p>
                </div>
              </div>

              {/* Right Side - Contact Form - Mobile Optimized */}
              <div className="lg:col-span-3 p-6 sm:p-8 lg:p-12">
                <div className="max-w-2xl">
                  <h3 className="heading-primary heading-md text-navy mb-8 font-bold">
                    Send us a <span className="text-orange">Message</span>
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3">
                        <label className="text-base font-semibold text-navy">
                          Full Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="premium-input"
                          maxLength={100}
                          required
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-base font-semibold text-navy">
                          Email Address *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className="premium-input"
                          maxLength={100}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-base font-semibold text-navy">
                        Subject
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's your project about?"
                        className="premium-input"
                        maxLength={200}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-base font-semibold text-navy">
                        Project Details *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                        className="premium-input min-h-32 resize-none"
                        maxLength={2000}
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary px-6 py-2.5 rounded-xl font-semibold text-sm md:text-base flex-1 group/btn relative overflow-hidden"
                      >
                        {/* Enhanced gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange via-orange/90 to-orange/80 group-hover/btn:from-orange/90 group-hover/btn:via-orange group-hover/btn:to-orange transition-all duration-300" />
                        
                        {/* Glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" style={{
                          boxShadow: '0 0 30px rgba(255, 122, 0, 0.5)'
                        }} />
                        
                        <span className="relative z-10">
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <Send className="mr-3 h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </span>
                      </Button>
                      
                      <Button
                        type="button"
                        onClick={() => {
                          const whatsappNumber = "447586266007";
                          const message = "Hi! I'm interested in your premium web development services.";
                          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                        className="btn-secondary px-6 py-2.5 rounded-xl font-semibold text-sm md:text-base flex-1"
                      >
                        <MessageCircle className="mr-3 h-5 w-5" />
                        WhatsApp
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;