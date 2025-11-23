import { Phone, Clock, Scissors, Star, MapPin, Mail, Calendar, Zap, Sparkles, Crown, ShoppingBag, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const ModernBarberDemo = () => {
  const services = [
    {
      icon: Scissors,
      title: "Signature Cut",
      description: "Precision cuts crafted by master barbers using traditional techniques with modern flair.",
      price: "£35",
      duration: "45 min"
    },
    {
      icon: Sparkles,
      title: "Royal Shave",
      description: "Classic hot towel experience with premium bay rum and hand-forged steel.",
      price: "£28",
      duration: "30 min"
    },
    {
      icon: Crown,
      title: "Beard Sculpting",
      description: "Artisanal beard trimming and styling with organic oils and balms.",
      price: "£22",
      duration: "25 min"
    },
    {
      icon: Zap,
      title: "The Full Treatment",
      description: "Complete grooming experience: cut, shave, beard work, and scalp massage.",
      price: "£65",
      duration: "90 min"
    }
  ];

  const gallery = [
    { style: "Classic Pompadour", category: "Signature Cuts" },
    { style: "Modern Fade", category: "Contemporary" },
    { style: "Vintage Side Part", category: "Traditional" },
    { style: "Textured Quiff", category: "Trendy" },
    { style: "Slicked Back", category: "Executive" },
    { style: "Crew Cut", category: "Clean & Sharp" }
  ];

  const testimonials = [
    {
      name: "Oliver Hayes",
      location: "Shoreditch",
      rating: 5,
      text: "Absolute artistry. Marcus transformed my look completely. The attention to detail is unmatched."
    },
    {
      name: "Sebastian Wright",
      location: "Canary Wharf",
      rating: 5,
      text: "Best barbershop in London. The atmosphere, skill level, and service are all exceptional."
    },
    {
      name: "James Morrison",
      location: "Mayfair",
      rating: 5,
      text: "Been coming here for 18 months. Consistently excellent work and genuinely enjoyable experience."
    }
  ];

  const barbers = [
    { name: "Marcus Rodriguez", specialty: "Fades & Modern Cuts", experience: "12 years" },
    { name: "Viktor Petrov", specialty: "Traditional Shaves", experience: "15 years" },
    { name: "Alessandro Bianchi", specialty: "Beard Sculpting", experience: "8 years" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 font-serif" onContextMenu={(e) => e.preventDefault()}>
      {/* Floating Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 backdrop-blur-md rounded-full px-8 py-3 border border-amber-600/30">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-amber-400" />
            <span className="text-white font-bold text-lg">MERIDIAN</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="text-gray-300 hover:text-amber-400 transition-colors">Services</a>
            <a href="#gallery" className="text-gray-300 hover:text-amber-400 transition-colors">Gallery</a>
            <a href="#team" className="text-gray-300 hover:text-amber-400 transition-colors">Team</a>
            <a href="#book" className="text-gray-300 hover:text-amber-400 transition-colors">Book</a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-amber-400" />
            <span className="text-white text-sm font-medium">020 7891 2345</span>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-0.5 bg-amber-400"></div>
                  <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">Est. 2018</span>
                </div>
                <h1 className="text-7xl font-bold leading-tight mb-6">
                  Craft.<br />
                  <span className="text-amber-400">Precision.</span><br />
                  Style.
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Where traditional barbering meets contemporary artistry. Experience bespoke grooming in London's most distinguished barbershop.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white border border-amber-600 px-8 py-4 text-lg font-semibold">
                  <Calendar className="mr-2 h-5 w-5" />
                  Reserve Appointment
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Virtual Consultation
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">1000+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Satisfied Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">6</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Years Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">3</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Master Barbers</div>
                </div>
              </div>
            </div>

            {/* Right Visual Element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-2xl p-8 backdrop-blur-sm border border-amber-600/30">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-black/50 rounded-xl p-6 border border-amber-600/20">
                    <Scissors className="h-8 w-8 text-amber-400 mb-4" />
                    <h3 className="text-white font-semibold mb-2">Master Cuts</h3>
                    <p className="text-gray-300 text-sm">Precision styling with artistic flair</p>
                  </div>
                  <div className="bg-black/50 rounded-xl p-6 border border-amber-600/20">
                    <Sparkles className="h-8 w-8 text-amber-400 mb-4" />
                    <h3 className="text-white font-semibold mb-2">Royal Treatment</h3>
                    <p className="text-gray-300 text-sm">Premium hot towel experience</p>
                  </div>
                  <div className="bg-black/50 rounded-xl p-6 border border-amber-600/20">
                    <Crown className="h-8 w-8 text-amber-400 mb-4" />
                    <h3 className="text-white font-semibold mb-2">Bespoke Service</h3>
                    <p className="text-gray-300 text-sm">Tailored to your lifestyle</p>
                  </div>
                  <div className="bg-black/50 rounded-xl p-6 border border-amber-600/20">
                    <Star className="h-8 w-8 text-amber-400 mb-4" />
                    <h3 className="text-white font-semibold mb-2">5 Star Rated</h3>
                    <p className="text-gray-300 text-sm">Consistently exceptional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 via-orange-500 to-red-500"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-amber-600"></div>
              <span className="text-amber-600 text-sm font-medium tracking-wider uppercase">Our Craft</span>
              <div className="w-12 h-0.5 bg-amber-600"></div>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Signature Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Each service is meticulously crafted to deliver an unparalleled grooming experience that reflects your personal style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="group overflow-hidden border-2 border-gray-200 hover:border-amber-600 transition-all duration-500 hover:shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                          {service.title}
                        </h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-amber-600">{service.price}</div>
                          <div className="text-sm text-gray-500">{service.duration}</div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                      <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white group-hover:translate-x-2 transition-transform">
                        Book Service
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-amber-400"></div>
              <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">Our Work</span>
              <div className="w-12 h-0.5 bg-amber-400"></div>
            </div>
            <h2 className="text-5xl font-bold mb-6">Style Gallery</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our portfolio of signature cuts and discover your next look.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-600/30 hover:border-amber-400 transition-all duration-500">
                <div className="aspect-square p-8 flex flex-col justify-center items-center text-center">
                  <div className="mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
                    <Scissors className="h-12 w-12 text-amber-400 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{item.style}</h3>
                  <span className="text-sm text-gray-400 uppercase tracking-wide">{item.category}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                    View Style
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-amber-600"></div>
              <span className="text-amber-600 text-sm font-medium tracking-wider uppercase">Master Craftsmen</span>
              <div className="w-12 h-0.5 bg-amber-600"></div>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Meet Your Barbers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our team of master barbers brings decades of combined experience and artistic vision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {barbers.map((barber, index) => (
              <Card key={index} className="text-center border-2 border-gray-200 hover:border-amber-600 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Scissors className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{barber.name}</h3>
                  <p className="text-amber-600 font-medium mb-2">{barber.specialty}</p>
                  <p className="text-gray-600">{barber.experience} experience</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Client Reviews</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-l-4 border-l-amber-600 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex justify-start mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-amber-600">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-24 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-6">Book Your Experience</h2>
              <p className="text-xl text-gray-400">
                Ready to elevate your style? Reserve your appointment today.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-8">Visit Meridian Barbershop</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-600 p-3 rounded-full">
                      <Phone className="h-6 w-6" />
                    </div>
                    <span className="text-lg">020 7891 2345</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-600 p-3 rounded-full">
                      <Mail className="h-6 w-6" />
                    </div>
                    <span className="text-lg">appointments@meridianbarbershop.co.uk</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-600 p-3 rounded-full">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <span className="text-lg">42 Regent Street, Mayfair, London W1B 2QD</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-600 p-3 rounded-full">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-lg">Tue-Sat: 9AM-7PM</p>
                      <p className="text-gray-400">Sunday-Monday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-white/10 backdrop-blur-md border border-amber-600/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-white">Reserve Appointment</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="First Name" className="bg-white/10 border-amber-600/30 text-white placeholder-gray-400" />
                      <Input placeholder="Last Name" className="bg-white/10 border-amber-600/30 text-white placeholder-gray-400" />
                    </div>
                    <Input placeholder="Email Address" type="email" className="bg-white/10 border-amber-600/30 text-white placeholder-gray-400" />
                    <Input placeholder="Phone Number" type="tel" className="bg-white/10 border-amber-600/30 text-white placeholder-gray-400" />
                    <select className="w-full p-3 rounded-md border border-amber-600/30 bg-white/10 text-white">
                      <option className="text-black">Select Service</option>
                      <option className="text-black">Signature Cut - £35</option>
                      <option className="text-black">Royal Shave - £28</option>
                      <option className="text-black">Beard Sculpting - £22</option>
                      <option className="text-black">Full Treatment - £65</option>
                    </select>
                    <select className="w-full p-3 rounded-md border border-amber-600/30 bg-white/10 text-white">
                      <option className="text-black">Preferred Barber</option>
                      <option className="text-black">Marcus Rodriguez</option>
                      <option className="text-black">Viktor Petrov</option>
                      <option className="text-black">Alessandro Bianchi</option>
                    </select>
                    <Textarea placeholder="Special requests or style preferences..." rows={3} className="bg-white/10 border-amber-600/30 text-white placeholder-gray-400" />
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg py-4">
                      <Calendar className="mr-2 h-5 w-5" />
                      Confirm Appointment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-amber-600/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Scissors className="h-8 w-8 text-amber-400" />
              <h3 className="text-3xl font-bold">MERIDIAN</h3>
            </div>
            <p className="text-gray-400 mb-8 text-lg">Where tradition meets contemporary artistry</p>
            <div className="flex justify-center gap-12 text-sm text-gray-500">
              <span>© 2024 Meridian Barbershop</span>
              <span>•</span>
              <span>Master Craftsmen</span>
              <span>•</span>
              <span>Bespoke Experience</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernBarberDemo;