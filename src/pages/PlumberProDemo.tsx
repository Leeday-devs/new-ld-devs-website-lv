import { Phone, Clock, Wrench, Droplet, Zap, Shield, Star, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PlumberProDemo = () => {
  const services = [
    {
      icon: Droplet,
      title: "Leak Repairs",
      description: "Fast and reliable leak detection and repair services for your home or business."
    },
    {
      icon: Zap,
      title: "Boiler Installations",
      description: "Professional boiler installation and replacement with full warranty coverage."
    },
    {
      icon: Clock,
      title: "Emergency Callouts",
      description: "24/7 emergency plumbing services when you need us most."
    },
    {
      icon: Wrench,
      title: "Pipe Repairs",
      description: "Complete pipe repair and replacement services using quality materials."
    },
    {
      icon: Shield,
      title: "Bathroom Fitting",
      description: "Full bathroom installation and renovation services from start to finish."
    },
    {
      icon: Droplet,
      title: "Drain Cleaning",
      description: "Professional drain unblocking and cleaning services for all pipe sizes."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Manchester",
      rating: 5,
      text: "Excellent service! Fixed our emergency leak within 2 hours of calling. Highly professional and reasonably priced."
    },
    {
      name: "Mike Thompson",
      location: "Leeds",
      rating: 5,
      text: "PlumbSafe installed our new boiler perfectly. Clean work, on time, and great aftercare service."
    },
    {
      name: "Emma Davies",
      location: "Sheffield",
      rating: 5,
      text: "Fantastic bathroom renovation. The team was courteous, skilled, and completed everything on schedule."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">PlumbSafe Solutions</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="font-medium">0800 123 4567</span>
            </div>
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Call Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Professional Plumbing Services</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Trusted local plumbers providing 24/7 emergency services, installations, and repairs across Manchester and surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              <Phone className="mr-2 h-5 w-5" />
              Call for Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
              View Services
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Clock className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-semibold mb-2">24/7 Emergency</h3>
              <p>Available round the clock for urgent repairs</p>
            </div>
            <div>
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
              <p>All work covered by comprehensive insurance</p>
            </div>
            <div>
              <Star className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-semibold mb-2">5-Star Rated</h3>
              <p>Highly rated by hundreds of satisfied customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From emergency repairs to complete installations, we provide comprehensive plumbing solutions for your home and business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <service.icon className="h-16 w-16 text-blue-600 mx-auto mb-6" />
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it - see what our satisfied customers have to say.</p>
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
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-xl mb-8">
                Need a plumber? Get in touch today for a free quote or emergency callout.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6" />
                  <span className="text-lg">0800 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6" />
                  <span className="text-lg">info@plumbsafesolutions.co.uk</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6" />
                  <span className="text-lg">Covering Manchester & Surrounding Areas</span>
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-white text-gray-900">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Request a Quote</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Email Address" type="email" />
                    <Input placeholder="Phone Number" type="tel" />
                    <Textarea placeholder="Describe your plumbing needs..." rows={4} />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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
          <h3 className="text-2xl font-bold mb-4">PlumbSafe Solutions</h3>
          <p className="text-gray-400 mb-6">Professional plumbing services you can trust</p>
          <div className="flex justify-center gap-8 text-sm">
            <span>© 2024 PlumbSafe Solutions</span>
            <span>•</span>
            <span>Licensed & Insured</span>
            <span>•</span>
            <span>24/7 Emergency Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlumberProDemo;