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
      
      <div className="min-h-screen bg-white">
        
        {/* Professional Blue Header */}
        <header className="bg-slate-800 text-white shadow-2xl">
          <div className="container mx-auto px-4 py-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-lg shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    CrystalClear Professional
                  </h1>
                  <p className="text-blue-200 text-sm">Commercial & Residential Cleaning Specialists</p>
                </div>
              </div>
              <nav className="hidden lg:flex gap-8 text-sm font-medium">
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">SERVICES</a>
                <a href="#commercial" className="text-gray-300 hover:text-white transition-colors">COMMERCIAL</a>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">ABOUT</a>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">CONTACT</a>
              </nav>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <div className="text-blue-200 text-xs">24/7 EMERGENCY</div>
                  <div className="text-xl font-bold">020 8901 2345</div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3">
                  FREE ESTIMATE
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Corporate Hero Section */}
        <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block mb-6 text-sm font-bold">
                LONDON'S MOST TRUSTED CLEANING COMPANY
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
                Professional Cleaning
                <br />
                <span className="text-blue-400">Services That Deliver</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                Serving London's top businesses and discerning homeowners with comprehensive cleaning solutions. 
                Fully bonded, insured, and certified to industry standards.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-bold">
                  <Phone className="mr-3 h-6 w-6" />
                  CALL NOW
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-10 py-4 text-lg font-bold">
                  <Calculator className="mr-3 h-6 w-6" />
                  GET QUOTE
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
                  <div className="text-white text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">£2M</div>
                  <div className="text-white text-sm">Insurance Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                  <div className="text-white text-sm">Emergency Service</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Services Section */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Industry-Leading Cleaning Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive cleaning services for commercial and residential properties. 
                Trusted by London's leading businesses and property managers.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Commercial Services */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-blue-600 pl-4">
                  COMMERCIAL SERVICES
                </h3>
                <div className="space-y-6">
                  <Card className="border-l-4 border-l-blue-600 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <ShieldCheck className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">Office Buildings</h4>
                          <p className="text-gray-600">Daily, weekly, monthly contracts</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-lg font-bold text-blue-600">From £2.50/sqm</span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Reception & common areas</li>
                        <li>• Workstations & meeting rooms</li>
                        <li>• Kitchen & bathroom facilities</li>
                        <li>• Floor care & window cleaning</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-slate-600 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-slate-100 p-3 rounded-lg">
                          <Users className="h-6 w-6 text-slate-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">Retail & Hospitality</h4>
                          <p className="text-gray-600">Customer-facing environments</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-lg font-bold text-slate-600">Custom Quote</span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Shop floors & display areas</li>
                        <li>• Customer restrooms</li>
                        <li>• Staff areas & storage</li>
                        <li>• Deep clean & maintenance</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-600 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <Leaf className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">Medical Facilities</h4>
                          <p className="text-gray-600">Healthcare-grade sanitization</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-lg font-bold text-green-600">£3.50+/sqm</span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Clinical area disinfection</li>
                        <li>• Waiting rooms & reception</li>
                        <li>• Medical waste disposal</li>
                        <li>• Compliance documentation</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Residential Services */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-gray-600 pl-4">
                  RESIDENTIAL SERVICES
                </h3>
                <div className="space-y-6">
                  <Card className="border-l-4 border-l-gray-600 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <Clock className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">Regular House Cleaning</h4>
                          <p className="text-gray-600">Weekly, fortnightly, monthly</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-lg font-bold text-gray-600">From £25/hour</span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• All rooms cleaned & dusted</li>
                        <li>• Kitchen & bathroom deep clean</li>
                        <li>• Floor vacuuming & mopping</li>
                        <li>• Bin emptying & fresh linens</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-500 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-red-100 p-3 rounded-lg">
                          <Zap className="h-6 w-6 text-red-500" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">End of Tenancy</h4>
                          <p className="text-gray-600">Move-in/out deep cleaning</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-lg font-bold text-red-500">From £180</span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Comprehensive deep clean</li>
                        <li>• Inside appliances & cupboards</li>
                        <li>• Carpet & upholstery cleaning</li>
                        <li>• Deposit guarantee included</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-600 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <Award className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">Post-Construction</h4>
                          <p className="text-gray-600">Builder's clean & restoration</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-lg font-bold text-purple-600">From £250</span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Dust & debris removal</li>
                        <li>• Paint & adhesive cleaning</li>
                        <li>• Window & fixture restoration</li>
                        <li>• Final inspection included</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
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