import React from 'react';
import { Button } from '@/components/ui/button';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glowColor?: 'orange' | 'navy' | 'white';
  animated?: boolean;
}

/**
 * GlowButton Component
 * Enhanced button with premium glow effects and smooth animations
 * Perfect for CTAs and important actions
 */
const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    glowColor = 'orange',
    animated = true,
    className = '',
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl',
    };

    const glowClasses = {
      orange: 'from-orange via-orange/90 to-orange hover:shadow-[0_0_30px_rgba(255,122,0,0.5)]',
      navy: 'from-navy via-navy/90 to-navy hover:shadow-[0_0_30px_rgba(10,25,47,0.5)]',
      white: 'from-white via-white/90 to-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]',
    };

    const baseClasses = `
      relative inline-flex items-center justify-center
      font-bold font-black tracking-wider
      transition-all duration-300 ease-out
      overflow-hidden group
      ${sizeClasses[size]}
      ${animated ? 'hover:scale-105 active:scale-95' : ''}
      rounded-full
    `;

    if (variant === 'primary') {
      return (
        <button
          ref={ref}
          className={`
            ${baseClasses}
            bg-gradient-to-r ${glowClasses[glowColor]}
            text-white
            shadow-lg
            before:absolute before:inset-0 before:bg-white/20 before:opacity-0
            before:group-hover:opacity-100 before:transition-opacity before:duration-300
            ${className}
          `}
          {...props}
        >
          {/* Glow effect layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

          {/* Ripple effect on click */}
          <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-300 rounded-full" />

          {/* Content */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
          </span>
        </button>
      );
    }

    // Secondary variant - outline style
    if (variant === 'outline') {
      return (
        <button
          ref={ref}
          className={`
            ${baseClasses}
            bg-transparent
            border-2 border-orange
            text-orange
            hover:bg-orange/10
            hover:border-orange
            transition-all duration-300
            ${className}
          `}
          {...props}
        >
          <span className="relative z-10">{children}</span>
        </button>
      );
    }

    // Default/secondary
    return (
      <Button
        ref={ref}
        variant="secondary"
        size={size === 'xl' ? 'lg' : size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'}
        className={`${baseClasses} ${className}`}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

GlowButton.displayName = 'GlowButton';

export default GlowButton;
