import { useEffect, useState } from 'react';
import { usePopupManager } from '@/hooks/usePopupManager';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useExitIntent } from '@/components/ExitIntentModal';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { ContactQuoteModal } from '@/components/ContactQuoteModal';
import { ExitIntentModal } from '@/components/ExitIntentModal';
import { PromoModal } from '@/components/PromoModal';
import { CookieConsentBar } from '@/components/CookieConsentBar';

export const PopupManager = () => {
  const { activePopup, isPopupOpen, queuePopup, closePopup, isFormPage, isMobile } = usePopupManager();

  // Entry banner triggers (6-8s delay or 40% scroll)
  useScrollTrigger({
    onTrigger: () => queuePopup('lead-capture'),
    scrollPercent: 40,
    timeDelay: Math.random() * 2000 + 6000, // Random between 6-8 seconds
    enabled: !isFormPage,
  });

  // Exit intent trigger (desktop only, not on form pages)
  useExitIntent(() => {
    if (!isMobile && !isFormPage) {
      queuePopup('exit-intent');
    }
  });

  // Cookie consent bar handles its own visibility; no need to queue
  useEffect(() => {
    // Intentionally left blank to avoid duplicate cookie prompts
  }, []);

  // Promo modal - can be triggered programmatically
  // Example: queuePopup('promo-offer', { title: 'Special Deal!', offer: '50% off' });

  return (
    <>
      {/* Cookie Consent Bar */}
      <CookieConsentBar />

      {/* Cookie Preferences Modal - Remove this line since CookiePreferences manages its own state */}

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isPopupOpen && activePopup?.type === 'lead-capture'}
        onClose={closePopup}
      />

      {/* Contact Quote Modal */}
      <ContactQuoteModal
        isOpen={isPopupOpen && activePopup?.type === 'contact-quote'}
        onClose={closePopup}
      />

      {/* Exit Intent Modal */}
      <ExitIntentModal
        isOpen={isPopupOpen && activePopup?.type === 'exit-intent'}
        onClose={closePopup}
      />

      {/* Promo Modal */}
      <PromoModal
        isOpen={isPopupOpen && activePopup?.type === 'promo-offer'}
        onClose={closePopup}
        title={activePopup?.data?.title}
        offer={activePopup?.data?.offer}
        ctaText={activePopup?.data?.ctaText}
        ctaLink={activePopup?.data?.ctaLink}
      />
    </>
  );
};

// Hook for triggering Contact/Quote modal from CTA buttons
export const useContactModal = () => {
  const { queuePopup } = usePopupManager();

  const openContactModal = () => {
    queuePopup('contact-quote');
  };

  return { openContactModal };
};