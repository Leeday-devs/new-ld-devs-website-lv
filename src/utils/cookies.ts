import { supabase } from "@/integrations/supabase/client";

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieConsentRecord {
  id?: string;
  user_id?: string;
  session_id: string;
  ip_address?: string;
  user_agent: string;
  consent_given: boolean;
  essential_cookies: boolean;
  analytics_cookies: boolean;
  marketing_cookies: boolean;
  preferences_cookies: boolean;
  consent_version: string;
  page_url: string;
  referrer?: string;
}

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_SESSION_KEY = 'cookie-session-id';
const CONSENT_VERSION = '1.0';

// Generate or get session ID
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem(COOKIE_SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(COOKIE_SESSION_KEY, sessionId);
  }
  return sessionId;
};

// Check if user has given consent
export const hasGivenConsent = (): boolean => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  return consent !== null;
};

// Get current consent preferences
export const getConsentPreferences = (): CookieConsent | null => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!consent) return null;
  
  try {
    return JSON.parse(consent);
  } catch {
    return null;
  }
};

// Save consent preferences
export const saveConsentPreferences = async (consent: CookieConsent): Promise<void> => {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  
  // Record consent in database
  await recordConsentInDatabase(consent, true);
};

// Record consent in database
export const recordConsentInDatabase = async (consent: CookieConsent, consentGiven: boolean): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const consentRecord: Partial<CookieConsentRecord> = {
      user_id: user?.id,
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
      consent_given: consentGiven,
      essential_cookies: consent.essential,
      analytics_cookies: consent.analytics,
      marketing_cookies: consent.marketing,
      preferences_cookies: consent.preferences,
      consent_version: CONSENT_VERSION,
      page_url: window.location.href,
      referrer: document.referrer || undefined,
    };

    await supabase
      .from('cookie_consents')
      .insert(consentRecord);
  } catch (error) {
    console.error('Failed to record cookie consent:', error);
  }
};

// Accept all cookies
export const acceptAllCookies = async (): Promise<void> => {
  const consent: CookieConsent = {
    essential: true,
    analytics: true,
    marketing: true,
    preferences: true,
  };
  
  await saveConsentPreferences(consent);
};

// Accept only essential cookies
export const acceptEssentialOnly = async (): Promise<void> => {
  const consent: CookieConsent = {
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  };
  
  await saveConsentPreferences(consent);
};

// Reject all non-essential cookies
export const rejectAllCookies = async (): Promise<void> => {
  await acceptEssentialOnly();
};

// Clear consent (for testing or reset)
export const clearConsent = (): void => {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
};

// Check if specific cookie type is allowed
export const isCookieAllowed = (type: keyof CookieConsent): boolean => {
  const consent = getConsentPreferences();
  if (!consent) return false;
  return consent[type];
};

// Google Analytics helper
export const initializeAnalytics = (): void => {
  if (isCookieAllowed('analytics')) {
    // Initialize GA4 or other analytics
    console.log('Analytics cookies accepted - initializing tracking');
  }
};

// Marketing cookies helper
export const initializeMarketing = (): void => {
  if (isCookieAllowed('marketing')) {
    // Initialize marketing pixels, ads tracking, etc.
    console.log('Marketing cookies accepted - initializing marketing tools');
  }
};