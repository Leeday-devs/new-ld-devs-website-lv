import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FormPageLayout } from '@/components/FormPageLayout';
import { consultationFormSchema, type ConsultationFormData, validateForm } from '@/schemas/formSchemas';
import { useFormAnalytics } from '@/hooks/useFormAnalytics';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const businessTypes = [
  'Small Business',
  'Startup',
  'E-commerce',
  'Professional Services',
  'Healthcare',
  'Education',
  'Non-profit',
  'Restaurant/Food',
  'Real Estate',
  'Fitness/Wellness',
  'Creative Agency',
  'Technology',
  'Other'
];

const projectGoals = [
  'Increase online presence',
  'Generate more leads',
  'Improve SEO rankings',
  'Sell products online',
  'Showcase portfolio',
  'Build brand awareness',
  'Streamline operations',
  'Mobile optimization',
  'Website redesign',
  'Technical improvements'
];

const timelines = [
  'Immediate (ASAP)',
  'Within 1 month',
  '1-3 months',
  '3-6 months',
  '6+ months',
  'Just exploring options'
];

export default function ConsultationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const { toast } = useToast();
  const { trackFieldFocus, trackError, trackSubmission, trackSuccess } = useFormAnalytics('consultation');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      goals: []
    }
  });

  const handleGoalChange = (goal: string, checked: boolean) => {
    let newGoals: string[];
    if (checked) {
      newGoals = [...selectedGoals, goal];
    } else {
      newGoals = selectedGoals.filter(g => g !== goal);
    }
    setSelectedGoals(newGoals);
    setValue('goals', newGoals);
  };

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    setFormErrors([]);

    try {
      // Validate form data
      const validation = validateForm(consultationFormSchema, data);
      if (!validation.success) {
        setFormErrors(validation.errors || []);
        validation.errors?.forEach(error => {
          trackError('validation_error', error);
        });
        return;
      }

      const submissionTime = trackSubmission();

      // Submit to work_requests table as a consultation request
      const { error: dbError } = await supabase
        .from('work_requests')
        .insert([{
          customer_id: 'temp-' + Date.now(), // Temp ID for anonymous requests
          title: `Free Consultation - ${data.businessType}`,
          description: `Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\nPhone: ${data.phone || 'Not provided'}\nBusiness Type: ${data.businessType}\nCurrent Website: ${data.currentWebsite || 'None'}\nGoals: ${data.goals.join(', ')}\nTimeline: ${data.timeline}\nAdditional Info: ${data.additionalInfo || 'None provided'}`,
          status: 'pending'
        }]);

      if (dbError) throw dbError;

      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'consultation_request',
          data: {
            name: data.name.trim(),
            email: data.email.trim(),
            businessType: data.businessType,
            goals: data.goals.join(', '),
            timeline: data.timeline,
            currentWebsite: data.currentWebsite || 'None'
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
      }

      trackSuccess();

      // Redirect to thank you page
      const returnTo = searchParams.get('returnTo') || '/';
      navigate(`/thank-you?ref=consultation&returnTo=${encodeURIComponent(returnTo)}`);

    } catch (error) {
      console.error('Error submitting consultation request:', error);
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
      title="Free Website Consultation"
      subtitle="Get expert advice on your website project. No strings attached, no sales pitch - just valuable insights tailored to your business."
      formType="consultation"
      errors={getFormErrors()}
      isSubmitting={isSubmitting}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Tell us about yourself</h3>
          
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
                placeholder="+44 123 456 7890 (optional)"
                className="mt-1"
                onFocus={() => handleFieldFocus('phone')}
                {...register('phone')}
              />
            </div>

            <div>
              <Label htmlFor="businessType" className="text-sm font-medium text-foreground">
                Business Type *
              </Label>
              <Select onValueChange={(value) => setValue('businessType', value)} required>
                <SelectTrigger className="mt-1" onFocus={() => handleFieldFocus('businessType')}>
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="currentWebsite" className="text-sm font-medium text-foreground">
              Current Website URL
            </Label>
            <Input
              id="currentWebsite"
              type="url"
              placeholder="https://yourwebsite.com (if you have one)"
              className="mt-1"
              onFocus={() => handleFieldFocus('currentWebsite')}
              {...register('currentWebsite')}
            />
          </div>
        </div>

        {/* Project Goals */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">What are your main goals? *</h3>
          <p className="text-sm text-muted-foreground">Select all that apply</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectGoals.map((goal) => (
              <div key={goal} className="flex items-center space-x-2">
                <Checkbox
                  id={goal}
                  checked={selectedGoals.includes(goal)}
                  onCheckedChange={(checked) => handleGoalChange(goal, checked as boolean)}
                />
                <Label
                  htmlFor={goal}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {goal}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Timeline</h3>
          
          <div>
            <Label htmlFor="timeline" className="text-sm font-medium text-foreground">
              When would you like to start? *
            </Label>
            <Select onValueChange={(value) => setValue('timeline', value)} required>
              <SelectTrigger className="mt-1" onFocus={() => handleFieldFocus('timeline')}>
                <SelectValue placeholder="Select your timeline" />
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

        {/* Additional Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
          
          <div>
            <Label htmlFor="additionalInfo" className="text-sm font-medium text-foreground">
              Anything else you'd like us to know?
            </Label>
            <Textarea
              id="additionalInfo"
              placeholder="Any specific challenges, requirements, or questions you have..."
              className="mt-1 min-h-[100px] resize-none"
              onFocus={() => handleFieldFocus('additionalInfo')}
              {...register('additionalInfo')}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-semibold text-base min-h-[48px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Requesting Your Consultation..." : "Get My Free Consultation"}
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center text-sm text-muted-foreground">
          <p>🎯 Completely free - no hidden costs or obligations</p>
          <p>⚡ Expert advice tailored to your specific needs</p>
          <p>🤝 We'll contact you within 2 hours to schedule your consultation</p>
        </div>
      </form>
    </FormPageLayout>
  );
}