import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

const CTABars = () => {
  return (
    <div className="space-y-0">
      {/* Premium CTA - Orange Gradient */}
      <section className="section-feature py-20" aria-label="Main call to action">
        <div className="container mx-auto px-6 text-center">
          <h2 className="heading-luxury heading-lg mb-6 text-on-dark">
            Ready to Transform Your Online Presence?
          </h2>
          <p className="text-luxury text-on-dark mb-12 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have elevated their business with our premium web solutions
          </p>
          <Button 
            size="lg" 
            className="btn-secondary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Your Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Luxury CTA - Navy */}
      <section className="section-dark py-20" aria-label="Secondary call to action">
        <div className="container mx-auto px-6 text-center">
          <h2 className="heading-luxury heading-lg mb-6 text-on-dark">
            Need Help Choosing the Right Plan?
          </h2>
          <p className="text-luxury text-on-dark mb-12 max-w-2xl mx-auto">
            Our experts are here to guide you through the process and recommend the perfect solution for your business
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="btn-primary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Schedule Consultation
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              className="btn-ghost border-gold text-gold hover:bg-gold hover:text-brand-navy"
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View FAQ
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTABars;