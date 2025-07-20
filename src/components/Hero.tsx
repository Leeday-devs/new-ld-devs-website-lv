import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Abstract background shapes */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-gradient-to-tr from-accent to-primary rounded-full blur-2xl opacity-15"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-primary rounded-full blur-xl opacity-10 animate-float"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-primary font-medium mb-6">
              <Zap className="h-4 w-4" />
              Professional Web Solutions
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              WEB DESIGN IS HERE TO BE{" "}
              <span className="text-primary">
                YOUR ASSISTANCE
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              I am here ready to help you in making creative digital products. 
              Transform your online presence with stunning websites that convert.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant">
                Let's Discuss
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                <Code className="mr-2 h-5 w-5" />
                View Portfolio
              </Button>
            </div>
          </div>
          
          {/* Hero Image with floating elements */}
          <div className="relative animate-scale-in">
            {/* Main hero image */}
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Professional web designer"
                className="relative rounded-3xl w-full h-auto animate-float"
              />
            </div>
            
            {/* Floating UI elements */}
            <div className="absolute top-16 -right-4 bg-white rounded-2xl shadow-elegant p-4 animate-float z-20">
              <div className="flex items-center gap-3">
                <div className="bg-primary rounded-full p-2">
                  <span className="text-white font-bold text-sm">2K+</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Projects</p>
                  <p className="text-sm font-semibold">Completed</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-16 -left-4 bg-white rounded-2xl shadow-elegant p-4 animate-pulse z-20">
              <div className="flex items-center gap-2">
                <div className="flex text-primary text-sm">
                  ★★★★★
                </div>
                <div>
                  <p className="text-sm font-semibold">4.8</p>
                  <p className="text-xs text-muted-foreground">Satisfaction</p>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 right-8 bg-white rounded-xl shadow-elegant p-3 z-20" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Code className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium">Web Designer</p>
                  <p className="text-xs text-muted-foreground">Expert</p>
                </div>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-8 right-16 w-32 h-32 bg-primary/20 rounded-full"></div>
              <div className="absolute bottom-12 left-8 w-24 h-24 bg-accent/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;