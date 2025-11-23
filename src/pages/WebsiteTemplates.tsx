import { useState, useEffect, useRef } from "react";
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
import { ArrowRight, Check, Clock, Palette, Zap, Eye, CreditCard, Lock, Users, Star, FileText, Globe, Mail, Phone, MessageSquare, Wrench, Scissors, Car, UtensilsCrossed, Dumbbell, Stethoscope, Code, Home, Heart, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const WebsiteTemplates = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBusinessDetailsOpen, setIsBusinessDetailsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const cardsRef = useRef<HTMLDivElement>(null);

  // Category filter options
  const categories = [
    { name: "All", icon: Filter },
    { name: "Trades", icon: Wrench },
    { name: "Beauty & Wellness", icon: Scissors },
    { name: "Food & Beverage", icon: UtensilsCrossed },
    { name: "Health & Fitness", icon: Dumbbell },
    { name: "Automotive", icon: Car },
    { name: "Home Services", icon: Home },
    { name: "Pet Services", icon: Heart }
  ];

  // Scroll animation for template cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.template-card-animate');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => observer.disconnect();
  }, [activeCategory]);
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
    const qs = new URLSearchParams({
      name: template.name,
      price: template.price,
      ...(template.stripeProductKey ? { productKey: template.stripeProductKey } : {})
    }).toString();
    navigate(`/template-checkout?${qs}`);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Store in database first
      const { error: dbError } = await supabase
        .from('custom_quote_requests')
        .insert({
          name: formData.businessName,
          email: formData.email,
          company: formData.businessName,
          phone: formData.phone,
          project_type: 'Custom Website Template',
          project_description: `Industry: ${formData.industry}\n\nDescription: ${formData.description}`,
          special_requirements: `Custom pre built website example for ${formData.industry} industry`,
          status: 'pending'
        });

      if (dbError) {
        throw dbError;
      }

      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'custom_request',
          data: {
            businessName: formData.businessName,
            industry: formData.industry,
            email: formData.email,
            phone: formData.phone,
            description: formData.description,
            source: 'Website Templates - Custom Request'
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
        // Don't throw - form submission was successful
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
      'Healthcare': Stethoscope,
      'Home Services': Home,
      'Pet Services': Heart
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
      price: "£800",
      monthlyPrice: "£50/month",
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
      price: "£850",
      monthlyPrice: "£50/month",
      image: "/api/placeholder/400/300",
      category: "Automotive",
      demoUrl: "/demo/auto-repair",
      stripeProductKey: "prod_Sp8KzS8aPeskRq",
      features: ["MOT booking", "Service tracker", "Warranty info", "Parts catalog"]
    },
    {
      id: 7,
      name: "Cleaning Services",
      description: "Professional cleaning services website for domestic & commercial clients",
      price: "£400",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Home Services",
      demoUrl: "/demo/cleaning-services",
      stripeProductKey: "prod_Sp8LmC3aNoPqRs",
      features: ["Quote calculator", "Service packages", "Customer reviews", "Before/after gallery"]
    },
    {
      id: 8,
      name: "Pet Grooming & Dog Walking",
      description: "Friendly, fun layout for pet care professionals and dog walkers",
      price: "£450",
      monthlyPrice: "£40/month",
      image: "/api/placeholder/400/300",
      category: "Pet Services",
      demoUrl: "/demo/pet-grooming",
      stripeProductKey: "prod_Sp8MnD4bOpQrSt",
      features: ["Online booking", "Pet photo gallery", "Service pricing", "Care packages"]
    }
  ];

  // Filter templates by category
  const filteredTemplates = activeCategory === "All"
    ? templates
    : templates.filter(t => t.category === activeCategory);

  const scrollToTemplates = () => {
    document.getElementById('templates-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead 
        title="Pre Built Websites - Unique Professional Designs | L-Development"
        description="Browse our professionally designed pre built websites for small businesses and tradesmen. One-time purchase ensures your site is unique - no duplicates available after purchase."
        keywords="pre built websites, unique website designs, small business websites, tradesman websites, professional web design, pre built websites UK"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main>
          {/* Hero Section - Clean & Impactful */}
          <section className="section-navy relative overflow-hidden">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-96 h-96 bg-orange/8 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Pre Built Websites", href: "/templates" }
                ]}
              />

              <div className="text-center py-16 sm:py-20">
                <div className="inline-flex items-center gap-2 bg-orange/10 px-4 py-2 rounded-full mb-6 border border-orange/20">
                  <Lock className="h-4 w-4 text-orange" />
                  <span className="text-orange font-semibold text-sm">Buy Once • Nobody Else Gets It</span>
                </div>

                <h1 className="heading-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
                  Get Your Business <span className="text-orange">Online Fast</span>
                </h1>

                <p className="text-body text-lg sm:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
                  We have pre built beautiful websites for different businesses. Pick the one that fits yours,
                  we'll add your details, and <strong className="text-orange">it's yours forever</strong> — we won't sell it to anyone else.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Button
                    onClick={scrollToTemplates}
                    size="lg"
                    className="btn-primary px-8 py-4 text-lg font-semibold rounded-xl"
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    View Templates
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10">
                    <div className="text-left">
                      <div className="text-xs text-white/60 uppercase tracking-wide">From</div>
                      <div className="text-2xl font-bold text-orange">£350</div>
                    </div>
                    <div className="h-10 w-px bg-white/20"></div>
                    <div className="text-left">
                      <div className="text-xs text-white/60 uppercase tracking-wide">Hosting</div>
                      <div className="text-lg font-semibold text-white">£40/mo</div>
                    </div>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Ready in 2 Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Works on Phones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Shows Up on Google</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>We Fix It Until You're Happy</span>
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
                    Nobody Else Will Have Your Website
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                    When you buy one of our pre built websites, <strong className="text-primary font-semibold">we take it down straight away</strong> so nobody else can have it.
                    Then we put your business name, logo, photos and details on it. <strong className="text-primary font-semibold">It becomes completely yours</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">You Buy It, It's Gone</h3>
                    <p className="text-white/80">We remove it from sale the moment you pay</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">Made Just For You</h3>
                    <p className="text-white/80">Your name, your photos, your business details</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">100% Yours</h3>
                    <p className="text-white/80">No competitor will ever have the same site</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What You Get Section - Navy Background */}
          <section className="section-navy">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="heading-primary heading-lg mb-6 text-white">What You Get</h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Your website comes with 5 pages and everything you need to start getting customers online. We handle all the technical stuff.
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
                        <h3 className="font-semibold text-lg mb-2 text-white">5 Ready to Go Pages</h3>
                        <p className="text-white/70">A Home page, About page, Services page, Gallery, and Contact page — everything a business needs to look professional online.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-white">Works on All Phones & Tablets</h3>
                        <p className="text-white/70">Your website will look great whether someone's viewing it on their phone, tablet, or computer. Most people browse on phones now!</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-white">Customers Can Contact You</h3>
                        <p className="text-white/70">A contact form that sends messages straight to your email, a map showing your location, and links to your Facebook/Instagram.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-white">People Can Find You on Google</h3>
                        <p className="text-white/70">We set everything up so when people search for businesses like yours on Google, your website can appear in the results.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mt-1">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-white">We Add Your Details</h3>
                        <p className="text-white/70">Your business name, logo, photos, prices, contact details — we put it all in for you. Just send us what you have.</p>
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
                      <h3 className="text-xl font-bold mb-2 text-white">Ready in 2 Days</h3>
                      <p className="text-white/70 mb-4">
                        After you buy, we'll send you a preview to check before it goes live.
                        Don't like something? We'll change it — no extra charge.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-white/70">We add your photos and text</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-white/70">We match your colours and logo</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-white/70">We can write the words for you</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-white/70">Free changes until you love it</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-2 border-primary/20 bg-white/10 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold mb-4 text-white">Don't See Your Type of Business?</h3>
                    <p className="text-white/70 mb-4">
                      We can make a website for any type of business.
                      Just tell us what you do and we'll sort it out!
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
                          <DialogTitle>Request a Custom Pre Built Example</DialogTitle>
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

          {/* Pre Built Sites Grid - Navy Background */}
          <section id="templates-grid" className="section-navy">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-orange/10 px-4 py-2 rounded-full mb-6 border border-orange/20">
                  <Palette className="h-4 w-4 text-orange" />
                  <span className="text-orange font-semibold text-sm">Pre Built Websites</span>
                </div>
                <h2 className="heading-primary heading-lg mb-4 text-white">
                  Pick One You <span className="text-orange">Like</span>
                </h2>
                <p className="text-body text-lg text-white/80 max-w-2xl mx-auto">
                  Have a look at these pre built websites. Find one that suits your business. Once you buy it, we'll make it yours.
                </p>
              </div>

              {/* Category Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-orange text-white shadow-lg shadow-orange/30'
                          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{cat.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Results count */}
              <div className="text-center mb-8">
                <p className="text-white/60 text-sm">
                  Showing {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'}
                  {activeCategory !== "All" && ` in ${activeCategory}`}
                </p>
              </div>

              <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredTemplates.map((template, index) => {
                  const IconComponent = getTemplateIcon(template.category);
                  return (
                    <Card
                      key={template.id}
                      className="template-card-animate group relative overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl"
                    >
                      {/* Browser Frame Preview */}
                      <div className="relative bg-slate-100 p-3 pb-0">
                        {/* Chrome-style browser header */}
                        <div className="bg-slate-200 rounded-t-lg overflow-hidden">
                          {/* Tab bar */}
                          <div className="flex items-center gap-2 px-3 pt-2 pb-1 bg-slate-300/50">
                            {/* Traffic light buttons */}
                            <div className="flex items-center gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"></div>
                              <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors"></div>
                            </div>
                            {/* Active tab */}
                            <div className="flex-1 ml-2">
                              <div className="bg-slate-200 rounded-t-lg px-4 py-1.5 max-w-[180px] flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm bg-orange/80"></div>
                                <span className="text-xs text-slate-600 truncate font-medium">{template.name}</span>
                              </div>
                            </div>
                          </div>

                          {/* Address bar */}
                          <div className="flex items-center gap-2 px-3 py-2 bg-slate-200">
                            <div className="flex items-center gap-1 text-slate-400">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </div>
                            <div className="flex-1 bg-slate-100 rounded-full px-3 py-1 flex items-center">
                              <Lock className="w-3 h-3 text-green-600 mr-2" />
                              <span className="text-xs text-slate-500 truncate">yourwebsite.co.uk</span>
                            </div>
                          </div>
                        </div>

                        {/* Website preview area */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-white border-x border-b border-slate-300 rounded-b-lg">
                          {template.demoUrl !== "#" ? (
                            <>
                              <iframe
                                src={template.demoUrl}
                                width="100%"
                                height="100%"
                                style={{
                                  border: "none",
                                  transform: "scale(0.5)",
                                  transformOrigin: "top left",
                                  width: "200%",
                                  height: "200%",
                                  pointerEvents: "none"
                                }}
                                title={`${template.name} Preview`}
                                loading="lazy"
                              />

                              {/* Hover overlay with view button */}
                              <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                <Link
                                  to={template.demoUrl}
                                  className="bg-white text-navy px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-orange hover:text-white transition-colors"
                                >
                                  <Eye className="h-5 w-5" />
                                  View Demo
                                </Link>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-50 to-slate-100">
                              <span className="text-slate-400">Demo Coming Soon</span>
                            </div>
                          )}
                        </div>

                        {/* Category badge - repositioned */}
                        <div className="absolute bottom-4 left-6 z-10">
                          <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md border border-slate-200">
                            <IconComponent className="h-3.5 w-3.5 text-orange" />
                            <span className="text-xs font-semibold text-navy">{template.category}</span>
                          </div>
                        </div>

                        {/* 5 Pages badge - repositioned */}
                        <div className="absolute bottom-4 right-6 z-10">
                          <div className="bg-green-500 text-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                            <Check className="h-3 w-3" />
                            <span className="text-xs font-semibold">5 Pages</span>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        {/* Title and description */}
                        <h3 className="text-xl font-bold text-navy mb-2">{template.name}</h3>
                        <p className="text-text-secondary text-sm mb-4 leading-relaxed">{template.description}</p>

                        {/* Key features - simplified */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {template.features.slice(0, 3).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Pricing row */}
                        <div className="flex items-center justify-between py-4 border-t border-slate-100">
                          <div>
                            <div className="text-2xl font-bold text-orange">{template.price}</div>
                            <div className="text-xs text-text-secondary">+ {template.monthlyPrice} hosting</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-green-600 font-semibold">One-time purchase</div>
                            <div className="text-xs text-text-secondary">Exclusive to you</div>
                          </div>
                        </div>

                        {/* Action button */}
                        <Button
                          className="w-full btn-primary py-3 text-base font-semibold rounded-xl"
                          onClick={() => handleBuyNow(template)}
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Get This Template
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* No results message */}
              {filteredTemplates.length === 0 && (
                <div className="text-center py-16">
                  <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Palette className="h-10 w-10 text-white/40" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No templates in this category yet</h3>
                  <p className="text-white/60 mb-6">We're working on adding more templates. Check back soon!</p>
                  <Button
                    variant="outline"
                    className="border-orange text-orange hover:bg-orange hover:text-white"
                    onClick={() => setActiveCategory("All")}
                  >
                    View All Templates
                  </Button>
                </div>
              )}

              {/* Call-to-Action after grid */}
              <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl border border-primary/20">
                <h3 className="text-2xl font-bold mb-4 text-white">Can't Find One That Fits?</h3>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  No problem! We make new designs all the time. Just tell us what kind of business you have
                  and we'll create something perfect for you.
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
                <h2 className="heading-primary heading-lg mb-4 text-white">Common Questions</h2>
                <p className="text-xl text-white/90">New to websites? No problem — here's everything explained simply</p>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">What happens after I pay?</h3>
                  <p className="text-white/70 leading-relaxed">
                    We'll send you a short form asking for your business details (name, logo, photos, etc). Then within 2 days, we'll email you a preview of your website to check. Once you're happy, we make it live!
                  </p>
                </Card>

                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">What do I need to provide?</h3>
                  <p className="text-white/70 leading-relaxed">
                    Just your business name, contact details, and any photos you have. Don't have photos? Don't worry — we can find professional images that suit your business. We can even write the text for you.
                  </p>
                </Card>

                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">What's hosting and why do I need it?</h3>
                  <p className="text-white/70 leading-relaxed">
                    Hosting is like renting space on the internet for your website. It's £40/month and includes everything: keeping your site online, secure, backed up, and we fix any problems. You don't need to do anything technical.
                  </p>
                </Card>

                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">Will it work on phones?</h3>
                  <p className="text-white/70 leading-relaxed">
                    Yes! Your website will look great on phones, tablets, and computers. We test everything to make sure it works perfectly on all devices. Most of your customers will probably view it on their phone.
                  </p>
                </Card>

                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">Can I add more pages later?</h3>
                  <p className="text-white/70 leading-relaxed">
                    Absolutely! Extra pages cost £75 each. We'll make them match your website perfectly. Just let us know what you need anytime.
                  </p>
                </Card>

                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">What if I don't like how it looks?</h3>
                  <p className="text-white/70 leading-relaxed">
                    We'll keep making changes until you're completely happy — no extra cost. We won't put your website live until you've approved it. You're in control.
                  </p>
                </Card>

                <Card className="p-6 bg-white/10 border-primary/20 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-white">Do I need to know anything technical?</h3>
                  <p className="text-white/70 leading-relaxed">
                    Not at all! We handle everything — you just tell us about your business and we do the rest. If you can send an email, you can get a website from us.
                  </p>
                </Card>
              </div>

              <div className="text-center mt-12">
                <Button size="lg" variant="secondary" className="bg-primary hover:bg-primary/90 text-white" onClick={scrollToTemplates}>
                  Browse Websites
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
