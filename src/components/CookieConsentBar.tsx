import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { hasGivenConsent, acceptAllCookies, acceptEssentialOnly } from "@/utils/cookies";

interface CookieConsentBarProps {
  onPreferencesClick?: () => void;
}

export const CookieConsentBar = ({ onPreferencesClick }: CookieConsentBarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = hasGivenConsent();
    if (!hasConsent) {
      // Show after a brief delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = async () => {
    await acceptAllCookies();
    setIsVisible(false);
    
    // Initialize analytics if accepted
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
  };

  const handleDecline = async () => {
    await acceptEssentialOnly();
    setIsVisible(false);
    
    // Deny non-essential cookies
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
  };

  const handleSettings = () => {
    if (onPreferencesClick) {
      onPreferencesClick();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[10000] bg-white border-t border-border-subtle shadow-lg"
      role="banner"
      aria-label="Cookie consent"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 text-sm">
            <p className="text-brand-navy font-medium mb-1">
              We use cookies to enhance your experience
            </p>
            <p className="text-text-muted">
              This website uses cookies to improve functionality and analyze traffic. 
              <Link 
                to="/privacy-policy" 
                className="text-brand-orange hover:underline ml-1"
              >
                View our Privacy Policy
              </Link>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button
              onClick={handleAcceptAll}
              className="btn-primary px-6 py-2 text-sm"
            >
              Accept All
            </Button>
            
            <Button
              onClick={handleSettings}
              variant="ghost"
              className="text-text-muted hover:text-text-primary px-4 py-2 text-sm"
            >
              Settings
            </Button>
            
            <Button
              onClick={handleDecline}
              variant="ghost"
              className="text-text-muted hover:text-text-primary px-4 py-2 text-sm"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};