import { Phone, Clock, Zap, Home, Building, Shield, Star, MapPin, Mail, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ElectricianExpertDemo = () => {
  const services = [
    {
      icon: Home,
      title: "Residential Wiring",
      description: "Complete home electrical installations and rewiring services for modern living."
    },
    {
      icon: Building,
      title: "Commercial Electrical",
      description: "Professional electrical services for offices, shops, and commercial properties."
    },
    {
      icon: Lightbulb,
      title: "LED Installations",
      description: "Energy-efficient LED lighting installations to reduce your electricity bills."
    },
    {
      icon: Shield,
      title: "Safety Inspections",
      description: "Comprehensive electrical safety testing and certification services."
    },
    {
      icon: Zap,
      title: "Fault Finding",
      description: "Expert electrical fault diagnosis and repair services with guaranteed results."
    },
    {
      icon: Clock,
      title: "Emergency Callouts",
      description: "24/7 emergency electrical services for urgent repairs and safety issues."
    }
  ];

  const testimonials = [
    {
      name: "David Wilson",
      location: "Birmingham",
      rating: 5,
      text: "VoltSure completely rewired our Victorian house. Professional, clean, and finished on time. Excellent work!"
    },
    {
      name: "Lisa Chen",
      location: "Coventry",
      rating: 5,
      text: "Quick response for our emergency electrical fault. Fixed the problem efficiently and at a fair price."
    },
    {
      name: "Robert Clarke",
      location: "Wolverhampton",
      rating: 5,
      text: "Fantastic LED installation throughout our office. Significant energy savings and much brighter workspace."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-yellow-400 py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">VoltSure Electrical</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="font-medium">0121 456 7890</span>
            </div>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
              Call Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-yellow-400">Expert</span> Electrical Services
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Certified electricians providing safe, reliable electrical solutions for homes and businesses across Birmingham and the West Midlands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-4">
              <Phone className="mr-2 h-5 w-5" />
              Get Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black text-lg px-8 py-4">
              View Services
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Zap className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2">NICEIC Certified</h3>
              <p>Fully qualified and certified electrical contractors</p>
            </div>
            <div>
              <Shield className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p>All work complies with latest electrical regulations</p>
            </div>
            <div>
              <Star className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2">5-Star Service</h3>
              <p>Highly rated by customers throughout the region</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Electrical Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From simple repairs to complex installations, our certified electricians deliver safe, reliable electrical solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2 hover:border-yellow-400">
                <CardContent className="p-8">
                  <service.icon className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
            <p className="text-xl text-gray-600">See what our satisfied customers say about our electrical services.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Contact <span className="text-yellow-400">VoltSure</span>
              </h2>
              <p className="text-xl mb-8">
                Need an electrician? Contact us today for a free quote or emergency electrical service.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-yellow-400" />
                  <span className="text-lg">0121 456 7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-yellow-400" />
                  <span className="text-lg">info@voltsureelectrical.co.uk</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-yellow-400" />
                  <span className="text-lg">Birmingham & West Midlands</span>
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-white text-gray-900">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Get Your Quote</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Email Address" type="email" />
                    <Input placeholder="Phone Number" type="tel" />
                    <Textarea placeholder="Describe your electrical needs..." rows={4} />
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">
            VoltSure <span className="text-yellow-400">Electrical</span>
          </h3>
          <p className="text-gray-400 mb-6">Safe, reliable electrical solutions</p>
          <div className="flex justify-center gap-8 text-sm">
            <span>© 2024 VoltSure Electrical</span>
            <span>•</span>
            <span>NICEIC Certified</span>
            <span>•</span>
            <span>24/7 Emergency Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ElectricianExpertDemo;