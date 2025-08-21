import { useEffect, useState } from 'react';
import { usePopupManager } from '@/hooks/usePopupManager';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { ContactQuoteModal } from '@/components/ContactQuoteModal';
import { PromoModal } from '@/components/PromoModal';
import { CookieConsentBar } from '@/components/CookieConsentBar';

export const PopupManager = () => {
  const { activePopup, isPopupOpen, queuePopup, closePopup, isFormPage, isMobile } = usePopupManager();

  // Lead capture popup removed


  // Cookie consent handled by CookieConsentBar component

  // Promo modal - can be triggered programmatically
  // Example: queuePopup('promo-offer', { title: 'Special Deal!', offer: '50% off' });

  return (
    <>
      {/* Cookie Consent Bar */}
      <CookieConsentBar />

      {/* Cookie Preferences Modal - Remove this line since CookiePreferences manages its own state */}

      {/* Lead Capture Modal - Removed */}

      {/* Contact Quote Modal */}
      <ContactQuoteModal
        isOpen={isPopupOpen && activePopup?.type === 'contact-quote'}
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