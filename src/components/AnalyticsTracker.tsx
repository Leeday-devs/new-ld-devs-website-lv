import { useEffect, useCallback } from 'react';

interface AnalyticsEvent {
  event: string;
  page?: string;
  section?: string;
  element?: string;
  value?: number;
  timestamp: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  track(event: string, properties: Partial<AnalyticsEvent> = {}) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: Date.now(),
      ...properties
    };

    this.events.push(analyticsEvent);
    this.sendEvent(analyticsEvent);
  }

  private sendEvent(event: AnalyticsEvent) {
    // Send to your analytics service (Google Analytics, Mixpanel, etc.)
    console.log('Analytics Event:', event);
    
    // Example: Send to Google Analytics (if gtag is available)
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', event.event, {
        custom_parameter: event.section || event.element,
        value: event.value
      });
    }
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }
}

const analytics = new Analytics();

const AnalyticsTracker = () => {
  const trackPageView = useCallback(() => {
    analytics.track('page_view', {
      page: window.location.pathname,
      section: 'navigation'
    });
  }, []);

  const trackScroll = useCallback(() => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    if (scrollPercent >= 25 && scrollPercent < 50) {
      analytics.track('scroll_25', { value: 25 });
    } else if (scrollPercent >= 50 && scrollPercent < 75) {
      analytics.track('scroll_50', { value: 50 });
    } else if (scrollPercent >= 75) {
      analytics.track('scroll_75', { value: 75 });
    }
  }, []);

  const trackButtonClicks = useCallback(() => {
    const buttons = document.querySelectorAll('button, a[href^="#"], .btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
      if (!button.hasAttribute('data-analytics-tracked')) {
        button.setAttribute('data-analytics-tracked', 'true');
        button.addEventListener('click', (e) => {
          const element = e.target as HTMLElement;
          const text = element.textContent?.trim() || 'unknown';
          const section = element.closest('section')?.getAttribute('aria-label') || 'unknown';
          
          analytics.track('button_click', {
            element: text,
            section: section
          });
        });
      }
    });
  }, []);

  const trackFormSubmissions = useCallback(() => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      if (!form.hasAttribute('data-analytics-tracked')) {
        form.setAttribute('data-analytics-tracked', 'true');
        form.addEventListener('submit', (e) => {
          const formName = form.getAttribute('name') || 
                          form.closest('section')?.getAttribute('aria-label') || 
                          'contact_form';
          
          analytics.track('form_submit', {
            element: formName,
            section: 'contact'
          });
        });
      }
    });
  }, []);

  const trackVideoInteractions = useCallback(() => {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
      if (!video.hasAttribute('data-analytics-tracked')) {
        video.setAttribute('data-analytics-tracked', 'true');
        
        video.addEventListener('play', () => {
          analytics.track('video_play', {
            element: 'hero_video',
            section: 'hero'
          });
        });

        video.addEventListener('ended', () => {
          analytics.track('video_complete', {
            element: 'hero_video', 
            section: 'hero'
          });
        });
      }
    });
  }, []);

  useEffect(() => {
    // Track initial page view
    trackPageView();

    // Set up scroll tracking with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          trackScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track interactions after DOM loads
    const setupTracking = () => {
      trackButtonClicks();
      trackFormSubmissions();
      trackVideoInteractions();
    };

    // Setup tracking immediately and on route changes
    setupTracking();
    
    // Re-setup tracking when new content loads
    const observer = new MutationObserver(() => {
      setTimeout(setupTracking, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [trackPageView, trackScroll, trackButtonClicks, trackFormSubmissions, trackVideoInteractions]);

  // Component doesn't render anything visible
  return null;
};

export { analytics };
export default AnalyticsTracker;