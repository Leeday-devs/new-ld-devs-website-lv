import { useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PaymentButton } from "@/components/PaymentButton";
import { 
  ArrowRight, 
  Check, 
  Clock, 
  Users, 
  Palette, 
  Image, 
  Type, 
  Mail,
  ExternalLink,
  Star
} from "lucide-react";

const templates = {
  "plumber-pro": {
    id: 1,
    name: "Plumber Pro",
    description: "Professional plumbing services template with booking system and service showcase",
    price: 350,
    category: "Trades",
    turnaroundTime: "24-48 hours",
    targetAudience: "Plumbing companies, independent plumbers, emergency repair services",
    previewUrl: "https://plumber-pro-demo.vercel.app",
    features: [
      "Service booking system",
      "Emergency contact integration", 
      "Before/after gallery",
      "Customer testimonials",
      "Service area map",
      "Mobile-optimized design"
    ],
    included: [
      "Responsive website design",
      "Contact forms & booking system",
      "Google Maps integration", 
      "Photo gallery",
      "SEO optimization",
      "SSL certificate",
      "1 year hosting included"
    ],
    customizations: [
      "Your logo and branding colors",
      "Business contact information",
      "Service descriptions and pricing",
      "Professional photos",
      "Customer testimonials",
      "Service area coverage"
    ]
  },
  "modern-barber": {
    id: 2,
    name: "Modern Barber",
    description: "Stylish barbershop template with appointment booking and gallery",
    price: 350,
    category: "Beauty & Wellness",
    turnaroundTime: "24-48 hours",
    targetAudience: "Barbershops, hair salons, men's grooming services",
    previewUrl: "https://modern-barber-demo.vercel.app",
    features: [
      "Online appointment booking",
      "Service menu with pricing",
      "Staff profiles",
      "Photo gallery",
      "Customer reviews",
      "Social media integration"
    ],
    included: [
      "Responsive website design",
      "Booking system integration",
      "Payment processing",
      "Photo gallery",
      "SEO optimization", 
      "SSL certificate",
      "1 year hosting included"
    ],
    customizations: [
      "Your logo and brand colors",
      "Staff photos and bios",
      "Service menu and pricing",
      "Shop photos and portfolio",
      "Opening hours and location",
      "Social media links"
    ]
  },
  "electrician-lite": {
    id: 3,
    name: "Electrician Lite",
    description: "Clean, professional electrical services template with contact forms",
    price: 350,
    category: "Trades",
    turnaroundTime: "24-48 hours", 
    targetAudience: "Electrical contractors, electricians, electrical repair services",
    previewUrl: "https://electrician-lite-demo.vercel.app",
    features: [
      "Service request forms",
      "Emergency contact options",
      "Certification displays",
      "Project portfolio",
      "Service area coverage",
      "Professional layout"
    ],
    included: [
      "Responsive website design",
      "Contact and quote forms",
      "Service area mapping",
      "Portfolio gallery",
      "SEO optimization",
      "SSL certificate", 
      "1 year hosting included"
    ],
    customizations: [
      "Company logo and colors",
      "Certification badges",
      "Service descriptions",
      "Project photos",
      "Contact information",
      "Coverage area details"
    ]
  },
  "restaurant-deluxe": {
    id: 4,
    name: "Restaurant Deluxe",
    description: "Full-featured restaurant template with menu, reservations, and online ordering",
    price: 450,
    category: "Food & Beverage",
    turnaroundTime: "48-72 hours",
    targetAudience: "Restaurants, cafes, food delivery services, catering companies", 
    previewUrl: "https://restaurant-deluxe-demo.vercel.app",
    features: [
      "Online menu display",
      "Table reservations",
      "Online ordering system",
      "Photo gallery",
      "Chef profiles",
      "Special events section"
    ],
    included: [
      "Responsive website design",
      "Online ordering integration",
      "Reservation system",
      "Menu management",
      "SEO optimization",
      "SSL certificate",
      "1 year hosting included"
    ],
    customizations: [
      "Restaurant branding and logo",
      "Menu items and pricing",
      "Food photography",
      "Restaurant interior photos",
      "Opening hours and location",
      "Special offers and events"
    ]
  },
  "fitness-studio": {
    id: 5,
    name: "Fitness Studio", 
    description: "Dynamic fitness center template with class schedules and membership plans",
    price: 400,
    category: "Health & Fitness",
    turnaroundTime: "48-72 hours",
    targetAudience: "Gyms, fitness studios, personal trainers, yoga studios",
    previewUrl: "https://fitness-studio-demo.vercel.app",
    features: [
      "Class schedule display",
      "Membership plans",
      "Trainer profiles",
      "Online class booking",
      "Progress tracking",
      "Nutrition tips section"
    ],
    included: [
      "Responsive website design",
      "Class booking system", 
      "Member portal access",
      "Schedule management",
      "SEO optimization",
      "SSL certificate",
      "1 year hosting included"
    ],
    customizations: [
      "Gym branding and colors",
      "Trainer photos and bios",
      "Class schedules and descriptions",
      "Membership pricing",
      "Facility photos",
      "Contact and location info"
    ]
  },
  "auto-repair": {
    id: 6,
    name: "Auto Repair",
    description: "Professional automotive services template with service booking",
    price: 350,
    category: "Automotive", 
    turnaroundTime: "24-48 hours",
    targetAudience: "Auto repair shops, mechanics, car dealerships, tire services",
    previewUrl: "https://auto-repair-demo.vercel.app",
    features: [
      "Service appointment booking",
      "Service descriptions",
      "Before/after galleries",
      "Customer testimonials",
      "Warranty information",
      "Emergency contact"
    ],
    included: [
      "Responsive website design",
      "Appointment booking system",
      "Service catalog",
      "Customer reviews",
      "SEO optimization",
      "SSL certificate",
      "1 year hosting included"
    ],
    customizations: [
      "Shop logo and branding",
      "Service offerings and pricing",
      "Mechanic team photos",
      "Shop facility images",
      "Operating hours",
      "Location and contact details"
    ]
  }
};

