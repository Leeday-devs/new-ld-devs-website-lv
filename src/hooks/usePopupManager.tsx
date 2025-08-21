import { useState, useCallback, useEffect } from 'react';

export type PopupType = 
  | 'lead-capture' 
  | 'contact-quote' 
  | 'exit-intent' 
  | 'promo-offer'
  | 'cookie-consent';

interface PopupQueueItem {
  id: string;
  type: PopupType;
  priority: number;
  data?: any;
}

export const usePopupManager = () => {
  const [activePopup, setActivePopup] = useState<PopupQueueItem | null>(null);
  const [popupQueue, setPopupQueue] = useState<PopupQueueItem[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Popup priorities (higher = more important)
  const priorities: Record<PopupType, number> = {
    'cookie-consent': 100,
    'contact-quote': 90,
    'exit-intent': 80,
    'promo-offer': 70,
    'lead-capture': 60,
  };

  // Check if we're on a form page (should disable exit-intent)
  const isFormPage = useCallback(() => {
    const formPages = ['/request-work', '/auth', '/admin-auth', '/customer-auth', '/business-details'];
    return formPages.some(page => window.location.pathname.includes(page));
  }, []);

  // Check if we're on mobile (disable exit-intent on mobile)
  const isMobile = useCallback(() => {
    return window.innerWidth < 768;
  }, []);

  // Queue a popup
  const queuePopup = useCallback((type: PopupType, data?: any) => {
    // Special rules for exit-intent
    if (type === 'exit-intent' && (isMobile() || isFormPage())) {
      return;
    }

    const id = `${type}-${Date.now()}`;
    const newPopup: PopupQueueItem = {
      id,
      type,
      priority: priorities[type],
      data,
    };

    setPopupQueue(prev => {
      // Don't add if same type already queued
      if (prev.some(popup => popup.type === type)) {
        return prev;
      }
      
      // Add and sort by priority
      return [...prev, newPopup].sort((a, b) => b.priority - a.priority);
    });
  }, [priorities, isMobile, isFormPage]);

  // Process queue - show next popup if none is active
  const processQueue = useCallback(() => {
    if (!isPopupOpen && popupQueue.length > 0) {
      const nextPopup = popupQueue[0];
      setActivePopup(nextPopup);
      setIsPopupOpen(true);
      setPopupQueue(prev => prev.slice(1));
    }
  }, [isPopupOpen, popupQueue]);

  // Close current popup
  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
    setActivePopup(null);
    
    // Process next popup after a brief delay
    setTimeout(processQueue, 300);
  }, [processQueue]);

  // Clear all popups (useful for emergencies)
  const clearQueue = useCallback(() => {
    setPopupQueue([]);
    setActivePopup(null);
    setIsPopupOpen(false);
  }, []);

  // Process queue when it changes
  useEffect(() => {
    processQueue();
  }, [processQueue]);

  return {
    activePopup,
    isPopupOpen,
    queuePopup,
    closePopup,
    clearQueue,
    isFormPage: isFormPage(),
    isMobile: isMobile(),
  };
};