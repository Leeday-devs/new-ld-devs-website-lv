import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Shield, Clock, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqItems = [
    {
      question: "How long does it take to build a website?",
      answer: "Most websites are completed within 2-4 weeks, depending on complexity. Simple brochure websites take 1-2 weeks, while complex e-commerce or custom applications may take 4-8 weeks. We'll provide you with a detailed timeline during our initial consultation."
    },
    {
      question: "Do you provide hosting and domain registration?",
      answer: "Yes! I offer comprehensive hosting packages starting from £40/month, including SSL certificates, regular backups, security monitoring, and technical support. I can also help you register a domain or transfer your existing one to my hosting platform."
    },
    {
      question: "Will my website work on mobile devices?",
      answer: "Absolutely! All my websites are built with a mobile-first approach, ensuring they look and function perfectly on smartphones, tablets, and desktop computers. I test extensively across all devices and browsers before launch."
    },
    {
      question: "Can I update my website content myself?",
      answer: "Yes, I build websites with user-friendly content management systems. I'll provide training and documentation so you can easily update text, images, and other content. For more complex changes, I'm always available to help."
    },
    {
      question: "What's included in your ongoing support?",
      answer: "My support includes regular security updates, performance monitoring, backup management, technical support via email/phone, and minor content updates. I also offer monthly maintenance packages for more extensive ongoing support."
    },
    {
      question: "Do you work with businesses outside of London?",
      answer: "Yes! While I'm based in London, I work with clients throughout the UK and internationally. Most of my communication is done remotely via video calls, email, and project management tools, making location no barrier to great service."
    },
    {
      question: "Can you help improve my existing website?",
      answer: "Definitely! I offer website audits, redesigns, performance optimisation, SEO improvements, and feature additions for existing websites. I can work with most platforms and technologies to enhance your current online presence."
    },
    {
      question: "What if I'm not happy with the final result?",
      answer: "Your satisfaction is our priority. We work closely with you throughout the project with regular check-ins and revisions. We offer unlimited revisions during the design phase and a 30-day satisfaction guarantee after launch. If you're not happy, we'll make it right."
    },
    {
      question: "Do you offer e-commerce solutions?",
      answer: "Yes, we specialize in building custom e-commerce platforms with secure payment processing, inventory management, order tracking, and customer accounts. We work with various payment providers and can integrate with existing business systems."
    },
    {
      question: "How much does a website cost?",
      answer: "Our websites start from £350 for simple brochure sites, with custom projects ranging from £1,500-£15,000+ depending on complexity and features. We also offer pre-built industry-specific templates that are perfect for getting online quickly and cost-effectively."
    },
    {
      question: "Do I work with tight timelines?",
      answer: "Yes—message me with your deadline."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section id="faq" className="bg-transparent py-20 large-section">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full mb-6 border border-primary/20">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold">Common Questions</span>
          </div>
          
          <h2 className="heading-primary heading-lg mb-6 text-navy">
            Frequently Asked <span className="text-orange">Questions</span>
          </h2>
          <p className="text-body max-w-3xl mx-auto text-text-secondary mb-4 leading-relaxed">
            Here are the most common questions I get as a freelancer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-start">
          {/* FAQ Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Card 
                  key={index}
                  className="group relative overflow-hidden bg-white border-2 border-navy/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full text-left p-6 flex items-center justify-between group/button"
                      aria-expanded={openItem === index}
                      aria-controls={`faq-answer-${index}`}
                      aria-label={`Toggle answer for: ${item.question}`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-navy group-hover/button:text-primary transition-colors duration-300 pr-4">
                          {item.question}
                        </h3>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange/10 border-2 border-orange flex items-center justify-center group-hover/button:bg-orange/20 transition-all duration-300">
                          {openItem === index ? (
                            <Minus className="h-4 w-4 text-orange transition-transform duration-300 group-hover/button:scale-110" />
                          ) : (
                            <Plus className="h-4 w-4 text-orange transition-transform duration-300 group-hover/button:scale-110" />
                          )}
                        </div>
                      </div>
                    </button>
                    
                    <div 
                      id={`faq-answer-${index}`}
                      className={`overflow-hidden transition-all duration-700 ease-out ${
                        openItem === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 mb-4"></div>
                        <p className="text-text-secondary leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Contact Link Below FAQs */}
            <div className="text-center mt-12">
              <p className="text-text-secondary mb-4 leading-relaxed">
                Didn't find your answer?
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-orange font-semibold hover:text-orange/80 transition-colors duration-300 text-lg inline-flex items-center gap-2 group"
                aria-label="Contact Lee directly for more information"
              >
                → Message me directly
                <span className="transform group-hover:translate-x-1 transition-transform duration-300"></span>
              </button>
            </div>
          </div>

          {/* Contact CTA Sidebar */}
          <div className="lg:sticky lg:top-24">
            <Card className="bg-white border-2 border-primary/20 overflow-hidden relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="text-center mb-6">
                  <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">
                    Still Have Questions?
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    Can't find what you're looking for? I'm here to help with personalised answers to your specific needs.
                  </p>
                </div>

                <div className="space-y-4">
                  <a 
                    href="#contact" 
                    className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 text-center shadow-lg hover:shadow-xl focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-2"
                    aria-label="Get in touch with Lee"
                  >
                    Get In Touch
                  </a>
                  <a 
                    href="https://wa.me/447586266007" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 text-center shadow-lg hover:shadow-xl focus-visible:outline-2 focus-visible:outline-green-500 focus-visible:outline-offset-2"
                    aria-label="Contact Lee via WhatsApp"
                  >
                    WhatsApp Me
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-border-light">
                  <div className="flex items-center justify-center gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Quick Response</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Free Consultation</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;