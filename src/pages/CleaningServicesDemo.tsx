import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, CheckCircle, Users, Sparkles, ShieldCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const CleaningServicesDemo = () => {
  return (
    <>
      <SEOHead 
        title="SparkleClean Services - Professional Cleaning Services"
        description="Professional domestic and commercial cleaning services. Get a free quote today!"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">SparkleClean</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#services" className="text-gray-600 hover:text-blue-600">Services</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>
              <a href="#reviews" className="text-gray-600 hover:text-blue-600">Reviews</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700">Get Quote</Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Professional Cleaning Services
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Trusted by thousands of homes and businesses. We make your space sparkle with our 
              eco-friendly cleaning solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Book Now
              </Button>
              <Button size="lg" variant="outline">
                Free Quote
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <CardContent>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Residential Cleaning</h3>
                  <p className="text-gray-600 mb-4">Regular house cleaning, deep cleaning, move-in/out cleaning</p>
                  <div className="text-2xl font-bold text-blue-600 mb-2">From £25/hour</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Commercial Cleaning</h3>
                  <p className="text-gray-600 mb-4">Office cleaning, retail spaces, medical facilities</p>
                  <div className="text-2xl font-bold text-green-600 mb-2">Custom Quote</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Specialized Services</h3>
                  <p className="text-gray-600 mb-4">Carpet cleaning, window cleaning, post-construction cleanup</p>
                  <div className="text-2xl font-bold text-purple-600 mb-2">Quote on Request</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quote Calculator Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Get Your Free Quote</h2>
              <Card className="p-6">
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Property Type</label>
                      <select className="w-full p-3 border rounded-lg">
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Office</option>
                        <option>Retail Space</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Rooms</label>
                      <select className="w-full p-3 border rounded-lg">
                        <option>1-2 rooms</option>
                        <option>3-4 rooms</option>
                        <option>5+ rooms</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cleaning Type</label>
                      <select className="w-full p-3 border rounded-lg">
                        <option>Regular Cleaning</option>
                        <option>Deep Cleaning</option>
                        <option>Move-in/out</option>
                        <option>One-time</option>
                      </select>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Calculate Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Absolutely fantastic service! They transformed my home and the attention to detail was incredible."
                  </p>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">Residential Customer</div>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Professional, reliable, and thorough. They've been cleaning our offices for 2 years now."
                  </p>
                  <div className="font-semibold">Mark Thompson</div>
                  <div className="text-sm text-gray-500">Business Owner</div>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Eco-friendly products and amazing results. Highly recommend for anyone with allergies!"
                  </p>
                  <div className="font-semibold">Emma Davis</div>
                  <div className="text-sm text-gray-500">Regular Customer</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Before/After Gallery */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Before & After Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-600">Before/After {i}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready for a Sparkling Clean Space?</h2>
            <p className="text-xl mb-8">Book your cleaning service today and experience the difference</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Call Now: 020 1234 5678
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Book Online
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-6 w-6 text-blue-400" />
                  <span className="text-xl font-bold">SparkleClean</span>
                </div>
                <p className="text-gray-300">
                  Professional cleaning services for homes and businesses across London.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Residential Cleaning</li>
                  <li>Commercial Cleaning</li>
                  <li>Deep Cleaning</li>
                  <li>Move-in/out Cleaning</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <div className="text-gray-300 space-y-2">
                  <div>📞 020 1234 5678</div>
                  <div>✉️ hello@sparkleclean.co.uk</div>
                  <div>📍 London, UK</div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 SparkleClean Services. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CleaningServicesDemo;