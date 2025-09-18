import { ReactNode } from 'react';

interface GradientSectionDividerProps {
  type?: 'simple' | 'with-text' | 'with-icon';
  text?: string;
  icon?: ReactNode;
  className?: string;
}

export const GradientSectionDivider = ({ 
  type = 'simple', 
  text, 
  icon, 
  className = '' 
}: GradientSectionDividerProps) => {
  if (type === 'simple') {
    return (
      <div className={`my-16 ${className}`}>
        <div className="relative h-1">
          {/* Main gradient line */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00] via-[#0D6EFD] to-[#FF7A00] rounded-full opacity-60"></div>
          {/* Highlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white dark:via-slate-900 to-transparent h-1 rounded-full"></div>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/30 via-[#0D6EFD]/30 to-[#FF7A00]/30 rounded-full blur-sm"></div>
        </div>
      </div>
    );
  }

  if (type === 'with-text' && text) {
    return (
      <div className={`my-16 ${className}`}>
        <div className="relative flex items-center">
          <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-[#FF7A00]/60 to-[#0D6EFD]/60 rounded-full"></div>
          <div className="px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#0D6EFD] text-white font-bold text-sm tracking-wide rounded-full shadow-lg mx-4">
            {text}
          </div>
          <div className="flex-1 h-1 bg-gradient-to-r from-[#0D6EFD]/60 via-[#FF7A00]/60 to-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (type === 'with-icon' && icon) {
    return (
      <div className={`my-16 ${className}`}>
        <div className="relative flex items-center">
          <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-[#FF7A00]/60 to-[#0D6EFD]/60 rounded-full"></div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] rounded-full flex items-center justify-center shadow-lg mx-4">
            {icon}
          </div>
          <div className="flex-1 h-1 bg-gradient-to-r from-[#0D6EFD]/60 via-[#FF7A00]/60 to-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return null;
};