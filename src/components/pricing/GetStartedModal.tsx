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
import { supabase } from "@/integrations/supabase/client";

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
      // Send to Discord via Supabase edge function
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'consultation_request',
          data: {
            packageName: selectedPackage?.name || 'Unknown',
            buildPrice: selectedPackage?.buildPrice || 'N/A',
            monthlyPrice: selectedPackage?.monthlyPrice || 'N/A',
            customerName: formData.name,
            phone: formData.phone,
            email: formData.email,
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
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
      console.error('Failed to send consultation request:', error);
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
      <DialogContent className="sm:max-w-[500px] p-4 sm:p-6">
        {!showConsultationForm ? (
          <>
            <DialogHeader className="space-y-2 sm:space-y-3">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-navy">
                Let's Get Started!
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm sm:text-base">
                Choose how you'd like to proceed with{" "}
                <span className="text-orange font-semibold">
                  {selectedPackage?.name}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 sm:gap-4 py-4 sm:py-6">
              {/* Pay Now Option */}
              <button
                onClick={handlePayNow}
                className="group relative p-4 sm:p-6 rounded-xl border-2 border-orange/30 hover:border-orange bg-white hover:bg-orange/5 transition-all duration-300 text-left shadow-sm"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-lg bg-orange text-white flex-shrink-0">
                    <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-navy mb-1 flex items-center gap-2">
                      <span>Pay Now & Get Started</span>
                      <ArrowRight className="h-4 w-4 text-orange opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline" />
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Proceed to checkout and we'll start building your website
                      right away
                    </p>
                  </div>
                </div>
              </button>

              {/* Request Consultation Option */}
              <button
                onClick={handleRequestConsultation}
                className="group relative p-4 sm:p-6 rounded-xl border-2 border-orange/30 hover:border-orange bg-white hover:bg-orange/5 transition-all duration-300 text-left shadow-sm"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-lg bg-orange text-white flex-shrink-0">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-navy mb-1 flex items-center gap-2">
                      <span>Request a Free Consultation</span>
                      <ArrowRight className="h-4 w-4 text-orange opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline" />
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Have questions? Let's chat about your project first
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="space-y-2 sm:space-y-3">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-navy">
                Request a Consultation
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm sm:text-base">
                Tell us how to reach you and we'll contact you shortly
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitConsultation} className="space-y-4 sm:space-y-5 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-navy flex items-center gap-2 text-sm sm:text-base">
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
                  className="bg-white border-gray-300 text-navy placeholder:text-gray-400 h-11 sm:h-10 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-navy flex items-center gap-2 text-sm sm:text-base">
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
                  className="bg-white border-gray-300 text-navy placeholder:text-gray-400 h-11 sm:h-10 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-navy flex items-center gap-2 text-sm sm:text-base">
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
                  className="bg-white border-gray-300 text-navy placeholder:text-gray-400 h-11 sm:h-10 text-base"
                />
              </div>

              <div className="flex gap-3 pt-2 sm:pt-4">
                <EnhancedButton
                  type="button"
                  variant="outline"
                  onClick={handleBackToOptions}
                  className="flex-1 h-11 sm:h-10"
                  disabled={isSubmitting}
                >
                  Back
                </EnhancedButton>
                <EnhancedButton
                  type="submit"
                  variant="premium"
                  className="flex-1 h-11 sm:h-10"
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
