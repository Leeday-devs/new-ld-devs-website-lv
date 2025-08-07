import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowRight, Check, Clock, Palette, Zap, Shield } from "lucide-react";

const WebsiteTemplates = () => {
  const templates = [
    {
      id: 1,
      name: "Plumber Pro",
      description: "Professional plumbing services template with booking system and service showcase",
      price: "£350 + £40/month",
      image: "/api/placeholder/400/300",
      category: "Trades"
    },
    {
      id: 2,
      name: "Modern Barber",
      description: "Stylish barbershop template with appointment booking and gallery",
      price: "£350 + £40/month",
      image: "/api/placeholder/400/300",
      category: "Beauty & Wellness"
    },
    {
      id: 3,
      name: "Electrician Lite",
      description: "Clean, professional electrical services template with contact forms",
      price: "£350 + £40/month",
      image: "/api/placeholder/400/300",
      category: "Trades"
    },
    {
      id: 4,
      name: "Restaurant Deluxe",
      description: "Full-featured restaurant template with menu, reservations, and online ordering",
      price: "£450 + £40/month",
      image: "/api/placeholder/400/300",
      category: "Food & Beverage"
    },
    {
      id: 5,
      name: "Fitness Studio",
      description: "Dynamic fitness center template with class schedules and membership plans",
      price: "£400 + £40/month",
      image: "/api/placeholder/400/300",
      category: "Health & Fitness"
    },
    {
      id: 6,
      name: "Auto Repair",
      description: "Professional automotive services template with service booking",
      price: "£350 + £40/month",
      image: "/api/placeholder/400/300",
      category: "Automotive"
    }
  ];

  const faqs = [
    {
      question: "How quickly can my website be live?",
      answer: "Most templates can be customized and deployed within 48 hours of purchase. Complex customizations may take 3-5 business days."
    },
    {
      question: "What's included in the monthly hosting fee?",
      answer: "Your £40/month includes premium hosting, SSL certificate, regular backups, security monitoring, updates, and technical support."
    },
    {
      question: "Can I customize the template after purchase?",
      answer: "Absolutely! We include basic customization (colors, logo, content) in the initial price. Additional design changes can be quoted separately."
    },
    {
      question: "Do I own the website after purchase?",
      answer: "Yes, you own the website and all its content. The monthly fee covers hosting and ongoing support services."
    },
    {
      question: "What if I need additional features?",
      answer: "We can add custom features like e-commerce, advanced booking systems, or integrations. Contact us for a quote on additional functionality."
    }
  ];

  const scrollToTemplates = () => {
    document.getElementById('templates-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead 
        title="Website Templates - Professional Designs Ready in 48 Hours | L-Development"
        description="Browse our professionally designed website templates for small businesses and tradesmen. Choose your template and get online fast with £350 setup + £40/month hosting."
        keywords="website templates, small business websites, tradesman websites, professional web design templates, ready-made websites UK"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <Navigation />
        
        <main>
          <div className="container mx-auto px-4 pt-20">
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Website Templates", href: "/templates" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Professionally Built Websites — Ready to Launch in 48 Hours
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Browse our range of industry-focused templates, designed to help small businesses and tradesmen get online fast. Simply choose your template, checkout, and we'll do the rest.
              </p>
              <Button 
                onClick={scrollToTemplates}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                Explore Templates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>

          {/* Templates Grid */}
          <section id="templates-grid" className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Perfect Template</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Each template is professionally designed and optimized for your industry
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template) => (
                <Card key={template.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Palette className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      {template.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {template.name}
                      <span className="text-lg font-bold text-primary">{template.price}</span>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      Preview & Buy
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="container mx-auto px-4 py-16 bg-muted/30 rounded-3xl my-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">Everything you need to know about our website templates</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Bonus Upsell Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-white">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Templates?</h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Get more than just a website - get a complete digital solution for your business
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">48-Hour Turnaround</h3>
                  <p className="opacity-90">Get your website live in just 2 days, not weeks</p>
                </div>

                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Premium Hosting Included</h3>
                  <p className="opacity-90">Fast, secure hosting with 99.9% uptime guarantee</p>
                </div>

                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Ongoing Support</h3>
                  <p className="opacity-90">Monthly updates, backups, and technical support</p>
                </div>
              </div>

              <div className="text-center mt-12">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WebsiteTemplates;