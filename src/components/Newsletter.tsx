import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isRateLimited, sanitizeInput, isValidEmail, logSecureError } from "@/utils/security";

const Newsletter = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedEmail = sanitizeInput(email.trim());
    
    if (!sanitizedEmail) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(sanitizedEmail)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Rate limiting
    if (isRateLimited(`newsletter-${sanitizedEmail}`, 3, 60000)) {
      toast({
        title: "Error",
        description: "Too many attempts. Please wait a minute before trying again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email: sanitizedEmail }
      });

      if (error) throw error;

      // Send Discord notification
      try {
        await supabase.functions.invoke('send-discord-notification', {
          body: {
            eventType: 'newsletter',
            data: {
              email: sanitizedEmail
            }
          }
        });
      } catch (discordError) {
        // Fail silently for Discord notifications
        console.error('Failed to send Discord notification:', discordError);
      }

      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter!",
      });

      setEmail("");

    } catch (error: any) {
      logSecureError('Newsletter subscription', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="h-6 w-6" />
            <h3 className="text-xl font-semibold">Stay Updated</h3>
          </div>
          <p className="mb-6 text-primary-foreground/80">
            Get the latest web development tips, hosting updates, and special offers delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.slice(0, 100))}
              placeholder="Enter your email"
              className="bg-background text-foreground border-border"
              maxLength={100}
              required
            />
            <Button 
              type="submit"
              variant="secondary"
              disabled={isLoading}
              className="shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;