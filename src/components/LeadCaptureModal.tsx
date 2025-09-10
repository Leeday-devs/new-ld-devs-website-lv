import { useState } from 'react';
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
import { Lock } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { usePopupFrequency } from "@/hooks/usePopupFrequency";
import { useEffect, useState as useStateEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadCaptureModal = ({ isOpen, onClose }: LeadCaptureModalProps) => {
  const { modalRef } = useModal({ isOpen, onClose });
  const { canShowPopup, markPopupShown } = usePopupFrequency();
  const [shouldShow, setShouldShow] = useStateEffect(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Check if we should show this popup (frequency control)
  useEffect(() => {
    if (isOpen && canShowPopup('lead-capture')) {
      setShouldShow(true);
      markPopupShown('lead-capture');
    } else if (!isOpen) {
      setShouldShow(false);
    }
  }, [isOpen, canShowPopup, markPopupShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
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
          name: name.trim(),
          source: 'lead_capture_popup'
        }]);

      if (error) throw error;

      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'newsletter_signup',
          data: {
            name: name.trim(),
            email: email.trim(),
            source: 'lead_capture_popup'
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
      }

      toast({
        title: "Success!",
        description: "Your free guide is on its way to your inbox.",
      });
      onClose();
      setName('');
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

  // Don't render if frequency control blocks it
  if (isOpen && !shouldShow) {
    return null;
  }

  const titleId = "lead-capture-title";
  const descriptionId = "lead-capture-description";

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
            Get smarter online, fast.
          </DialogTitle>
          <DialogDescription id={descriptionId} className="modal-subtitle">
            Join 1,000+ owners—no spam.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="modal-body space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-text-primary mb-2 block">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="premium-input"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-text-primary mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="premium-input"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-bg-grey rounded-lg">
            <Lock className="h-4 w-4 text-text-muted" />
            <span className="text-sm text-text-muted">
              We'll never share your email.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              type="submit" 
              className="btn-primary flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Get the Free Guide"}
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose}
              className="text-text-muted hover:text-text-primary"
            >
              No thanks
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};