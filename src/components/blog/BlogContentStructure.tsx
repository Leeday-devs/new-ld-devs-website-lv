import { ReactNode } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Target, Lightbulb, Bookmark } from "lucide-react";

interface BlogSectionProps {
  children: ReactNode;
  className?: string;
}

export const BlogTitle = ({ children, className = "" }: BlogSectionProps) => (
  <div className={`blog-title-section mb-8 ${className}`}>
    <div className="flex items-start gap-3 mb-4">
      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium">
        TITLE
      </Badge>
      <div className="flex-1">
        <div className="text-sm text-muted-foreground mb-2">
          Should include: Number + Benefit + Timeframe
        </div>
      </div>
    </div>
    <div className="blog-title-content">
      {children}
    </div>
  </div>
);

export const BlogIntro = ({ children, className = "" }: BlogSectionProps) => (
  <Card className={`blog-intro-section p-8 mb-8 bg-gradient-to-br from-orange-50 to-orange-100/50 border-l-4 border-orange-500 shadow-lg dark:from-orange-950/20 dark:to-orange-900/20 dark:border-orange-600 ${className}`}>
    <div className="flex items-start gap-3 mb-6">
      <div className="flex items-center gap-2">
        <Bookmark className="h-5 w-5 text-orange-600" />
        <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-3 py-1 shadow-sm">
          INTRODUCTION
        </Badge>
      </div>
      <div className="flex-1">
        <div className="text-sm text-muted-foreground">
          Setting the context and showing the value you'll gain
        </div>
      </div>
    </div>
    <div className="blog-intro-content text-lg leading-relaxed text-foreground">
      {children}
    </div>
  </Card>
);

export const BlogSubheading = ({ children, className = "" }: BlogSectionProps) => (
  <div className={`blog-subheading-section mb-6 ${className}`}>
    <div className="flex items-start gap-3 mb-3">
      <Badge className="bg-purple-500 hover:bg-purple-600 text-white font-medium">
        SECTION
      </Badge>
      <div className="flex-1">
        <div className="text-sm text-muted-foreground">
          • Overview of the tip • Clear benefit
        </div>
      </div>
    </div>
    <div className="blog-subheading-content">
      {children}
    </div>
  </div>
);

export const BlogActionItems = ({ children, className = "" }: BlogSectionProps) => (
  <Card className={`blog-action-section p-8 mb-8 bg-gradient-to-br from-blue-50 to-blue-100/50 border-l-4 border-blue-500 shadow-lg dark:from-blue-950/20 dark:to-blue-900/20 dark:border-blue-600 ${className}`}>
    <div className="flex items-start gap-3 mb-6">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-blue-600" />
        <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-3 py-1 shadow-sm flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          ACTION STEPS
        </Badge>
      </div>
      <div className="flex-1">
        <div className="text-sm text-muted-foreground">
          Practical steps you can implement right away
        </div>
      </div>
    </div>
    <div className="blog-action-content">
      {children}
    </div>
  </Card>
);

export const BlogConclusion = ({ children, className = "" }: BlogSectionProps) => (
  <Card className={`blog-conclusion-section p-8 mb-8 bg-gradient-to-br from-purple-50 to-purple-100/50 border-l-4 border-purple-500 shadow-lg dark:from-purple-950/20 dark:to-purple-900/20 dark:border-purple-600 ${className}`}>
    <div className="flex items-start gap-3 mb-6">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-purple-600" />
        <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium px-3 py-1 shadow-sm flex items-center gap-1">
          <Target className="h-3 w-3" />
          KEY TAKEAWAYS
        </Badge>
      </div>
      <div className="flex-1">
        <div className="text-sm text-muted-foreground">
          Summary and next steps for implementation
        </div>
      </div>
    </div>
    <div className="blog-conclusion-content">
      {children}
    </div>
  </Card>
);

// Enhanced list styling for action items
export const ActionList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
          {index + 1}
        </div>
        <span className="text-gray-700 leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

// Enhanced subheading with visual hierarchy
export const EnhancedSubheading = ({ 
  title, 
  description, 
  number 
}: { 
  title: string; 
  description?: string; 
  number?: number; 
}) => (
  <div className="my-10">
    <div className="flex items-start gap-6 mb-6 p-6 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-border/50">
      {number && (
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
          {number}
        </div>
      )}
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  </div>
);

// Call-to-action component for conclusion
export const ActionCTA = ({ 
  question, 
  primaryAction, 
  secondaryAction 
}: { 
  question: string;
  primaryAction: { text: string; href: string };
  secondaryAction?: { text: string; href: string };
}) => (
  <div className="bg-[hsl(var(--brand-navy))] text-white p-8 rounded-xl mt-6 shadow-lg border-2 border-primary">
    <p className="text-xl font-medium mb-6">{question}</p>
    <div className="flex flex-col sm:flex-row gap-4">
      <a 
        href={primaryAction.href}
        className="bg-primary text-[hsl(var(--brand-navy))] px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        {primaryAction.text}
      </a>
      {secondaryAction && (
        <a 
          href={secondaryAction.href}
          className="border-2 border-primary text-primary bg-white px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-center hover:shadow-lg transform hover:-translate-y-1"
        >
          {secondaryAction.text}
        </a>
      )}
    </div>
  </div>
);