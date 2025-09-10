import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isRateLimited, sanitizeInput, isValidEmail, logSecureError } from "@/utils/security";
import { useIsMobile } from "@/hooks/use-mobile";

const Contact = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "LeeDayDevs@gmail.com",
      href: "mailto:LeeDayDevs@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone", 
      value: "07586 266007",
      href: "tel:07586266007"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "3RD Floor 86-90, Paul Street, London EC2A 4NE",
      href: "#"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

    if (isRateLimited(`contact-${sanitizedData.email}`, 3, 300000)) {
      toast({
        title: "Error",
        description: "Too many attempts. Please wait 5 minutes before trying again.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error: dbError } = await supabase.from('contact_submissions').insert([sanitizedData]);
      if (dbError) throw dbError;

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
      }
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon!"
      });

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
            Get Your Free <span className="text-orange">Quote Today</span>
          </h2>
          <p className="text-body text-white/80 max-w-3xl mx-auto">
            Ready to transform your business with premium web development? Contact London's leading web development agency and let's discuss your <span className="text-orange font-semibold">project requirements</span>.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-luxury overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[400px] lg:min-h-[600px]">
              
              {/* Left Sidebar - Contact Info */}
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

              {/* Right Side - Contact Form */}
              <div className="lg:col-span-3 p-6 sm:p-8 lg:p-12">
                <div className="max-w-2xl">
                  <h3 className="heading-primary heading-md text-navy mb-8 font-bold">
                    Send us a <span className="text-orange">Message</span>
                  </h3>
                  
                  {isMobile ? (
                    <div className="space-y-6">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '100%' }}></div>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Full Name *"
                          className="mobile-app-input"
                          required
                        />
                        
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email Address *"
                          className="mobile-app-input"
                          required
                        />
                        
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Subject"
                          className="mobile-app-input"
                        />
                        
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Project Details *"
                          className="mobile-app-input min-h-32"
                          required
                        />
                        
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="mobile-app-button"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-3 h-6 w-6" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Full Name *"
                          className="premium-input"
                          required
                        />
                        
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email Address *"
                          className="premium-input"
                          required
                        />
                      </div>
                      
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subject"
                        className="premium-input"
                      />
                      
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Project Details *"
                        className="premium-input min-h-32"
                        required
                      />
                      
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary px-8 py-3 rounded-xl font-semibold w-full"
                      >
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
                      </Button>
                    </form>
                  )}
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