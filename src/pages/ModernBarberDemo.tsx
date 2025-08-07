import { Phone, Clock, Scissors, Star, MapPin, Mail, Users, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ModernBarberDemo = () => {
  const services = [
    {
      icon: Scissors,
      title: "Classic Cuts",
      description: "Traditional barbering with a modern twist. Precision cuts tailored to your style.",
      price: "£25"
    },
    {
      icon: Users,
      title: "Beard Styling",
      description: "Expert beard trimming, shaping, and styling to complement your look.",
      price: "£15"
    },
    {
      icon: Star,
      title: "Hot Towel Shave",
      description: "Traditional hot towel shave experience with premium products.",
      price: "£35"
    },
    {
      icon: Award,
      title: "Gentleman's Package",
      description: "Complete grooming service: cut, shave, beard trim, and styling.",
      price: "£55"
    },
    {
      icon: Scissors,
      title: "Fade Specialists",
      description: "Expert fade cuts from skin fades to high fades, perfectly blended.",
      price: "£30"
    },
    {
      icon: Calendar,
      title: "Wedding Prep",
      description: "Special occasion grooming to look your best on your big day.",
      price: "£45"
    }
  ];

  const testimonials = [
    {
      name: "James Mitchell",
      location: "London",
      rating: 5,
      text: "Best barber shop in the area! The attention to detail is incredible and the atmosphere is spot on."
    },
    {
      name: "Marcus Johnson",
      location: "East London",
      rating: 5,
      text: "Been coming here for 2 years. Consistent quality every time and the staff are brilliant."
    },
    {
      name: "Tom Richardson",
      location: "Central London",
      rating: 5,
      text: "Amazing hot towel shave experience. Felt like royalty! Will definitely be back."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-yellow-600 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-yellow-400">Blade</span> & Fade
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <Phone className="h-4 w-4" />
              <span className="font-medium">020 7123 4567</span>
            </div>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold">
              Book Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-black py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-6xl font-bold mb-6">
            Premium <span className="text-yellow-400">Barbering</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Experience the finest in traditional barbering with a contemporary edge. Where craftsmanship meets style in the heart of London.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-4 font-bold">
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>
            <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black text-lg px-8 py-4 font-bold">
              View Services
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-400/20">
              <Award className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2">Master Barbers</h3>
              <p className="text-gray-400">Experienced professionals with years of expertise</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-400/20">
              <Star className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
              <p className="text-gray-400">Only the finest grooming products and tools</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-yellow-400/20">
              <Clock className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
              <p className="text-gray-400">Open 7 days a week to fit your schedule</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our <span className="text-yellow-400">Services</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From classic cuts to modern fades, we offer a full range of premium barbering services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-black border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20">
                <CardContent className="p-8 text-center">
                  <service.icon className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-yellow-400">{service.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our <span className="text-yellow-400">Clients</span> Say</h2>
            <p className="text-xl text-gray-400">Join hundreds of satisfied customers who trust us with their style.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-900 border-yellow-400/20 text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-yellow-400">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Visit <span className="text-yellow-400">Blade & Fade</span>
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Ready for the ultimate barbering experience? Book your appointment today and discover why we're London's premier destination for modern barbering.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-400 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <span className="text-lg">020 7123 4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-400 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <span className="text-lg">info@bladeandfade.co.uk</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-400 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <span className="text-lg">123 Barber Street, London, E1 6AN</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-400 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <p className="text-lg">Mon-Sat: 9AM-8PM</p>
                    <p className="text-gray-400">Sunday: 10AM-6PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-yellow-400 text-black">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Book Your Appointment</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="First Name" className="bg-white" />
                      <Input placeholder="Last Name" className="bg-white" />
                    </div>
                    <Input placeholder="Email Address" type="email" className="bg-white" />
                    <Input placeholder="Phone Number" type="tel" className="bg-white" />
                    <select className="w-full p-3 rounded-md border bg-white">
                      <option>Select Service</option>
                      <option>Classic Cut - £25</option>
                      <option>Beard Styling - £15</option>
                      <option>Hot Towel Shave - £35</option>
                      <option>Gentleman's Package - £55</option>
                    </select>
                    <Textarea placeholder="Special requests or preferred appointment time..." rows={3} className="bg-white" />
                    <Button className="w-full bg-black hover:bg-gray-800 text-yellow-400 font-bold text-lg py-3">
                      Book Now
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-400/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            <span className="text-yellow-400">Blade</span> & Fade
          </h3>
          <p className="text-gray-400 mb-6">Premium barbering in the heart of London</p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <span>© 2024 Blade & Fade</span>
            <span>•</span>
            <span>Master Barbers</span>
            <span>•</span>
            <span>Premium Experience</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernBarberDemo;