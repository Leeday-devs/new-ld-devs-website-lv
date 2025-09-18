import { useEffect, useState } from 'react';

export const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-200/50 dark:bg-slate-800/50 z-[60] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-[#FF7A00] via-[#0D6EFD] to-[#FF7A00] transition-all duration-300 ease-out shadow-lg"
        style={{ width: `${progress}%` }}
      />
      {/* Glow effect */}
      <div 
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF7A00]/50 via-[#0D6EFD]/50 to-[#FF7A00]/50 blur-sm transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};