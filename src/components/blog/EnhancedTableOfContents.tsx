import { useEffect, useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { List, ChevronRight, ChevronDown, Eye, Clock, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const EnhancedTableOfContents = () => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Generate TOC from headings in the content
    const generateToc = () => {
      const headings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-structured-content h2, .blog-structured-content h3');
      const tocItems: TocItem[] = [];
      
      headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        if (!heading.id) {
          heading.id = id;
        }
        
        tocItems.push({
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        });
      });
      
      setToc(tocItems);
    };

    // Set up intersection observer for active heading and reading progress
    const setupObserver = () => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
              
              // Calculate reading progress
              const allHeadings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-structured-content h2, .blog-structured-content h3');
              const currentIndex = Array.from(allHeadings).findIndex(h => h.id === entry.target.id);
              const progress = allHeadings.length > 0 ? ((currentIndex + 1) / allHeadings.length) * 100 : 0;
              setReadingProgress(progress);
              
              // Estimate time left (rough calculation)
              const wordsPerMinute = 200;
              const remainingSections = allHeadings.length - (currentIndex + 1);
              const avgWordsPerSection = 150; // rough estimate
              const timeLeft = Math.ceil((remainingSections * avgWordsPerSection) / wordsPerMinute);
              setEstimatedTimeLeft(Math.max(0, timeLeft));
            }
          });
        },
        {
          rootMargin: '-20% 0% -35% 0%',
          threshold: 0
        }
      );

      // Observe all headings
      const headings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-structured-content h2, .blog-structured-content h3');
      headings.forEach((heading) => {
        if (observerRef.current) {
          observerRef.current.observe(heading);
        }
      });
    };

    // Wait for content to be rendered
    const timer = setTimeout(() => {
      generateToc();
      setupObserver();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToHeading = (id: string) => {
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

  if (toc.length === 0) return null;

  return (
    <Card className="overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-orange-200/50 dark:border-white/10 sticky top-24 shadow-2xl z-50 rounded-2xl">
      {/* Header */}
      <div className="p-6 border-b border-orange-200/30 dark:border-white/10 bg-gradient-to-r from-orange-50/50 to-blue-50/50 dark:from-slate-800/50 dark:to-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] flex items-center justify-center shadow-md">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-base">Table of Contents</h3>
              <p className="text-xs text-muted-foreground">Navigate through sections</p>
            </div>
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-auto p-2 rounded-lg hover:bg-[#FF7A00]/10"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
        </div>
        
        {/* Reading Progress */}
        <div className="mt-4 space-y-3">
          <Progress value={readingProgress} className="h-2 bg-orange-200/50 dark:bg-slate-700" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Eye className="h-3 w-3 text-[#FF7A00]" />
              <span className="font-semibold">{Math.round(readingProgress)}% completed</span>
            </div>
            {estimatedTimeLeft > 0 && (
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-[#0D6EFD]" />
                <span className="font-semibold">{estimatedTimeLeft} min remaining</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* TOC Content */}
      {(!isMobile || !isCollapsed) && (
        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <ScrollArea className="max-h-[60vh] min-h-[200px] p-4">
            <nav className="space-y-2">
              {toc.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`
                    w-full text-left text-sm py-3 px-4 rounded-xl transition-all duration-300 group
                    hover:bg-gradient-to-r hover:from-[#FF7A00]/10 hover:to-[#0D6EFD]/10 hover:shadow-md
                    ${activeId === item.id 
                      ? 'bg-gradient-to-r from-[#FF7A00]/20 to-[#0D6EFD]/20 text-foreground font-semibold border-l-4 border-[#FF7A00] shadow-lg transform scale-[1.02]' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                    ${item.level === 1 ? 'font-semibold text-base' : ''}
                    ${item.level === 2 ? 'ml-4 text-sm' : ''}
                    ${item.level === 3 ? 'ml-8 text-xs' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                      activeId === item.id 
                        ? 'bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] text-white shadow-md' 
                        : 'bg-muted/60 group-hover:bg-gradient-to-br group-hover:from-[#FF7A00]/50 group-hover:to-[#0D6EFD]/50 group-hover:text-white'
                    }`}>
                      {index + 1}
                    </span>
                    {item.level > 1 && <ChevronRight className="h-3 w-3 opacity-40 flex-shrink-0" />}
                    <span className="line-clamp-2 leading-relaxed group-hover:text-foreground transition-colors duration-200">{item.text}</span>
                  </div>
                </button>
              ))}
            </nav>
          </ScrollArea>
        </div>
      )}
    </Card>
  );
};