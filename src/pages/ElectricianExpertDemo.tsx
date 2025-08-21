import { 
  Phone, Clock, Zap, Home, Building, Shield, Star, MapPin, Mail, 
  Lightbulb, AlertTriangle, Wrench, Cable, Power, CheckCircle, 
  Award, Timer, BatteryCharging, Gauge, Settings, Eye, Truck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
const ElectricianExpertDemo = () => {
  const emergencyServices = [
    { icon: AlertTriangle, title: "Power Outages", response: "< 30 mins" },
    { icon: Zap, title: "Electrical Faults", response: "< 45 mins" },
    { icon: Shield, title: "Safety Hazards", response: "< 20 mins" },
    { icon: Power, title: "Circuit Failures", response: "< 60 mins" }
  ];

  const services = [
    {
      icon: Wrench,
      title: "Complete Rewiring",
      description: "Full electrical system overhauls with modern safety standards",
      price: "From £1,200",
      urgent: false
    },
    {
      icon: Cable,
      title: "Panel Upgrades",
      description: "Electrical panel modernization for increased capacity",
      price: "From £800",
      urgent: false
    },
    {
      icon: BatteryCharging,
      title: "EV Charging Installation",
      description: "Home electric vehicle charging point installation",
      price: "From £450",
      urgent: false
    },
    {
      icon: AlertTriangle,
      title: "Emergency Repairs",
      description: "24/7 urgent electrical fault fixing and safety restoration",
      price: "Call for quote",
      urgent: true
    },
    {
      icon: Eye,
      title: "Electrical Testing",
      description: "EICR certificates and PAT testing for compliance",
      price: "From £120",
      urgent: false
    },
    {
      icon: Lightbulb,
      title: "Smart Home Setup",
      description: "Intelligent lighting and automation system installation",
      price: "From £300",
      urgent: false
    }
  ];

  const certifications = [
    { title: "NICEIC Approved", icon: Award, desc: "Registered electrical contractor" },
    { title: "Part P Certified", icon: CheckCircle, desc: "Building regulations compliant" },
    { title: "18th Edition", icon: Settings, desc: "Latest wiring regulations" },
    { title: "Fully Insured", icon: Shield, desc: "£2M public liability cover" }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "Solihull",
      rating: 5,
      text: "Emergency call-out at 11PM - they were here in 25 minutes and had our power restored safely. Exceptional service!",
      service: "Emergency Repair"
    },
    {
      name: "James Thompson",
      location: "Sutton Coldfield", 
      rating: 5,
      text: "Complete house rewire completed on time and budget. Clean, professional, and zero disruption to daily life.",
      service: "Complete Rewiring"
    },
    {
      name: "Emma Roberts",
      location: "Kings Heath",
      rating: 5,
      text: "EV charging point installed perfectly. Great advice on optimal placement and future-proofing options.",
      service: "EV Charging"
    }
  ];

  return (
    <div className="min-h-screen bg-background" onContextMenu={(e) => e.preventDefault()}>
      {/* Emergency Header Bar */}
      <div className="bg-destructive text-destructive-foreground py-2">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            <span>24/7 EMERGENCY ELECTRICAL SERVICE - CALL NOW: 0121 456 7890</span>
            <AlertTriangle className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Fixed Navigation */}
      <nav className="fixed top-10 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">PowerMax Electric</h1>
                <p className="text-xs text-muted-foreground">NICEIC Approved Contractor</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <span className="text-sm text-muted-foreground">Emergency Hotline:</span>
              <div className="flex items-center gap-2 text-primary font-bold">
                <Phone className="h-4 w-4" />
                <span>0121 456 7890</span>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Timer className="mr-2 h-4 w-4" />
                Quick Quote
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Split Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="border-primary text-primary">
                  <Zap className="mr-1 h-3 w-3" />
                  NICEIC Approved Contractor
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Emergency
                  <span className="text-primary block">Electrical</span>
                  Experts
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  When electrical emergencies strike, trust Birmingham's fastest-responding certified electricians. 
                  Available 24/7 with guaranteed response times.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  EMERGENCY CALL
                </Button>
                <Button size="lg" variant="outline">
                  <Timer className="mr-2 h-5 w-5" />
                  Free Quote
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Emergency Service</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-3xl font-bold text-primary">&lt;30min</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
              </div>
            </div>

            {/* Right Content - Emergency Services */}
            <div className="space-y-6">
              <div className="bg-card border rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  Emergency Response Times
                </h3>
                <div className="space-y-4">
                  {emergencyServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <service.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">{service.title}</span>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {service.response}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {certifications.slice(0, 4).map((cert, index) => (
                  <div key={index} className="text-center p-4 bg-card border rounded-lg">
                    <cert.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium text-foreground">{cert.title}</div>
                    <div className="text-xs text-muted-foreground">{cert.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Pricing */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Settings className="mr-1 h-3 w-3" />
              Professional Services
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Electrical Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From emergency repairs to complete electrical installations, we provide transparent pricing and guaranteed workmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 border-2 ${
                service.urgent ? 'border-destructive hover:border-destructive bg-destructive/5' : 'hover:border-primary'
              }`}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <service.icon className={`h-12 w-12 ${
                      service.urgent ? 'text-destructive' : 'text-primary'
                    }`} />
                    {service.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        URGENT
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-lg ${
                      service.urgent ? 'text-destructive' : 'text-primary'
                    }`}>
                      {service.price}
                    </span>
                    <Button size="sm" variant={service.urgent ? "destructive" : "default"}>
                      {service.urgent ? 'Call Now' : 'Get Quote'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Shield className="mr-1 h-3 w-3" />
              Certified & Trusted
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose PowerMax Electric?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry certifications, rapid response times, and exceptional customer satisfaction make us Birmingham's most trusted electrical contractor.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-6 bg-card border rounded-xl hover:shadow-lg transition-shadow">
                <cert.icon className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">{cert.desc}</p>
              </div>
            ))}
          </div>

          {/* Customer Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.service}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4 bg-primary-foreground text-primary">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Emergency Service Available
                </Badge>
                <h2 className="text-4xl font-bold mb-4">
                  Electrical Emergency?
                </h2>
                <p className="text-xl opacity-90 mb-8">
                  Don't risk your safety. Our certified emergency electricians are standing by 24/7 to handle any electrical crisis.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                  <Phone className="h-8 w-8 text-primary-foreground" />
                  <div>
                    <div className="text-2xl font-bold">0121 456 7890</div>
                    <div className="text-sm opacity-75">24/7 Emergency Hotline</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                  <Mail className="h-8 w-8 text-primary-foreground" />
                  <div>
                    <div className="text-lg font-medium">emergency@powermaxelectric.co.uk</div>
                    <div className="text-sm opacity-75">Quick response guaranteed</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                  <Truck className="h-8 w-8 text-primary-foreground" />
                  <div>
                    <div className="text-lg font-medium">Birmingham & West Midlands</div>
                    <div className="text-sm opacity-75">Full service coverage area</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/95 backdrop-blur-sm border rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">Get Emergency Quote</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="First Name" className="bg-background" />
                  <Input placeholder="Last Name" className="bg-background" />
                </div>
                <Input placeholder="Email Address" type="email" className="bg-background" />
                <Input placeholder="Phone Number" type="tel" className="bg-background" />
                <Textarea 
                  placeholder="Describe your electrical emergency or service needed..." 
                  rows={4} 
                  className="bg-background"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Emergency Call
                  </Button>
                  <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
                    <Timer className="mr-2 h-4 w-4" />
                    Schedule Service
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
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                  <Zap className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">PowerMax Electric</h3>
                  <p className="text-sm text-muted-foreground">Birmingham's Emergency Electrical Experts</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Professional electrical services with guaranteed response times. NICEIC approved contractor serving Birmingham and the West Midlands.
              </p>
              <div className="flex gap-4">
                <Badge variant="outline" className="text-xs">
                  <Award className="mr-1 h-3 w-3" />
                  NICEIC Approved
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Shield className="mr-1 h-3 w-3" />
                  £2M Insured
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">Emergency Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Power Outage Repair</li>
                <li>Electrical Fault Finding</li>
                <li>Safety Inspections</li>
                <li>Circuit Breaker Issues</li>
                <li>Emergency Rewiring</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>0121 456 7890</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>info@powermaxelectric.co.uk</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Birmingham & West Midlands</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <span>© 2024 PowerMax Electric. All rights reserved.</span>
              <div className="flex gap-4">
                <span>24/7 Emergency Service</span>
                <span>•</span>
                <span>NICEIC Certified</span>
                <span>•</span>
                <span>Fully Insured</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ElectricianExpertDemo;