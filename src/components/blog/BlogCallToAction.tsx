import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Mail, ArrowRight, Star, Users, Award, MessageSquare, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const BlogCallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest articles and updates.",
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in your services after reading your blog post. I'd like to discuss my project requirements.");
    window.open(`https://wa.me/447586266007?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Main CTA Section */}
      <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/20 via-[#0D6EFD]/10 to-[#FF7A00]/5 opacity-50"></div>
        
        {/* Glass morphism effect */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden">
          <div className="relative z-10 p-8 md:p-12 text-center">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] flex items-center justify-center shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                Join 500+ successful businesses who've implemented these strategies. 
                <span className="block mt-2 text-[#FF7A00] font-semibold">No technical knowledge needed, we do everything for you.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-[#FF7A00] to-[#0D6EFD] hover:from-[#FF7A00]/90 hover:to-[#0D6EFD]/90 text-white font-bold px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Get Your Free Consultation
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm font-semibold"
              >
                View Our Portfolio
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/80">
                <Users className="h-5 w-5 text-[#FF7A00]" />
                <span className="font-semibold">500+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Award className="h-5 w-5 text-[#0D6EFD]" />
                <span className="font-semibold">UK Industry Leader</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Newsletter Subscription */}
      <Card className="p-8 bg-gradient-to-br from-orange-50/50 via-white to-blue-50/30 dark:from-slate-900/50 dark:via-slate-800 dark:to-slate-900 border border-orange-200/30 dark:border-white/10 shadow-xl backdrop-blur-sm">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-[#FF7A00]" />
              <span className="text-sm font-medium text-[#FF7A00]">NEWSLETTER</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Get More Insights Like This
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Join 10,000+ readers getting weekly updates on business automation, 
              productivity tips, and industry trends.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 border-orange-200 dark:border-white/20 focus:border-[#FF7A00]"
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#FF7A00] to-[#0D6EFD] hover:from-[#FF7A00]/90 hover:to-[#0D6EFD]/90 text-white font-semibold px-6"
              >
                {isSubmitting ? 'Subscribing...' : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              No spam. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </Card>
    </div>
  );
};