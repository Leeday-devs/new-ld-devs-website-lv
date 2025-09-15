import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleClick = () => {
    navigate(`/contact?returnTo=${encodeURIComponent(location.pathname)}`);
  };

  const sizeClasses = {
    sm: isMobile ? "px-6 py-3 text-sm min-h-[48px]" : "px-4 py-2 text-sm min-h-[40px]",
    md: isMobile ? "px-8 py-4 text-base min-h-[52px]" : "px-6 py-3 text-base min-h-[44px]", 
    lg: isMobile ? "px-10 py-5 text-lg min-h-[60px]" : "px-8 py-4 text-lg min-h-[48px]"
  };

  const variantClasses = variant === "primary" ? "btn-primary" : "btn-secondary";
  const mobileClasses = isMobile ? "rounded-xl font-semibold tracking-wide active:scale-95 transition-all duration-200" : "";

  return (
    <Button
      onClick={handleClick}
      className={`${variantClasses} ${sizeClasses[size]} ${mobileClasses} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};