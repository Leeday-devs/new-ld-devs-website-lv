import { ReactNode, useEffect } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useIsMobile } from '@/hooks/use-mobile';
import SEOHead from '@/components/SEOHead';

interface FormPageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  errors?: string[];
  isSubmitting?: boolean;
  formType: 'contact' | 'quote' | 'booking' | 'consultation';
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export const FormPageLayout = ({
  children,
  title,
  subtitle,
  errors = [],
  isSubmitting = false,
  formType,
  showProgress = false,
  currentStep = 1,
  totalSteps = 1
}: FormPageLayoutProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/';
  const isMobile = useIsMobile();

  const handleBack = () => {
    navigate(returnTo);
  };

  // Track form view for analytics
  useEffect(() => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'form_view', {
        form_type: formType,
        page_title: title
      });
    }
  }, [formType, title]);

  // Prevent scroll when form is submitting
  useEffect(() => {
    if (isSubmitting) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSubmitting]);

  const seoData = {
    contact: {
      title: 'Contact Us - Get Your Free Website Quote Today',
      description: 'Contact our web development experts for a free consultation and personalized quote for your business website.',
      keywords: 'contact, web development quote, free consultation'
    },
    quote: {
      title: 'Get Custom Website Quote - Professional Web Development',
      description: 'Request a detailed quote for your custom website project. Professional web development tailored to your business needs.',
      keywords: 'custom website quote, web development pricing, business website cost'
    },
    booking: {
      title: 'Book Consultation - Professional Website Development',
      description: 'Schedule a free consultation to discuss your website project requirements with our expert development team.',
      keywords: 'book consultation, website planning, web development meeting'
    },
    consultation: {
      title: 'Free Website Consultation - Expert Development Advice',
      description: 'Get expert advice on your website project. Free consultation with experienced web developers.',
      keywords: 'free consultation, website advice, web development consultation'
    }
  };

  return (
    <>
      <SEOHead
        title={seoData[formType].title}
        description={seoData[formType].description}
        keywords={seoData[formType].keywords}
      />
      
      <div className="min-h-screen bg-background">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                disabled={isSubmitting}
              >
                <ArrowLeft className="h-4 w-4" />
                {isMobile ? 'Back' : 'Back to Site'}
              </Button>
              
              {showProgress && totalSteps > 1 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{currentStep}</span>
                  <span>/</span>
                  <span>{totalSteps}</span>
                </div>
              )}
            </div>
            
            {showProgress && totalSteps > 1 && (
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="heading-lg text-foreground mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-body text-muted-foreground max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          {/* Error Summary */}
          {errors.length > 0 && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-2">Please fix the following errors:</div>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Form Content */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-8">
            {children}
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-1">
                🔒 SSL Secured
              </span>
              <span className="flex items-center gap-1">
                ⚡ Fast Response
              </span>
              <span className="flex items-center gap-1">
                🆓 Free Quote
              </span>
            </div>
          </div>
        </main>

        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card rounded-lg p-6 shadow-lg text-center max-w-sm mx-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <div className="font-medium mb-2">Sending your request...</div>
              <div className="text-sm text-muted-foreground">Please wait while we process your information.</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};