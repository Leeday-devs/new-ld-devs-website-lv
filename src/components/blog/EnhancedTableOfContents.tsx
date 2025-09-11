import { useEffect, useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { List, ChevronRight, ChevronDown, Eye, Clock } from "lucide-react";
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
    <Card className="overflow-hidden bg-background border-border/50 sticky top-24 shadow-xl z-50">
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <List className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-sm text-foreground">Table of Contents</h3>
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-auto p-1"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
        </div>
        
        {/* Reading Progress */}
        <div className="mt-3 space-y-2">
          <Progress value={readingProgress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{Math.round(readingProgress)}% read</span>
            </div>
            {estimatedTimeLeft > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{estimatedTimeLeft} min left</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* TOC Content */}
      {(!isMobile || !isCollapsed) && (
        <div className="relative bg-background z-10">
          <ScrollArea className="max-h-[60vh] min-h-[200px] p-4 bg-background">
            <nav className="space-y-1 pb-4 bg-background">
              {toc.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`
                    w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 bg-background
                    hover:bg-muted/60 hover:text-foreground hover:shadow-sm
                    ${activeId === item.id 
                      ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-medium border-l-4 border-primary shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                    ${item.level === 1 ? 'font-semibold text-base' : ''}
                    ${item.level === 2 ? 'ml-4 text-sm' : ''}
                    ${item.level === 3 ? 'ml-8 text-xs' : ''}
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    {item.level > 1 && <ChevronRight className="h-3 w-3 opacity-50 flex-shrink-0" />}
                    <span className="line-clamp-2 leading-relaxed">{item.text}</span>
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