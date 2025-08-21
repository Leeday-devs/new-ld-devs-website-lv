import { useEffect, useRef, useCallback } from 'react';

interface UseModalOptions {
  isOpen: boolean;
  onClose: () => void;
  preventScroll?: boolean;
  restoreFocus?: boolean;
}

export const useModal = ({
  isOpen,
  onClose,
  preventScroll = true,
  restoreFocus = true,
}: UseModalOptions) => {
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      if (restoreFocus) {
        previousActiveElement.current = document.activeElement as HTMLElement;
      }

      // Focus the modal container
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 100);
    } else {
      // Restore focus when modal closes
      if (restoreFocus && previousActiveElement.current) {
        setTimeout(() => {
          previousActiveElement.current?.focus();
        }, 100);
      }
    }
  }, [isOpen, restoreFocus]);

  // Handle scroll prevention
  useEffect(() => {
    if (!preventScroll) return;

    if (isOpen) {
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Apply styles to prevent scrolling
      document.body.classList.add('modal-open');
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    } else {
      // Remove scroll prevention
      document.body.classList.remove('modal-open');
      document.documentElement.style.removeProperty('--scrollbar-width');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
      document.documentElement.style.removeProperty('--scrollbar-width');
    };
  }, [isOpen, preventScroll]);

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }

      // Focus trap logic
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    },
    [isOpen, onClose]
  );

  // Attach keyboard event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return { modalRef };
};