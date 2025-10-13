import { Monitor } from "lucide-react";
import { ReactNode } from "react";

interface BrowserMockupProps {
  screenshot?: string;
  demoUrl?: string;
  browserType?: "safari" | "chrome";
  children?: ReactNode;
}

const BrowserMockup = ({ screenshot, demoUrl, browserType = "chrome", children }: BrowserMockupProps) => {
  return (
    <div className="relative w-full">
      {/* Browser Window */}
      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-2xl">
        {/* Browser Chrome */}
        <div className={`flex items-center gap-2 px-4 py-3 ${
          browserType === "safari" 
            ? "bg-[#F6F6F6]" 
            : "bg-[#E8EAED]"
        }`}>
          {/* Traffic Lights (Safari) or Dots (Chrome) */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              browserType === "safari" ? "bg-[#FF5F57]" : "bg-[#F44336]"
            }`} />
            <div className={`w-3 h-3 rounded-full ${
              browserType === "safari" ? "bg-[#FEBC2E]" : "bg-[#FFEB3B]"
            }`} />
            <div className={`w-3 h-3 rounded-full ${
              browserType === "safari" ? "bg-[#28C840]" : "bg-[#4CAF50]"
            }`} />
          </div>
          
          {/* Address Bar */}
          <div className="flex-1 mx-4">
            <div className={`${
              browserType === "safari"
                ? "bg-white border border-gray-200"
                : "bg-white"
            } rounded-lg px-4 py-1.5 flex items-center gap-2 shadow-sm`}>
              <Monitor className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground truncate">
                {demoUrl || "preview.leeday.uk"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Screenshot/Content Area */}
        <div className="relative bg-background aspect-[16/10] overflow-hidden">
          {children ? (
            children
          ) : screenshot ? (
            <img 
              src={screenshot} 
              alt="Website preview" 
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10">
              <div className="text-center">
                <Monitor className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Preview Available</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Shadow Bottom */}
      <div className="h-4 bg-gradient-to-b from-black/5 to-transparent" />
    </div>
  );
};

export default BrowserMockup;
