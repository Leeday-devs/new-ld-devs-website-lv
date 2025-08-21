import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { usePopupFrequency } from "@/hooks/usePopupFrequency";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExitIntentModal = ({ isOpen, onClose }: ExitIntentModalProps) => {
  const { modalRef } = useModal({ isOpen, onClose });
  const { canShowPopup, markPopupShown } = usePopupFrequency();
  const [shouldShow, setShouldShow] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Check if we should show this popup (7 day frequency control)
  useEffect(() => {
    if (isOpen && canShowPopup('exit-intent')) {
      setShouldShow(true);
      markPopupShown('exit-intent');
    } else if (!isOpen) {
      setShouldShow(false);
    }
  }, [isOpen, canShowPopup, markPopupShown]);

  // Only show on desktop
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ 
          email: email.trim(),
          source: 'exit_intent_popup'
        }]);

      if (error) throw error;

      toast({
        title: "Homepage concept sent!",
        description: "Check your inbox for your free homepage design concept.",
      });
      onClose();
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render on mobile or if frequency control blocks it
  if (isMobile || (isOpen && !shouldShow)) {
    return null;
  }

  const titleId = "exit-intent-title";
  const descriptionId = "exit-intent-description";

  const benefits = [
    "Custom homepage layout designed for your industry",
    "Conversion-focused design elements included"
  ];

  return (
    <Dialog open={isOpen && shouldShow} onOpenChange={onClose}>
      <DialogContent 
        ref={modalRef}
        className="modal-default"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <DialogHeader>
          <DialogTitle id={titleId} className="modal-title">
            Before you go—want a free homepage concept?
          </DialogTitle>
          <DialogDescription id={descriptionId} className="modal-subtitle">
            Get a personalized homepage design concept sent to your inbox
          </DialogDescription>
        </DialogHeader>

        <div className="modal-body space-y-6">
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm text-text-secondary">{benefit}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="exit-email" className="text-sm font-medium text-text-primary mb-2 block">
                Email Address
              </Label>
              <Input
                id="exit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="premium-input"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send It to Me"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Hook for exit intent detection
export const useExitIntent = (onExitIntent: () => void) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        timeoutId = setTimeout(() => {
          onExitIntent();
        }, 100);
      }
    };

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [onExitIntent]);
};