// Form Analytics Utilities

export interface FormAnalyticsEvent {
  form_type: 'contact' | 'quote' | 'booking' | 'consultation';
  form_name?: string;
  step?: number;
  field_name?: string;
  error_type?: string;
  error_message?: string;
  submission_time?: number;
  page_url?: string;
}

// Track form view
export const trackFormView = (formType: FormAnalyticsEvent['form_type'], formName?: string) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'form_view', {
      event_category: 'Forms',
      event_label: formType,
      form_type: formType,
      form_name: formName,
      page_url: window.location.href
    });
  }
};

// Track form submission
export const trackFormSubmit = (
  formType: FormAnalyticsEvent['form_type'], 
  formName?: string,
  submissionTime?: number
) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'form_submit', {
      event_category: 'Forms',
      event_label: formType,
      form_type: formType,
      form_name: formName,
      submission_time: submissionTime,
      page_url: window.location.href
    });
  }
};

// Track form errors
export const trackFormError = (
  formType: FormAnalyticsEvent['form_type'],
  errorType: string,
  errorMessage: string,
  fieldName?: string
) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'form_error', {
      event_category: 'Forms',
      event_label: `${formType}_error`,
      form_type: formType,
      error_type: errorType,
      error_message: errorMessage,
      field_name: fieldName,
      page_url: window.location.href
    });
  }
};

// Track form success
export const trackFormSuccess = (
  formType: FormAnalyticsEvent['form_type'],
  formName?: string,
  submissionTime?: number
) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'form_success', {
      event_category: 'Forms',
      event_label: `${formType}_success`,
      form_type: formType,
      form_name: formName,
      submission_time: submissionTime,
      page_url: window.location.href
    });
  }
};

// Track form field interaction
export const trackFormFieldFocus = (
  formType: FormAnalyticsEvent['form_type'],
  fieldName: string
) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'form_field_focus', {
      event_category: 'Forms',
      event_label: `${formType}_${fieldName}`,
      form_type: formType,
      field_name: fieldName
    });
  }
};

// Track form abandonment
export const trackFormAbandon = (
  formType: FormAnalyticsEvent['form_type'],
  step?: number,
  timeSpent?: number
) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'form_abandon', {
      event_category: 'Forms',
      event_label: `${formType}_abandon`,
      form_type: formType,
      step: step,
      time_spent: timeSpent,
      page_url: window.location.href
    });
  }
};

// Track form completion time
export const trackFormCompletionTime = (
  formType: FormAnalyticsEvent['form_type'],
  completionTime: number
) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'form_completion_time', {
      event_category: 'Forms',
      event_label: formType,
      form_type: formType,
      completion_time: completionTime,
      value: completionTime
    });
  }
};

// Enhanced analytics with user journey tracking
export class FormAnalytics {
  private formType: FormAnalyticsEvent['form_type'];
  private startTime: number;
  private fieldInteractions: Set<string> = new Set();

  constructor(formType: FormAnalyticsEvent['form_type']) {
    this.formType = formType;
    this.startTime = Date.now();
    this.trackView();
  }

  trackView() {
    trackFormView(this.formType);
  }

  trackFieldFocus(fieldName: string) {
    if (!this.fieldInteractions.has(fieldName)) {
      this.fieldInteractions.add(fieldName);
      trackFormFieldFocus(this.formType, fieldName);
    }
  }

  trackError(errorType: string, errorMessage: string, fieldName?: string) {
    trackFormError(this.formType, errorType, errorMessage, fieldName);
  }

  trackSubmission() {
    const submissionTime = Date.now() - this.startTime;
    trackFormSubmit(this.formType, undefined, submissionTime);
    return submissionTime;
  }

  trackSuccess() {
    const completionTime = Date.now() - this.startTime;
    trackFormSuccess(this.formType, undefined, completionTime);
    trackFormCompletionTime(this.formType, completionTime);
  }

  trackAbandon() {
    const timeSpent = Date.now() - this.startTime;
    trackFormAbandon(this.formType, 1, timeSpent);
  }

  getMetrics() {
    return {
      formType: this.formType,
      timeSpent: Date.now() - this.startTime,
      fieldsInteracted: Array.from(this.fieldInteractions),
      interactionCount: this.fieldInteractions.size
    };
  }
}