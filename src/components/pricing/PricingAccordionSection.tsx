import { Star } from "lucide-react";
import { Button as EnhancedButton } from "@/components/ui/button-enhanced";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EnhancedPackage } from "@/types/pricing";
import { useIsMobile } from "@/hooks/use-mobile";
import { FeatureExplainer } from "@/components/pricing/FeatureExplainer";

interface PricingAccordionSectionProps {
  title: string;
  description?: string;
  packages: EnhancedPackage[];
  onSelectPackage: (pkg: EnhancedPackage) => void;
  defaultOpen?: boolean;
}

export const PricingAccordionSection = ({
  title,
  description,
  packages,
  onSelectPackage,
  defaultOpen = false,
}: PricingAccordionSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="mb-12 animate-fade-in-up">
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpen ? "item-1" : undefined}
      >
        <AccordionItem value="item-1" className="border-white/10">
          <AccordionTrigger className="text-white hover:text-orange text-2xl font-bold py-6">
            <div className="text-left">
              <div className="flex items-center gap-3">
                <span>{title}</span>
              </div>
              {description && (
                <p className="text-sm text-gray-400 font-normal mt-1">
                  {description}
                </p>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div
              className={`grid gap-4 md:gap-6 pt-6 ${
                isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {packages.map((plan) => {
                const IconComponent = plan.icon;
                const isPopular = plan.popular;

                return (
                  <div
                    key={plan.id}
                    className={`relative group transition-all duration-300 hover:-translate-y-1 ${
                      isPopular ? "md:scale-105 md:z-10" : ""
                    }`}
                  >
                    {/* Popular Badge */}
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="bg-orange text-white px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-orange/40 animate-pulse-slow flex items-center gap-1.5">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-white" />
                          POPULAR
                        </div>
                      </div>
                    )}

                    <div
                      className={`relative ${
                        isPopular
                          ? "bg-navy border-2 border-orange shadow-lg shadow-orange/20"
                          : "bg-navy/90 border border-white/20"
                      } rounded-2xl p-5 md:p-6 flex flex-col h-full`}
                    >
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-xl ${
                                isPopular
                                  ? "bg-orange text-white"
                                  : "bg-white/10 text-orange"
                              }`}
                            >
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">
                                {plan.name}
                              </h3>
                              <p className="text-gray-400 text-sm">
                                {plan.tagline}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mb-4 pb-4 border-b border-white/10">
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-2xl font-bold text-white">
                                  {plan.buildPrice}
                                </span>
                                <span className="text-gray-400 text-xs">one-time</span>
                              </div>
                              <p className="text-gray-400 text-xs">
                                We design and build it for you
                              </p>
                            </div>
                            {plan.monthlyPrice && (
                              <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="text-lg font-semibold text-orange">
                                    {plan.monthlyPrice}
                                  </span>
                                </div>
                                <p className="text-gray-400 text-xs">
                                  Hosting, security, updates & support
                                </p>
                                {plan.dailyCost && (
                                  <p className="text-gray-500 text-xs mt-0.5 italic">
                                    {plan.dailyCost}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Benefits - show first 4 with tooltips */}
                        <ul className="space-y-3 mb-5">
                          {plan.benefits.slice(0, 4).map((benefit, index) => (
                            <li key={index}>
                              <FeatureExplainer
                                icon={benefit.icon}
                                title={benefit.title}
                                description={benefit.description}
                                tooltip={benefit.tooltip}
                                variant="compact"
                              />
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <EnhancedButton
                          variant={isPopular ? "premium" : "outline"}
                          onClick={() => onSelectPackage(plan)}
                          className="w-full py-2.5 rounded-xl font-semibold text-sm"
                        >
                          Get Started
                        </EnhancedButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
