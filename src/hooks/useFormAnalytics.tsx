import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FormAnalytics } from '@/utils/analytics';

type FormType = 'contact' | 'quote' | 'booking' | 'consultation';

export const useFormAnalytics = (formType: FormType) => {
  const location = useLocation();
  const analyticsRef = useRef<FormAnalytics | null>(null);
  const hasInitialized = useRef(false);

  // Initialize analytics on mount
  useEffect(() => {
    if (!hasInitialized.current) {
      analyticsRef.current = new FormAnalytics(formType);
      hasInitialized.current = true;
    }
  }, [formType]);

  // Track page abandonment on unmount
  useEffect(() => {
    return () => {
      if (analyticsRef.current && hasInitialized.current) {
        analyticsRef.current.trackAbandon();
      }
    };
  }, []);

  // Track route changes (form abandonment)
  useEffect(() => {
    return () => {
      if (analyticsRef.current && hasInitialized.current) {
        analyticsRef.current.trackAbandon();
      }
    };
  }, [location.pathname]);

  const trackFieldFocus = (fieldName: string) => {
    analyticsRef.current?.trackFieldFocus(fieldName);
  };

  const trackError = (errorType: string, errorMessage: string, fieldName?: string) => {
    analyticsRef.current?.trackError(errorType, errorMessage, fieldName);
  };

  const trackSubmission = () => {
    return analyticsRef.current?.trackSubmission() || 0;
  };

  const trackSuccess = () => {
    analyticsRef.current?.trackSuccess();
  };

  const getMetrics = () => {
    return analyticsRef.current?.getMetrics();
  };

  return {
    trackFieldFocus,
    trackError,
    trackSubmission,
    trackSuccess,
    getMetrics
  };
};

// Hook for tracking form field interactions
export const useFormFieldTracking = (formType: FormType, fieldName: string) => {
  const { trackFieldFocus } = useFormAnalytics(formType);

  const handleFocus = () => {
    trackFieldFocus(fieldName);
  };

  return { handleFocus };
};