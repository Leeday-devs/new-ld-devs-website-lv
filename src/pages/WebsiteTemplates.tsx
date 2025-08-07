import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowRight, Check, Clock, Palette, Zap, Shield, Eye, CreditCard, Lock, Users, Star, FileText, Globe, Mail, Phone, MessageSquare, Wrench, Scissors, Car, UtensilsCrossed, Dumbbell, Stethoscope, Code, Sparkles, Layers, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const WebsiteTemplates = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBusinessDetailsOpen, setIsBusinessDetailsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    email: '',
    phone: '',
    description: ''
  });

  const [businessDetails, setBusinessDetails] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    businessType: '',
    services: '',
    targetAudience: '',
    preferredColors: '',
    logoDetails: '',
    contentRequirements: '',
    specialFeatures: '',
    launchDate: '',
    socialMedia: '',
    additionalInfo: ''
  });

  const handleBusinessDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTemplate) return;
    
    console.log('Starting payment process for template:', selectedTemplate.name);
    console.log('Template data:', selectedTemplate);
    
    try {
      // Send Discord notification first
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'business_details',
          data: {
            ...businessDetails,
            templateName: selectedTemplate.name,
            templatePrice: selectedTemplate.price
          }
        }
      });

      if (discordError) {
        console.error('Discord notification error:', discordError);
      }

      const requestBody = {
        // Use Stripe product key if available, otherwise fall back to price
        ...(selectedTemplate.stripeProductKey 
          ? { 
              stripeProductKey: selectedTemplate.stripeProductKey,
              serviceName: `${selectedTemplate.name} Website Template`
            }
          : { 
              amount: parseInt(selectedTemplate.price.replace('£', '')) * 100,
              serviceName: `${selectedTemplate.name} Website Template`
            }
        ),
        type: 'payment',
        customerInfo: {
          fullName: businessDetails.ownerName,
          email: businessDetails.email,
          phone: businessDetails.phone,
          company: businessDetails.businessName
        },
        successUrl: `${window.location.origin}/payment-success?template=${encodeURIComponent(selectedTemplate.name)}`,
        cancelUrl: `${window.location.origin}/payment-canceled`
      };
      
      console.log('Sending payment request:', requestBody);
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: requestBody
      });
      
      console.log('Payment response:', { data, error });
      
      if (error) {
        console.error('Payment function error:', error);
        throw error;
      }
      
      if (data?.url) {
        console.log('Redirecting to Stripe checkout:', data.url);
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        setIsBusinessDetailsOpen(false);
        
        toast({
          title: "Redirecting to Payment",
          description: "Opening secure payment window..."
        });
      } else {
        console.error('No checkout URL received from payment function');
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBuyNow = (template: any) => {
    setSelectedTemplate(template);
    setIsBusinessDetailsOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'custom_request',
          data: {
            businessName: formData.businessName,
            industry: formData.industry,
            email: formData.email,
            phone: formData.phone,
            description: formData.description
          }
        }
      });

      if (discordError) {
        throw discordError;
      }

      toast({
        title: "Request Submitted!",
        description: "We've received your custom example request and will get back to you soon."
      });

      setIsFormOpen(false);
      // Reset form
      setFormData({
        businessName: '',
        industry: '',
        email: '',
        phone: '',
        description: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit your request. Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };
  const getTemplateIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      'Trades': Wrench,
      'Beauty & Wellness': Scissors,
      'Automotive': Car,
      'Food & Beverage': UtensilsCrossed,
      'Health & Fitness': Dumbbell,
      'Healthcare': Stethoscope
    };
    return iconMap[category] || Code;
  };

  const templates = [
    {
      id: 1,
      name: "Plumber Pro",
      description: "Professional plumbing services website with booking system and service showcase",
      price: "£350",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Trades",
      demoUrl: "/demo/plumber-pro",
      stripeProductKey: "prod_Sp898QrbxrSHIr",
      features: ["Emergency booking", "Service gallery", "Quote calculator", "Customer reviews"]
    },
    {
      id: 2,
      name: "Modern Barber",
      description: "Stylish barbershop website with appointment booking and gallery",
      price: "£350",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Beauty & Wellness",
      demoUrl: "/demo/modern-barber",
      features: ["Online booking", "Style gallery", "Team profiles", "Price list"]
    },
    {
      id: 3,
      name: "Electrician Expert",
      description: "Clean, professional electrical services website with contact forms",
      price: "£350",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Trades",
      demoUrl: "/demo/electrician-expert",
      features: ["Emergency hotline", "Safety certificates", "Project showcase", "Free estimates"]
    },
    {
      id: 4,
      name: "Restaurant Deluxe",
      description: "Full-featured restaurant website with menu, reservations, and online ordering",
      price: "£450",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Food & Beverage",
      demoUrl: "/demo/restaurant-deluxe",
      features: ["Table reservations", "Digital menu", "Chef profiles", "Wine pairings"]
    },
    {
      id: 5,
      name: "Fitness Studio",
      description: "Dynamic fitness center website with class schedules and membership plans",
      price: "£400",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Health & Fitness",
      demoUrl: "/demo/fitness-studio",
      features: ["Class schedules", "Member portal", "Workout tracker", "Nutrition plans"]
    },
    {
      id: 6,
      name: "Auto Repair",
      description: "Professional automotive services website with service booking",
      price: "£350",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Automotive",
      demoUrl: "/demo/auto-repair",
      features: ["MOT booking", "Service tracker", "Warranty info", "Parts catalog"]
    }
  ];

  const scrollToTemplates = () => {
    document.getElementById('templates-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead 
        title="Pre-Built Websites - Unique Professional Designs | L-Development"
        description="Browse our professionally designed pre-built websites for small businesses and tradesmen. One-time purchase ensures your site is unique - no duplicates available after purchase."
        keywords="pre-built websites, unique website designs, small business websites, tradesman websites, professional web design, ready-made websites UK"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main>
          {/* Hero Section with Background Graphics */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-40 left-1/4 animate-float">
              <div className="bg-primary/20 rounded-2xl p-4 backdrop-blur-sm border border-primary/30">
                <Monitor className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="absolute top-60 right-1/4 animate-float delay-500">
              <div className="bg-secondary/20 rounded-2xl p-4 backdrop-blur-sm border border-secondary/30">
                <Layers className="h-8 w-8 text-secondary" />
              </div>
            </div>
            <div className="absolute top-80 left-1/3 animate-float delay-1000">
              <div className="bg-accent/20 rounded-2xl p-4 backdrop-blur-sm border border-accent/30">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Pre-Built Websites", href: "/templates" }
                ]}
              />
              
              <div className="text-center mt-16 mb-16">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full mb-8 border border-primary/20">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-primary font-semibold">One-Time Purchase • 100% Unique</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    Professional
                  </span>
                  <br />
                  <span className="text-foreground">Pre-Built Websites</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
                  Industry-focused designs that get <strong className="text-primary">removed from our catalog</strong> once purchased. 
                  Your business deserves a unique online presence that stands out from the competition.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button 
                    onClick={scrollToTemplates}
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="mr-3 h-6 w-6" />
                    Browse Unique Designs
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                  
                  <div className="text-center sm:text-left">
                    <div className="text-sm text-muted-foreground">Starting from</div>
                    <div className="text-3xl font-bold text-primary">£350</div>
                    <div className="text-sm text-muted-foreground">+ £40/month hosting</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Uniqueness Guarantee Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="bg-gradient-to-r from-destructive/10 via-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 border-2 border-primary/20">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Your Site Will Be 100% Unique
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  These are <strong>one-time purchases</strong>. Once you buy a pre-built website, we immediately remove it from our catalog and fully customize it for your business. 
                  This means <strong>no one else will ever have the same website as you</strong>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">One-Time Purchase</h3>
                    <p className="text-muted-foreground text-sm">Buy once, removed forever from our catalog</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">Fully Customized</h3>
                    <p className="text-muted-foreground text-sm">Personalized with your branding and content</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">Exclusive to You</h3>
                    <p className="text-muted-foreground text-sm">No other business will have your design</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What You Get Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">What's Included in Your Pre-Built Website</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Every pre-built website comes as a complete 5-page package, professionally designed and ready to customize for your business.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left Side - What's Included */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">5 Complete Pages</h3>
                      <p className="text-muted-foreground">Home, About, Services, Portfolio/Gallery, and Contact pages — everything you need to showcase your business professionally.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">Mobile Responsive Design</h3>
                      <p className="text-muted-foreground">Your website will look perfect on all devices — desktop, tablet, and mobile phones.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">Contact Forms & Integration</h3>
                      <p className="text-muted-foreground">Working contact forms, Google Maps integration, and social media links to connect with your customers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">SEO Optimized</h3>
                      <p className="text-muted-foreground">Built with search engine optimization in mind to help your business get found online.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">Full Customization</h3>
                      <p className="text-muted-foreground">We'll customize everything — your logo, colors, content, images, and branding to match your business perfectly.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Additional Pages & Custom Request */}
              <div className="space-y-8">
                <Card className="p-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="text-center mb-6">
                    <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <ArrowRight className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">Need More Pages?</h3>
                    <p className="text-muted-foreground">
                      Start with 5 pages, expand as you grow. Additional pages can be added for £75 each.
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Blog page</span>
                      <span className="font-semibold text-primary">from £75</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Online shop</span>
                      <span className="font-semibold text-primary">from £150</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Booking system</span>
                      <span className="font-semibold text-primary">from £125</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Custom page</span>
                      <span className="font-semibold text-primary">from £75</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-accent/5">
                  <div className="text-center mb-6">
                    <div className="bg-secondary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">Don't See Your Industry?</h3>
                    <p className="text-muted-foreground mb-6">
                      We can create a custom pre-built website example specifically for your niche. Request a demo and we'll show you what's possible.
                    </p>
                  </div>

                  <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Request Custom Example
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Request a Custom Pre-Built Example</DialogTitle>
                        <DialogDescription>
                          Tell us about your business and we'll create a custom website example for your industry.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <Input
                            placeholder="Business Name"
                            value={formData.businessName}
                            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Industry/Niche (e.g., Dental Practice, Law Firm, etc.)"
                            value={formData.industry}
                            onChange={(e) => setFormData({...formData, industry: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Input
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        <div>
                          <Textarea
                            placeholder="Tell us about your business and what features you'd like to see..."
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            rows={4}
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="flex-1">
                            Cancel
                          </Button>
                          <Button type="submit" className="flex-1">
                            Submit Request
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </Card>
              </div>
            </div>
          </section>

          {/* Pre-Built Sites Grid - Enhanced Design */}
          <section id="templates-grid" className="container mx-auto px-4 py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-secondary/10 px-6 py-3 rounded-full mb-6 border border-secondary/20">
                <Palette className="h-5 w-5 text-secondary" />
                <span className="text-secondary font-semibold">Industry-Specific Designs</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Choose Your Perfect Pre-Built Website
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Each design is professionally crafted and optimized for your specific industry, 
                ensuring maximum impact and conversion for your business type.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
              {templates.map((template, index) => {
                const IconComponent = getTemplateIcon(template.category);
                return (
                  <Card 
                    key={template.id} 
                    className="group relative overflow-hidden bg-gradient-to-br from-card to-card/50 border-2 border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:scale-105 rounded-2xl"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient Overlay for Premium Feel */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    {/* Category Icon & Badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2 border border-primary/30">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <Badge className="bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm">
                        {template.category}
                      </Badge>
                    </div>

                    {/* Live Preview with Enhanced Overlay */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50 rounded-t-2xl">
                      {template.demoUrl !== "#" ? (
                        <>
                          <iframe
                            src={template.demoUrl}
                            width="100%"
                            height="100%"
                            style={{
                              border: "none",
                              borderRadius: "0",
                              transform: "scale(0.5)",
                              transformOrigin: "top left",
                              width: "200%",
                              height: "200%",
                              pointerEvents: "none"
                            }}
                            title={`${template.name} Preview`}
                            loading="lazy"
                          />
                          {/* Preview Overlay */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 border border-white/50 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                              <Eye className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <div className="text-center">
                            <IconComponent className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                            <p className="text-muted-foreground font-medium">Preview Coming Soon</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Enhanced Template Details */}
                    <CardContent className="p-8 relative z-10">
                      <div className="space-y-6">
                        {/* Header with Icon */}
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="bg-primary/10 rounded-full p-3">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                              <h3 className="text-2xl font-bold text-foreground">{template.name}</h3>
                              <p className="text-sm text-muted-foreground">{template.category}</p>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-4">{template.description}</p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            Key Features:
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {template.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pricing with Enhanced Styling */}
                        <div className="text-center p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
                          <div className="text-3xl font-bold text-primary mb-1">{template.price}</div>
                          <div className="text-sm text-muted-foreground mb-3">+ {template.monthlyPrice} hosting</div>
                          <div className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full inline-block">
                            One-time purchase • Becomes yours forever
                          </div>
                        </div>
                        
                        {/* Enhanced Action Buttons */}
                        <div className="flex flex-col gap-3">
                          <Button 
                            variant="outline" 
                            className="w-full border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group/btn"
                            onClick={() => window.open(template.demoUrl, '_blank')}
                            disabled={template.demoUrl === "#"}
                          >
                            <Eye className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                            Preview Full Website
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                          
                          <Button 
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group/buy"
                            onClick={() => handleBuyNow(template)}
                          >
                            <CreditCard className="mr-2 h-4 w-4 group-hover/buy:scale-110 transition-transform" />
                            Buy Now – {template.price}
                            <Sparkles className="ml-2 h-4 w-4 group-hover/buy:rotate-12 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>

                    {/* Premium Glow Effect on Hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </Card>
                );
              })}
            </div>

            {/* Call-to-Action after grid */}
            <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl border border-primary/20">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Don't See What You're Looking For?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We create new industry-specific designs regularly. Contact us to discuss your requirements 
                or request a custom pre-built website for your niche.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => window.open('https://wa.me/447586266007', '_blank')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Speak to Our Team
                </Button>
                <Button 
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90"
                  onClick={() => setIsFormOpen(true)}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Request Custom Design
                </Button>
              </div>
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
                  You'll fill out a short form so we can customise your new website. We'll then send you a mockup within 2 business days.
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
                  <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
                  <p className="opacity-90">Get your website live quickly with our streamlined process</p>
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

        {/* Business Details Form Modal */}
        <Dialog open={isBusinessDetailsOpen} onOpenChange={setIsBusinessDetailsOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Business Details for {selectedTemplate?.name}</DialogTitle>
              <DialogDescription>
                Please provide your business details so we can customize your {selectedTemplate?.name} website perfectly for your needs.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleBusinessDetailsSubmit} className="space-y-6">
              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Business Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Business/Company Name *"
                    value={businessDetails.businessName}
                    onChange={(e) => setBusinessDetails({...businessDetails, businessName: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Owner/Manager Name *"
                    value={businessDetails.ownerName}
                    onChange={(e) => setBusinessDetails({...businessDetails, ownerName: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    value={businessDetails.email}
                    onChange={(e) => setBusinessDetails({...businessDetails, email: e.target.value})}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number *"
                    value={businessDetails.phone}
                    onChange={(e) => setBusinessDetails({...businessDetails, phone: e.target.value})}
                    required
                  />
                </div>
                
                <Input
                  placeholder="Business Address"
                  value={businessDetails.address}
                  onChange={(e) => setBusinessDetails({...businessDetails, address: e.target.value})}
                />
              </div>

              {/* Business Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Business Details</h3>
                <Input
                  placeholder="Type of Business (e.g., Plumbing Services, Hair Salon) *"
                  value={businessDetails.businessType}
                  onChange={(e) => setBusinessDetails({...businessDetails, businessType: e.target.value})}
                  required
                />
                
                <Textarea
                  placeholder="Main Services/Products (describe what you offer) *"
                  value={businessDetails.services}
                  onChange={(e) => setBusinessDetails({...businessDetails, services: e.target.value})}
                  rows={3}
                  required
                />
                
                <Textarea
                  placeholder="Target Audience (who are your ideal customers?)"
                  value={businessDetails.targetAudience}
                  onChange={(e) => setBusinessDetails({...businessDetails, targetAudience: e.target.value})}
                  rows={2}
                />
              </div>

              {/* Design Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Design Preferences</h3>
                <Input
                  placeholder="Preferred Colors (e.g., Blue and white, Professional black/gold)"
                  value={businessDetails.preferredColors}
                  onChange={(e) => setBusinessDetails({...businessDetails, preferredColors: e.target.value})}
                />
                
                <Textarea
                  placeholder="Logo Details (Do you have a logo? Describe it or mention if you need one created)"
                  value={businessDetails.logoDetails}
                  onChange={(e) => setBusinessDetails({...businessDetails, logoDetails: e.target.value})}
                  rows={2}
                />
              </div>

              {/* Content & Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Content & Features</h3>
                <Textarea
                  placeholder="Content Requirements (What specific text, pages, or information do you need on your site?)"
                  value={businessDetails.contentRequirements}
                  onChange={(e) => setBusinessDetails({...businessDetails, contentRequirements: e.target.value})}
                  rows={3}
                />
                
                <Textarea
                  placeholder="Special Features (Online booking, contact forms, gallery, testimonials, etc.)"
                  value={businessDetails.specialFeatures}
                  onChange={(e) => setBusinessDetails({...businessDetails, specialFeatures: e.target.value})}
                  rows={2}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="date"
                    placeholder="Preferred Launch Date"
                    value={businessDetails.launchDate}
                    onChange={(e) => setBusinessDetails({...businessDetails, launchDate: e.target.value})}
                  />
                  <Input
                    placeholder="Social Media Handles"
                    value={businessDetails.socialMedia}
                    onChange={(e) => setBusinessDetails({...businessDetails, socialMedia: e.target.value})}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Additional Information</h3>
                <Textarea
                  placeholder="Anything else you'd like us to know? Any specific requirements or questions?"
                  value={businessDetails.additionalInfo}
                  onChange={(e) => setBusinessDetails({...businessDetails, additionalInfo: e.target.value})}
                  rows={3}
                />
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Template:</span>
                    <span className="font-medium">{selectedTemplate?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{selectedTemplate?.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Setup Fee:</span>
                    <span className="font-bold text-primary text-lg">{selectedTemplate?.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monthly Hosting:</span>
                    <span className="font-medium">{selectedTemplate?.monthlyPrice}</span>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsBusinessDetailsOpen(false)} 
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Proceed to Payment
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </>
  );
};

export default WebsiteTemplates;