const TemplateDetail = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const template = templateId ? templates[templateId as keyof typeof templates] : null;

  if (!template) {
    return <Navigate to="/templates" replace />;
  }

  return (
    <>
      <SEOHead 
        title={`${template.name} Website Template - Professional Design | L-Development`}
        description={`${template.description}. Get your professional ${template.name} website live in ${template.turnaroundTime} for £${template.price}. Perfect for ${template.targetAudience}.`}
        keywords={`${template.name} website template, ${template.category} website design, professional ${template.name} site, ${template.targetAudience} website`}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <Navigation />
        
        <main>
          <div className="container mx-auto px-4 pt-20">
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Website Templates", href: "/templates" },
                { label: template.name, href: `/templates/${templateId}` }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Template Info */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Badge className="bg-primary text-primary-foreground">
                    {template.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">(4.9/5)</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {template.name}
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {template.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">Turnaround</p>
                      <p className="text-sm text-muted-foreground">{template.turnaroundTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">Perfect For</p>
                      <p className="text-sm text-muted-foreground">{template.category}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <PaymentButton 
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg font-semibold"
                    paymentLink="https://buy.stripe.com/aFa00jf1ceRsb9kceV0Ny08"
                    serviceName={`${template.name} Template`}
                    amount={4999}
                  />
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="flex-1 h-12"
                    onClick={() => window.open(template.previewUrl, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Live Preview
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-3xl font-bold text-primary">£{template.price}</p>
                  <p className="text-sm text-muted-foreground">+ £40/month hosting & support</p>
                </div>
              </div>

              {/* Preview */}
              <div className="relative">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
                  <iframe 
                    src={template.previewUrl}
                    className="w-full h-full border-0"
                    title={`${template.name} Preview`}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-lg">
                  Live Preview
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* What's Included */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {template.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Key Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* We'll Customize */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-purple-600" />
                    We'll Customize
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {template.customizations.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="flex items-center gap-1">
                          {index < 2 && <Image className="h-4 w-4 text-blue-600" />}
                          {index >= 2 && index < 4 && <Type className="h-4 w-4 text-green-600" />}
                          {index >= 4 && <Mail className="h-4 w-4 text-orange-600" />}
                        </div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Target Audience */}
          <section className="container mx-auto px-4 py-16">
            <Card className="bg-muted/30">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Perfect For</CardTitle>
                <CardDescription className="text-lg">
                  This template is specifically designed for:
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-medium text-foreground">
                  {template.targetAudience}
                </p>
                <div className="mt-8">
                  <PaymentButton 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
                    paymentLink="https://buy.stripe.com/aFa00jf1ceRsb9kceV0Ny08"
                    serviceName={`${template.name} Template`}
                    amount={4999}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Process */}
          <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground text-lg">From purchase to launch in 3 simple steps</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Purchase Template</h3>
                <p className="text-muted-foreground">
                  Click "Buy Now" and complete your purchase securely with Stripe
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Provide Details</h3>
                <p className="text-muted-foreground">
                  Fill out a simple form with your business information and branding
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Website Live</h3>
                <p className="text-muted-foreground">
                  Your customized website goes live within {template.turnaroundTime}
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TemplateDetail;