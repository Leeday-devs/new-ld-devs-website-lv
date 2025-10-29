import { ReactNode, useRef, useEffect, useState } from 'react';

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'fade-in';
  delay?: number;
  duration?: number;
}

/**
 * ScrollRevealSection Component
 * Reveals content with animations when it scrolls into view
 * Perfect for homepage sections that need entrance animations
 */
const ScrollRevealSection = ({
  children,
  className = '',
  animationType = 'fade-in-up',
  delay = 0,
  duration = 600,
}: ScrollRevealSectionProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add small delay before triggering animation
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Start animation when section is 50px from bottom of viewport
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  const animationDurationMs = duration;
  const animationClasses = {
    'fade-in-up': 'animate-fade-in-up',
    'fade-in-left': 'animate-fade-in-left',
    'fade-in-right': 'animate-fade-in-right',
    'scale-in': 'animate-scale-in',
    'fade-in': 'animate-fade-in',
  };

  return (
    <div
      ref={elementRef}
      className={`
        ${isVisible ? animationClasses[animationType] : 'opacity-0'}
        transition-all
        ${className}
      `}
      style={{
        animationDuration: `${animationDurationMs}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollRevealSection;
