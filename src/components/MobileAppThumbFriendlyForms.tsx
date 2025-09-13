import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { forwardRef } from "react";

// Thumb-friendly Button wrapper
export const AppButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { thumbSize?: "normal" | "large" | "xl" }
>(({ className, thumbSize = "normal", children, ...props }, ref) => {
  const isMobile = useIsMobile();
  
  const thumbSizeClasses = {
    normal: isMobile ? "min-h-[48px] px-6 py-3 text-base" : "",
    large: isMobile ? "min-h-[56px] px-8 py-4 text-lg" : "",
    xl: isMobile ? "min-h-[64px] px-10 py-5 text-xl" : ""
  };
  
  return (
    <Button 
      ref={ref}
      className={`${thumbSizeClasses[thumbSize]} ${className}`} 
      {...props}
    >
      {children}
    </Button>
  );
});

AppButton.displayName = "AppButton";

// Thumb-friendly Input wrapper
export const AppInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  const isMobile = useIsMobile();
  
  return (
    <Input
      ref={ref}
      className={`${isMobile ? 'min-h-[48px] text-base rounded-xl' : ''} ${className}`}
      {...props}
    />
  );
});

AppInput.displayName = "AppInput";

// Thumb-friendly Textarea wrapper
export const AppTextarea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<typeof Textarea>
>(({ className, ...props }, ref) => {
  const isMobile = useIsMobile();
  
  return (
    <Textarea
      ref={ref}
      className={`${isMobile ? 'min-h-[120px] text-base rounded-xl resize-none' : ''} ${className}`}
      {...props}
    />
  );
});

AppTextarea.displayName = "AppTextarea";