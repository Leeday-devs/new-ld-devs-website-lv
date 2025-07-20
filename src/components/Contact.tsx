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
      value: "hello@webdesigner.com",
      href: "mailto:hello@webdesigner.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      href: "#"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-slate-700 to-slate-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Let's Build Something Amazing
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to start your project? Get in touch and let's discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6 animate-slide-up">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h3>
            
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="flex items-center gap-4 p-4 bg-gradient-card rounded-lg shadow-elegant hover:shadow-glow transition-smooth group"
              >
                <div className="bg-gradient-primary rounded-full w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-smooth">
                  <info.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{info.label}</div>
                  <div className="font-medium text-foreground">{info.value}</div>
                </div>
              </a>
            ))}

            <div className="bg-gradient-card rounded-lg p-6 shadow-elegant">
              <h4 className="font-semibold text-foreground mb-3">Quick Response Time</h4>
              <p className="text-muted-foreground text-sm">
                I typically respond to all inquiries within 24 hours. For urgent projects, 
                feel free to call directly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 bg-gradient-card border-0 shadow-elegant animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Send a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Name
                  </label>
                  <Input placeholder="Your full name" className="bg-background/50" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
                  <Input type="email" placeholder="your@email.com" className="bg-background/50" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Subject
                </label>
                <Input placeholder="Project inquiry" className="bg-background/50" />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Message
                </label>
                <Textarea
                  placeholder="Tell me about your project, timeline, and any specific requirements..."
                  className="bg-background/50 min-h-32"
                />
              </div>
              
              <Button size="lg" className="w-full bg-gradient-primary border-0 text-white hover:scale-105 transition-smooth shadow-glow">
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-glow">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join over 150 satisfied clients who have transformed their online presence with professional web design and hosting solutions.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start Your Project Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;