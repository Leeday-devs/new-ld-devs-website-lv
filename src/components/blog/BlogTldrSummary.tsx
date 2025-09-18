import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Zap } from "lucide-react";

interface BlogTldrSummaryProps {
  points: string[];
  readTime?: number;
  category?: string;
}

export const BlogTldrSummary = ({ points, readTime, category }: BlogTldrSummaryProps) => {
  return (
    <Card className="relative overflow-hidden mb-12 border-none shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/20 via-[#0D6EFD]/10 to-[#FF7A00]/5 opacity-50"></div>
      
      {/* Glass morphism effect */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg"></div>
      
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] flex items-center justify-center shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <Badge className="mb-2 bg-gradient-to-r from-[#FF7A00] to-[#0D6EFD] text-white font-semibold px-3 py-1 text-xs tracking-wide">
                TL;DR SUMMARY
              </Badge>
              <h3 className="text-2xl font-bold text-white">Key Takeaways</h3>
            </div>
          </div>
          
          {readTime && (
            <div className="flex items-center gap-2 text-white/80 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{readTime} min read</span>
            </div>
          )}
        </div>

        {/* Summary Points */}
        <div className="space-y-4">
          {points.map((point, index) => (
            <div key={index} className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] flex items-center justify-center text-white text-sm font-bold mt-0.5 shadow-lg group-hover:scale-110 transition-transform duration-200">
                {index + 1}
              </div>
              <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-all duration-200">
                <p className="text-white/90 leading-relaxed font-medium text-base">
                  {point}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <CheckCircle className="h-4 w-4 text-[#FF7A00]" />
            <span>No technical knowledge needed, we do everything for you</span>
          </div>
        </div>
      </div>
    </Card>
  );
};