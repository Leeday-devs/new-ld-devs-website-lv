import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, CheckCircle, Heart, Scissors, Calendar, MapPin } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const PetGroomingDemo = () => {
  return (
    <>
      <SEOHead 
        title="PawSome Grooming - Pet Grooming & Dog Walking Services"
        description="Professional pet grooming and dog walking services. Book online today!"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-600" />
              <span className="text-xl font-bold text-gray-800">PawSome Grooming</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#services" className="text-gray-600 hover:text-pink-600">Services</a>
              <a href="#gallery" className="text-gray-600 hover:text-pink-600">Gallery</a>
              <a href="#pricing" className="text-gray-600 hover:text-pink-600">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-pink-600">Contact</a>
            </nav>
            <Button className="bg-pink-600 hover:bg-pink-700">Book Now</Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Where Every Pet is Treated Like Family
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional pet grooming and dog walking services with love, care, and expertise. 
              Your furry friends deserve the best!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
              <Button size="lg" variant="outline">
                View Our Work
              </Button>
            </div>
            <div className="mt-8 flex justify-center items-center gap-6">
              <Badge variant="secondary" className="px-4 py-2">
                <Star className="mr-1 h-4 w-4 text-yellow-500" />
                4.9/5 Rating
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                500+ Happy Pets
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                Fully Insured
              </Badge>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scissors className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Full Grooming</h3>
                  <p className="text-gray-600 mb-4">Wash, cut, nail trim, ear cleaning, and styling</p>
                  <div className="text-2xl font-bold text-pink-600">From £35</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Dog Walking</h3>
                  <p className="text-gray-600 mb-4">30min, 1hr, or group walks in local parks</p>
                  <div className="text-2xl font-bold text-blue-600">From £15</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Puppy Package</h3>
                  <p className="text-gray-600 mb-4">Gentle introduction to grooming for puppies</p>
                  <div className="text-2xl font-bold text-green-600">£25</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Express Service</h3>
                  <p className="text-gray-600 mb-4">Quick wash and dry for busy schedules</p>
                  <div className="text-2xl font-bold text-purple-600">£20</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Online Booking Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Book Your Appointment</h2>
              <Card className="p-6">
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Pet Name</label>
                        <input type="text" className="w-full p-3 border rounded-lg" placeholder="Fluffy" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Pet Type</label>
                        <select className="w-full p-3 border rounded-lg">
                          <option>Dog</option>
                          <option>Cat</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Service</label>
                        <select className="w-full p-3 border rounded-lg">
                          <option>Full Grooming</option>
                          <option>Dog Walking</option>
                          <option>Puppy Package</option>
                          <option>Express Service</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Preferred Date</label>
                        <input type="date" className="w-full p-3 border rounded-lg" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Special Requirements</label>
                      <textarea className="w-full p-3 border rounded-lg" rows={3} placeholder="Any special needs or requests..."></textarea>
                    </div>
                    <Button className="w-full bg-pink-600 hover:bg-pink-700">
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pet Photo Gallery */}
        <section id="gallery" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Happy Customers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gradient-to-br from-pink-200 to-orange-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Heart className="h-8 w-8 text-pink-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section id="pricing" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Service Pricing</h2>
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-pink-50">
                        <tr>
                          <th className="text-left p-6 font-semibold">Service</th>
                          <th className="text-left p-6 font-semibold">Small Dogs</th>
                          <th className="text-left p-6 font-semibold">Medium Dogs</th>
                          <th className="text-left p-6 font-semibold">Large Dogs</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-6">Full Grooming</td>
                          <td className="p-6">£35</td>
                          <td className="p-6">£45</td>
                          <td className="p-6">£55</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                          <td className="p-6">Wash & Blow Dry</td>
                          <td className="p-6">£20</td>
                          <td className="p-6">£25</td>
                          <td className="p-6">£30</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-6">Nail Trimming</td>
                          <td className="p-6">£10</td>
                          <td className="p-6">£10</td>
                          <td className="p-6">£15</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                          <td className="p-6">Dog Walking (1hr)</td>
                          <td className="p-6 text-center" colSpan={3}>£15</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Care Packages */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Care Packages</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 border-2 border-pink-200">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4 text-center">Basic Care</h3>
                  <div className="text-3xl font-bold text-center text-pink-600 mb-4">£80/month</div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>2 Full Grooming Sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Free Nail Trimming</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>10% Discount on Extras</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">Choose Plan</Button>
                </CardContent>
              </Card>
              <Card className="p-6 border-2 border-pink-500 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-600">
                  Most Popular
                </Badge>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4 text-center">Premium Care</h3>
                  <div className="text-3xl font-bold text-center text-pink-600 mb-4">£140/month</div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>4 Full Grooming Sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>8 Dog Walking Sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Free Nail & Ear Care</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>20% Discount on Extras</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">Choose Plan</Button>
                </CardContent>
              </Card>
              <Card className="p-6 border-2 border-purple-200">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4 text-center">VIP Care</h3>
                  <div className="text-3xl font-bold text-center text-purple-600 mb-4">£200/month</div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>6 Full Grooming Sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>12 Dog Walking Sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Priority Booking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>30% Discount on Extras</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">Choose Plan</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-pink-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Pamper Your Pet?</h2>
            <p className="text-xl mb-8">Book your appointment today and see why pets love us!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Call Now: 020 7890 1234
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-pink-600">
                Book Online
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-6 w-6 text-pink-400" />
                  <span className="text-xl font-bold">PawSome Grooming</span>
                </div>
                <p className="text-gray-300">
                  Professional pet care services with love and expertise.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Pet Grooming</li>
                  <li>Dog Walking</li>
                  <li>Puppy Care</li>
                  <li>Express Services</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Hours</h3>
                <div className="text-gray-300 space-y-2">
                  <div>Mon-Fri: 8am-6pm</div>
                  <div>Saturday: 9am-5pm</div>
                  <div>Sunday: 10am-4pm</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <div className="text-gray-300 space-y-2">
                  <div>📞 020 7890 1234</div>
                  <div>✉️ hello@pawsomegrooming.co.uk</div>
                  <div>📍 London, UK</div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 PawSome Grooming. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PetGroomingDemo;