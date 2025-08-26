import { useEffect, useRef, useState } from 'react';

interface UseScrollTriggerOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollTrigger = (options: UseScrollTriggerOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true,
    delay = 0
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          if (triggerOnce && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { elementRef, isVisible };
};

// Stats counter hook for animated numbers
export const useCountUp = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - start) + start);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isActive, end, start, duration]);

  const startCounting = () => setIsActive(true);

  return { count, startCounting, isActive };
};

// Higher-order component for scroll animations with stagger support
export const ScrollAnimated: React.FC<{
  children: React.ReactNode;
  className?: string;
  animationType?: 'fade-in-up' | 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'scroll-scale';
  delay?: number;
  staggerDelay?: number;
  index?: number;
}> = ({ 
  children, 
  className = '', 
  animationType = 'fade-in-up',
  delay = 0,
  staggerDelay = 100,
  index = 0
}) => {
  const totalDelay = delay + (staggerDelay * index);
  const { elementRef, isVisible } = useScrollTrigger({ delay: totalDelay });

  const getAnimationClass = () => {
    switch (animationType) {
      case 'fade-in':
        return 'fade-in';
      case 'slide-in-left':
        return 'slide-in-left';
      case 'slide-in-right':
        return 'slide-in-right';
      case 'scroll-scale':
        return 'scroll-scale';
      default:
        return 'fade-in-up';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${isVisible ? 'animate' : ''} ${className}`}
    >
      {children}
    </div>
  );
};