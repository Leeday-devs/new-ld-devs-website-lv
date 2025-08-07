import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowRight, Check, Clock, Palette, Zap, Shield, Eye, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const WebsiteTemplates = () => {
  const templates = [
    {
      id: 1,
      name: "Plumber Pro",
      description: "Professional plumbing services template with booking system and service showcase",
      price: "£350",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Trades",
      demoUrl: "/demo/plumber-pro",
      stripeCheckoutUrl: "[Paste your Stripe checkout link here]"
    },
    {
      id: 2,
      name: "Modern Barber",
      description: "Stylish barbershop template with appointment booking and gallery",
      price: "£350",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Beauty & Wellness",
      demoUrl: "/demo/modern-barber",
      stripeCheckoutUrl: "[Paste your Stripe checkout link here]"
    },
    {
      id: 3,
      name: "Electrician Expert",
      description: "Clean, professional electrical services template with contact forms",
      price: "£350",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Trades",
      demoUrl: "/demo/electrician-expert",
      stripeCheckoutUrl: "[Paste your Stripe checkout link here]"
    },
    {
      id: 4,
      name: "Restaurant Deluxe",
      description: "Full-featured restaurant template with menu, reservations, and online ordering",
      price: "£450",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Food & Beverage",
      demoUrl: "#",
      stripeCheckoutUrl: "[Paste your Stripe checkout link here]"
    },
    {
      id: 5,
      name: "Fitness Studio",
      description: "Dynamic fitness center template with class schedules and membership plans",
      price: "£400",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Health & Fitness",
      demoUrl: "#",
      stripeCheckoutUrl: "[Paste your Stripe checkout link here]"
    },
    {
      id: 6,
      name: "Auto Repair",
      description: "Professional automotive services template with service booking",
      price: "£350",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Automotive",
      demoUrl: "#",
      stripeCheckoutUrl: "[Paste your Stripe checkout link here]"
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
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{template.price}</div>
                        <div className="text-sm text-muted-foreground">+ {template.monthlyPrice}</div>
                      </div>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 hover:bg-primary/10 transition-colors"
                        onClick={() => window.open(template.demoUrl, '_blank')}
                        disabled={template.demoUrl === "#"}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button 
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                        onClick={() => window.open(template.stripeCheckoutUrl, '_blank')}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Buy Now – {template.price}
                      </Button>
                    </div>
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
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3 text-foreground">What happens after I buy?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You'll fill out a short form so we can customise your new website. We'll then send you a mockup in 24–48 hours.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3 text-foreground">Can I change text, images and branding?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes — we'll customise it all for your business including your logo, colors, content, and images.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3 text-foreground">Do I get access to edit my site?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes, you'll get full access after delivery — or we can manage everything for you if you prefer.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3 text-foreground">What's included in hosting?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Hosting includes backups, updates, SSL, one business email and support for just £40/month.
                </p>
              </Card>
            </div>
          </section>

          {/* Bonus Upsell Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-white">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Hosting & Ongoing Support?</h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  All our sites include optional hosting, backups, support, updates and a business email for just £40/month. 
                  You can add this during checkout or anytime after launch.
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