import React from "react";

interface WatermarkOverlayProps {
  text?: string;
}

const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({ text = "LD Development" }) => {
  const items = Array.from({ length: 120 });
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] select-none" aria-hidden>
      <div className="absolute -inset-20 rotate-[-30deg] flex flex-wrap gap-10 items-center justify-center">
        {items.map((_, i) => (
          <span
            key={i}
            className="text-4xl font-black tracking-widest text-foreground/10 whitespace-nowrap"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WatermarkOverlay;
