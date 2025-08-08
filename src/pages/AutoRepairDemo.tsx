import { 
  Phone, Clock, Star, MapPin, Mail, Wrench, Car, Shield, Settings, Award, Users,
  Gauge, Fuel, Battery, Cog, Calendar, CheckCircle, AlertTriangle, 
  FileText, CreditCard, Timer, Zap, KeyRound, Wind, Thermometer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import WatermarkOverlay from "@/components/WatermarkOverlay";

const AutoRepairDemo = () => {
  const diagnosticServices = [
    { icon: Gauge, title: "Engine Diagnostics", time: "30 mins", price: "£89" },
    { icon: Battery, title: "Electrical Testing", time: "45 mins", price: "£65" },
    { icon: Thermometer, title: "Cooling System", time: "60 mins", price: "£95" },
    { icon: Wind, title: "AC System Check", time: "40 mins", price: "£75" }
  ];

  const services = [
    {
      icon: Wrench,
      title: "Complete Service",
      description: "Full vehicle inspection, oil change, fluid top-ups, and safety checks",
      price: "From £149",
      duration: "2-3 hours",
      warranty: "12 months",
      popular: true
    },
    {
      icon: Shield,
      title: "MOT Testing", 
      description: "Official government test with comprehensive safety and emissions check",
      price: "£54.85",
      duration: "1 hour",
      warranty: "Certificate valid 12 months",
      popular: false
    },
    {
      icon: Gauge,
      title: "Brake Service",
      description: "Complete brake system inspection, pad replacement, and performance testing",
      price: "From £120",
      duration: "2-4 hours", 
      warranty: "24 months",
      popular: false
    },
    {
      icon: Cog,
      title: "Transmission Service",
      description: "Fluid changes, filter replacement, and diagnostic testing for smooth operation",
      price: "From £200",
      duration: "3-5 hours",
      warranty: "18 months",
      popular: false
    },
    {
      icon: Battery,
      title: "Electrical Repairs",
      description: "Battery testing, alternator checks, starter motor repair, and wiring diagnostics",
      price: "From £85",
      duration: "1-3 hours",
      warranty: "12 months", 
      popular: false
    },
    {
      icon: Car,
      title: "Tyre Services",
      description: "New tyres, puncture repairs, wheel alignment, and balancing services",
      price: "From £60",
      duration: "30-90 mins",
      warranty: "Manufacturer warranty",
      popular: false
    }
  ];

  const quickServices = [
    { title: "Oil Change", icon: Fuel, price: "£45", time: "20 mins" },
    { title: "Battery Test", icon: Battery, price: "Free", time: "10 mins" },
    { title: "Brake Check", icon: Shield, price: "Free", time: "15 mins" },
    { title: "Tyre Check", icon: Car, price: "Free", time: "10 mins" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Erdington", 
      rating: 5,
      text: "Brilliant service! They diagnosed my engine problem in minutes and had it fixed the same day. Fair pricing and honest advice.",
      service: "Engine Diagnostics",
      date: "Last week"
    },
    {
      name: "Mark Stevens",
      location: "Kings Heath",
      rating: 5,
      text: "Been using AutoTech Masters for 5 years. Always professional, never try to sell you things you don't need. Highly recommended!",
      service: "Regular Service",
      date: "2 weeks ago"
    },
    {
      name: "Jenny Wilson", 
      location: "Moseley",
      rating: 5,
      text: "Emergency brake repair on Saturday morning. They fitted me in immediately and had me back on the road safely. Excellent!",
      service: "Brake Service",
      date: "1 month ago"
    }
  ];

  const certifications = [
    { title: "MOT Approved", icon: FileText, desc: "Official testing station" },
    { title: "ASE Certified", icon: Award, desc: "Qualified technicians" },
    { title: "AA Approved", icon: CheckCircle, desc: "Trusted garage network" },
    { title: "Fully Insured", icon: Shield, desc: "£2M public liability" }
  ];

  const brands = ["BMW", "Mercedes", "Audi", "Volkswagen", "Ford", "Vauxhall", "Toyota", "Honda", "Nissan", "Peugeot", "Skoda", "SEAT"];

  return (
    <div className="min-h-screen bg-background" onContextMenu={(e) => e.preventDefault()}>
      <WatermarkOverlay text="LD Development" />
      {/* Top Bar */}
      <div className="bg-muted/50 py-2 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              Mon-Fri: 8AM-6PM | Sat: 8AM-4PM
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Serving Birmingham & West Midlands
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-xs">
              <Award className="mr-1 h-3 w-3" />
              MOT Approved Testing Station
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-card shadow-lg sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-destructive rounded-xl">
                <Wrench className="h-7 w-7 text-destructive-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AutoTech Masters</h1>
                <p className="text-xs text-muted-foreground">Expert Auto Repair Since 1995</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <div className="text-destructive font-bold text-lg">0121 789 4560</div>
                <div className="text-xs text-muted-foreground">24/7 Breakdown Service</div>
              </div>
              <Button variant="destructive" size="lg">
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section - Asymmetric Layout */}
      <section className="pt-8 pb-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content - 7 columns */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-6">
                <Badge variant="destructive" className="w-fit">
                  <FileText className="mr-1 h-3 w-3" />
                  MOT Approved Testing Station
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your Car
                  <span className="text-destructive block">Deserves the</span>
                  Best Care
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Professional automotive repair with 30+ years expertise. From MOT testing to complete engine rebuilds - 
                  we keep Birmingham moving with honest, reliable service.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="destructive" className="text-lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Service Online
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  <Phone className="mr-2 h-5 w-5" />
                  Call for Quote
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4 pt-8">
                {quickServices.map((quick, index) => (
                  <div key={index} className="text-center p-4 bg-card border rounded-lg hover-scale">
                    <quick.icon className="h-6 w-6 text-destructive mx-auto mb-2" />
                    <div className="text-sm font-medium text-foreground">{quick.title}</div>
                    <div className="text-xs text-muted-foreground">{quick.time}</div>
                    <div className="text-sm font-bold text-destructive">{quick.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - 5 columns */}
            <div className="lg:col-span-5 space-y-6">
              {/* Diagnostic Services Card */}
              <Card className="border-2 border-destructive/20 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-destructive rounded-lg flex items-center justify-center">
                      <Gauge className="h-6 w-6 text-destructive-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Quick Diagnostics</h3>
                      <p className="text-sm text-muted-foreground">Professional testing available</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {diagnosticServices.map((diag, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <diag.icon className="h-4 w-4 text-destructive" />
                          <span className="font-medium text-foreground">{diag.title}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-destructive">{diag.price}</div>
                          <div className="text-xs text-muted-foreground">{diag.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="destructive">
                    Book Diagnostic Test
                  </Button>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-center p-4 bg-card border rounded-lg">
                    <cert.icon className="h-8 w-8 text-destructive mx-auto mb-2" />
                    <div className="text-sm font-bold text-foreground">{cert.title}</div>
                    <div className="text-xs text-muted-foreground">{cert.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced with warranty info */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Wrench className="mr-1 h-3 w-3" />
              Complete Auto Services
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Professional Car Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From routine maintenance to complex repairs, our certified technicians deliver quality workmanship with transparent pricing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 border-2 ${
                service.popular ? 'border-destructive bg-destructive/5' : 'hover:border-destructive/50'
              }`}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <service.icon className="h-12 w-12 text-destructive" />
                    {service.popular && (
                      <Badge variant="destructive" className="text-xs">
                        POPULAR
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium text-foreground">{service.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Warranty:</span>
                      <span className="font-medium text-foreground">{service.warranty}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-destructive">{service.price}</span>
                    <Button size="sm" variant={service.popular ? "destructive" : "outline"}>
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section - Carousel Style */}
      <section className="py-16 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">We Service All Vehicle Makes</h3>
            <p className="text-muted-foreground">Specialized expertise across European, Japanese, and domestic brands</p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
            {brands.map((brand, index) => (
              <div key={index} className="text-center p-4 bg-background border rounded-lg hover-scale cursor-pointer transition-all">
                <span className="text-sm font-bold text-foreground">{brand}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Don't see your vehicle's make? <span className="text-destructive font-medium cursor-pointer">Contact us</span> - we likely service it too!
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews with Service Tags */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Star className="mr-1 h-3 w-3" />
              Customer Reviews
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">Real feedback from Birmingham drivers who trust us with their vehicles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-destructive/50 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-destructive text-destructive" />
                      ))}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.service}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                        <span className="text-destructive font-bold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{testimonial.date}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Garage-focused */}
      <section className="py-20 bg-destructive text-destructive-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-destructive via-destructive/95 to-destructive"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4 bg-destructive-foreground text-destructive">
                  <Timer className="mr-1 h-3 w-3" />
                  Same Day Service Available
                </Badge>
                <h2 className="text-4xl font-bold mb-4">
                  Ready to Book Your Service?
                </h2>
                <p className="text-xl opacity-90 mb-8">
                  Get your vehicle back on the road with confidence. Our experienced technicians are ready to help with honest advice and fair pricing.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-destructive-foreground/10 rounded-lg backdrop-blur-sm">
                  <Phone className="h-8 w-8 text-destructive-foreground" />
                  <div>
                    <div className="text-2xl font-bold">0121 789 4560</div>
                    <div className="text-sm opacity-75">Call for immediate assistance</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-destructive-foreground/10 rounded-lg backdrop-blur-sm">
                  <Mail className="h-8 w-8 text-destructive-foreground" />
                  <div>
                    <div className="text-lg font-medium">service@autotechmasters.co.uk</div>
                    <div className="text-sm opacity-75">Email for quotes and inquiries</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-destructive-foreground/10 rounded-lg backdrop-blur-sm">
                  <MapPin className="h-8 w-8 text-destructive-foreground" />
                  <div>
                    <div className="text-lg font-medium">123 Garage Lane, Birmingham B12 9XY</div>
                    <div className="text-sm opacity-75">Easy parking & public transport links</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-destructive-foreground/10 rounded-lg backdrop-blur-sm">
                  <Clock className="h-8 w-8 text-destructive-foreground" />
                  <div>
                    <div className="text-lg font-medium">Mon-Fri: 8AM-6PM | Sat: 8AM-4PM</div>
                    <div className="text-sm opacity-75">Emergency breakdown service 24/7</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/95 backdrop-blur-sm border rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">Book Your Service</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="First Name" className="bg-background" />
                  <Input placeholder="Last Name" className="bg-background" />
                </div>
                <Input placeholder="Email Address" type="email" className="bg-background" />
                <Input placeholder="Phone Number" type="tel" className="bg-background" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Vehicle Make" className="bg-background" />
                  <Input placeholder="Vehicle Model" className="bg-background" />
                </div>
                <Input placeholder="Registration Number" className="bg-background" />
                <select className="w-full p-3 rounded-md border bg-background text-foreground">
                  <option>Select Service Type</option>
                  <option>MOT Test (£54.85)</option>
                  <option>Service + MOT (from £199)</option>
                  <option>Brake Service (from £120)</option>
                  <option>Engine Diagnostics (£89)</option>
                  <option>Tyre Services (from £60)</option>
                  <option>Electrical Repair (from £85)</option>
                  <option>Other</option>
                </select>
                <Textarea 
                  placeholder="Describe any issues or specific requirements..." 
                  rows={3} 
                  className="bg-background"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="destructive" className="bg-destructive hover:bg-destructive/90">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Service
                  </Button>
                  <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Instead
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-destructive rounded-xl">
                  <Wrench className="h-8 w-8 text-destructive-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">AutoTech Masters</h3>
                  <p className="text-sm text-muted-foreground">Birmingham's Trusted Auto Experts</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Serving Birmingham's automotive needs since 1995. Professional repairs, honest advice, competitive pricing. 
                Your satisfaction is our guarantee.
              </p>
              <div className="flex gap-4">
                <Badge variant="outline" className="text-xs">
                  <FileText className="mr-1 h-3 w-3" />
                  MOT Approved
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Award className="mr-1 h-3 w-3" />
                  ASE Certified
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Shield className="mr-1 h-3 w-3" />
                  Fully Insured
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>MOT Testing</li>
                <li>Full Service</li>
                <li>Brake Repairs</li>
                <li>Engine Diagnostics</li>
                <li>Electrical Repairs</li>
                <li>Tyre Services</li>
                <li>Transmission Service</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-destructive" />
                  <span>0121 789 4560</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-destructive" />
                  <span>service@autotechmasters.co.uk</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-destructive" />
                  <span>123 Garage Lane, Birmingham</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-destructive" />
                  <span>Mon-Fri: 8AM-6PM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <span>© 2024 AutoTech Masters. All rights reserved.</span>
              <div className="flex gap-4">
                <span>MOT Approved Testing Station</span>
                <span>•</span>
                <span>ASE Certified Technicians</span>
                <span>•</span>
                <span>12 Month Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AutoRepairDemo;