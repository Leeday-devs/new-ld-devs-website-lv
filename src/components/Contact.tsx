import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
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

  return (
    <section className="py-12 bg-background">
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
                
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group"
                  >
                    <div className="bg-primary/10 rounded-lg w-10 h-10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <info.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{info.label}</div>
                      <div className="text-sm font-medium text-foreground">{info.value}</div>
                    </div>
                  </a>
                ))}

                <div className="bg-accent/30 rounded-lg p-4 mt-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Quick Response</h4>
                  <p className="text-xs text-muted-foreground">
                    I typically respond within 24 hours.
                  </p>
                </div>
              </div>

              {/* Contact Form - Streamlined */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Send Message</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Name" className="text-sm" />
                  <Input type="email" placeholder="Email" className="text-sm" />
                </div>
                
                <Input placeholder="Subject" className="text-sm" />
                
                <Textarea
                  placeholder="Tell me about your project..."
                  className="text-sm min-h-24 resize-none"
                />
                
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;