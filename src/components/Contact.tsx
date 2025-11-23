import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { isRateLimited, sanitizeInput, isValidEmail, logSecureError, isHoneypotFilled, containsSpamPatterns, isSubmissionTooFast } from "@/utils/security";
import { z } from 'zod';
// Zod validation schema for security
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone number must be less than 20 characters").optional(),
  projectGoals: z.string().trim().min(1, "Project goals cannot be empty").max(2000, "Project goals must be less than 2000 characters"),
  budgetRange: z.string().trim().max(50, "Budget range must be less than 50 characters").optional(),
  timeline: z.string().trim().max(50, "Timeline must be less than 50 characters").optional(),
  honeypot: z.string().optional() // Hidden field for bot detection
});

const Contact = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [showDetailedForm, setShowDetailedForm] = useState(false);
  const [quickMessage, setQuickMessage] = useState("");
  const [formStartTime] = useState(Date.now()); // Track form load time
  const [honeypot, setHoneypot] = useState(""); // Hidden field for bot detection
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
    value: "leedaydevs@gmail.com",
    href: "mailto:leedaydevs@gmail.com"
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
  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot detection checks
    if (isHoneypotFilled(honeypot)) {
      console.warn('Honeypot field filled - likely bot');
      toast({
        title: "Error",
        description: "Form submission failed",
        variant: "destructive"
      });
      return;
    }

    if (isSubmissionTooFast(formStartTime, 1)) {
      console.warn('Form submitted too quickly - likely bot');
      toast({
        title: "Error",
        description: "Please take a moment to fill out the form properly",
        variant: "destructive"
      });
      return;
    }

    if (!quickMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive"
      });
      return;
    }

    if (quickMessage.length > 1000) {
      toast({
        title: "Error",
        description: "Message is too long. Please keep it under 1000 characters.",
        variant: "destructive"
      });
      return;
    }

    // Check for spam patterns
    if (containsSpamPatterns(quickMessage)) {
      console.warn('Spam patterns detected in quick message');
      toast({
        title: "Error",
        description: "Your message contains content that was flagged as spam",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const sanitizedMessage = sanitizeInput(quickMessage.trim());
      
      const dbData = {
        name: "Quick Message User",
        email: "quickmessage@temp.com", 
        subject: "Quick Message from Website",
        message: sanitizedMessage
      };
      
      const { error: dbError } = await supabase.from('contact_submissions').insert([dbData]);
      if (dbError) throw dbError;

      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'contact',
          data: {
            name: "Quick Message",
            email: "quickmessage@temp.com",
            phone: "",
            projectGoals: sanitizedMessage,
            budgetRange: "",
            timeline: ""
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
        // Still show success since the message was saved to database
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you shortly."
      });

      setQuickMessage("");
    } catch (error: any) {
      logSecureError('Quick message submission', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot detection checks
    if (isHoneypotFilled(honeypot)) {
      console.warn('Honeypot field filled - likely bot');
      toast({
        title: "Error",
        description: "Form submission failed",
        variant: "destructive"
      });
      return;
    }

    if (isSubmissionTooFast(formStartTime, 2)) {
      console.warn('Form submitted too quickly - likely bot');
      toast({
        title: "Error",
        description: "Please take time to fill out the form properly",
        variant: "destructive"
      });
      return;
    }

    // Check for spam patterns in all fields
    const allText = `${formData.name} ${formData.email} ${formData.phone} ${formData.projectGoals} ${formData.budgetRange} ${formData.timeline}`;
    if (containsSpamPatterns(allText)) {
      console.warn('Spam patterns detected in form');
      toast({
        title: "Error",
        description: "Your message contains content that was flagged as spam",
        variant: "destructive"
      });
      return;
    }

    // Validate with Zod schema
    try {
      const validatedData = contactSchema.parse(formData);

      // Rate limiting
      if (isRateLimited(`contact-${validatedData.email}`, 3, 300000)) {
        toast({
          title: "Error",
          description: "Too many attempts. Please wait 5 minutes before trying again.",
          variant: "destructive"
        });
        return;
      }

      setIsLoading(true);
      
      // Store in database
      const dbData = {
        name: validatedData.name,
        email: validatedData.email,
        subject: `Budget: ${validatedData.budgetRange || 'Not specified'} | Timeline: ${validatedData.timeline || 'Not specified'}`,
        message: `Project Goals: ${validatedData.projectGoals}\n\nPhone: ${validatedData.phone || 'Not provided'}\nBudget Range: ${validatedData.budgetRange || 'Not specified'}\nTimeline: ${validatedData.timeline || 'Not specified'}`
      };
      
      const { error: dbError } = await supabase.from('contact_submissions').insert([dbData]);
      if (dbError) throw dbError;

      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'contact',
          data: {
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone || "",
            projectGoals: validatedData.projectGoals.substring(0, 200) + (validatedData.projectGoals.length > 200 ? '...' : ''),
            budgetRange: validatedData.budgetRange || "",
            timeline: validatedData.timeline || ""
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
      }
      
      toast({
        title: "Thanks—we'll reply personally, usually the same day.",
        description: "Your message has been sent to our team!"
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
      setShowDetailedForm(false);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive"
        });
      } else {
        logSecureError('Contact form submission', error);
        toast({
          title: "Error",
          description: "Failed to send message. Please check your connection and try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="section-navy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-primary heading-lg mb-4 sm:mb-6 text-white">
            Work With Us <span className="text-orange">Directly</span>
          </h2>
          <p className="text-body text-white/80 max-w-3xl mx-auto">
            Tell us what you need—your message comes straight to our team.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {isMobile ? (
            // Mobile: Enhanced Contact Card Layout
            <div className="space-y-6">
              {/* Main Contact Card */}
              <div className="bg-white text-text-primary rounded-3xl p-8 shadow-luxury overflow-hidden">
                {/* Header with Icon */}
                <div className="text-center mb-8">
                  <div className="bg-orange/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-10 w-10 text-orange" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-2">How would you like to connect?</h3>
                  <p className="text-navy/70">Choose your preferred way to get in touch</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 mb-8">
                  <Button
                    onClick={() => setShowDetailedForm(!showDetailedForm)}
                    className="btn-primary w-full min-h-[56px] text-lg font-bold rounded-2xl shadow-orange-glow"
                  >
                    <Mail className="mr-3 h-6 w-6" />
                    Get In Touch
                  </Button>
                  
                  <Button
                    onClick={() => {
                      const whatsappNumber = "447586266007";
                      const message = "Hi Lee! I'm interested in your web development services.";
                      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="w-full min-h-[56px] text-lg font-semibold rounded-2xl bg-green-500 hover:bg-green-600 text-white border-0 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                  >
                    <MessageCircle className="mr-3 h-6 w-6" />
                    WhatsApp Us
                  </Button>
                </div>

                {/* Contact Options */}
                <div className="grid grid-cols-2 gap-3">
                  {contactInfo.slice(0, 2).map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex flex-col items-center p-4 rounded-2xl bg-gray-50 hover:bg-orange/5 transition-all duration-300 group border border-gray-100 hover:border-orange/20"
                    >
                      <div className="bg-orange/10 rounded-full w-12 h-12 flex items-center justify-center mb-2 group-hover:bg-orange/20 transition-all duration-300">
                        <info.icon className="h-5 w-5 text-orange" />
                      </div>
                      <div className="text-xs font-medium mb-1 text-center text-text-secondary">
                        {info.label}
                      </div>
                      <div className="text-sm font-semibold text-center leading-tight text-text-primary">
                        {info.value}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Response Info */}
              <div className="bg-navy rounded-3xl p-6 shadow-luxury">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-orange/20 rounded-full w-12 h-12 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-orange" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Quick Response Guaranteed</h4>
                    <p className="text-white/70 text-sm">Usually within 2 hours</p>
                  </div>
                </div>
              </div>

              {/* Quick Message Form */}
              <div className="bg-white text-navy rounded-3xl p-6 shadow-luxury">
                <h3 className="text-xl font-bold text-navy mb-4">Quick Message</h3>
                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  <div className="relative">
                    <Textarea
                      value={quickMessage}
                      onChange={(e) => setQuickMessage(e.target.value)}
                      placeholder="Tell me about your project in a few words..."
                      className="premium-input min-h-[80px] resize-none"
                      maxLength={1000}
                      required
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-text-muted">
                      {quickMessage.length}/1000
                    </span>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full py-3 rounded-xl font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Quick Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Detailed Form - Collapsible */}
              <div className={`bg-white text-navy rounded-3xl shadow-luxury overflow-hidden transition-all duration-500 ${
                showDetailedForm ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-navy">Send Detailed Request</h3>
                    <Button
                      onClick={() => setShowDetailedForm(false)}
                      variant="ghost"
                      size="sm"
                      className="text-navy"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy">Name *</label>
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
                      
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="premium-input"
                          maxLength={255}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy">Phone (optional)</label>
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
                      
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy">Project Goals *</label>
                        <div className="relative">
                          <Textarea
                            name="projectGoals"
                            value={formData.projectGoals}
                            onChange={handleInputChange}
                            placeholder="Tell me what you're looking to achieve..."
                            className="premium-input min-h-[100px] resize-none pb-6"
                            maxLength={2000}
                            required
                          />
                          <span className="absolute bottom-2 right-3 text-xs text-text-muted">
                            {formData.projectGoals.length}/2000
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-navy">Budget Range</label>
                          <Input
                            name="budgetRange"
                            value={formData.budgetRange}
                            onChange={handleInputChange}
                            placeholder="e.g., £1,000-£3,000"
                            className="premium-input"
                            maxLength={50}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-navy">Timeline</label>
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
                    </div>

                    {/* Honeypot field - hidden from users */}
                    <input
                      type="text"
                      name="honeypot"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary w-full py-3 rounded-xl font-semibold"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending to Lee...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send to Lee
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            // Desktop: Original Layout (unchanged)
            <div className="bg-white rounded-3xl shadow-luxury overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[400px] lg:min-h-[600px]">
                {/* Left Sidebar - Direct Line Info */}
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
                      No sales team—just our small team.
                    </p>
                  </div>
                </div>

                {/* Right Side - Contact Form */}
                <div className="lg:col-span-3 p-6 sm:p-8 lg:p-12">
                  <div className="max-w-2xl">
                    <h3 className="heading-primary heading-md text-navy mb-8 font-bold">
                      Send to <span className="text-orange">Our Team</span>
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-3">
                          <label className="text-base font-semibold text-navy">Name *</label>
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
                          <label className="text-base font-semibold text-navy">Email *</label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className="premium-input"
                            maxLength={255}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-base font-semibold text-navy">Phone (optional)</label>
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
                        <label className="text-base font-semibold text-navy">Project Goals *</label>
                        <div className="relative">
                          <Textarea
                            name="projectGoals"
                            value={formData.projectGoals}
                            onChange={handleInputChange}
                            placeholder="Tell me what you're looking to achieve..."
                            className="premium-input min-h-32 resize-none pb-6"
                            maxLength={2000}
                            required
                          />
                          <span className="absolute bottom-2 right-3 text-xs text-text-muted">
                            {formData.projectGoals.length}/2000
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-3">
                          <label className="text-base font-semibold text-navy">Budget Range</label>
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
                          <label className="text-base font-semibold text-navy">Timeline</label>
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
                          <div className="absolute inset-0 bg-gradient-to-r from-orange via-orange/90 to-orange/80 group-hover/btn:from-orange/90 group-hover/btn:via-orange group-hover/btn:to-orange transition-all duration-300" />
                          <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" style={{
                            boxShadow: '0 0 30px rgba(255, 122, 0, 0.5)'
                          }} />
                          
                          <span className="relative z-10">
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                                Sending...
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
          )}
        </div>
      </div>
    </section>
  );
};
export default Contact;