import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FormPageLayout } from '@/components/FormPageLayout';
import { customQuoteSchema, type CustomQuoteData, validateForm } from '@/schemas/formSchemas';
import { useFormAnalytics } from '@/hooks/useFormAnalytics';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const projectTypes = [
  'Business Website',
  'E-commerce Store',
  'Portfolio Website',
  'Blog/News Site',
  'Landing Page',
  'Web Application',
  'Mobile App',
  'Custom Development',
  'Other'
];

const budgetRanges = [
  { value: 'under-5k', label: 'Under £5,000' },
  { value: '5k-15k', label: '£5,000 - £15,000' },
  { value: '15k-30k', label: '£15,000 - £30,000' },
  { value: '30k-50k', label: '£30,000 - £50,000' },
  { value: 'over-50k', label: 'Over £50,000' },
  { value: 'not-sure', label: 'Not sure yet' }
];

const timelines = [
  'ASAP (Rush Job)',
  '1-2 weeks',
  '1 month',
  '2-3 months',
  '3-6 months',
  '6+ months',
  'Flexible'
];

export default function QuotePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const { toast } = useToast();
  const { trackFieldFocus, trackError, trackSubmission, trackSuccess } = useFormAnalytics('quote');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CustomQuoteData>({
    resolver: zodResolver(customQuoteSchema)
  });

  const watchedFields = watch();

  const onSubmit = async (data: CustomQuoteData) => {
    setIsSubmitting(true);
    setFormErrors([]);

    try {
      // Validate form data
      const validation = validateForm(customQuoteSchema, data);
      if (!validation.success) {
        setFormErrors(validation.errors || []);
        validation.errors?.forEach(error => {
          trackError('validation_error', error);
        });
        return;
      }

      const submissionTime = trackSubmission();

      // Submit to custom_quote_requests table
      const { error: dbError } = await supabase
        .from('custom_quote_requests')
        .insert([{
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone?.trim() || null,
          company: data.company?.trim() || null,
          project_type: data.projectType,
          budget_range: data.budgetRange,
          timeline: data.timeline,
          project_description: data.projectDescription.trim(),
          special_requirements: data.specialRequirements?.trim() || null,
          has_existing_branding: data.hasExistingBranding || false,
          needs_hosting: data.needsHosting || false,
          needs_maintenance: data.needsMaintenance || false,
          status: 'pending'
        }]);

      if (dbError) throw dbError;

      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'custom_quote_request',
          data: {
            name: data.name.trim(),
            email: data.email.trim(),
            projectType: data.projectType,
            budgetRange: data.budgetRange,
            timeline: data.timeline,
            description: data.projectDescription.trim().substring(0, 200) + (data.projectDescription.trim().length > 200 ? '...' : '')
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
      }

      trackSuccess();

      // Redirect to thank you page
      const returnTo = searchParams.get('returnTo') || '/';
      navigate(`/thank-you?ref=quote&returnTo=${encodeURIComponent(returnTo)}`);

    } catch (error) {
      console.error('Error submitting custom quote:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      trackError('submission_error', errorMessage);
      
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldFocus = (fieldName: string) => {
    trackFieldFocus(fieldName);
  };

  // Convert react-hook-form errors to form layout errors
  const getFormErrors = (): string[] => {
    const errorList: string[] = [];
    Object.entries(errors).forEach(([key, error]) => {
      if (error?.message) {
        errorList.push(error.message);
      }
    });
    return [...errorList, ...formErrors];
  };

  return (
    <FormPageLayout
      title="Request Custom Quote"
      subtitle="Get a detailed quote for your custom project. We'll analyze your requirements and provide a comprehensive proposal."
      formType="quote"
      errors={getFormErrors()}
      isSubmitting={isSubmitting}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                className="mt-1"
                onFocus={() => handleFieldFocus('name')}
                {...register('name')}
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="mt-1"
                onFocus={() => handleFieldFocus('email')}
                {...register('email')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+44 123 456 7890"
                className="mt-1"
                onFocus={() => handleFieldFocus('phone')}
                {...register('phone')}
              />
            </div>

            <div>
              <Label htmlFor="company" className="text-sm font-medium text-foreground">
                Company Name
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="Your company"
                className="mt-1"
                onFocus={() => handleFieldFocus('company')}
                {...register('company')}
              />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Project Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="projectType" className="text-sm font-medium text-foreground">
                Project Type *
              </Label>
              <Select onValueChange={(value) => setValue('projectType', value)} required>
                <SelectTrigger className="mt-1" onFocus={() => handleFieldFocus('projectType')}>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budgetRange" className="text-sm font-medium text-foreground">
                Budget Range *
              </Label>
              <Select onValueChange={(value) => setValue('budgetRange', value)} required>
                <SelectTrigger className="mt-1" onFocus={() => handleFieldFocus('budgetRange')}>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeline" className="text-sm font-medium text-foreground">
                Timeline *
              </Label>
              <Select onValueChange={(value) => setValue('timeline', value)} required>
                <SelectTrigger className="mt-1" onFocus={() => handleFieldFocus('timeline')}>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelines.map((timeline) => (
                    <SelectItem key={timeline} value={timeline}>
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="projectDescription" className="text-sm font-medium text-foreground">
              Project Description *
            </Label>
            <Textarea
              id="projectDescription"
              placeholder="Describe your project in detail. Include features, functionality, design preferences, target audience, and any specific requirements..."
              className="mt-1 min-h-[150px] resize-none"
              onFocus={() => handleFieldFocus('projectDescription')}
              {...register('projectDescription')}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Minimum 20 characters required
            </p>
          </div>

          <div>
            <Label htmlFor="specialRequirements" className="text-sm font-medium text-foreground">
              Special Requirements
            </Label>
            <Textarea
              id="specialRequirements"
              placeholder="Any specific technologies, integrations, or special requirements?"
              className="mt-1 min-h-[100px] resize-none"
              onFocus={() => handleFieldFocus('specialRequirements')}
              {...register('specialRequirements')}
            />
          </div>
        </div>

        {/* Additional Services */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Additional Services</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <Label className="text-sm font-medium text-foreground">
                  I have existing branding/logo
                </Label>
                <p className="text-sm text-muted-foreground">
                  You already have brand assets we can use
                </p>
              </div>
              <Switch
                checked={watchedFields.hasExistingBranding || false}
                onCheckedChange={(checked) => setValue('hasExistingBranding', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <Label className="text-sm font-medium text-foreground">
                  I need hosting services
                </Label>
                <p className="text-sm text-muted-foreground">
                  Web hosting and domain management
                </p>
              </div>
              <Switch
                checked={watchedFields.needsHosting || false}
                onCheckedChange={(checked) => setValue('needsHosting', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <Label className="text-sm font-medium text-foreground">
                  I need ongoing maintenance
                </Label>
                <p className="text-sm text-muted-foreground">
                  Regular updates, backups, and support
                </p>
              </div>
              <Switch
                checked={watchedFields.needsMaintenance || false}
                onCheckedChange={(checked) => setValue('needsMaintenance', checked)}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-semibold text-base min-h-[48px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Preparing Your Quote..." : "Request Detailed Quote"}
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center text-sm text-muted-foreground">
          <p>We'll review your requirements and send a detailed proposal within 24 hours.</p>
          <p className="mt-1">Complex projects may require a brief consultation call.</p>
        </div>
      </form>
    </FormPageLayout>
  );
}