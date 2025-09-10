import { ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const FinalCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: email.trim() }]);

      if (error) {
        console.error('Error storing email:', error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } else {
        // Send Discord notification
        const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
          body: {
            eventType: 'newsletter_signup',
            data: {
              email: email.trim(),
              source: 'final_cta'
            }
          }
        });

        if (discordError) {
          console.error('Discord notification failed:', discordError);
        }

        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: "Thank you! We'll get back to you shortly.",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="section-navy py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h2 className="heading-primary text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Ready to Build Something
            <span className="block text-orange mt-2">
              Extraordinary?
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful businesses who trust us to create 
            websites that not only look amazing but deliver real results.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-white/70">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-orange fill-orange" />
              <span className="font-medium">5-Star Rated</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="font-medium">250+ Happy Clients</div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="font-medium">99.9% Uptime</div>
          </div>

          {/* Email Input and CTA */}
          <div className="mb-8">
            {isSubmitted ? (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white/10 border border-white/20 rounded-xl px-8 py-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-white/80 text-lg">We will get back to you shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-lg disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange hover:bg-orange/90 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-2xl hover:shadow-orange/20 inline-flex items-center gap-3 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? "Submitting..." : "Get Started"}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            )}
          </div>

          {/* Additional Info */}
          <p className="text-white/60 text-sm">
            Free consultation • No obligation • Quick response
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;