import { useEffect, useState } from 'react';

interface UseImagePreloadOptions {
  src: string;
  crossOrigin?: string;
}

export const useImagePreload = ({ src, crossOrigin }: UseImagePreloadOptions) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    
    if (crossOrigin) {
      img.crossOrigin = crossOrigin;
    }

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setHasError(true);

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    img.src = src;

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src, crossOrigin]);

  return { isLoaded, hasError };
};

// Hook for preloading multiple images
export const useImagesPreload = (imageSources: string[]) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    if (!imageSources.length) return;

    let loadedImages = 0;
    let errorImages = 0;

    const promises = imageSources.map(src => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        
        const handleLoad = () => {
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
        };
        
        const handleError = () => {
          errorImages++;
          setErrorCount(errorImages);
          resolve();
        };

        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleError);
        img.src = src;
      });
    });

    Promise.all(promises);
  }, [imageSources]);

  return {
    loadedCount,
    errorCount,
    totalCount: imageSources.length,
    isAllLoaded: loadedCount + errorCount === imageSources.length,
    progress: imageSources.length ? (loadedCount + errorCount) / imageSources.length : 0
  };
};