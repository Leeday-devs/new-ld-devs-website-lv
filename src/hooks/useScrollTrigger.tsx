import { useEffect, useRef, useCallback } from 'react';

interface UseScrollTriggerOptions {
  onTrigger: () => void;
  scrollPercent?: number; // 0-100, default 40
  timeDelay?: number; // milliseconds, default 7000 (7s)
  enabled?: boolean;
}

export const useScrollTrigger = ({
  onTrigger,
  scrollPercent = 40,
  timeDelay = 7000,
  enabled = true,
}: UseScrollTriggerOptions) => {
  const hasTriggered = useRef(false);
  const timeoutId = useRef<NodeJS.Timeout>();

  const checkScrollPosition = useCallback(() => {
    if (!enabled || hasTriggered.current) return;

    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrolled >= scrollPercent) {
      hasTriggered.current = true;
      onTrigger();
    }
  }, [enabled, scrollPercent, onTrigger]);

  const startTimeDelay = useCallback(() => {
    if (!enabled || hasTriggered.current) return;

    timeoutId.current = setTimeout(() => {
      if (!hasTriggered.current) {
        hasTriggered.current = true;
        onTrigger();
      }
    }, timeDelay);
  }, [enabled, timeDelay, onTrigger]);

  useEffect(() => {
    if (!enabled) return;

    // Start time-based trigger
    startTimeDelay();

    // Add scroll listener
    window.addEventListener('scroll', checkScrollPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [enabled, checkScrollPosition, startTimeDelay]);

  // Reset trigger (useful for testing or re-enabling)
  const resetTrigger = useCallback(() => {
    hasTriggered.current = false;
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    if (enabled) {
      startTimeDelay();
    }
  }, [enabled, startTimeDelay]);

  return { resetTrigger };
};