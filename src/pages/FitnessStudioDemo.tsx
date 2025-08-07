import { Phone, Clock, Star, MapPin, Mail, Dumbbell, Users, Target, Heart, Trophy, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FitnessStudioDemo = () => {
  const classes = [
    {
      icon: Dumbbell,
      name: "Strength Training",
      time: "Mon, Wed, Fri - 7:00 AM",
      description: "Build muscle and strength with our expert-led weightlifting sessions.",
      intensity: "High"
    },
    {
      icon: Heart,
      name: "HIIT Cardio",
      time: "Tue, Thu - 6:30 PM",
      description: "High-intensity interval training to boost your cardiovascular fitness.",
      intensity: "Very High"
    },
    {
      icon: Users,
      name: "Group Fitness",
      time: "Mon-Fri - 7:30 PM",
      description: "Fun, energetic group workouts that keep you motivated and engaged.",
      intensity: "Medium"
    },
    {
      icon: Target,
      name: "Personal Training",
      time: "By Appointment",
      description: "One-on-one sessions tailored to your specific fitness goals.",
      intensity: "Custom"
    },
    {
      icon: Heart,
      name: "Yoga Flow",
      time: "Sat, Sun - 9:00 AM",
      description: "Mindful movement and flexibility training for body and mind.",
      intensity: "Low"
    },
    {
      icon: Trophy,
      name: "CrossFit",
      time: "Mon-Sat - 6:00 AM",
      description: "Functional fitness combining cardio, strength, and flexibility training.",
      intensity: "Very High"
    }
  ];

  const testimonials = [
    {
      name: "Jessica Thompson",
      location: "6 months member",
      rating: 5,
      text: "Amazing transformation! Lost 20kg and gained so much confidence. The trainers are incredibly supportive."
    },
    {
      name: "Mark Williams",
      location: "1 year member",
      rating: 5,
      text: "Best gym I've ever joined. Great equipment, fantastic community, and results speak for themselves."
    },
    {
      name: "Sarah Chen",
      location: "2 years member",
      rating: 5,
      text: "The variety of classes keeps workouts interesting. I've never been fitter or happier with my body."
    }
  ];

  const plans = [
    {
      name: "Basic",
      price: "£29",
      period: "/month",
      features: ["Gym Access", "Basic Equipment", "Locker Room", "Mobile App"]
    },
    {
      name: "Premium",
      price: "£49",
      period: "/month",
      features: ["Everything in Basic", "All Group Classes", "Nutrition Guidance", "Progress Tracking", "Guest Passes"],
      popular: true
    },
    {
      name: "Elite",
      price: "£79",
      period: "/month",
      features: ["Everything in Premium", "Personal Training Session", "Meal Planning", "Priority Booking", "Wellness Coaching"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm text-white py-4 shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-purple-400">APEX</span> FITNESS
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-purple-400">
              <Phone className="h-4 w-4" />
              <span className="font-medium">020 8765 4321</span>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 font-bold">
              Join Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10 text-white">
          <h2 className="text-6xl font-bold mb-6">
            Transform Your <span className="text-purple-400">Body</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Join London's premier fitness destination. State-of-the-art equipment, expert trainers, and a community that will push you to achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4 font-bold">
              <Dumbbell className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black text-lg px-8 py-4 font-bold">
              View Classes
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-black/30 p-6 rounded-lg border border-purple-400/20 backdrop-blur-sm">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
              <p className="text-gray-400">Certified professionals with years of experience</p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg border border-purple-400/20 backdrop-blur-sm">
              <Users className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-400">Supportive environment that motivates success</p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg border border-purple-400/20 backdrop-blur-sm">
              <Clock className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
              <p className="text-gray-400">Train on your schedule, any time of day</p>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Our <span className="text-purple-400">Classes</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From beginner-friendly sessions to advanced training, we have classes for every fitness level and goal.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem, index) => (
              <Card key={index} className="bg-gray-900/80 border-purple-400/20 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <classItem.icon className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">{classItem.name}</h3>
                  <p className="text-purple-400 font-medium mb-3">{classItem.time}</p>
                  <p className="text-gray-400 mb-4">{classItem.description}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    classItem.intensity === 'Low' ? 'bg-green-600 text-white' :
                    classItem.intensity === 'Medium' ? 'bg-yellow-600 text-white' :
                    classItem.intensity === 'High' ? 'bg-orange-600 text-white' :
                    classItem.intensity === 'Very High' ? 'bg-red-600 text-white' :
                    'bg-purple-600 text-white'
                  }`}>
                    {classItem.intensity} Intensity
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Membership <span className="text-purple-400">Plans</span>
            </h2>
            <p className="text-xl text-gray-400">Choose the plan that fits your fitness journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'bg-purple-600 border-purple-400 scale-105' : 'bg-gray-800 border-gray-600'} text-center`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-300">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 flex items-center justify-center">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-white text-purple-600 hover:bg-gray-100' : 'bg-purple-600 hover:bg-purple-700 text-white'} font-bold`}>
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Success <span className="text-purple-400">Stories</span>
            </h2>
            <p className="text-xl text-gray-400">Real transformations from our amazing members</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-900/80 border-purple-400/20 text-center backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-purple-400">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">
                Start Your <span className="text-purple-400">Journey</span>
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Ready to transform your life? Join APEX FITNESS today and discover what you're truly capable of achieving.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <span className="text-lg">020 8765 4321</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span className="text-lg">info@apexfitness.co.uk</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <span className="text-lg">789 Fitness Boulevard, Canary Wharf, London E14 5AB</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg">24/7 Gym Access</p>
                    <p className="text-gray-400">Classes: 6AM-10PM Daily</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-white text-gray-900">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-purple-900">Start Your Free Trial</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Email Address" type="email" />
                    <Input placeholder="Phone Number" type="tel" />
                    <select className="w-full p-3 rounded-md border">
                      <option>Select Fitness Goal</option>
                      <option>Weight Loss</option>
                      <option>Muscle Building</option>
                      <option>General Fitness</option>
                      <option>Athletic Performance</option>
                    </select>
                    <Textarea placeholder="Tell us about your fitness experience..." rows={3} />
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-3">
                      Claim Free Trial
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            <span className="text-purple-400">APEX</span> FITNESS
          </h3>
          <p className="text-gray-400 mb-6">Transform your body, transform your life</p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <span>© 2024 APEX FITNESS</span>
            <span>•</span>
            <span>24/7 Access</span>
            <span>•</span>
            <span>Expert Training</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FitnessStudioDemo;