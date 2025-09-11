import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Mail, ArrowRight, Star, Users, Award } from "lucide-react";
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

  return (
    <div className="space-y-6">
      {/* Newsletter Subscription */}
      <Card className="p-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-2 border-primary/20">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Newsletter</span>
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
                className="flex-1"
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90"
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

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-border/50">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>10k+ subscribers</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Award className="h-4 w-4 text-primary" />
              <span>Industry leader</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Free Consultation CTA */}
      <Card className="p-8 bg-gradient-to-br from-accent/5 via-background to-primary/5 border border-accent/30">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-foreground">
            Ready to Transform Your Business?
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Let's discuss how we can help automate your workflows and boost your productivity. 
            Book a free 30-minute consultation call.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Book Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              View Our Services
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};