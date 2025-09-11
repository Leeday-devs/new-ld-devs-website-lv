import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  autoSlide?: boolean;
  slideInterval?: number;
}

const BlogImageCarousel = ({ 
  images, 
  alt, 
  className = "", 
  autoSlide = true,
  slideInterval = 6000 
}: BlogImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (!autoSlide || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, slideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, images.length, slideInterval]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) return null;

  // Single image - no carousel needed
  if (images.length === 1) {
    return (
      <img 
        src={images[0]} 
        alt={alt}
        loading="lazy"
        className={`w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className="relative group">
      {/* Main Image */}
      <div className="relative overflow-hidden">
        <img 
          src={images[currentIndex]} 
          alt={`${alt} - Image ${currentIndex + 1}`}
          loading="lazy"
          className={`w-full object-cover transition-all duration-700 ${className}`}
        />
        
        {/* Gradient Overlay for Better Button Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white shadow-lg scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default BlogImageCarousel;