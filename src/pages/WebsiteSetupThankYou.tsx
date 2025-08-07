import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, Phone, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";

const WebsiteSetupThankYou = () => {
  return (
    <>
      <SEOHead 
        title="Thank You - Your Website is Being Prepared | L-Development"
        description="Thank you for your submission! We're now preparing your custom website and will send you a mockup within 24-48 hours."
        keywords="thank you, website setup, confirmation, custom website"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <Navigation />
        
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Thank You!
              </h1>
            </div>

            <Card className="shadow-lg mb-8">
              <CardContent className="p-8">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p className="text-xl font-semibold text-foreground">
                    Thanks for your order!
                  </p>
                  
                  <p>
                    We've received your info and will begin customising your website.
                  </p>
                  
                  <p>
                    You'll receive your first mockup within <span className="font-semibold text-primary">24–48 hours</span>.
                  </p>
                  
                  <div className="bg-muted/50 rounded-lg p-6 mt-6">
                    <p className="font-semibold text-foreground mb-4">Got questions? Contact us:</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <a 
                          href="mailto:leedaydevs@gmail.com" 
                          className="text-primary hover:underline font-medium"
                        >
                          leedaydevs@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <a 
                          href="tel:07586266007" 
                          className="text-primary hover:underline font-medium"
                        >
                          07586 266007
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              asChild 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3"
            >
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WebsiteSetupThankYou;