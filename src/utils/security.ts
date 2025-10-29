import DOMPurify from 'dompurify';

// Rate limiting for forms
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const isRateLimited = (key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  if (record.count >= maxAttempts) {
    return true;
  }
  
  record.count++;
  return false;
};

// Input sanitization functions
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [], 
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  }).trim();
};

export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target'],
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'iframe'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
  });
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate URL format
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Error logging that doesn't expose sensitive information
export const logSecureError = (context: string, error: unknown): void => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}] Error occurred:`, error);
  } else {
    // In production, only log generic error info
    console.error(`[${context}] An error occurred`);
  }
};

// Honeypot field detection for bot prevention
export const isHoneypotFilled = (honeypotValue: string): boolean => {
  // If honeypot field has any value, it's likely a bot
  return honeypotValue && honeypotValue.trim().length > 0;
};

// Bot detection - check for common spam patterns
export const containsSpamPatterns = (input: string): boolean => {
  const spamPatterns = [
    /viagra|cialis|casino|lottery|prize/gi,
    /click here|buy now|limited offer/gi,
    /http[s]?:\/\//g, // Multiple URLs
    /[a-z0-9]{50,}/gi, // Suspiciously long strings
  ];

  let urlCount = (input.match(/http[s]?:\/\//g) || []).length;
  if (urlCount > 1) return true;

  return spamPatterns.some(pattern => pattern.test(input));
};

// Verify form submission timing (humans take at least a few seconds)
export const isSubmissionTooFast = (startTimeMs: number, minSeconds: number = 2): boolean => {
  const elapsedSeconds = (Date.now() - startTimeMs) / 1000;
  return elapsedSeconds < minSeconds;
};