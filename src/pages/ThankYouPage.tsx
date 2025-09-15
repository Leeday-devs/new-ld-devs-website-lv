import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowLeft, MessageCircle, Calendar, Mail, Phone } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const formMessages = {
  contact: {
    title: 'Thank You for Your Interest!',
    subtitle: 'Your contact request has been received',
    message: 'We\'ve received your project details and will get back to you with a personalized quote within 24 hours.',
    nextSteps: [
      'Our team will review your requirements',
      'We\'ll prepare a detailed quote tailored to your needs',
      'You\'ll receive a comprehensive proposal via email',
      'We\'ll schedule a follow-up call to discuss next steps'
    ],
    icon: <Mail className="h-8 w-8 text-primary" />
  },
  quote: {
    title: 'Quote Request Submitted!',
    subtitle: 'We\'re preparing your custom proposal',
    message: 'Thank you for providing detailed information about your project. Our experts are now reviewing your requirements to create a comprehensive quote.',
    nextSteps: [
      'Our specialists will analyze your project requirements',
      'We\'ll research the best technologies for your needs',
      'You\'ll receive a detailed proposal with timeline and pricing',
      'We\'ll schedule a consultation to discuss the proposal'
    ],
    icon: <CheckCircle className="h-8 w-8 text-primary" />
  },
  booking: {
    title: 'Consultation Booked!',
    subtitle: 'Your meeting request has been received',
    message: 'We\'ll confirm your appointment and send you a calendar invite with all the meeting details.',
    nextSteps: [
      'We\'ll confirm your preferred date and time within 2 hours',
      'You\'ll receive a calendar invite via email',
      'We\'ll send you a preparation guide for the meeting',
      'Our expert will be ready to discuss your project in detail'
    ],
    icon: <Calendar className="h-8 w-8 text-primary" />
  },
  consultation: {
    title: 'Free Consultation Requested!',
    subtitle: 'We\'re excited to help with your project',
    message: 'Thank you for requesting a free consultation. Our team is looking forward to providing you with expert advice tailored to your business needs.',
    nextSteps: [
      'We\'ll contact you within 2 hours to schedule your consultation',
      'Our expert will prepare personalized recommendations',
      'You\'ll receive valuable insights with no obligations',
      'We\'ll discuss potential solutions that fit your budget'
    ],
    icon: <MessageCircle className="h-8 w-8 text-primary" />
  }
};

export default function ThankYouPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const ref = searchParams.get('ref') as keyof typeof formMessages || 'contact';
  const returnTo = searchParams.get('returnTo') || '/';
  
  const formData = formMessages[ref] || formMessages.contact;

  // Track conversion for analytics
  useEffect(() => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual conversion tracking
        event_category: 'Forms',
        event_label: `${ref}_conversion`,
        form_type: ref
      });
    }
  }, [ref]);

  const handleBackClick = () => {
    navigate(returnTo);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/447586266007?text=Hi! I just submitted a form and wanted to follow up.', '_blank');
  };

  return (
    <>
      <SEOHead
        title="Thank You - Form Submitted Successfully"
        description="Thank you for contacting us. We'll get back to you soon with expert advice for your project."
      />
      
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              {formData.icon}
            </div>
            
            <h1 className="heading-lg text-foreground mb-4">
              {formData.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-2">
              {formData.subtitle}
            </p>
            
            <p className="text-body text-muted-foreground max-w-lg mx-auto">
              {formData.message}
            </p>
          </div>

          {/* Next Steps Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                What happens next?
              </h2>
              
              <div className="space-y-3">
                {formData.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Need immediate assistance?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Call us directly</p>
                    <p className="text-sm text-muted-foreground">+44 758 626 6007</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email us</p>
                    <p className="text-sm text-muted-foreground">hello@yourcompany.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleBackClick}
              variant="outline"
              className="flex items-center gap-2 min-h-[48px] px-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Button>
            
            <Button
              onClick={handleWhatsAppClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 min-h-[48px] px-6"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </div>

          {/* Footer Message */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-1">
                ⚡ Fast Response Guaranteed
              </span>
              <span className="flex items-center gap-1">
                🎯 No Spam, Just Value
              </span>
              <span className="flex items-center gap-1">
                🔒 Your Data is Secure
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}