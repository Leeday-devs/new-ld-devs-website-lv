import { Phone, Clock, Wrench, Droplet, Zap, Shield, Star, MapPin, Mail, CheckCircle, AlertTriangle, Settings, Home, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WatermarkOverlay from "@/components/WatermarkOverlay";
const PlumberProDemo = () => {
  const services = [
    {
      icon: AlertTriangle,
      title: "Emergency Plumbing",
      description: "24/7 emergency response for burst pipes, leaks, and urgent repairs. Available within 30 minutes.",
      price: "£75",
      callout: "EMERGENCY",
      urgent: true
    },
    {
      icon: Droplet,
      title: "Leak Detection & Repair",
      description: "Advanced leak detection using thermal imaging and acoustic equipment. No damage, accurate results.",
      price: "From £95",
      callout: "POPULAR"
    },
    {
      icon: Settings,
      title: "Boiler Installation",
      description: "Complete boiler replacement and installation service. 10-year warranty on all new boilers.",
      price: "From £2,200",
      callout: "WARRANTY"
    },
    {
      icon: Home,
      title: "Bathroom Installation",
      description: "Full bathroom fitting service from design to completion. Tile work, plumbing, and electrical included.",
      price: "From £3,500",
      callout: "COMPLETE"
    },
    {
      icon: Wrench,
      title: "Pipe Replacement",
      description: "Modern pipe installation using latest materials. Copper, PEX, and PVC systems available.",
      price: "From £150",
      callout: "QUALITY"
    },
    {
      icon: Shield,
      title: "Drain Cleaning",
      description: "Professional drain unblocking using high-pressure jetting. Camera inspection included.",
      price: "From £85",
      callout: "EFFECTIVE"
    }
  ];

  const whyChooseUs = [
    {
      icon: Clock,
      title: "24/7 Emergency Service",
      description: "Round-the-clock availability for urgent plumbing emergencies"
    },
    {
      icon: Shield,
      title: "Fully Licensed & Insured",
      description: "£2M public liability insurance and Gas Safe registered"
    },
    {
      icon: Award,
      title: "10+ Years Experience",
      description: "Serving Manchester and surrounding areas since 2013"
    },
    {
      icon: CheckCircle,
      title: "Fixed Price Guarantee",
      description: "No hidden costs - price quoted is the price you pay"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "Didsbury, Manchester",
      rating: 5,
      text: "Fantastic emergency service! Alex arrived within 20 minutes and fixed our burst pipe professionally. Highly recommend.",
      service: "Emergency Repair"
    },
    {
      name: "Robert Chen",
      location: "Chorlton, Manchester",
      rating: 5,
      text: "Excellent boiler installation. The team was punctual, clean, and explained everything clearly. Great value.",
      service: "Boiler Installation"
    },
    {
      name: "Emma Thompson",
      location: "Sale, Manchester",
      rating: 5,
      text: "Professional bathroom renovation from start to finish. Quality workmanship and fair pricing throughout.",
      service: "Bathroom Fitting"
    }
  ];

  const coverage = [
    "Manchester City Centre", "Didsbury", "Chorlton", "Sale", "Altrincham", "Stockport",
    "Wilmslow", "Cheadle", "Fallowfield", "Withington", "Prestwich", "Eccles"
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans" onContextMenu={(e) => e.preventDefault()}>
      <WatermarkOverlay text="LD Development" />
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 text-sm font-bold">
            <AlertTriangle className="h-4 w-4 animate-pulse" />
            <span>24/7 EMERGENCY PLUMBING SERVICE - CALL NOW: 0161 123 4567</span>
            <AlertTriangle className="h-4 w-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AquaFix Pro</h1>
                <p className="text-sm text-blue-600 font-medium">Manchester's Trusted Plumbers</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <div className="text-sm text-gray-600">Call Now</div>
                <div className="text-lg font-bold text-blue-600">0161 123 4567</div>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Call
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v40c11.046 0 20-8.954 20-20zM0 20c0 11.046 8.954 20 20 20v-40c-11.046 0-20 8.954-20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-medium">Manchester's #1 Rated Plumbers</span>
              </div>
              
              <h2 className="text-5xl font-bold leading-tight mb-6">
                Professional Plumbing Services
                <span className="block text-blue-400">You Can Trust</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                From emergency repairs to complete installations, our certified plumbers deliver reliable solutions 
                across Manchester. Available 24/7 with guaranteed fixed pricing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-bold">
                  <Phone className="mr-2 h-6 w-6" />
                  Call Emergency Line
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-bold">
                  <Mail className="mr-2 h-6 w-6" />
                  Free Quote
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20">
                <div className="text-center">
                  <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">Fully Insured</div>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">Gas Safe Certified</div>
                </div>
                <div className="text-center">
                  <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">24/7 Available</div>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">5-Star Rated</div>
                </div>
              </div>
            </div>

            {/* Emergency Contact Card */}
            <div className="lg:justify-self-end">
              <Card className="bg-white/10 backdrop-blur-md border-2 border-white/20 p-8 max-w-md">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                      EMERGENCY SERVICE
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Need Help Now?</h3>
                    <p className="text-gray-300">Available 24/7 for urgent repairs</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-bold">
                      <Phone className="mr-2 h-6 w-6" />
                      0161 123 4567
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-3 text-center text-sm">
                      <div className="bg-white/10 rounded-lg p-3">
                        <Clock className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                        <div className="text-white font-medium">30 Min</div>
                        <div className="text-gray-400">Response</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mx-auto mb-1" />
                        <div className="text-white font-medium">Fixed Price</div>
                        <div className="text-gray-400">No Hidden Costs</div>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Plumbing Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional plumbing solutions for homes and businesses across Manchester. 
              All work comes with our guarantee and fixed pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`group relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 ${
                service.urgent ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${service.urgent ? 'bg-red-100' : 'bg-blue-100'}`}>
                      <service.icon className={`h-8 w-8 ${service.urgent ? 'text-red-600' : 'text-blue-600'}`} />
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      service.urgent ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      {service.callout}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                    <Button variant="outline" className={`${
                      service.urgent ? 'border-red-500 text-red-600 hover:bg-red-500 hover:text-white' : 
                      'border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white'
                    }`}>
                      Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose AquaFix Pro?</h2>
            <p className="text-xl text-blue-100">Manchester's most trusted plumbing professionals</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-blue-200" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Areas We Cover</h2>
            <p className="text-xl text-gray-600">Serving Manchester and surrounding areas</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {coverage.map((area, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center border-2 border-gray-200 hover:border-blue-500 transition-colors">
                <MapPin className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">{area}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">Don't see your area? <span className="text-blue-600 font-medium cursor-pointer">Contact us</span> - we may still be able to help!</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real reviews from satisfied customers across Manchester</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-l-4 border-l-blue-600 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {testimonial.service}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-blue-600 text-sm">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get Professional Plumbing Help</h2>
              <p className="text-xl text-gray-300 mb-8">
                Need a reliable plumber in Manchester? Contact AquaFix Pro today for honest pricing and quality workmanship.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500 p-3 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Emergency Line</div>
                    <div className="text-xl font-bold">0161 123 4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-lg">info@aquafixpro.co.uk</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Service Area</div>
                    <div className="text-lg">Manchester & Surrounding Areas</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Hours</div>
                    <div className="text-lg">24/7 Emergency Service</div>
                    <div className="text-sm text-gray-400">Mon-Fri: 8AM-6PM (Standard)</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-white text-gray-900">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Request Free Quote</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input placeholder="First Name" className="border-2 border-gray-300" />
                    <Input placeholder="Last Name" className="border-2 border-gray-300" />
                  </div>
                  <Input placeholder="Email Address" type="email" className="border-2 border-gray-300" />
                  <Input placeholder="Phone Number" type="tel" className="border-2 border-gray-300" />
                  <Input placeholder="Postcode" className="border-2 border-gray-300" />
                  <select className="w-full p-3 rounded-md border-2 border-gray-300">
                    <option>Select Service Type</option>
                    <option>Emergency Repair</option>
                    <option>Leak Detection</option>
                    <option>Boiler Installation</option>
                    <option>Bathroom Installation</option>
                    <option>Drain Cleaning</option>
                    <option>Other</option>
                  </select>
                  <Textarea placeholder="Describe your plumbing issue or requirements..." rows={4} className="border-2 border-gray-300" />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg">
                    <Wrench className="mr-2 h-5 w-5" />
                    Get Free Quote
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">AquaFix Pro</h3>
              </div>
              <p className="text-gray-400 mb-4">Manchester's trusted plumbing professionals since 2013.</p>
              <div className="flex gap-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">Gas Safe Registered</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold">Fully Insured</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Emergency Plumbing</li>
                <li>Boiler Installation</li>
                <li>Bathroom Fitting</li>
                <li>Leak Detection</li>
                <li>Drain Cleaning</li>
                <li>Pipe Replacement</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Emergency Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-orange-500" />
                  <span>0161 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span>info@aquafixpro.co.uk</span>
                </div>
                <div className="text-sm text-gray-400 mt-4">
                  Available 24/7 for plumbing emergencies
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 AquaFix Pro. All rights reserved. | Licensed Plumbers Manchester</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlumberProDemo;