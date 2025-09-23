import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Palette, Code2, TestTube, Rocket, HeadphonesIcon, ArrowRight, CheckCircle, Clock, Users, Sparkles } from "lucide-react";
const Process = () => {
  const steps = [{
    number: "01",
    icon: MessageSquare,
    title: "Discovery & Planning",
    description: "I chat about your ideas and figure out exactly what you want your website to do!",
    details: ["Understanding your goals", "Researching your audience", "Planning the features", "Creating a roadmap"],
    duration: "1-2 weeks",
    color: "from-blue-500 to-cyan-500"
  }, {
    number: "02",
    icon: Palette,
    title: "Design & Wireframes",
    description: "I draw and design how your website will look - making it beautiful and easy to use!",
    details: ["Creating wireframes", "Designing the look and feel", "Choosing colors and fonts", "Getting your approval"],
    duration: "2-3 weeks",
    color: "from-purple-500 to-pink-500"
  }, {
    number: "03",
    icon: Code2,
    title: "Development",
    description: "This is where the magic happens! I build your website using the latest technology.",
    details: ["Writing clean code", "Building all features", "Making it work on all devices", "Regular progress updates"],
    duration: "3-6 weeks",
    color: "from-green-500 to-emerald-500"
  }, {
    number: "04",
    icon: TestTube,
    title: "Testing & Review",
    description: "I test everything to make sure it works perfectly and you're happy with it!",
    details: ["Testing all features", "Checking on different devices", "Your feedback and changes", "Final polishing"],
    duration: "1-2 weeks",
    color: "from-orange-500 to-red-500"
  }, {
    number: "05",
    icon: Rocket,
    title: "Launch",
    description: "Time to show your amazing website to the world! I help you go live.",
    details: ["Final preparations", "Going live online", "Setting up analytics", "Celebration time!"],
    duration: "1 week",
    color: "from-indigo-500 to-purple-500"
  }, {
    number: "06",
    icon: HeadphonesIcon,
    title: "Support & Maintenance",
    description: "I don't disappear! I'm here to help keep your website running smoothly.",
    details: ["Regular updates", "Security monitoring", "Performance optimization", "Ongoing support"],
    duration: "Ongoing",
    color: "from-teal-500 to-blue-500"
  }];
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">My Development Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I follow a proven process to deliver amazing websites that exceed your expectations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.number} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="outline" className="mb-3">{step.number}</Badge>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <Clock className="inline h-4 w-4 mr-1" />
                    {step.duration}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Process;