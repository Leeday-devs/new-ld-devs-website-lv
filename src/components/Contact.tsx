import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle } from "lucide-react";
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
  return <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-muted-foreground">
            Ready to start your project? Get in touch and let's discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Form - Modern Card Design */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Info - Compact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Get in Touch</h3>
                
                {contactInfo.map(info => <a key={info.label} href={info.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group">
                    <div className="bg-primary/10 rounded-lg w-10 h-10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <info.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{info.label}</div>
                      <div className="text-sm font-medium text-foreground">{info.value}</div>
                    </div>
                  </a>)}

                <div className="bg-accent/30 rounded-lg p-4 mt-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Quick Response</h4>
                  <p className="text-xs text-muted-foreground">I typically respond within 1 hour.</p>
                </div>
              </div>

              {/* Contact Form - Streamlined */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Send Message</h3>
                
                <div className="grid grid-cols-2 gap-3">
                <Input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="Name" 
                    className="text-sm" 
                    maxLength={100}
                    required 
                  />
                  <Input 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="Email" 
                    className="text-sm" 
                    maxLength={100}
                    required 
                  />
                </div>
                
                <Input 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleInputChange} 
                    placeholder="Subject" 
                    className="text-sm" 
                    maxLength={200}
                  />
                
                <Textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    placeholder="Tell me about your project..." 
                    className="text-sm min-h-24 resize-none" 
                    maxLength={2000}
                    required 
                  />
                
                <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
                
                <Button 
                  type="button"
                  onClick={() => {
                    const whatsappNumber = "447586266007";
                    const message = "Hi! I'm interested in your web development services.";
                    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact via WhatsApp
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;