import { Button } from "@/components/ui/button";
import { useContactModal } from "@/components/PopupManager";

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  [key: string]: any; // for additional props
}

export const CTAButton = ({ 
  children, 
  variant = "primary", 
  size = "md",
  className = "",
  ...props 
}: CTAButtonProps) => {
  const { openContactModal } = useContactModal();

  const handleClick = () => {
    openContactModal();
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[44px]", // 44px min for thumb-friendly on mobile
    lg: "px-8 py-4 text-lg min-h-[48px]"
  };

  const variantClasses = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <Button
      onClick={handleClick}
      className={`${variantClasses} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};