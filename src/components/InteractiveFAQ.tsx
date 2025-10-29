import React, { useState, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface InteractiveFAQProps {
  items: FAQItem[];
  animated?: boolean;
}

/**
 * InteractiveFAQ Component
 * Interactive FAQ section with smooth accordion animations and search functionality
 * Features animated chevrons, smooth content reveals, and category filtering
 */
const InteractiveFAQ = ({
  items,
  animated = true,
}: InteractiveFAQProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Extract unique categories
  const categories = Array.from(new Set(items.map(item => item.category).filter(Boolean)));

  // Filter items based on search and category
  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange/60" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-orange/20 bg-white/50 backdrop-blur-sm
                     placeholder-navy/40 text-navy focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/20
                     transition-all duration-300"
          />
        </div>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-orange text-white shadow-md'
                : 'bg-white/50 text-navy/70 hover:bg-white/70'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-orange text-white shadow-md'
                  : 'bg-white/50 text-navy/70 hover:bg-white/70'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-3">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className={`rounded-xl border border-orange/20 bg-white/50 backdrop-blur-sm overflow-hidden
                       transition-all duration-300 hover:border-orange/40 hover:shadow-md
                       ${animated ? 'animate-fade-in' : ''}`}
            style={animated ? { animationDelay: `${index * 50}ms` } : {}}
          >
            {/* Question/Trigger */}
            <button
              onClick={() => toggleExpand(item.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-orange/5 transition-colors duration-200 group"
            >
              <span className="text-left font-semibold text-navy group-hover:text-orange transition-colors duration-200">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 text-orange/60 flex-shrink-0 ml-4 transition-transform duration-400 ${
                  expandedId === item.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Answer - Animated Content */}
            <div
              ref={(el) => {
                contentRefs.current[item.id] = el;
              }}
              className="overflow-hidden transition-all duration-300 ease-out"
              style={{
                maxHeight: expandedId === item.id
                  ? contentRefs.current[item.id]?.scrollHeight
                  : 0,
                opacity: expandedId === item.id ? 1 : 0,
              }}
            >
              <div className="px-6 py-4 bg-gradient-to-r from-orange/5 via-transparent to-orange/5 border-t border-orange/10">
                <p className="text-navy/80 leading-relaxed text-sm md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-navy/60 font-medium">
            No FAQs found. Try adjusting your search or filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveFAQ;
