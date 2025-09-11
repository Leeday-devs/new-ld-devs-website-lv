import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Quote, Lightbulb, AlertTriangle, Info } from "lucide-react";

// Interactive Checklist Component
export const InteractiveChecklist = ({ 
  items, 
  title = "Action Checklist" 
}: { 
  items: string[]; 
  title?: string; 
}) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(items.length).fill(false));

  const toggleItem = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const completedCount = checkedItems.filter(Boolean).length;
  const completionRate = (completedCount / items.length) * 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 dark:from-blue-950/20 dark:to-blue-900/20 dark:border-blue-800/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-300">
          {completedCount}/{items.length} Complete
        </Badge>
      </div>
      
      <div className="mb-4 bg-white/50 dark:bg-black/20 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${completionRate}%` }}
        />
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="group">
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/60 dark:hover:bg-black/20 text-left"
            >
              {checkedItems[index] ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-blue-500" />
              )}
              <span className={`${checkedItems[index] ? 'text-green-700 line-through' : 'text-foreground'} leading-relaxed`}>
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

// Expandable FAQ Component
export const ExpandableFAQ = ({ 
  items 
}: { 
  items: { question: string; answer: string; }[] 
}) => {
  const [expandedItems, setExpandedItems] = useState<boolean[]>(new Array(items.length).fill(false));

  const toggleItem = (index: number) => {
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200 dark:from-purple-950/20 dark:to-purple-900/20 dark:border-purple-800/30">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="h-6 w-6 text-purple-600" />
        <h3 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h3>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border border-purple-200/50 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 bg-white/50 dark:bg-black/20 hover:bg-white/70 dark:hover:bg-black/30 transition-colors text-left"
            >
              <span className="font-medium text-foreground pr-4">{item.question}</span>
              {expandedItems[index] ? (
                <ChevronUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-purple-600 flex-shrink-0" />
              )}
            </button>
            
            {expandedItems[index] && (
              <div className="p-4 pt-0 bg-white/30 dark:bg-black/10">
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

// Highlighted Quote Component
export const HighlightedQuote = ({ 
  quote, 
  author, 
  role,
  type = "quote" 
}: { 
  quote: string; 
  author?: string; 
  role?: string;
  type?: "quote" | "tip" | "warning" | "info";
}) => {
  const typeConfig = {
    quote: { 
      icon: Quote, 
      gradient: "from-gray-50 to-gray-100/50", 
      border: "border-gray-200",
      iconColor: "text-gray-600",
      darkGradient: "dark:from-gray-950/20 dark:to-gray-900/20",
      darkBorder: "dark:border-gray-800/30"
    },
    tip: { 
      icon: Lightbulb, 
      gradient: "from-yellow-50 to-yellow-100/50", 
      border: "border-yellow-200",
      iconColor: "text-yellow-600",
      darkGradient: "dark:from-yellow-950/20 dark:to-yellow-900/20",
      darkBorder: "dark:border-yellow-800/30"
    },
    warning: { 
      icon: AlertTriangle, 
      gradient: "from-red-50 to-red-100/50", 
      border: "border-red-200",
      iconColor: "text-red-600",
      darkGradient: "dark:from-red-950/20 dark:to-red-900/20",
      darkBorder: "dark:border-red-800/30"
    },
    info: { 
      icon: Info, 
      gradient: "from-blue-50 to-blue-100/50", 
      border: "border-blue-200",
      iconColor: "text-blue-600",
      darkGradient: "dark:from-blue-950/20 dark:to-blue-900/20",
      darkBorder: "dark:border-blue-800/30"
    }
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <Card className={`p-6 bg-gradient-to-br ${config.gradient} ${config.darkGradient} ${config.border} ${config.darkBorder} border-l-4`}>
      <div className="flex gap-4">
        <IconComponent className={`h-8 w-8 ${config.iconColor} flex-shrink-0`} />
        <div className="flex-1">
          <blockquote className="text-lg text-foreground leading-relaxed italic mb-3">
            "{quote}"
          </blockquote>
          {author && (
            <cite className="text-sm text-muted-foreground not-italic">
              <span className="font-medium">— {author}</span>
              {role && <span>, {role}</span>}
            </cite>
          )}
        </div>
      </div>
    </Card>
  );
};

// Enhanced Action Items with better styling
export const EnhancedActionItems = ({ 
  items, 
  title = "Key Action Items",
  numbered = true 
}: { 
  items: string[]; 
  title?: string;
  numbered?: boolean;
}) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 dark:from-green-950/20 dark:to-green-900/20 dark:border-green-800/30 border-l-4 border-l-green-500">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle2 className="h-6 w-6 text-green-600" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-white/60 dark:bg-black/20 rounded-lg border border-green-200/50 dark:border-green-800/30">
            {numbered && (
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            )}
            <p className="text-foreground leading-relaxed flex-1">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};