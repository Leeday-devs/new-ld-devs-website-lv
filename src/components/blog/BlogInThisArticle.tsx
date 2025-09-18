import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";

interface BlogInThisArticleProps {
  sections: { title: string; id: string }[];
}

export const BlogInThisArticle = ({ sections }: BlogInThisArticleProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Card className="mb-8 overflow-hidden border-none shadow-xl bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Glass morphism border */}
      <div className="border border-orange-200/50 dark:border-white/10 rounded-lg overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-sm">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] flex items-center justify-center shadow-md">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <Badge className="mb-1 bg-gradient-to-r from-[#FF7A00] to-[#0D6EFD] text-white font-semibold px-3 py-1 text-xs">
                QUICK NAVIGATION
              </Badge>
              <h3 className="text-xl font-bold text-foreground">In This Article</h3>
            </div>
          </div>

          {/* Navigation List */}
          <div className="grid gap-2">
            {sections.map((section, index) => (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => scrollToSection(section.id)}
                className="justify-start h-auto p-3 text-left hover:bg-gradient-to-r hover:from-[#FF7A00]/10 hover:to-[#0D6EFD]/10 group transition-all duration-200 rounded-lg border border-transparent hover:border-[#FF7A00]/20"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#FF7A00]/20 to-[#0D6EFD]/20 flex items-center justify-center text-xs font-bold text-[#FF7A00] group-hover:bg-gradient-to-br group-hover:from-[#FF7A00] group-hover:to-[#0D6EFD] group-hover:text-white transition-all duration-200">
                    {index + 1}
                  </div>
                  <span className="flex-1 text-sm font-medium text-foreground/80 group-hover:text-foreground">
                    {section.title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[#FF7A00] transition-colors duration-200" />
                </div>
              </Button>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              Click any section above to jump directly to that part of the article
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};