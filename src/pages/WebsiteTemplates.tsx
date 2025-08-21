import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const WebsiteTemplates = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
    
    setLoading(true);
    
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
        ...(selectedTemplate.stripeProductKey 
          ? { 
              stripeProductKey: selectedTemplate.stripeProductKey,
              serviceName: `${selectedTemplate.name} Website Template`,
              templatePrice: selectedTemplate.price
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

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: requestBody
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.url) {
        window.open(data.url, '_blank');
        setIsBusinessDetailsOpen(false);
        
        toast({
          title: "Redirecting to Payment",
          description: "Opening secure payment window..."
        });
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
      stripeProductKey: "prod_Sp8DEMM15r3PWO",
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
      stripeProductKey: "prod_Sp8HzQm1jVBRsR",
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
      stripeProductKey: "prod_Sp8J4uU6DrIdW4",
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
      stripeProductKey: "prod_Sp8KJiZUErHYDS",
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
      stripeProductKey: "prod_Sp8KzS8aPeskRq",
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
          {/* Hero Section - Navy Background */}
          <section className="section-navy relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-40 left-1/4 animate-float">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <Monitor className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="absolute top-60 right-1/4 animate-float delay-500">
              <div className="bg-primary/20 rounded-2xl p-4 backdrop-blur-sm border border-primary/30">
                <Layers className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="absolute top-80 left-1/3 animate-float delay-1000">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <Sparkles className="h-8 w-8 text-white" />
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
                
                <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
                  <span className="text-primary">
                    Professional
                  </span>
                  <br />
                  <span className="text-white">Pre-Built Websites</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Industry-focused designs that get <strong className="text-primary">removed from our catalog</strong> once purchased. 
                  Your business deserves a unique online presence that stands out from the competition.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button 
                    onClick={scrollToTemplates}
                    size="lg" 
                    className="btn-primary px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="mr-3 h-6 w-6" />
                    Browse Unique Designs
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                  
                  <div className="text-center sm:text-left">
                    <div className="text-sm text-white/70">Starting from</div>
                    <div className="text-3xl font-bold text-primary">£350</div>
                    <div className="text-sm text-white/70">+ £40/month hosting</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Uniqueness Guarantee Section - Navy Background */}
          <section className="section-navy">
            <div className="container mx-auto px-4">
              <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 border-2 border-primary/20">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center">
                      <Lock className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    Your Site Will Be 100% Unique
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                    These are <strong className="text-primary font-semibold">one-time purchases</strong>. Once you buy a pre-built website, we immediately remove it from our catalog and fully customize it for your business. 
                    This means <strong className="text-primary font-semibold">no one else will ever have the same website as you</strong>.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">One-Time Purchase</h3>
                    <p className="text-white/80">Buy once, removed forever from our catalog</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">Fully Customized</h3>
                    <p className="text-white/80">Personalized with your branding and content</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">Exclusive to You</h3>
                    <p className="text-white/80">No other business will have your design</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What You Get Section - Navy Background */}
          <section className="section-navy">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="heading-primary heading-lg mb-6 text-white">What's Included in Your Pre-Built Website</h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
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
                        <h3 className="font-semibold text-lg mb-2 text-white">5 Complete Pages</h3>
                        <p className="text-white/70">Home, About, Services, Portfolio/Gallery, and Contact pages - everything your business needs to get started online.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-white">Mobile Responsive</h3>
                        <p className="text-white/70">Looks perfect on all devices - desktop, tablet, and mobile. Your customers can access your site anywhere.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-white">Contact Integration</h3>
                        <p className="text-white/70">Working contact forms, Google Maps integration, and social media links to connect with your customers.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-white">SEO Optimized</h3>
                        <p className="text-white/70">Built with search engine optimization in mind to help your business get found online.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-white">Full Customization</h3>
                        <p className="text-white/70">We'll customize everything — your logo, colors, content, images, and branding to match your business perfectly.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Additional Pages & Custom Request */}
                <div className="space-y-8">
                  <Card className="p-8 border-2 border-primary/20 bg-white/10 backdrop-blur-sm">
                    <div className="text-center mb-6">
                      <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">Quick 2-Day Delivery</h3>
                      <p className="text-white/70 mb-4">
                        Your customized website will be ready within 2 business days of purchase. 
                        We'll send you mockups for approval before going live.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-white/70">✓ Your content and images</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-white/70">✓ Your brand colors and logo</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-white/70">✓ Professional copywriting included</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-white/70">✓ Free revisions until you're happy</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-2 border-primary/20 bg-white/10 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold mb-4 text-white">Don't See Your Industry?</h3>
                    <p className="text-white/70 mb-4">
                      We can create a custom pre-built website specifically for your industry. 
                      Just tell us what you need!
                    </p>
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
                          <Button type="submit" className="w-full">
                            Submit Request
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Pre-Built Sites Grid - Navy Background */}
          <section id="templates-grid" className="section-navy">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full mb-6 border border-primary/20">
                  <Palette className="h-5 w-5 text-primary" />
                  <span className="text-primary font-semibold">Industry-Specific Designs</span>
                </div>
                <h2 className="heading-primary heading-lg mb-6 text-white">
                  Choose Your Perfect Pre-Built Website
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
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
                      className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 rounded-2xl"
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
                            
                            {/* Interactive Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                              <div className="flex gap-3">
                                <Link
                                  to={template.demoUrl}
                                  target="_blank"
                                  className="bg-white/90 hover:bg-white text-primary px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
                                >
                                  <Eye className="w-4 h-4 inline mr-2" />
                                  View Demo
                                </Link>
                                <Button
                                  onClick={() => handleBuyNow(template)}
                                  size="sm"
                                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
                                >
                                  <CreditCard className="w-4 h-4 inline mr-2" />
                                  Buy Now
                                </Button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-secondary/10">
                            <span className="text-muted-foreground">Demo Coming Soon</span>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6 relative z-10">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                            <p className="text-white/70 text-sm mb-4 leading-relaxed">{template.description}</p>
                          </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-2 mb-6">
                          {template.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-white/70">
                              <Check className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Pricing & CTA */}
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-2xl font-bold text-primary">{template.price}</div>
                              <div className="text-xs text-white/60">+ {template.monthlyPrice} hosting</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-white/60">One-time purchase</div>
                              <div className="text-xs font-semibold text-destructive">Removed after sale</div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            {template.demoUrl !== "#" && (
                              <Link
                                to={template.demoUrl}
                                target="_blank"
                                className="flex-1"
                              >
                                <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Demo
                                </Button>
                              </Link>
                            )}
                            <Button
                              onClick={() => handleBuyNow(template)}
                              size="sm"
                              className="flex-1 bg-primary hover:bg-primary/90 text-white transition-all duration-200 hover:shadow-lg"
                            >
                              <CreditCard className="w-4 h-4 mr-2" />
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Call-to-Action after grid */}
              <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl border border-primary/20">
                <h3 className="text-2xl font-bold mb-4 text-white">Don't See What You're Looking For?</h3>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  We create new industry-specific designs regularly. Contact us to discuss your requirements 
                  or request a custom pre-built website for your niche.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => window.open('https://wa.me/447586266007', '_blank')}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Speak to Our Team
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setIsFormOpen(true)}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Request Custom Design
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section - Navy Background */}
          <section className="section-navy">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="heading-primary heading-lg mb-4 text-white">Frequently Asked Questions</h2>
                <p className="text-xl text-white/90">Everything you need to know about our website templates</p>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">What happens after I buy?</h3>
                  <p className="text-white/70 leading-relaxed">
                    You'll fill out a short form so we can customise your new website. We'll then send you a mockup within 2 business days.
                  </p>
                </Card>

                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">Can I change text, images and branding?</h3>
                  <p className="text-white/70 leading-relaxed">
                    Yes — we'll customise it all for your business including your logo, colors, content, and images.
                  </p>
                </Card>

                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">Is hosting included?</h3>
                  <p className="text-white/70 leading-relaxed">
                    Hosting is £40/month and includes SSL certificate, regular backups, updates, and technical support.
                  </p>
                </Card>

                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">Will my website be mobile-friendly?</h3>
                  <p className="text-white/70 leading-relaxed">
                    Absolutely! All our pre-built websites are fully responsive and optimized for mobile devices.
                  </p>
                </Card>

                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">Can I add more pages later?</h3>
                  <p className="text-white/70 leading-relaxed">
                    Yes, additional pages can be added anytime for £75 per page. We'll match your existing design perfectly.
                  </p>
                </Card>

                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">What if I'm not happy with the design?</h3>
                  <p className="text-white/70 leading-relaxed">
                    We offer unlimited revisions until you're 100% satisfied. Your approval is required before we make your website live.
                  </p>
                </Card>
              </div>

              <div className="text-center mt-12">
                <Button size="lg" variant="secondary" className="bg-primary hover:bg-primary/90 text-white">
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

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Business Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Business Type (e.g., Restaurant, Plumbing)"
                    value={businessDetails.businessType}
                    onChange={(e) => setBusinessDetails({...businessDetails, businessType: e.target.value})}
                  />
                  <Input
                    placeholder="Target Audience"
                    value={businessDetails.targetAudience}
                    onChange={(e) => setBusinessDetails({...businessDetails, targetAudience: e.target.value})}
                  />
                </div>
                
                <Textarea
                  placeholder="Services/Products you offer"
                  value={businessDetails.services}
                  onChange={(e) => setBusinessDetails({...businessDetails, services: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Design Preferences</h3>
                <Input
                  placeholder="Preferred Colors (e.g., Blue, Red, Corporate colors)"
                  value={businessDetails.preferredColors}
                  onChange={(e) => setBusinessDetails({...businessDetails, preferredColors: e.target.value})}
                />
                
                <Textarea
                  placeholder="Logo details (Do you have a logo? Colors? Style preferences?)"
                  value={businessDetails.logoDetails}
                  onChange={(e) => setBusinessDetails({...businessDetails, logoDetails: e.target.value})}
                  rows={2}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Content & Features</h3>
                <Textarea
                  placeholder="Content requirements (What pages do you need? What content should be included?)"
                  value={businessDetails.contentRequirements}
                  onChange={(e) => setBusinessDetails({...businessDetails, contentRequirements: e.target.value})}
                  rows={3}
                />
                
                <Textarea
                  placeholder="Special features needed (Online booking, ecommerce, galleries, etc.)"
                  value={businessDetails.specialFeatures}
                  onChange={(e) => setBusinessDetails({...businessDetails, specialFeatures: e.target.value})}
                  rows={2}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Project Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Desired Launch Date"
                    value={businessDetails.launchDate}
                    onChange={(e) => setBusinessDetails({...businessDetails, launchDate: e.target.value})}
                  />
                  <Input
                    placeholder="Social Media Links"
                    value={businessDetails.socialMedia}
                    onChange={(e) => setBusinessDetails({...businessDetails, socialMedia: e.target.value})}
                  />
                </div>
                
                <Textarea
                  placeholder="Additional information or special requests"
                  value={businessDetails.additionalInfo}
                  onChange={(e) => setBusinessDetails({...businessDetails, additionalInfo: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="text-center pt-6 border-t">
                <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
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
