import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  endValue: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  triggerOnScroll?: boolean;
}

/**
 * AnimatedCounter Component
 * Animates numbers counting up with smooth transitions
 * Perfect for displaying stats, customer count, years in business, etc.
 */
const AnimatedCounter = ({
  endValue,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  triggerOnScroll = true,
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(!triggerOnScroll);
  const elementRef = useRef<HTMLDivElement>(null);

  // Setup intersection observer for scroll-triggered animation
  useEffect(() => {
    if (!triggerOnScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasStarted, triggerOnScroll]);

  // Animate the count
  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
      const easedProgress = easeOutQuad(progress);

      const currentValue = Math.round(endValue * easedProgress * Math.pow(10, decimals)) / Math.pow(10, decimals);
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [hasStarted, endValue, duration, decimals]);

  const formatValue = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <div ref={elementRef} className={className}>
      <span className="inline-flex items-baseline">
        {prefix && <span className="text-sm mr-1">{prefix}</span>}
        <span className="font-bold text-2xl sm:text-3xl md:text-4xl">
          {formatValue(displayValue)}
        </span>
        {suffix && <span className="text-sm ml-1">{suffix}</span>}
      </span>
    </div>
  );
};

export default AnimatedCounter;
