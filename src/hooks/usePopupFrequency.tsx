import { useCallback } from 'react';

const POPUP_PREFIX = 'popup_shown_';
const FREQUENCY_HOURS = 24;

export const usePopupFrequency = () => {
  const canShowPopup = useCallback((popupId: string): boolean => {
    try {
      const key = `${POPUP_PREFIX}${popupId}`;
      const lastShown = localStorage.getItem(key);
      
      if (!lastShown) {
        return true; // Never shown before
      }
      
      const lastShownTime = parseInt(lastShown, 10);
      const now = Date.now();
      const timeDifference = now - lastShownTime;
      const hoursPassed = timeDifference / (1000 * 60 * 60);
      
      return hoursPassed >= FREQUENCY_HOURS;
    } catch {
      // If localStorage is not available, always allow showing
      return true;
    }
  }, []);

  const markPopupShown = useCallback((popupId: string): void => {
    try {
      const key = `${POPUP_PREFIX}${popupId}`;
      localStorage.setItem(key, Date.now().toString());
    } catch {
      // Fail silently if localStorage is not available
    }
  }, []);

  const resetPopupFrequency = useCallback((popupId: string): void => {
    try {
      const key = `${POPUP_PREFIX}${popupId}`;
      localStorage.removeItem(key);
    } catch {
      // Fail silently if localStorage is not available
    }
  }, []);

  const clearAllPopupData = useCallback((): void => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(POPUP_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch {
      // Fail silently if localStorage is not available
    }
  }, []);

  return {
    canShowPopup,
    markPopupShown,
    resetPopupFrequency,
    clearAllPopupData,
  };
};