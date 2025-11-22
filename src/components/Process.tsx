import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Palette, Code2, Rocket } from "lucide-react";

const Process = () => {
  const steps = [
    {
      number: "1",
      icon: MessageSquare,
      title: "Chat",
      description: "We learn about your business and what you need your website to do."
    },
    {
      number: "2",
      icon: Palette,
      title: "Design",
      description: "We show you how it'll look before we build anything — so you can give feedback early."
    },
    {
      number: "3",
      icon: Code2,
      title: "Build",
      description: "We create your website and keep you updated along the way."
    },
    {
      number: "4",
      icon: Rocket,
      title: "Launch + Support",
      description: "We go live and stay on hand to help with updates and questions."
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy mb-4">How It Works</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Simple steps from idea to finished website.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.number} className="relative bg-white border border-navy/10 hover:border-orange/30 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange/10 border-2 border-orange flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-5 w-5 text-orange" />
                  </div>
                  <div className="text-sm font-bold text-orange mb-2">Step {step.number}</div>
                  <h3 className="text-xl font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
