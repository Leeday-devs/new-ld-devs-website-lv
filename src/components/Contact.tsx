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
    phone: "",
    projectGoals: "",
    budgetRange: "",
    timeline: ""
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
      phone: sanitizeInput(formData.phone.trim()),
      projectGoals: sanitizeInput(formData.projectGoals.trim()),
      budgetRange: sanitizeInput(formData.budgetRange.trim()),
      timeline: sanitizeInput(formData.timeline.trim())
    };
    
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.projectGoals) {
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

    if (sanitizedData.projectGoals.length > 2000) {
      toast({
        title: "Error",
        description: "Project goals is too long. Please keep it under 2000 characters.",
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
      // Store in database - map new fields to existing table structure
      const dbData = {
        name: sanitizedData.name,
        email: sanitizedData.email,
        subject: `Budget: ${sanitizedData.budgetRange} | Timeline: ${sanitizedData.timeline}`,
        message: `Project Goals: ${sanitizedData.projectGoals}\n\nPhone: ${sanitizedData.phone || 'Not provided'}\nBudget Range: ${sanitizedData.budgetRange || 'Not specified'}\nTimeline: ${sanitizedData.timeline || 'Not specified'}`
      };
      
      const {
        error: dbError
      } = await supabase.from('contact_submissions').insert([dbData]);
      if (dbError) throw dbError;

      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'contact',
          data: {
            name: sanitizedData.name,
            email: sanitizedData.email,
            phone: sanitizedData.phone,
            projectGoals: sanitizedData.projectGoals.substring(0, 200) + (sanitizedData.projectGoals.length > 200 ? '...' : ''),
            budgetRange: sanitizedData.budgetRange,
            timeline: sanitizedData.timeline
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
        // Don't throw error - form submission was successful
      }
      
      toast({
        title: "Thanks—I'll reply personally, usually the same day.",
        description: "Your message has been sent directly to Lee!"
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectGoals: "",
        budgetRange: "",
        timeline: ""
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
            Work With Me <span className="text-orange">Directly</span>
          </h2>
          <p className="text-body text-white/80 max-w-3xl mx-auto">
            Tell me what you need—your message comes straight to me.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-luxury overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[400px] lg:min-h-[600px]">
              
              {/* Left Sidebar - Direct Line Info - Mobile Optimized */}
              <div className="lg:col-span-2 bg-navy p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="heading-primary heading-md text-white mb-8 font-bold">
                    Direct Line
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

                {/* Direct Contact Box */}
                <div className="bg-navy/50 border border-orange/20 rounded-2xl p-8 mt-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-orange/20 rounded-full w-12 h-12 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-orange" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Prefer a quick chat?</h4>
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-3">
                    Call <span className="text-orange font-semibold">07586 266007</span>
                  </p>
                  <p className="text-white/60 text-sm">
                    No sales team—just me.
                  </p>
                </div>
              </div>

              {/* Right Side - Contact Form - Mobile Optimized */}
              <div className="lg:col-span-3 p-6 sm:p-8 lg:p-12">
                <div className="max-w-2xl">
                  <h3 className="heading-primary heading-md text-navy mb-8 font-bold">
                    Send to <span className="text-orange">Lee</span>
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3">
                        <label className="text-base font-semibold text-navy">
                          Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className="premium-input"
                          maxLength={100}
                          required
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-base font-semibold text-navy">
                          Email *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="premium-input"
                          maxLength={100}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-base font-semibold text-navy">
                        Phone (optional)
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                        className="premium-input"
                        maxLength={20}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-base font-semibold text-navy">
                        Project Goals *
                      </label>
                      <Textarea
                        name="projectGoals"
                        value={formData.projectGoals}
                        onChange={handleInputChange}
                        placeholder="Tell me what you're looking to achieve..."
                        className="premium-input min-h-32 resize-none"
                        maxLength={2000}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3">
                        <label className="text-base font-semibold text-navy">
                          Budget Range
                        </label>
                        <Input
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleInputChange}
                          placeholder="e.g., £1,000-£3,000"
                          className="premium-input"
                          maxLength={50}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-base font-semibold text-navy">
                          Timeline
                        </label>
                        <Input
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          placeholder="e.g., 2-3 weeks"
                          className="premium-input"
                          maxLength={50}
                        />
                      </div>
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
                              Sending to Lee...
                            </>
                          ) : (
                            <>
                              <Send className="mr-3 h-5 w-5" />
                              Send to Lee
                            </>
                          )}
                        </span>
                      </Button>
                      
                      <Button
                        type="button"
                        onClick={() => {
                          const whatsappNumber = "447586266007";
                          const message = "Hi Lee! I'm interested in your web development services.";
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