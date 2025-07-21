import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What web development services do you offer?",
      answer: "We offer comprehensive web development services including custom website design, e-commerce development, web applications, responsive design, and website maintenance. We work with modern technologies like React, TypeScript, and Node.js to create fast, secure, and scalable websites."
    },
    {
      question: "What hosting plans are available?",
      answer: "We offer various hosting solutions from shared hosting for small websites to dedicated servers for high-traffic applications. Our hosting includes SSL certificates, daily backups, 99.9% uptime guarantee, and 24/7 technical support. All plans come with easy-to-use control panels and one-click installations."
    },
    {
      question: "How long does it take to build a website?",
      answer: "Project timelines vary depending on complexity. A simple business website typically takes 1-2 weeks, while complex e-commerce sites or web applications can take 4-8 weeks. We provide detailed project timelines during the initial consultation and keep you updated throughout the development process."
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes! We offer comprehensive maintenance packages including security updates, content updates, performance optimization, backups, and technical support. We believe in long-term partnerships and are always available to help your website grow with your business."
    },
    {
      question: "Can you help migrate my existing website?",
      answer: "Absolutely! We specialize in website migrations from any platform to modern, faster solutions. We handle the entire migration process including content transfer, design improvements, and ensuring zero downtime. We also provide redirects to maintain your SEO rankings."
    },
    {
      question: "What's included in your e-commerce development?",
      answer: "Our e-commerce solutions include product catalog management, secure payment processing, inventory management, order tracking, customer accounts, mobile optimization, and integration with popular payment gateways like Stripe and PayPal. We also provide SEO optimization and analytics setup."
    },
    {
      question: "Do you offer SEO services?",
      answer: "Yes, we include basic SEO optimization in all our web development projects, including meta tags, site structure, loading speed optimization, and mobile responsiveness. We also offer advanced SEO services including keyword research, content optimization, and ongoing SEO management."
    },
    {
      question: "What are your pricing options?",
      answer: "Our pricing is project-based and depends on your specific requirements. We offer transparent pricing with no hidden fees. Contact us for a free consultation and detailed quote. We also offer flexible payment plans to help businesses of all sizes get the website they need."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our web development and hosting services.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <a 
              href="mailto:LeeDayDevs@gmail.com"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Contact us directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;