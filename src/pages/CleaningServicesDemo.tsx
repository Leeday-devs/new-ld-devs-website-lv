import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, CheckCircle, Users, Sparkles, ShieldCheck, Leaf, Award, Calculator, Camera, Phone, Mail, MapPin, Calendar, Zap } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const CleaningServicesDemo = () => {
  return (
    <>
      <SEOHead 
        title="SparkleClean Services - Professional Cleaning Services"
        description="Professional domestic and commercial cleaning services. Get a free quote today!"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        {/* Header */}
        <header className="bg-white shadow-lg border-b-2 border-emerald-500">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-3 rounded-xl shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    CrystalClear Pro
                  </h1>
                  <p className="text-sm text-emerald-600 font-medium">Eco-Friendly • Bonded • Insured</p>
                </div>
              </div>
              <nav className="hidden lg:flex gap-8">
                <a href="#services" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Services</a>
                <a href="#areas" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Coverage</a>
                <a href="#reviews" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Reviews</a>
                <a href="#contact" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Contact</a>
              </nav>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <div className="text-sm text-gray-600">24/7 Emergency</div>
                  <div className="text-lg font-bold text-emerald-600">020 8901 2345</div>
                </div>
                <Button className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold shadow-lg">
                  <Calculator className="mr-2 h-4 w-4" />
                  Free Quote
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-slate-100"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-300 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-300 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="h-6 w-6 text-emerald-600" />
                  <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold">
                    London's #1 Rated Cleaning Service
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                  <span className="text-gray-900">Professional</span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    Cleaning Services
                  </span>
                </h1>
                
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Transforming homes and businesses across London with eco-friendly cleaning solutions. 
                  Fully bonded, insured, and committed to excellence since 2018.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-bold shadow-xl">
                    <Calendar className="mr-2 h-6 w-6" />
                    Book Online Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg font-bold">
                    <Phone className="mr-2 h-6 w-6" />
                    Call 020 8901 2345
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="bg-emerald-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <Leaf className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div className="text-sm font-bold text-gray-800">100% Eco-Friendly</div>
                    <div className="text-xs text-gray-600">Safe Products</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <ShieldCheck className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-sm font-bold text-gray-800">Fully Insured</div>
                    <div className="text-xs text-gray-600">£2M Coverage</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <Star className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="text-sm font-bold text-gray-800">5-Star Rated</div>
                    <div className="text-xs text-gray-600">2,500+ Reviews</div>
                  </div>
                </div>
              </div>

              <div className="lg:justify-self-end">
                <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-2xl p-8 max-w-md">
                  <CardContent className="p-0">
                    <div className="text-center mb-6">
                      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-4">
                        GET INSTANT QUOTE
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Assessment</h3>
                      <p className="text-gray-600">No obligation • Same day response</p>
                    </div>
                    
                    <div className="space-y-4">
                      <input type="text" placeholder="Your postcode" className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none" />
                      <select className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none">
                        <option>Select property type</option>
                        <option>1-2 bedroom home</option>
                        <option>3-4 bedroom home</option>
                        <option>5+ bedroom home</option>
                        <option>Small office</option>
                        <option>Large office</option>
                        <option>Retail space</option>
                      </select>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white py-4 text-lg font-bold">
                        <Calculator className="mr-2 h-6 w-6" />
                        Get My Quote Now
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-3 text-center text-sm mt-6">
                        <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                          <Clock className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                          <div className="text-emerald-800 font-bold">Same Day</div>
                          <div className="text-emerald-600">Response</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <CheckCircle className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                          <div className="text-blue-800 font-bold">Fixed Price</div>
                          <div className="text-blue-600">Guaranteed</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Cleaning Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From regular maintenance to specialized deep cleans, we deliver exceptional results 
                using eco-friendly products and industry-leading techniques.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-emerald-500">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-emerald-100 p-4 rounded-xl group-hover:bg-emerald-200 transition-colors">
                      <Users className="h-8 w-8 text-emerald-600" />
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Most Popular</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Residential Cleaning</h3>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span>Kitchen & bathroom sanitization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span>Vacuum & mop all floors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span>Dust furniture & surfaces</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span>Trash removal & fresh linens</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">From £28/hour</div>
                    <p className="text-sm text-gray-500 mb-4">Weekly, fortnightly, or monthly service</p>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      Book Residential Clean
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-200 transition-colors">
                      <ShieldCheck className="h-8 w-8 text-blue-600" />
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Professional</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Commercial Cleaning</h3>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>Office buildings & workspaces</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>Retail & hospitality venues</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>Medical & dental practices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>Schools & educational facilities</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <div className="text-3xl font-bold text-blue-600 mb-2">Custom Quote</div>
                    <p className="text-sm text-gray-500 mb-4">Flexible scheduling available</p>
                    <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
                      Get Commercial Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-purple-500">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-purple-100 p-4 rounded-xl group-hover:bg-purple-200 transition-colors">
                      <Zap className="h-8 w-8 text-purple-600" />
                    </div>
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Deep Clean</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Specialized Services</h3>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span>End of tenancy deep cleans</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span>Post-construction cleanup</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span>Carpet & upholstery cleaning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span>Window cleaning (interior/exterior)</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <div className="text-3xl font-bold text-purple-600 mb-2">From £150</div>
                    <p className="text-sm text-gray-500 mb-4">One-time specialized service</p>
                    <Button variant="outline" className="w-full border-purple-500 text-purple-600 hover:bg-purple-50">
                      Request Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Areas */}
            <div className="mt-16 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Service Areas Across London</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  "Central London", "Kensington", "Chelsea", "Westminster",
                  "Camden", "Islington", "Hackney", "Tower Hamlets",
                  "Greenwich", "Lewisham", "Southwark", "Lambeth"
                ].map((area, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-shadow">
                    <MapPin className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
                    <span className="text-sm font-medium text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 mt-6">
                Don't see your area? <span className="text-emerald-600 font-medium cursor-pointer hover:underline">Contact us</span> - we cover most of Greater London!
              </p>
            </div>
          </div>
        </section>

        {/* Smart Quote Calculator */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Instant Quote Calculator</h2>
                <p className="text-xl text-gray-600">Get an accurate estimate in seconds - no personal details required</p>
              </div>
              
              <Card className="shadow-2xl border-2 border-emerald-200">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-6">Property Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">Property Type</label>
                          <select className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none text-gray-700">
                            <option>Studio Apartment</option>
                            <option>1-2 Bedroom Home</option>
                            <option>3-4 Bedroom Home</option>
                            <option>5+ Bedroom Home</option>
                            <option>Small Office (under 1000 sq ft)</option>
                            <option>Medium Office (1000-3000 sq ft)</option>
                            <option>Large Commercial Space</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">Cleaning Frequency</label>
                          <select className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none text-gray-700">
                            <option>One-time cleaning</option>
                            <option>Weekly (save 15%)</option>
                            <option>Fortnightly (save 10%)</option>
                            <option>Monthly (save 5%)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">Service Type</label>
                          <select className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none text-gray-700">
                            <option>Standard Clean</option>
                            <option>Deep Clean (+50%)</option>
                            <option>End of Tenancy (+75%)</option>
                            <option>Post-Construction (+100%)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-6">Extra Services</h3>
                      <div className="space-y-3 mb-6">
                        {[
                          { name: "Interior windows", price: "+£15" },
                          { name: "Inside oven cleaning", price: "+£25" },
                          { name: "Inside fridge cleaning", price: "+£20" },
                          { name: "Carpet cleaning", price: "+£3/sq m" },
                          { name: "Ironing service", price: "+£15/hour" },
                        ].map((extra, index) => (
                          <label key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" />
                            <span className="flex-1 text-gray-700">{extra.name}</span>
                            <span className="text-emerald-600 font-semibold">{extra.price}</span>
                          </label>
                        ))}
                      </div>
                      
                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 border-2 border-emerald-200">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-2">Estimated Total</div>
                          <div className="text-4xl font-bold text-emerald-600 mb-4">£85-120</div>
                          <div className="text-sm text-gray-500 mb-4">Final price confirmed on site visit</div>
                          <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-3">
                            <Calendar className="mr-2 h-5 w-5" />
                            Book This Service
                          </Button>
                        </div>
                      </div>
                    </div>
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