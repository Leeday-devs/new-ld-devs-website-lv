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
      
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
        {/* Header */}
        <header className="bg-white shadow-xl border-b-4 border-pink-400">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-4 rounded-2xl shadow-lg">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    Paws & Claws Studio
                  </h1>
                  <p className="text-sm text-pink-600 font-semibold">Certified Pet Stylists • Fully Insured • Since 2019</p>
                </div>
              </div>
              <nav className="hidden lg:flex gap-8">
                <a href="#services" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Services</a>
                <a href="#gallery" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Gallery</a>
                <a href="#pricing" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Pricing</a>
                <a href="#contact" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Contact</a>
              </nav>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <div className="text-sm text-gray-600">Call to Book</div>
                  <div className="text-xl font-bold text-pink-600">020 7654 3210</div>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-6 py-3 shadow-lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-40 h-40 bg-pink-300 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-rose-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-300 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-left">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="h-7 w-7 text-pink-600" />
                  <span className="bg-pink-100 text-pink-800 px-5 py-2 rounded-full text-sm font-bold">
                    London's Premier Pet Grooming Studio
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
                  <span className="text-gray-900">Where Every Pet</span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                    Feels Loved
                  </span>
                </h1>
                
                <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-lg">
                  Professional pet grooming and walking services with a personal touch. Our certified stylists 
                  treat every furry friend like family, ensuring they look and feel their absolute best.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-10 py-5 text-lg font-bold shadow-2xl">
                    <Calendar className="mr-3 h-6 w-6" />
                    Book Appointment
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-pink-500 text-pink-700 hover:bg-pink-50 px-10 py-5 text-lg font-bold">
                    <Camera className="mr-3 h-6 w-6" />
                    View Gallery
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-200">
                  <div className="text-center">
                    <div className="bg-pink-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-10 w-10 text-pink-600" />
                    </div>
                    <div className="text-sm font-bold text-gray-800">Fully Certified</div>
                    <div className="text-xs text-gray-600">Pet First Aid Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-rose-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                      <Stethoscope className="h-10 w-10 text-rose-600" />
                    </div>
                    <div className="text-sm font-bold text-gray-800">Health Focused</div>
                    <div className="text-xs text-gray-600">Skin & coat specialists</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                      <Star className="h-10 w-10 text-orange-600" />
                    </div>
                    <div className="text-sm font-bold text-gray-800">5-Star Rated</div>
                    <div className="text-xs text-gray-600">1,200+ Happy Pets</div>
                  </div>
                </div>
              </div>

              <div className="lg:justify-self-end">
                <Card className="bg-white/95 backdrop-blur-sm border-2 border-pink-200 shadow-2xl p-8 max-w-lg">
                  <CardContent className="p-0">
                    <div className="text-center mb-8">
                      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-4">
                        QUICK BOOKING
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Pet's Spa Day</h3>
                      <p className="text-gray-600">Same-day appointments often available</p>
                    </div>
                    
                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Pet's name" className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none" />
                        <select className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none">
                          <option>Dog</option>
                          <option>Cat</option>
                          <option>Rabbit</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <input type="text" placeholder="Breed (helps us prepare)" className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none" />
                      <select className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none">
                        <option>Select service</option>
                        <option>Full Groom & Style</option>
                        <option>Bath & Blow Dry</option>
                        <option>Nail Trim & Ear Clean</option>
                        <option>Dog Walking Service</option>
                      </select>
                      <input type="date" className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none" />
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-5 text-lg font-bold">
                        <Calendar className="mr-2 h-6 w-6" />
                        Book Appointment
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-3 text-center text-sm mt-8">
                        <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                          <Clock className="h-6 w-6 text-pink-600 mx-auto mb-2" />
                          <div className="text-pink-800 font-bold">Same Day</div>
                          <div className="text-pink-600">Often Available</div>
                        </div>
                        <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
                          <CheckCircle className="h-6 w-6 text-rose-600 mx-auto mb-2" />
                          <div className="text-rose-800 font-bold">No Deposit</div>
                          <div className="text-rose-600">Pay After Service</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Breed-Specific Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Tailored Care for Every Breed</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our certified groomers specialize in breed-specific cuts and care. Each service is customized 
                to your pet's unique needs, temperament, and coat type.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-pink-500">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-pink-100 p-4 rounded-xl group-hover:bg-pink-200 transition-colors">
                      <Scissors className="h-8 w-8 text-pink-600" />
                    </div>
                    <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200">Most Popular</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Full Grooming & Style</h3>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-pink-600" />
                      <span>Pre-wash brush & detangle</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-pink-600" />
                      <span>Luxury shampoo & conditioning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-pink-600" />
                      <span>Breed-specific cut & styling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-pink-600" />
                      <span>Nail trim, ear clean, teeth brush</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <div className="text-3xl font-bold text-pink-600 mb-2">£45-75</div>
                    <p className="text-sm text-gray-500 mb-4">Based on size & coat type</p>
                    <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                      Book Full Groom
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-200 transition-colors">
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Exercise</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Dog Walking Service</h3>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>Hampstead Heath & local parks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>GPS tracking & photo updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>Individual or group walks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>Fresh water & waste cleanup</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <div className="text-3xl font-bold text-blue-600 mb-2">£18-28</div>
                    <p className="text-sm text-gray-500 mb-4">30min - 1hr walks available</p>
                    <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
                      Book Walk
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-green-500">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-green-100 p-4 rounded-xl group-hover:bg-green-200 transition-colors">
                      <Heart className="h-8 w-8 text-green-600" />
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Gentle</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Puppy Introduction</h3>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>First grooming experience (12-16 weeks)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Gentle handling & socialization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Face & feet desensitization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Positive reinforcement treats</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <div className="text-3xl font-bold text-green-600 mb-2">£35</div>
                    <p className="text-sm text-gray-500 mb-4">Perfect first grooming experience</p>
                    <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                      Book Puppy Session
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-purple-500">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-purple-100 p-4 rounded-xl group-hover:bg-purple-200 transition-colors">
                      <Stethoscope className="h-8 w-8 text-purple-600" />
                    </div>
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Therapeutic</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Spa & Wellness</h3>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span>Medicated shampoo treatments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span>Flea & tick prevention</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span>Aromatherapy & relaxation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span>Coat & skin condition analysis</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <div className="text-3xl font-bold text-purple-600 mb-2">£55-85</div>
                    <p className="text-sm text-gray-500 mb-4">Add-on or standalone service</p>
                    <Button variant="outline" className="w-full border-purple-500 text-purple-600 hover:bg-purple-50">
                      Book Spa Treatment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular Breeds Section */}
            <div className="mt-20 bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl p-10">
              <h3 className="text-3xl font-bold text-center mb-10">Popular Breed Specializations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  "Poodles", "Golden Retrievers", "Yorkshire Terriers", "Cocker Spaniels",
                  "Bichon Frises", "Shih Tzus", "Portuguese Water Dogs", "Bernedoodles",
                  "Maltese", "Cavalier King Charles", "French Bulldogs", "Dachshunds"
                ].map((breed, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                    <Palette className="h-6 w-6 text-pink-600 mx-auto mb-2" />
                    <span className="text-sm font-semibold text-gray-700">{breed}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 mt-8">
                Don't see your breed? <span className="text-pink-600 font-semibold cursor-pointer hover:underline">Contact us</span> - we work with all breeds and mixed pets!
              </p>
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