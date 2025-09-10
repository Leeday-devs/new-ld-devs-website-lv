import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useModal } from "@/hooks/useModal";
import { usePopupFrequency } from "@/hooks/usePopupFrequency";

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  offer?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const PromoModal = ({ 
  isOpen, 
  onClose,
  title = "Special Limited Time Offer",
  offer = "Get 20% off your first website project when you book a consultation this week!",
  ctaText = "Claim Offer",
  ctaLink = "/request-work"
}: PromoModalProps) => {
  const { modalRef } = useModal({ isOpen, onClose });
  const { canShowPopup, markPopupShown } = usePopupFrequency();
  const [shouldShow, setShouldShow] = useState(false);

  // Check if we should show this popup (frequency control)
  useEffect(() => {
    if (isOpen && canShowPopup('promo-offer')) {
      setShouldShow(true);
      markPopupShown('promo-offer');
    } else if (!isOpen) {
      setShouldShow(false);
    }
  }, [isOpen, canShowPopup, markPopupShown]);

  const handleClaimOffer = () => {
    // Navigate to the CTA link or trigger action
    if (ctaLink.startsWith('/')) {
      window.location.href = ctaLink;
    } else {
      window.open(ctaLink, '_blank');
    }
    onClose();
  };

  // Don't render if frequency control blocks it
  if (isOpen && !shouldShow) {
    return null;
  }

  const titleId = "promo-title";
  const descriptionId = "promo-description";

  return (
    <Dialog open={isOpen && shouldShow} onOpenChange={onClose}>
      <DialogContent 
        ref={modalRef}
        className="modal-small"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="modal-body text-center space-y-4 sm:space-y-6">
          <div className="space-y-4">
            <Badge 
              variant="default" 
              className="bg-brand-orange text-white px-4 py-1.5 text-sm font-semibold"
            >
              Limited Offer
            </Badge>
            
            <DialogHeader>
              <DialogTitle id={titleId} className="modal-title text-center">
                {title}
              </DialogTitle>
              <DialogDescription id={descriptionId} className="modal-subtitle text-center">
                {offer}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button 
              onClick={handleClaimOffer}
              className="btn-primary px-6 py-4 rounded-xl font-semibold flex-1 min-h-[48px] touch-manipulation"
            >
              {ctaText}
            </Button>
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-text-muted hover:text-text-primary min-h-[48px] touch-manipulation"
            >
              Maybe later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};