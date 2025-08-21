import { 
  Phone, Clock, Star, MapPin, Mail, UtensilsCrossed, Wine, Award, Users,
  ChefHat, Grape, Utensils, Calendar, Check, Crown, Sparkles, 
  Heart, Camera, Gift, Coffee, Cake, Fish, Beef
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const RestaurantDeluxeDemo = () => {
  const chefSpecials = [
    {
      category: "Chef's Signature",
      icon: Crown,
      items: [
        {
          name: "Truffle-Glazed Wagyu",
          description: "A5 Wagyu beef with black truffle glaze, potato gratin, and seasonal vegetables",
          price: "£85",
          wine: "Barolo DOCG 2018",
          chef: "Head Chef Marcus",
          popular: true
        },
        {
          name: "Lobster Bisque Soufflé", 
          description: "Light-as-air soufflé infused with rich lobster bisque and cognac cream",
          price: "£42",
          wine: "Chablis Premier Cru",
          chef: "Sous Chef Elena",
          popular: false
        }
      ]
    },
    {
      category: "Seafood Selection",
      icon: Fish,
      items: [
        {
          name: "Pan-Seared Halibut",
          description: "Wild halibut with saffron beurre blanc, asparagus, and microgreens", 
          price: "£38",
          wine: "Sancerre Loire Valley",
          chef: "Chef de Partie James",
          popular: true
        },
        {
          name: "Scallops & Caviar",
          description: "Diver scallops with Ossetra caviar, cauliflower purée, and herb oil",
          price: "£45",
          wine: "Champagne Blanc de Blancs",
          chef: "Head Chef Marcus",
          popular: false
        }
      ]
    },
    {
      category: "Dessert Artistry",
      icon: Cake,
      items: [
        {
          name: "Chocolate Symphony",
          description: "Seven textures of Valrhona chocolate with gold leaf and raspberry coulis",
          price: "£18",
          wine: "Port Wine Vintage",
          chef: "Pastry Chef Sophie",
          popular: true
        },
        {
          name: "Lemon Soufflé",
          description: "Traditional French soufflé with Grand Marnier ice cream",
          price: "£16", 
          wine: "Moscato d'Asti",
          chef: "Pastry Chef Sophie",
          popular: false
        }
      ]
    }
  ];

  const chefTeam = [
    {
      name: "Marcus Beaumont",
      role: "Head Chef & Owner",
      experience: "15+ years",
      specialty: "Modern French Cuisine",
      awards: "Michelin Star, James Beard Nominee"
    },
    {
      name: "Elena Rodriguez",
      role: "Sous Chef",
      experience: "8 years", 
      specialty: "Mediterranean Fusion",
      awards: "Rising Chef Award 2023"
    },
    {
      name: "Sophie Laurent",
      role: "Pastry Chef",
      experience: "12 years",
      specialty: "French Patisserie",
      awards: "World Pastry Champion"
    }
  ];

  const experiences = [
    {
      title: "Chef's Table Experience",
      description: "Private 8-course tasting menu with wine pairings, cooked and served at your exclusive table",
      price: "£125 per person",
      duration: "3 hours",
      icon: ChefHat,
      exclusive: true
    },
    {
      title: "Wine Cellar Dinner", 
      description: "Intimate dinner in our historic wine cellar with sommelier-guided tastings",
      price: "£95 per person",
      duration: "2.5 hours", 
      icon: Wine,
      exclusive: true
    },
    {
      title: "Seasonal Tasting Menu",
      description: "7-course journey through seasonal ingredients with optional wine pairings",
      price: "£75 per person",
      duration: "2 hours",
      icon: Utensils,
      exclusive: false
    }
  ];

  const testimonials = [
    {
      name: "Victoria Pemberton",
      title: "Food & Wine Magazine",
      rating: 5,
      text: "Exceptional culinary artistry. Each dish is a masterpiece that tells a story. The wine pairings are absolutely sublime.",
      experience: "Chef's Table",
      date: "Last month"
    },
    {
      name: "James Whitfield",
      title: "Michelin Inspector",
      rating: 5, 
      text: "Outstanding technique, impeccable service, and an atmosphere that transports you. This is dining at its finest.",
      experience: "Wine Cellar Dinner",
      date: "2 weeks ago"
    },
    {
      name: "Isabella Chen",
      title: "Anniversary Celebration",
      rating: 5,
      text: "Our 25th anniversary dinner was magical. Every detail was perfect, from the amuse-bouche to the petit fours.",
      experience: "Seasonal Tasting",
      date: "3 weeks ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-serif" onContextMenu={(e) => e.preventDefault()}>
      {/* Elegant Top Bar */}
      <div className="bg-accent/30 border-b py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              Tue-Sat: 6PM-11PM | Sun: 6PM-10PM
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Mayfair, London
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-xs">
              <Crown className="mr-1 h-3 w-3" />
              Michelin Recommended
            </Badge>
          </div>
        </div>
      </div>

      {/* Transparent Navigation */}
      <nav className="absolute top-12 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-full">
                <UtensilsCrossed className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground font-serif">Château Lumière</h1>
                <p className="text-sm text-muted-foreground">Fine Dining Excellence Since 1987</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <div className="text-center">
                <div className="text-primary font-bold text-lg">020 7123 4567</div>
                <div className="text-xs text-muted-foreground">Reservations & Inquiries</div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 font-serif">
                <Calendar className="mr-2 h-4 w-4" />
                Reserve Table
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Full-Width Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-accent via-accent/80 to-primary/20 text-foreground overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10 flex items-center min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Left Content - 8 columns */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-8">
                <Badge variant="outline" className="w-fit border-primary text-primary bg-primary/5">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Michelin Recommended
                </Badge>
                <div className="space-y-6">
                  <h1 className="text-6xl lg:text-8xl font-bold text-foreground leading-none font-serif">
                    Culinary
                    <span className="text-primary block italic">Excellence</span>
                    <span className="text-3xl lg:text-4xl font-light block mt-4 text-muted-foreground">
                      Where Art Meets Appetite
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    Experience an extraordinary culinary journey where each dish tells a story. 
                    Our award-winning chefs craft masterpieces using the finest seasonal ingredients 
                    in an atmosphere of refined elegance.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-serif px-8 py-4">
                  <ChefHat className="mr-3 h-5 w-5" />
                  Chef's Table Experience
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg font-serif px-8 py-4">
                  <Wine className="mr-3 h-5 w-5" />
                  Wine Cellar Tour
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center space-y-3">
                  <div className="text-4xl font-bold text-primary font-serif">15+</div>
                  <div className="text-sm text-muted-foreground">Years Excellence</div>
                </div>
                <div className="text-center space-y-3">
                  <div className="text-4xl font-bold text-primary font-serif">200+</div>
                  <div className="text-sm text-muted-foreground">Wine Selection</div>
                </div>
                <div className="text-center space-y-3">
                  <div className="text-4xl font-bold text-primary font-serif">3</div>
                  <div className="text-sm text-muted-foreground">Michelin Stars Team</div>
                </div>
              </div>
            </div>

            {/* Right Content - 4 columns */}
            <div className="lg:col-span-4 space-y-8">
              {/* Featured Experience Card */}
              <Card className="border-2 border-primary/20 shadow-2xl bg-card/95 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Crown className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground font-serif">Tonight's Special</h3>
                      <p className="text-sm text-muted-foreground">Chef Marcus's Signature</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Truffle-Glazed Wagyu</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      A5 Wagyu beef with black truffle glaze, accompanied by seasonal vegetables and our signature potato gratin.
                    </p>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">£85</span>
                      <Badge variant="secondary" className="text-xs">
                        <Wine className="mr-1 h-3 w-3" />
                        Barolo Pairing
                      </Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-6" variant="default">
                    Reserve for Tonight
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-card/80 backdrop-blur-sm border rounded-lg">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-bold text-foreground">Michelin Guide</div>
                  <div className="text-xs text-muted-foreground">Recommended</div>
                </div>
                <div className="text-center p-6 bg-card/80 backdrop-blur-sm border rounded-lg">
                  <ChefHat className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-bold text-foreground">Award-Winning</div>
                  <div className="text-xs text-muted-foreground">Chef Team</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef's Specialties Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6">
              <ChefHat className="mr-2 h-4 w-4" />
              Culinary Artistry
            </Badge>
            <h2 className="text-5xl font-bold text-foreground mb-6 font-serif">Chef's Signature Collection</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Each dish is a masterpiece crafted with passion, precision, and the finest seasonal ingredients. 
              Our culinary team brings together traditional techniques with innovative presentation.
            </p>
          </div>
          
          <div className="space-y-16">
            {chefSpecials.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-8">
                <div className="flex items-center gap-4 justify-center">
                  <category.icon className="h-8 w-8 text-primary" />
                  <h3 className="text-3xl font-bold text-foreground font-serif">{category.category}</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {category.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className={`group hover:shadow-2xl transition-all duration-500 border-2 ${
                      item.popular ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                    }`}>
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <UtensilsCrossed className="h-6 w-6 text-primary" />
                            {item.popular && (
                              <Badge variant="default" className="text-xs">
                                CHEF'S FAVORITE
                              </Badge>
                            )}
                          </div>
                          <span className="text-3xl font-bold text-primary font-serif">{item.price}</span>
                        </div>
                        
                        <h4 className="text-2xl font-bold text-foreground mb-4 font-serif">{item.name}</h4>
                        <p className="text-muted-foreground mb-6 leading-relaxed">{item.description}</p>
                        
                        <Separator className="my-6" />
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Recommended Wine:</span>
                            <div className="flex items-center gap-2">
                              <Grape className="h-4 w-4 text-primary" />
                              <span className="font-medium text-foreground">{item.wine}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Created by:</span>
                            <span className="font-medium text-foreground">{item.chef}</span>
                          </div>
                        </div>
                        
                        <Button className="w-full mt-6" variant={item.popular ? "default" : "outline"}>
                          Add to Order
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Chefs Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6">
              <Crown className="mr-2 h-4 w-4" />
              Culinary Masters
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6 font-serif">Meet Our Award-Winning Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our passionate chefs bring decades of experience and numerous accolades to create unforgettable dining experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefTeam.map((chef, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ChefHat className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 font-serif">{chef.name}</h3>
                  <p className="text-primary font-medium mb-4">{chef.role}</p>
                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <p><span className="font-medium">Experience:</span> {chef.experience}</p>
                    <p><span className="font-medium">Specialty:</span> {chef.specialty}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <Award className="mr-1 h-3 w-3" />
                    {chef.awards}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Experiences */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6">
              <Sparkles className="mr-2 h-4 w-4" />
              Exclusive Experiences
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6 font-serif">Curated Dining Journeys</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Elevate your dining experience with our carefully crafted culinary adventures, designed for the most discerning palates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <Card key={index} className={`hover:shadow-xl transition-all duration-300 border-2 ${
                experience.exclusive ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
              }`}>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <experience.icon className="h-12 w-12 text-primary" />
                    {experience.exclusive && (
                      <Badge variant="default" className="text-xs">
                        EXCLUSIVE
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 font-serif">{experience.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{experience.description}</p>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className="font-bold text-primary">{experience.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Duration:</span>
                      <span className="font-medium text-foreground">{experience.duration}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant={experience.exclusive ? "default" : "outline"}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Experience
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Reviews Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6">
              <Heart className="mr-2 h-4 w-4" />
              Guest Reviews
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6 font-serif">What Our Guests Say</h2>
            <p className="text-xl text-muted-foreground">Testimonials from food critics, inspectors, and cherished guests</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.experience}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-8 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{testimonial.date}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-6 bg-primary-foreground text-primary">
                  <Calendar className="mr-2 h-4 w-4" />
                  Reservations Now Open
                </Badge>
                <h2 className="text-5xl font-bold mb-6 font-serif">
                  Reserve Your Culinary Experience
                </h2>
                <p className="text-xl opacity-90 mb-8 leading-relaxed">
                  Join us for an unforgettable evening where exceptional cuisine meets impeccable service. 
                  Book your table and embark on a journey of culinary discovery.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                  <Phone className="h-8 w-8 text-primary-foreground" />
                  <div>
                    <div className="text-2xl font-bold">020 7123 4567</div>
                    <div className="text-sm opacity-75">Reservations & Private Events</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                  <Mail className="h-8 w-8 text-primary-foreground" />
                  <div>
                    <div className="text-lg font-medium">reservations@chateaulumiere.com</div>
                    <div className="text-sm opacity-75">Special requests & dietary requirements</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                  <div>
                    <div className="text-lg font-medium">45 Gourmet Mews, Mayfair, London W1K 2HB</div>
                    <div className="text-sm opacity-75">Exclusive dining in the heart of London</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                  <Clock className="h-8 w-8 text-primary-foreground" />
                  <div>
                    <div className="text-lg font-medium">Tue-Sat: 6:00 PM - 11:00 PM</div>
                    <div className="text-sm opacity-75">Sunday: 6:00 PM - 10:00 PM | Monday: Closed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/95 backdrop-blur-sm border rounded-2xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold text-foreground mb-8 font-serif">Reserve Your Table</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="First Name" className="bg-background" />
                  <Input placeholder="Last Name" className="bg-background" />
                </div>
                <Input placeholder="Email Address" type="email" className="bg-background" />
                <Input placeholder="Phone Number" type="tel" className="bg-background" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Preferred Date" type="date" className="bg-background" />
                  <Input placeholder="Preferred Time" type="time" className="bg-background" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Number of Guests" type="number" min="1" max="12" className="bg-background" />
                  <select className="w-full p-3 rounded-md border bg-background text-foreground">
                    <option>Dining Preference</option>
                    <option>Chef's Table (£125pp)</option>
                    <option>Wine Cellar Dinner (£95pp)</option>
                    <option>Seasonal Tasting (£75pp)</option>
                    <option>À la Carte</option>
                    <option>Private Dining Room</option>
                  </select>
                </div>
                <Textarea 
                  placeholder="Special requests, dietary requirements, or celebration details..." 
                  rows={4} 
                  className="bg-background"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif">
                    <UtensilsCrossed className="mr-2 h-4 w-4" />
                    Reserve Table
                  </Button>
                  <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background font-serif">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Restaurant
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-full">
                  <UtensilsCrossed className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground font-serif">Château Lumière</h3>
                  <p className="text-sm text-muted-foreground">Fine Dining Excellence Since 1987</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Where culinary artistry meets exceptional service. Our Michelin-recommended restaurant offers 
                an unforgettable dining experience in the heart of Mayfair, London.
              </p>
              <div className="flex gap-4">
                <Badge variant="outline" className="text-xs">
                  <Crown className="mr-1 h-3 w-3" />
                  Michelin Recommended
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Award className="mr-1 h-3 w-3" />
                  Award-Winning
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Wine className="mr-1 h-3 w-3" />
                  200+ Wine Selection
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4 font-serif">Experiences</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Chef's Table</li>
                <li>Wine Cellar Dinner</li>
                <li>Seasonal Tasting Menu</li>
                <li>Private Dining</li>
                <li>Corporate Events</li>
                <li>Wedding Receptions</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4 font-serif">Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>020 7123 4567</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>info@chateaulumiere.com</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Mayfair, London W1K 2HB</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Tue-Sat: 6PM-11PM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <span>© 2024 Château Lumière. All rights reserved.</span>
              <div className="flex gap-4">
                <span>Michelin Recommended</span>
                <span>•</span>
                <span>Award-Winning Cuisine</span>
                <span>•</span>
                <span>Private Events Available</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantDeluxeDemo;