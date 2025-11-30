import { LucideIcon, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FeatureExplainerProps {
  icon: LucideIcon;
  title: string; // Benefit-focused title
  description?: string; // Brief description
  tooltip?: string; // Detailed explanation for small business owners
  variant?: "default" | "compact"; // Display style
}

export const FeatureExplainer = ({
  icon: IconComponent,
  title,
  description,
  tooltip,
  variant = "default",
}: FeatureExplainerProps) => {
  const content = (
    <div className={`flex items-start gap-2 ${variant === "compact" ? "text-sm" : ""}`}>
      <IconComponent className={`text-orange flex-shrink-0 ${variant === "compact" ? "h-4 w-4 mt-0.5" : "h-5 w-5 mt-1"}`} />
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <span className={`text-gray-300 ${variant === "compact" ? "text-sm" : "text-base"} font-medium`}>
            {title}
          </span>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-gray-400 hover:text-orange transition-colors cursor-help flex-shrink-0" />
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-xs bg-navy border-orange/30 text-white p-3 shadow-xl"
                >
                  <p className="text-sm leading-relaxed">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {description && (
          <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );

  return content;
};
