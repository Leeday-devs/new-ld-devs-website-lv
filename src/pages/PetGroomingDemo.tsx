import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, CheckCircle, Heart, Scissors, Calendar, MapPin, Camera, Phone, Mail, Award, Shield, Stethoscope, Palette, Users } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const PetGroomingDemo = () => {
  return (
    <>
      <SEOHead 
        title="Paws & Claws Grooming Studio - Premium Pet Grooming & Dog Walking"
        description="Professional pet grooming and dog walking services in London. Book online today for the finest pet care!"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
        
        {/* Fun Colorful Header */}
        <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10"></div>
          <div className="container mx-auto px-4 py-6 relative z-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full shadow-xl border border-white/30">
                  <Heart className="h-10 w-10 text-white animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                    🐾 Paws & Claws Studio
                  </h1>
                  <p className="text-pink-100 text-sm font-medium">Where Pets Become Stars ✨</p>
                </div>
              </div>
              <nav className="hidden lg:flex gap-6">
                <a href="#services" className="text-white hover:text-pink-200 font-medium transition-colors text-sm uppercase tracking-wide">Services</a>
                <a href="#gallery" className="text-white hover:text-pink-200 font-medium transition-colors text-sm uppercase tracking-wide">Gallery</a>
                <a href="#pricing" className="text-white hover:text-pink-200 font-medium transition-colors text-sm uppercase tracking-wide">Pricing</a>
                <a href="#contact" className="text-white hover:text-pink-200 font-medium transition-colors text-sm uppercase tracking-wide">Contact</a>
              </nav>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <div className="text-pink-100 text-xs">🔥 HOT LINE</div>
                  <div className="text-xl font-bold text-white">020 7654 3210</div>
                </div>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-full shadow-xl border-2 border-white/30">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Fun!
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Playful Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl animate-bounce"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl animate-bounce delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-yellow-300/30 rounded-full blur-3xl animate-bounce delay-500"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full mb-8 shadow-2xl">
                <Star className="h-6 w-6 animate-spin" />
                <span className="font-bold text-lg">London's Most Fun Pet Salon!</span>
                <Star className="h-6 w-6 animate-spin" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-8">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Pamper Your
                </span>
                <br />
                <span className="text-gray-900 relative">
                  Precious Pet
                  <div className="absolute -top-4 -right-8 text-4xl">🎉</div>
                </span>
              </h1>
              
              <p className="text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
                Transform your furry friend into the star they deserve to be! Our certified pet stylists create 
                magical makeovers with love, treats, and endless belly rubs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all">
                  <Calendar className="mr-3 h-7 w-7" />
                  Book Magic Session ✨
                </Button>
                <Button size="lg" variant="outline" className="border-4 border-pink-500 text-pink-700 hover:bg-pink-50 px-12 py-6 text-xl font-bold rounded-full shadow-xl">
                  <Camera className="mr-3 h-7 w-7" />
                  See Transformations 📸
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-pink-200">
                  <div className="text-4xl mb-3">🏆</div>
                  <div className="text-2xl font-bold text-pink-600 mb-2">Award Winner</div>
                  <div className="text-sm text-gray-600">Best Pet Salon 2024</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-purple-200">
                  <div className="text-4xl mb-3">💜</div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">1,500+ Pets</div>
                  <div className="text-sm text-gray-600">Happy & Pampered</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-indigo-200">
                  <div className="text-4xl mb-3">⭐</div>
                  <div className="text-2xl font-bold text-indigo-600 mb-2">5-Star Reviews</div>
                  <div className="text-sm text-gray-600">From Pet Parents</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-yellow-200">
                  <div className="text-4xl mb-3">🎨</div>
                  <div className="text-2xl font-bold text-yellow-600 mb-2">Creative Styles</div>
                  <div className="text-sm text-gray-600">Unique Pet Fashion</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fun Services Section with Zigzag Layout */}
        <section id="services" className="py-20 bg-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 text-6xl opacity-20">🎨</div>
          <div className="absolute top-20 right-20 text-6xl opacity-20">✂️</div>
          <div className="absolute bottom-10 left-20 text-6xl opacity-20">🐕</div>
          <div className="absolute bottom-20 right-10 text-6xl opacity-20">🐱</div>
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full mb-6 text-lg font-bold">
                ✨ MAGICAL PET SERVICES ✨
              </div>
              <h2 className="text-5xl font-extrabold text-gray-900 mb-6">Every Pet Gets VIP Treatment!</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From glamorous makeovers to fun adventures, we make every visit special with treats, 
                cuddles, and professional care your pet will absolutely love!
              </p>
            </div>
            
            <div className="space-y-16">
              {/* Service 1 - Left Aligned */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-4 border-pink-200 shadow-2xl rounded-3xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-pink-500 p-4 rounded-full text-white shadow-xl">
                          <Scissors className="h-10 w-10" />
                        </div>
                        <div>
                          <Badge className="bg-pink-500 text-white px-4 py-2 mb-2 rounded-full">🌟 SIGNATURE SERVICE</Badge>
                          <h3 className="text-3xl font-bold text-gray-900">Royal Style Makeover</h3>
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        Transform your pet into royalty! Complete with luxury bath, precision cut, nail art, 
                        bow tie or bandana, and a professional photoshoot.
                      </p>
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="text-pink-500">👑</div>
                          <span className="text-gray-700">Luxury spa bath with aromatherapy</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-pink-500">✂️</div>
                          <span className="text-gray-700">Breed-specific precision styling</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-pink-500">💅</div>
                          <span className="text-gray-700">Nail trim & polish (pet-safe)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-pink-500">📸</div>
                          <span className="text-gray-700">Professional photo session</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-4xl font-bold text-pink-600">£65-95</div>
                        <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold">
                          Book Royal Treatment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-8 border-4 border-dashed border-pink-300">
                  <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl flex items-center justify-center text-6xl">
                    👑🐕✨
                  </div>
                </div>
              </div>

              {/* Service 2 - Right Aligned */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 border-4 border-dashed border-blue-300 lg:order-1">
                  <div className="aspect-square bg-gradient-to-br from-blue-200 to-indigo-200 rounded-3xl flex items-center justify-center text-6xl">
                    🏃‍♂️🐕🌳
                  </div>
                </div>
                
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-4 border-blue-200 shadow-2xl rounded-3xl overflow-hidden lg:order-2">
                  <CardContent className="p-0">
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-500 p-4 rounded-full text-white shadow-xl">
                          <MapPin className="h-10 w-10" />
                        </div>
                        <div>
                          <Badge className="bg-blue-500 text-white px-4 py-2 mb-2 rounded-full">🏃‍♂️ ADVENTURE TIME</Badge>
                          <h3 className="text-3xl font-bold text-gray-900">Epic Dog Adventures</h3>
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        Let your dog explore London's best parks! GPS tracking, real-time photos, 
                        socialization with other dogs, and tired happy pups guaranteed.
                      </p>
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="text-blue-500">🌳</div>
                          <span className="text-gray-700">Hampstead Heath & Hyde Park adventures</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-blue-500">📱</div>
                          <span className="text-gray-700">Live GPS tracking & photo updates</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-blue-500">🐕</div>
                          <span className="text-gray-700">Supervised socialization sessions</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-blue-500">💧</div>
                          <span className="text-gray-700">Fresh water & emergency first aid kit</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-4xl font-bold text-blue-600">£25-40</div>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold">
                          Book Adventure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Service 3 - Left Aligned */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-200 shadow-2xl rounded-3xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-green-500 p-4 rounded-full text-white shadow-xl">
                          <Heart className="h-10 w-10" />
                        </div>
                        <div>
                          <Badge className="bg-green-500 text-white px-4 py-2 mb-2 rounded-full">🐾 GENTLE CARE</Badge>
                          <h3 className="text-3xl font-bold text-gray-900">Puppy's First Spa Day</h3>
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        Special introduction for puppies 12-16 weeks. Gentle handling, lots of treats, 
                        positive reinforcement, and creating lifelong spa lovers!
                      </p>
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="text-green-500">🍖</div>
                          <span className="text-gray-700">Unlimited treats & positive reinforcement</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-green-500">🛁</div>
                          <span className="text-gray-700">Gentle first bath experience</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-green-500">👂</div>
                          <span className="text-gray-700">Face, feet & ear handling training</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-green-500">🎁</div>
                          <span className="text-gray-700">Take-home puppy care package</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-4xl font-bold text-green-600">£45</div>
                        <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold">
                          Book Puppy Spa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-8 border-4 border-dashed border-green-300">
                  <div className="aspect-square bg-gradient-to-br from-green-200 to-emerald-200 rounded-3xl flex items-center justify-center text-6xl">
                    🐶💚🛁
                  </div>
                </div>
              </div>
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
                Call Now: 020 7654 3210
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
                  <span className="text-xl font-bold">Paws & Claws Studio</span>
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
                  <div>📞 020 7654 3210</div>
                  <div>✉️ hello@pawsandclaws.studio</div>
                  <div>📍 London, UK</div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Paws & Claws Grooming Studio. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PetGroomingDemo;