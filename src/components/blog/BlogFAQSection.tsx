import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FAQItem {
  question: string;
  answer: string;
}

interface BlogFAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

export const BlogFAQSection = ({ faqs, title = "Frequently Asked Questions" }: BlogFAQSectionProps) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I have a question about your services after reading your blog post.");
    window.open(`https://wa.me/447586266007?text=${message}`, '_blank');
  };

  return (
    <div className="mt-16 mb-12">
      {/* Section Divider */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00] via-[#0D6EFD] to-[#FF7A00] h-1 rounded-full opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent h-1 rounded-full"></div>
      </div>

      <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-br from-slate-50 via-orange-50/20 to-blue-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Glass morphism border */}
        <div className="border border-orange-200/30 dark:border-white/10 rounded-lg overflow-hidden bg-white/90 dark:bg-white/5 backdrop-blur-sm">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] flex items-center justify-center shadow-lg">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-gradient-to-r from-[#FF7A00] to-[#0D6EFD] text-white font-semibold px-4 py-2">
                  FAQ SECTION
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get quick answers to common questions about our services and approach
              </p>
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white/80 dark:bg-white/5 rounded-xl border border-orange-200/50 dark:border-white/10 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden backdrop-blur-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gradient-to-r hover:from-[#FF7A00]/5 hover:to-[#0D6EFD]/5 transition-all duration-200 [&[data-state=open]]:bg-gradient-to-r [&[data-state=open]]:from-[#FF7A00]/10 [&[data-state=open]]:to-[#0D6EFD]/10">
                    <div className="flex items-start gap-4 w-full">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A00]/20 to-[#0D6EFD]/20 flex items-center justify-center text-sm font-bold text-[#FF7A00] mt-1">
                        {index + 1}
                      </div>
                      <span className="text-base md:text-lg font-semibold text-foreground leading-relaxed">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    <div className="ml-12 text-muted-foreground leading-relaxed text-base">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* CTA Section */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-[#FF7A00]/10 to-[#0D6EFD]/10 rounded-xl p-6 border border-[#FF7A00]/20">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Still Have Questions?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our team is here to help with any specific questions about your project
                </p>
                <Button 
                  onClick={handleWhatsAppClick}
                  className="bg-gradient-to-r from-[#FF7A00] to-[#0D6EFD] hover:from-[#FF7A00]/90 hover:to-[#0D6EFD]/90 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask Our Experts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};