import { useEffect, useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { List, ChevronRight } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const BlogTableOfContents = () => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Generate TOC from headings in the content
    const generateToc = () => {
      const headings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3');
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

    // Set up intersection observer for active heading
    const setupObserver = () => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-20% 0% -35% 0%',
          threshold: 0
        }
      );

      // Observe all headings
      const headings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3');
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
    <Card className="p-4 bg-gradient-to-br from-background to-muted/20 border-border/50 sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <List className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-sm text-foreground">Table of Contents</h3>
      </div>
      
      <ScrollArea className="max-h-96">
        <nav className="space-y-1">
          {toc.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`
                w-full text-left text-sm py-1 px-2 rounded-md transition-all duration-200
                hover:bg-muted/50 hover:text-foreground
                ${activeId === item.id 
                  ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary' 
                  : 'text-muted-foreground'
                }
                ${item.level === 1 ? 'font-semibold' : ''}
                ${item.level === 2 ? 'ml-3' : ''}
                ${item.level === 3 ? 'ml-6' : ''}
              `}
            >
              <div className="flex items-center gap-1">
                {item.level > 1 && <ChevronRight className="h-3 w-3 opacity-50" />}
                <span className="line-clamp-2">{item.text}</span>
              </div>
            </button>
          ))}
        </nav>
      </ScrollArea>
    </Card>
  );
};