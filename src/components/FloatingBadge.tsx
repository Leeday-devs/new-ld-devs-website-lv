import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface FloatingBadgeProps {
  text: string;
  icon?: React.ReactNode;
  variant?: 'success' | 'info' | 'warning' | 'error';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  autoDismiss?: boolean;
  dismissTime?: number;
  onDismiss?: () => void;
  className?: string;
}

/**
 * FloatingBadge Component
 * Premium floating notification badge with smooth animations
 * Perfect for alerts, promotions, and important messages
 */
const FloatingBadge = ({
  text,
  icon,
  variant = 'info',
  position = 'top-right',
  autoDismiss = false,
  dismissTime = 5000,
  onDismiss,
  className = '',
}: FloatingBadgeProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!autoDismiss || !isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, dismissTime);

    return () => clearTimeout(timer);
  }, [autoDismiss, dismissTime, isVisible, onDismiss]);

  if (!isVisible) return null;

  const variantClasses = {
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20',
    info: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20',
    warning: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20',
    error: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20',
  };

  const positionClasses = {
    'top-left': 'top-4 left-4 md:top-6 md:left-6',
    'top-right': 'top-4 right-4 md:top-6 md:right-6',
    'bottom-left': 'bottom-4 left-4 md:bottom-6 md:left-6',
    'bottom-right': 'bottom-4 right-4 md:bottom-6 md:right-6',
  };

  return (
    <div
      className={`fixed z-50 ${positionClasses[position]}
        ${isVisible ? 'animate-slide-in-up' : 'animate-fade-out'}
        transition-all duration-300 ease-out
        ${className}`}
    >
      <div
        className={`
          flex items-center gap-3 px-4 md:px-6 py-3 md:py-4
          rounded-full backdrop-blur-xl
          border border-white/20
          ${variantClasses[variant]}
          hover:scale-105 transition-transform duration-300
        `}
      >
        {icon && (
          <span className="flex-shrink-0 w-5 h-5">
            {icon}
          </span>
        )}
        <span className="text-sm md:text-base font-semibold whitespace-nowrap">
          {text}
        </span>
        <button
          onClick={() => {
            setIsVisible(false);
            onDismiss?.();
          }}
          className="flex-shrink-0 ml-2 hover:opacity-80 transition-opacity duration-200"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FloatingBadge;
