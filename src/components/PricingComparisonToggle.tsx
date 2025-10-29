import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface PricingFeature {
  name: string;
  included: boolean[] | 'highlight'; // boolean array for each plan, or 'highlight' for key features
}

interface PricingComparisonToggleProps {
  planNames: string[];
  features: PricingFeature[];
  highlightPlanIndex?: number;
}

/**
 * PricingComparisonToggle Component
 * Shows feature comparison between pricing plans with smooth animations
 * Features slide in and out smoothly with color-coded visual indicators
 */
const PricingComparisonToggle = ({
  planNames,
  features,
  highlightPlanIndex = 1, // Highlight middle plan by default
}: PricingComparisonToggleProps) => {
  const [expandedFeatures, setExpandedFeatures] = useState<Set<number>>(
    new Set(features.map((_, i) => i))
  );

  const toggleFeature = (index: number) => {
    const newExpanded = new Set(expandedFeatures);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedFeatures(newExpanded);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max">
        {/* Header Row */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${planNames.length}, 150px)` }}>
          <div className="py-2" />
          {planNames.map((name, index) => (
            <div
              key={index}
              className={`text-center py-2 px-3 rounded-lg transition-all duration-300 ${
                index === highlightPlanIndex
                  ? 'bg-gradient-to-r from-orange/20 via-orange/10 to-orange/5 border border-orange/30'
                  : 'bg-white/50'
              }`}
            >
              <h3 className={`font-bold text-sm md:text-base ${
                index === highlightPlanIndex ? 'text-orange' : 'text-navy'
              }`}>
                {name}
              </h3>
            </div>
          ))}
        </div>

        {/* Features List */}
        <div className="space-y-2">
          {features.map((feature, featureIndex) => {
            const isExpanded = expandedFeatures.has(featureIndex);

            return (
              <div
                key={featureIndex}
                className="grid gap-4 border-b border-orange/10 pb-2 transition-all duration-300"
                style={{ gridTemplateColumns: `200px repeat(${planNames.length}, 150px)` }}
              >
                {/* Feature Name */}
                <button
                  onClick={() => toggleFeature(featureIndex)}
                  className="text-left py-2 px-3 rounded-lg hover:bg-navy/5 transition-colors duration-200 group"
                >
                  <span className="font-medium text-sm text-navy/80 group-hover:text-navy truncate">
                    {feature.name}
                  </span>
                </button>

                {/* Feature Availability */}
                {typeof feature.included === 'string' ? (
                  // Highlight row
                  <>
                    {planNames.map((_, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-center py-2 px-3 rounded-lg transition-all duration-300 ${
                          index === highlightPlanIndex
                            ? 'bg-gradient-to-r from-orange/15 to-orange/5 border border-orange/20'
                            : 'bg-white/30'
                        }`}
                      >
                        <span
                          className={`text-xs md:text-sm font-semibold ${
                            index === highlightPlanIndex ? 'text-orange' : 'text-navy/60'
                          }`}
                        >
                          Key Feature
                        </span>
                      </div>
                    ))}
                  </>
                ) : (
                  // Regular feature row
                  <>
                    {feature.included.map((included, planIndex) => (
                      <div
                        key={planIndex}
                        className={`flex items-center justify-center py-2 px-3 rounded-lg transition-all duration-300 ${
                          included
                            ? planIndex === highlightPlanIndex
                              ? 'bg-gradient-to-r from-emerald-100/30 to-emerald-50/20 border border-emerald-200/50'
                              : 'bg-emerald-50/40'
                            : planIndex === highlightPlanIndex
                            ? 'bg-gradient-to-r from-red-50/20 to-red-50/10'
                            : 'bg-white/20'
                        }`}
                      >
                        {included ? (
                          <div className="animate-scale-in">
                            <Check className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
                          </div>
                        ) : (
                          <X className="h-4 w-4 md:h-5 md:w-5 text-red-400/50" />
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingComparisonToggle;
