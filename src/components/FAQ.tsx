import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Shield, Clock, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqItems = [
    {
      question: "How long does it take to build a website?",
      answer: "Most websites are finished in 2-4 weeks. Simple websites take 1-2 weeks, while online shops or more complex sites may take 4-8 weeks. We'll give you a clear timeline when we chat about your project."
    },
    {
      question: "Do you provide hosting and domain registration?",
      answer: "Yes! We offer hosting packages starting from £40/month. This includes keeping your site secure, regular backups (saving copies of your site), and support when you need help. We can also help you get your website address (like yourname.com) set up."
    },
    {
      question: "Will my website work on mobile phones?",
      answer: "Absolutely! All our websites look and work perfectly on phones, tablets, and computers. We test on different devices before we hand it over to make sure everything works smoothly."
    },
    {
      question: "Can I update my website myself?",
      answer: "Yes! We set things up so you can easily change text, images, and other content yourself. We'll show you how it works, and we're always here if you need help with anything more complicated."
    },
    {
      question: "What's included in your ongoing support?",
      answer: "We keep your website safe with security updates, monitor that it's working well, save regular backups, and help you via email or phone when you have questions. We can also make small updates for you."
    },
    {
      question: "Do you work with businesses outside of London?",
      answer: "Yes! We're based in London but work with clients across the UK and internationally. We do everything through video calls, email, and online tools — so wherever you are, we can help."
    },
    {
      question: "Can you help improve my existing website?",
      answer: "Definitely! We can give your current website a fresh look, make it faster, help it show up better on Google, and add new features. Just show us what you have and we'll tell you what we can do."
    },
    {
      question: "What if I'm not happy with the final result?",
      answer: "We want you to love your website. We'll check in with you regularly throughout the project and make as many changes as you need during the design stage. After launch, you have 30 days to let us know if anything isn't right — we'll fix it."
    },
    {
      question: "Do you build online shops?",
      answer: "Yes! We create online shops where your customers can browse products, add them to a basket, and pay securely. You'll be able to manage your products, see orders, and track what's selling well."
    },
    {
      question: "How much does a website cost?",
      answer: "Simple websites start from £350. Custom projects typically range from £1,500-£15,000+ depending on what you need. We also have ready-made designs that are great for getting online quickly without a big budget."
    },
    {
      question: "Can you work with tight deadlines?",
      answer: "Yes! Just message us with your deadline and we'll let you know if we can help."
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
            Here are the most common questions we get from businesses and startups.
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
                → Message us directly
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
                    Can't find what you're looking for? We're here to help with personalised answers to your specific needs.
                  </p>
                </div>

                <div className="space-y-4">
                  <a 
                    href="#contact" 
                    className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 text-center shadow-lg hover:shadow-xl focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-2"
                    aria-label="Get in touch with our team"
                  >
                    Get In Touch
                  </a>
                  <a 
                    href="https://wa.me/447586266007" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 text-center shadow-lg hover:shadow-xl focus-visible:outline-2 focus-visible:outline-green-500 focus-visible:outline-offset-2"
                    aria-label="Contact us via WhatsApp"
                  >
                    WhatsApp Us
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