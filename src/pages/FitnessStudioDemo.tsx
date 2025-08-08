import { Phone, Clock, Star, MapPin, Mail, Dumbbell, Users, Target, Heart, Trophy, Calendar, Zap, TrendingUp, Timer, Activity, Award, CheckCircle, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WatermarkOverlay from "@/components/WatermarkOverlay";

const FitnessStudioDemo = () => {
  const workoutPrograms = [
    {
      icon: Dumbbell,
      title: "Strength Training",
      description: "Build lean muscle and increase power with progressive weight training programs.",
      duration: "45-60 min",
      intensity: "High",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Heart,
      title: "HIIT Cardio",
      description: "High-intensity interval training to torch calories and boost metabolism.",
      duration: "30-45 min", 
      intensity: "Very High",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Functional Fitness",
      description: "Real-world movement patterns that improve daily life performance.",
      duration: "40-50 min",
      intensity: "Medium",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Group Classes",
      description: "Energizing group workouts that keep you motivated and accountable.",
      duration: "45 min",
      intensity: "Variable",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const successStats = [
    { number: "2,500+", label: "Members Transformed", icon: Users },
    { number: "95%", label: "Goal Achievement Rate", icon: Target },
    { number: "50+", label: "Expert Trainers", icon: Award },
    { number: "24/7", label: "Gym Access", icon: Clock }
  ];

  const transformations = [
    {
      name: "Sarah M.",
      age: 28,
      achievement: "Lost 35 lbs, Gained Confidence",
      timeframe: "6 months",
      program: "Strength + Cardio"
    },
    {
      name: "Mike R.",
      age: 34,
      achievement: "Built 15 lbs Muscle",
      timeframe: "8 months", 
      program: "Powerlifting Focus"
    },
    {
      name: "Jenny L.", 
      age: 42,
      achievement: "Completed First Marathon",
      timeframe: "12 months",
      program: "Endurance Training"
    }
  ];

  const classSchedule = [
    { time: "6:00 AM", class: "Morning HIIT", trainer: "Alex", spots: "3 left" },
    { time: "7:30 AM", class: "Strength Circuit", trainer: "Maya", spots: "Full" },
    { time: "9:00 AM", class: "Yoga Flow", trainer: "Sarah", spots: "8 left" },
    { time: "12:00 PM", class: "Lunch Break Burn", trainer: "Jake", spots: "5 left" },
    { time: "6:00 PM", class: "Evening Power", trainer: "Chris", spots: "2 left" },
    { time: "7:30 PM", class: "Functional Fit", trainer: "Emma", spots: "6 left" }
  ];

  const testimonials = [
    {
      name: "David Chen",
      achievement: "Lost 40 lbs",
      rating: 5,
      text: "FitCore changed my life completely. The trainers pushed me beyond what I thought was possible.",
      timeframe: "8 months"
    },
    {
      name: "Rachel Torres",
      achievement: "PR in Deadlift: 200 lbs",
      rating: 5,
      text: "The community here is incredible. Everyone supports each other's fitness journey.",
      timeframe: "1 year"
    },
    {
      name: "James Wilson",
      achievement: "Ran First 10K",
      rating: 5,
      text: "From couch to 10K in 6 months. The personalized training plan made all the difference.",
      timeframe: "6 months"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-bold" onContextMenu={(e) => e.preventDefault()}>
      <WatermarkOverlay text="LD Development" />
      {/* Sticky Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-green-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black">FIT<span className="text-green-500">CORE</span></h1>
                <p className="text-xs text-gray-400 font-normal">TRANSFORM YOUR LIFE</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#programs" className="text-gray-300 hover:text-green-500 transition-colors font-medium">Programs</a>
              <a href="#schedule" className="text-gray-300 hover:text-green-500 transition-colors font-medium">Schedule</a>
              <a href="#results" className="text-gray-300 hover:text-green-500 transition-colors font-medium">Results</a>
              <a href="#join" className="text-gray-300 hover:text-green-500 transition-colors font-medium">Join Now</a>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-gray-400 font-normal">Ready to Start?</div>
                <div className="text-sm font-bold text-green-500">020 8901 2345</div>
              </div>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold">
                FREE TRIAL
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569-13.431-30-30-30v60c16.569 0 30-13.431 30-30zM0 30c0 16.569 13.431 30 30 30V0C13.431 0 0 13.431 0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Content Grid */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-black px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider mb-4">
                  🔥 Transform Your Body
                </span>
                <h2 className="text-6xl lg:text-7xl font-black leading-tight mb-6">
                  UNLOCK YOUR
                  <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    POTENTIAL
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed font-normal max-w-lg">
                  Join 2,500+ members who've transformed their lives at London's most results-driven fitness studio. Your strongest self is waiting.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 text-lg font-bold">
                  <Play className="mr-2 h-6 w-6" />
                  START FREE TRIAL
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-8 py-4 text-lg font-bold">
                  <Calendar className="mr-2 h-6 w-6" />
                  BOOK CONSULTATION
                </Button>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {successStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 mb-3 border border-green-500/30">
                      <stat.icon className="h-6 w-6 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-black text-green-400">{stat.number}</div>
                    </div>
                    <div className="text-xs text-gray-400 font-normal uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Workout Tracker Card */}
            <div className="lg:col-span-5">
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-green-500/30 backdrop-blur-md">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-black px-4 py-2 rounded-full text-sm font-black uppercase tracking-wide mb-4">
                      TODAY'S CHALLENGE
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Torch 500 Calories</h3>
                    <p className="text-gray-400 font-normal">Join 47 members completing today's challenge</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-bold">Strength Circuit</span>
                        <span className="text-green-400 text-sm font-bold">15 MIN</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    
                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-bold">HIIT Cardio</span>
                        <span className="text-orange-400 text-sm font-bold">20 MIN</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-1/2"></div>
                      </div>
                    </div>
                    
                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-bold">Cool Down</span>
                        <span className="text-blue-400 text-sm font-bold">10 MIN</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-1/4"></div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 text-lg">
                    <Zap className="mr-2 h-5 w-5" />
                    START WORKOUT
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-black px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider mb-4">
              TRAINING PROGRAMS
            </span>
            <h2 className="text-5xl font-black mb-6">Choose Your <span className="text-green-400">Transformation</span></h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-normal">
              Scientifically designed programs that deliver real results. Each workout is crafted to push your limits and unlock your potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {workoutPrograms.map((program, index) => (
              <Card key={index} className="group bg-black/50 border-2 border-gray-700 hover:border-green-500 transition-all duration-300 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`bg-gradient-to-r ${program.color} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      <program.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-white mb-3 group-hover:text-green-400 transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed font-normal">{program.description}</p>
                      
                      <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-2">
                          <Timer className="h-4 w-4 text-green-400" />
                          <span className="text-sm font-bold text-gray-300">{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-orange-400" />
                          <span className="text-sm font-bold text-gray-300">{program.intensity}</span>
                        </div>
                      </div>
                      
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold">
                        START PROGRAM
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Schedule Section */}
      <section id="schedule" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-black px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider mb-4">
              LIVE SCHEDULE
            </span>
            <h2 className="text-5xl font-black mb-6">Today's <span className="text-green-400">Classes</span></h2>
            <p className="text-xl text-gray-400 font-normal">Real-time availability • Book instantly</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4">
              {classSchedule.map((session, index) => (
                <Card key={index} className="bg-gray-900/50 border border-gray-700 hover:border-green-500 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-black text-green-400">{session.time}</div>
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-white mb-1">{session.class}</h3>
                          <p className="text-gray-400 font-normal">with {session.trainer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`text-sm font-bold ${
                            session.spots === "Full" ? "text-red-400" : "text-green-400"
                          }`}>
                            {session.spots}
                          </div>
                        </div>
                        <Button 
                          disabled={session.spots === "Full"}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold disabled:from-gray-600 disabled:to-gray-700"
                        >
                          {session.spots === "Full" ? "FULL" : "BOOK"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Results */}
      <section id="results" className="py-24 bg-gradient-to-br from-green-900/20 via-black to-emerald-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-black px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider mb-4">
              REAL RESULTS
            </span>
            <h2 className="text-5xl font-black mb-6">Amazing <span className="text-green-400">Transformations</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-normal">
              These are real FitCore members who've achieved incredible results. Your transformation starts here.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {transformations.map((transformation, index) => (
              <Card key={index} className="bg-black/70 border-2 border-green-500/30 hover:border-green-500 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{transformation.name}</h3>
                  <p className="text-green-400 font-bold text-lg mb-3">{transformation.achievement}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-normal">Time:</span>
                      <span className="text-white font-bold">{transformation.timeframe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-normal">Program:</span>
                      <span className="text-white font-bold">{transformation.program}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Member Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-900/50 border border-gray-700">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-green-400 text-green-400" />
                      ))}
                    </div>
                    <span className="bg-green-500 text-black px-3 py-1 rounded-full text-xs font-black">
                      {testimonial.achievement}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6 italic leading-relaxed font-normal">"{testimonial.text}"</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-white">{testimonial.name}</h4>
                      <p className="text-green-400 text-sm font-bold">{testimonial.timeframe} member</p>
                    </div>
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="join" className="py-24 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl font-black text-white mb-6">
              Ready to <span className="text-black">TRANSFORM?</span>
            </h2>
            <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto font-normal">
              Join thousands of members who've achieved their fitness goals. Start your 7-day free trial today - no contracts, no commitments.
            </p>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-black text-white mb-8">What's Included:</h3>
                <div className="space-y-4">
                  {[
                    "Unlimited access to all classes",
                    "Personal fitness assessment", 
                    "Nutrition guidance & meal plans",
                    "24/7 gym access",
                    "Progress tracking app",
                    "Community support group"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-white" />
                      <span className="text-white font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="bg-white text-gray-900">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-6">Start Your Free Trial</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="First Name" className="border-2 border-gray-300 font-medium" />
                      <Input placeholder="Last Name" className="border-2 border-gray-300 font-medium" />
                    </div>
                    <Input placeholder="Email Address" type="email" className="border-2 border-gray-300 font-medium" />
                    <Input placeholder="Phone Number" type="tel" className="border-2 border-gray-300 font-medium" />
                    <select className="w-full p-3 rounded-md border-2 border-gray-300 font-medium">
                      <option>Primary Fitness Goal</option>
                      <option>Lose Weight</option>
                      <option>Build Muscle</option>
                      <option>Improve Cardio</option>
                      <option>General Fitness</option>
                      <option>Sport Performance</option>
                    </select>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black py-4 text-lg">
                      <Zap className="mr-2 h-5 w-5" />
                      START FREE TRIAL
                    </Button>
                    <p className="text-center text-sm text-gray-600 font-normal">
                      No credit card required • Cancel anytime
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-green-500/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-black">FIT<span className="text-green-500">CORE</span></h3>
              </div>
              <p className="text-gray-400 mb-4 font-normal">Transform your body, transform your life. London's premier fitness destination.</p>
              <div className="flex gap-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">OPEN 24/7</span>
                <span className="bg-gray-700 text-white px-3 py-1 rounded text-sm font-bold">50+ TRAINERS</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-black mb-4 text-green-400">Programs</h4>
              <ul className="space-y-2 text-gray-400 font-normal">
                <li>Strength Training</li>
                <li>HIIT Cardio</li>
                <li>Functional Fitness</li>
                <li>Group Classes</li>
                <li>Personal Training</li>
                <li>Nutrition Coaching</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-black mb-4 text-green-400">Facilities</h4>
              <ul className="space-y-2 text-gray-400 font-normal">
                <li>Cardio Zone</li>
                <li>Free Weights</li>
                <li>Functional Training</li>
                <li>Group Exercise Studios</li>
                <li>Recovery Lounge</li>
                <li>Nutrition Bar</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-black mb-4 text-green-400">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-500" />
                  <span className="font-bold">020 8901 2345</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-green-500" />
                  <span className="font-normal">hello@fitcorestudio.co.uk</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span className="font-normal">789 Power Street, Shoreditch, London E2 7DJ</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 font-normal">© 2024 FitCore Studio. All rights reserved. Transform your limits.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FitnessStudioDemo;