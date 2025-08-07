import { Phone, Clock, Star, MapPin, Mail, Wrench, Car, Shield, Settings, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AutoRepairDemo = () => {
  const services = [
    {
      icon: Settings,
      title: "Engine Diagnostics",
      description: "Advanced computer diagnostics to identify and resolve engine issues quickly and accurately.",
      price: "From £89"
    },
    {
      icon: Wrench,
      title: "Brake Services",
      description: "Complete brake system inspection, repair, and replacement using quality parts.",
      price: "From £120"
    },
    {
      icon: Car,
      title: "MOT Testing",
      description: "Official MOT testing with same-day results and comprehensive safety checks.",
      price: "£54.85"
    },
    {
      icon: Shield,
      title: "Transmission Repair",
      description: "Expert transmission services from fluid changes to complete rebuilds.",
      price: "From £200"
    },
    {
      icon: Settings,
      title: "Oil Changes",
      description: "Quick and professional oil changes using premium lubricants for all vehicle types.",
      price: "From £45"
    },
    {
      icon: Car,
      title: "Tyre Services",
      description: "Tyre fitting, balancing, alignment, and puncture repairs by trained technicians.",
      price: "From £60"
    }
  ];

  const testimonials = [
    {
      name: "David Wilson",
      location: "Birmingham",
      rating: 5,
      text: "Excellent service! Fixed my car quickly and the price was very reasonable. Highly recommend AutoCare Pro."
    },
    {
      name: "Lisa Parker",
      location: "Solihull",
      rating: 5,
      text: "Honest, reliable mechanics who explain everything clearly. Been using them for 3 years - never disappointed."
    },
    {
      name: "Michael Brown",
      location: "Coventry",
      rating: 5,
      text: "Fast turnaround on my MOT and service. Great customer service and competitive pricing. Will definitely return."
    }
  ];

  const brands = ["BMW", "Mercedes", "Audi", "Volkswagen", "Ford", "Vauxhall", "Toyota", "Honda", "Nissan", "Peugeot"];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-red-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AutoCare Pro</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="font-medium">0121 456 7890</span>
            </div>
            <Button className="bg-white text-red-600 hover:bg-gray-100 font-bold">
              Book Service
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Expert Auto Repair Services</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Professional automotive repairs and maintenance in Birmingham. Over 25 years of experience serving the West Midlands with honest, reliable service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 font-bold">
              <Car className="mr-2 h-5 w-5" />
              Book MOT
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-4 font-bold">
              Free Quote
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Award className="h-12 w-12 mx-auto mb-4 text-red-200" />
              <h3 className="text-xl font-semibold mb-2">25+ Years Experience</h3>
              <p className="text-red-100">Trusted by thousands of satisfied customers</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Shield className="h-12 w-12 mx-auto mb-4 text-red-200" />
              <h3 className="text-xl font-semibold mb-2">12 Month Warranty</h3>
              <p className="text-red-100">All repairs covered by comprehensive warranty</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Users className="h-12 w-12 mx-auto mb-4 text-red-200" />
              <h3 className="text-xl font-semibold mb-2">Qualified Technicians</h3>
              <p className="text-red-100">ASE certified mechanics you can trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From routine maintenance to major repairs, we provide comprehensive automotive services for all makes and models.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-red-600">
                <CardContent className="p-6">
                  <service.icon className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-lg font-bold text-red-600">{service.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands We Service */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">We Service All Major Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {brands.map((brand, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <span className="text-lg font-semibold text-gray-700">{brand}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-gray-600">And many more! If you don't see your vehicle's make, just ask - we likely service it too.</p>
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
              <Card key={index} className="text-center shadow-lg">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-red-600">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get Your Car Serviced Today</h2>
              <p className="text-xl mb-8 text-red-100">
                Need automotive service you can trust? Contact AutoCare Pro today for honest, professional service at competitive prices.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="text-lg">0121 456 7890</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="text-lg">info@autocarepro.co.uk</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="text-lg">456 Garage Street, Birmingham B1 2CD</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-lg">Mon-Fri: 8:00 AM - 6:00 PM</p>
                    <p className="text-red-200">Sat: 8:00 AM - 4:00 PM</p>
                    <p className="text-red-200">Sun: Emergency service only</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-white text-gray-900">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-red-600">Book Your Service</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Email Address" type="email" />
                    <Input placeholder="Phone Number" type="tel" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="Vehicle Make" />
                      <Input placeholder="Vehicle Model" />
                    </div>
                    <Input placeholder="Registration Number" />
                    <select className="w-full p-3 rounded-md border">
                      <option>Select Service Type</option>
                      <option>MOT Test</option>
                      <option>Service & MOT</option>
                      <option>Brake Repair</option>
                      <option>Engine Diagnostics</option>
                      <option>Tyre Services</option>
                      <option>Other</option>
                    </select>
                    <Textarea placeholder="Describe the issue or service needed..." rows={3} />
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold">
                      Book Service
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
          <h3 className="text-2xl font-bold mb-4">AutoCare Pro</h3>
          <p className="text-gray-400 mb-6">Professional automotive service since 1998</p>
          <div className="flex justify-center gap-8 text-sm">
            <span>© 2024 AutoCare Pro</span>
            <span>•</span>
            <span>Licensed & Insured</span>
            <span>•</span>
            <span>12 Month Warranty</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AutoRepairDemo;