import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  sizes = '100vw'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (priority) return; // Skip intersection observer for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: isMobile ? '50px' : '100px', // Smaller margin on mobile for performance
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isMobile]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsLoaded(false);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse"
          style={{ 
            aspectRatio: width && height ? `${width}/${height}` : undefined 
          }}
        />
      )}
      
      {/* Optimized image with lazy loading */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'low'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

interface OptimizedBackgroundImageProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
}

export const OptimizedBackgroundImage = ({ 
  src, 
  alt, 
  className = '', 
  children,
  priority = false 
}: OptimizedBackgroundImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: isMobile ? '50px' : '100px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isMobile]);

  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(false);
    img.src = src;
  }, [isInView, src]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background gradient while loading */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
      
      {/* Optimized background image */}
      {isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 opacity-100"
          style={{ backgroundImage: `url(${src})` }}
          role="img"
          aria-label={alt}
        />
      )}
      
      {/* Content overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};