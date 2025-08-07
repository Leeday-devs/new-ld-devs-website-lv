import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { CheckCircle, Clock, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const BusinessDetailsSuccess = () => {
  return (
    <>
      <SEOHead 
        title="Details Submitted Successfully | L-Development"
        description="Your business details have been submitted successfully. We'll start working on your website and contact you within 24 hours."
        keywords="website details submitted, web design confirmation, professional website development"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <Navigation />
        
        <main>
          <section className="container mx-auto px-4 pt-32 pb-16">
            <div className="max-w-2xl mx-auto text-center">
              {/* Success Icon */}
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>

              {/* Success Message */}
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Thanks for your order!
              </h1>
              
              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                We've received your details and will now begin customising your website. 
                You'll receive your first mockup within 24–48 hours.
              </p>

              {/* Next Steps */}
              <Card className="text-left mb-8">
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    What Happens Next?
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold text-primary">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Confirmation Call (Within 24 Hours)</h3>
                        <p className="text-muted-foreground text-sm">
                          Our team will contact you to confirm project details and timeline.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold text-primary">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Website Development (24-48 Hours)</h3>
                        <p className="text-muted-foreground text-sm">
                          We'll customize your template with your branding and content.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold text-primary">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Review & Launch</h3>
                        <p className="text-muted-foreground text-sm">
                          We'll send you a preview link for approval before going live.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold text-primary">4</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Website Goes Live</h3>
                        <p className="text-muted-foreground text-sm">
                          Your professional website will be live and ready for customers.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-muted/30 mb-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Need to Contact Us?</h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" size="sm" asChild>
                      <a href="mailto:leedaydevs@gmail.com" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        leedaydevs@gmail.com
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="tel:07586266007" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        07586 266007
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/">
                    Back to Home
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/templates">
                    Browse More Templates
                  </Link>
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

export default BusinessDetailsSuccess;