import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingContextType {
  isLoading: boolean;
  loadingText: string;
  setLoading: (loading: boolean, text?: string) => void;
}

const LoadingStates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate initial page load progress
    const loadingSteps = [
      { text: 'Loading resources...', duration: 300 },
      { text: 'Preparing content...', duration: 400 },
      { text: 'Optimizing performance...', duration: 300 },
      { text: 'Almost ready...', duration: 200 }
    ];

    let currentStep = 0;
    let currentProgress = 0;

    const runLoadingStep = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);
        
        // Animate progress for this step
        const stepProgress = (100 / loadingSteps.length);
        const startProgress = currentProgress;
        const endProgress = currentProgress + stepProgress;
        
        const animateProgress = () => {
          currentProgress = Math.min(currentProgress + 2, endProgress);
          setProgress(currentProgress);
          
          if (currentProgress < endProgress) {
            requestAnimationFrame(animateProgress);
          }
        };
        
        animateProgress();
        
        setTimeout(() => {
          currentStep++;
          runLoadingStep();
        }, step.duration);
      } else {
        // Complete loading
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }, 100);
      }
    };

    // Start loading sequence after a brief delay
    const startTimeout = setTimeout(runLoadingStep, 100);

    return () => {
      clearTimeout(startTimeout);
    };
  }, []);

  // Add loading interceptor for dynamic content
  useEffect(() => {
    const originalFetch = window.fetch;
    const loadingRequests = new Set<string>();

    window.fetch = async (...args) => {
      const url = args[0]?.toString() || 'unknown';
      loadingRequests.add(url);
      
      try {
        const response = await originalFetch(...args);
        loadingRequests.delete(url);
        return response;
      } catch (error) {
        loadingRequests.delete(url);
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-[10000] flex items-center justify-center">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-4">
              <Loader2 className="w-16 h-16 text-orange animate-spin" />
            </div>
            
            {/* Progress Ring */}
            <div className="absolute -top-2 -left-2">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="hsl(var(--border-light))"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="hsl(var(--orange))"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
                  className="transition-all duration-300 ease-out"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-navy mb-2">LD Development</h2>
          <p className="text-gray-600 animate-pulse">{loadingText}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-orange h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading Tips */}
        <div className="mt-8 text-xs text-gray-400 max-w-sm mx-auto">
          <p>💡 Tip: Our websites are built with performance in mind - fast loading times guaranteed!</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingStates;