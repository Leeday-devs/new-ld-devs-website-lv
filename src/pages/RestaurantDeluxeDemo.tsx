import { Phone, Clock, Star, MapPin, Mail, UtensilsCrossed, Wine, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const RestaurantDeluxeDemo = () => {
  const menuItems = [
    {
      name: "Grilled Atlantic Salmon",
      description: "Fresh salmon fillet with herb butter, seasonal vegetables, and lemon risotto",
      price: "£28"
    },
    {
      name: "Prime Ribeye Steak",
      description: "28-day aged ribeye with truffle mash, roasted vegetables, and red wine jus",
      price: "£42"
    },
    {
      name: "Lobster Thermidor",
      description: "Fresh lobster tail with brandy cream sauce, served with garlic butter potatoes",
      price: "£38"
    },
    {
      name: "Wild Mushroom Risotto",
      description: "Creamy arborio rice with wild mushrooms, truffle oil, and parmesan",
      price: "£22"
    },
    {
      name: "Duck Confit",
      description: "Slow-cooked duck leg with cherry gastrique and roasted root vegetables",
      price: "£32"
    },
    {
      name: "Chocolate Fondant",
      description: "Warm chocolate cake with molten center, vanilla ice cream, and berry compote",
      price: "£12"
    }
  ];

  const testimonials = [
    {
      name: "Sophie Williams",
      location: "Food Critic",
      rating: 5,
      text: "Exceptional dining experience! The flavors are expertly crafted and the service is impeccable."
    },
    {
      name: "Robert Anderson",
      location: "Regular Customer",
      rating: 5,
      text: "Our go-to restaurant for special occasions. Never disappoints and the ambiance is perfect."
    },
    {
      name: "Maria Rodriguez",
      location: "Wedding Party",
      rating: 5,
      text: "Hosted our wedding reception here - absolutely magical! The food and service were outstanding."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-amber-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">La Maison Dorée</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="font-medium">020 7456 7890</span>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700">
              Book Table
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-6xl font-bold mb-6">Fine Dining Excellence</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience culinary artistry in an elegant setting. Our award-winning chefs create memorable dining experiences with the finest seasonal ingredients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-lg px-8 py-4">
              <UtensilsCrossed className="mr-2 h-5 w-5" />
              View Menu
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-900 text-lg px-8 py-4">
              Make Reservation
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Award className="h-12 w-12 mx-auto mb-4 text-amber-300" />
              <h3 className="text-xl font-semibold mb-2">Michelin Recommended</h3>
              <p className="text-amber-100">Recognized for culinary excellence</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Wine className="h-12 w-12 mx-auto mb-4 text-amber-300" />
              <h3 className="text-xl font-semibold mb-2">Award-Winning Wine List</h3>
              <p className="text-amber-100">Curated selection of fine wines</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Users className="h-12 w-12 mx-auto mb-4 text-amber-300" />
              <h3 className="text-xl font-semibold mb-2">Private Dining</h3>
              <p className="text-amber-100">Exclusive spaces for special events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Our Signature Menu</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Carefully crafted dishes using the finest seasonal ingredients, prepared by our award-winning culinary team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {menuItems.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-amber-600">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-amber-900">{item.name}</h3>
                    <span className="text-2xl font-bold text-amber-700">{item.price}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Guest Reviews</h2>
            <p className="text-xl text-gray-600">Hear what our valued guests have to say about their dining experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center bg-white shadow-lg">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <h4 className="font-bold text-amber-900">{testimonial.name}</h4>
                    <p className="text-amber-700">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Reservation Section */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Visit Us</h2>
              <p className="text-xl mb-8 text-amber-100">
                Make a reservation today and experience the finest in contemporary dining. We look forward to serving you.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-600 p-3 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <span className="text-lg">020 7456 7890</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-amber-600 p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span className="text-lg">reservations@lamaisondoree.co.uk</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-amber-600 p-3 rounded-full">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <span className="text-lg">45 Gourmet Street, Mayfair, London W1K 2HB</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-amber-600 p-3 rounded-full">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg">Tue-Sat: 6:00 PM - 11:00 PM</p>
                    <p className="text-amber-200">Sunday: 6:00 PM - 10:00 PM</p>
                    <p className="text-amber-200">Monday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-white text-gray-900">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-amber-900">Make a Reservation</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Email Address" type="email" />
                    <Input placeholder="Phone Number" type="tel" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="Date" type="date" />
                      <Input placeholder="Time" type="time" />
                    </div>
                    <Input placeholder="Number of Guests" type="number" min="1" max="12" />
                    <Textarea placeholder="Special requests or dietary requirements..." rows={3} />
                    <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white">
                      Reserve Table
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">La Maison Dorée</h3>
          <p className="text-amber-200 mb-6">Fine dining excellence since 1995</p>
          <div className="flex justify-center gap-8 text-sm">
            <span>© 2024 La Maison Dorée</span>
            <span>•</span>
            <span>Michelin Recommended</span>
            <span>•</span>
            <span>Private Events Available</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantDeluxeDemo;