import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button as EnhancedButton } from "@/components/ui/button-enhanced";
import { CreditCard, Calendar, ArrowRight, Phone, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { EnhancedPackage } from "@/types/pricing";

interface GetStartedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPackage: EnhancedPackage | null;
  onPayNow: () => void;
}

export const GetStartedModal = ({
  open,
  onOpenChange,
  selectedPackage,
  onPayNow,
}: GetStartedModalProps) => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const { toast } = useToast();

  // Reset state when modal closes
  useEffect(() => {
    console.log('Modal open state changed:', open);
    if (!open) {
      setShowConsultationForm(false);
      setFormData({ name: "", phone: "", email: "" });
      setIsSubmitting(false);
    }
  }, [open]);

  const handlePayNow = () => {
    onOpenChange(false);
    onPayNow();
  };

  const handleRequestConsultation = () => {
    setShowConsultationForm(true);
  };

  const handleBackToOptions = () => {
    setShowConsultationForm(false);
    setFormData({ name: "", phone: "", email: "" });
  };

  const handleSubmitConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to Discord webhook
      const discordWebhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

      if (discordWebhookUrl) {
        const message = {
          embeds: [
            {
              title: "🎯 New Consultation Request",
              color: 0xff7a00, // Orange color
              fields: [
                {
                  name: "Package",
                  value: selectedPackage?.name || "Unknown",
                  inline: true,
                },
                {
                  name: "Price",
                  value: `${selectedPackage?.buildPrice} + ${selectedPackage?.monthlyPrice}`,
                  inline: true,
                },
                {
                  name: "Customer Name",
                  value: formData.name,
                  inline: false,
                },
                {
                  name: "Phone",
                  value: formData.phone,
                  inline: true,
                },
                {
                  name: "Email",
                  value: formData.email,
                  inline: true,
                },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        };

        await fetch(discordWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
      }

      // Show success message
      toast({
        title: "Request Received!",
        description: "We'll contact you shortly to discuss your project.",
      });

      // Reset and close
      setFormData({ name: "", phone: "", email: "" });
      setShowConsultationForm(false);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {!showConsultationForm ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-navy">
                Let's Get Started!
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Choose how you'd like to proceed with{" "}
                <span className="text-orange font-semibold">
                  {selectedPackage?.name}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-6">
              {/* Pay Now Option */}
              <button
                onClick={handlePayNow}
                className="group relative p-6 rounded-xl border-2 border-gray-200 hover:border-orange bg-gray-50 hover:bg-orange/5 transition-all duration-300 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange/20 text-orange group-hover:bg-orange group-hover:text-white transition-colors">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy mb-1 flex items-center gap-2">
                      Pay Now & Get Started
                      <ArrowRight className="h-4 w-4 text-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Proceed to checkout and we'll start building your website
                      right away
                    </p>
                  </div>
                </div>
              </button>

              {/* Request Consultation Option */}
              <button
                onClick={handleRequestConsultation}
                className="group relative p-6 rounded-xl border-2 border-gray-200 hover:border-orange bg-gray-50 hover:bg-orange/5 transition-all duration-300 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange/20 text-orange group-hover:bg-orange group-hover:text-white transition-colors">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy mb-1 flex items-center gap-2">
                      Request a Free Consultation
                      <ArrowRight className="h-4 w-4 text-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Have questions? Let's chat about your project first
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-navy">
                Request a Consultation
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Tell us how to reach you and we'll contact you shortly
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitConsultation} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-navy flex items-center gap-2">
                  <User className="h-4 w-4 text-orange" />
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-white border-gray-300 text-navy placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-navy flex items-center gap-2">
                  <Phone className="h-4 w-4 text-orange" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="07123 456789"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="bg-white border-gray-300 text-navy placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-navy flex items-center gap-2">
                  <Mail className="h-4 w-4 text-orange" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-white border-gray-300 text-navy placeholder:text-gray-400"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <EnhancedButton
                  type="button"
                  variant="outline"
                  onClick={handleBackToOptions}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Back
                </EnhancedButton>
                <EnhancedButton
                  type="submit"
                  variant="premium"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Request Consultation"}
                </EnhancedButton>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
