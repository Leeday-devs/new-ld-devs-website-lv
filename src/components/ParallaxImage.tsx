import { useEffect, useRef, useState } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // 0.5 = half scroll speed, 1.5 = 1.5x scroll speed
  height?: string | number;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
}

/**
 * ParallaxImage Component
 * Creates a parallax scrolling effect where images move slower than scroll
 * Optimized for mobile - reduces effect on smaller screens for performance
 */
const ParallaxImage = ({
  src,
  alt,
  speed = 0.5,
  height = '400px',
  className = '',
  objectFit = 'cover',
}: ParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const elementScrollY = window.scrollY + rect.top;
            const offset = (elementScrollY - window.scrollY) * speed;

            if (imageRef.current && !isMobile) {
              imageRef.current.style.transform = `translateY(${offset * 0.5}px)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, isMobile]);

  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        height: heightStyle,
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
};

export default ParallaxImage;
