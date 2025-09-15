import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormPageLayout } from '@/components/FormPageLayout';
import { contactFormSchema, type ContactFormData, validateForm } from '@/schemas/formSchemas';
import { useFormAnalytics } from '@/hooks/useFormAnalytics';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const budgetOptions = [
  { value: 'under-5k', label: 'Under £5,000' },
  { value: '5k-15k', label: '£5,000 - £15,000' },
  { value: '15k-30k', label: '£15,000 - £30,000' },
  { value: 'over-30k', label: 'Over £30,000' },
  { value: 'not-sure', label: 'Not sure yet' }
];

export default function ContactPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const { toast } = useToast();
  const { trackFieldFocus, trackError, trackSubmission, trackSuccess } = useFormAnalytics('contact');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    const startTime = Date.now();
    setIsSubmitting(true);
    setFormErrors([]);

    try {
      // Validate form data
      const validation = validateForm(contactFormSchema, data);
      if (!validation.success) {
        setFormErrors(validation.errors || []);
        validation.errors?.forEach(error => {
          trackError('validation_error', error);
        });
        return;
      }

      const submissionTime = trackSubmission();

      // Submit to work_requests table
      const { error: dbError } = await supabase
        .from('work_requests')
        .insert([{
          customer_id: 'temp-' + Date.now(), // Temp ID for anonymous requests
          title: `Contact Request - ${data.budget}`,
          description: `Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\nPhone: ${data.phone || 'Not provided'}\nCompany: ${data.company || 'Not provided'}\nBudget: ${data.budget}\nMessage: ${data.message.trim()}`,
          status: 'pending'
        }]);

      if (dbError) throw dbError;

      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'contact_request',
          data: {
            name: data.name.trim(),
            email: data.email.trim(),
            phone: data.phone || 'Not provided',
            company: data.company || 'Not provided',
            budget: data.budget,
            message: data.message.trim().substring(0, 200) + (data.message.trim().length > 200 ? '...' : '')
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
      }

      trackSuccess();

      // Redirect to thank you page
      const returnTo = searchParams.get('returnTo') || '/';
      navigate(`/thank-you?ref=contact&returnTo=${encodeURIComponent(returnTo)}`);

    } catch (error) {
      console.error('Error submitting contact form:', error);
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
    if (errors.name) errorList.push(errors.name.message || 'Name is required');
    if (errors.email) errorList.push(errors.email.message || 'Valid email is required');
    if (errors.phone) errorList.push(errors.phone.message || 'Valid phone number is required');
    if (errors.budget) errorList.push(errors.budget.message || 'Budget range is required');
    if (errors.message) errorList.push(errors.message.message || 'Message is required');
    if (errors.company) errorList.push(errors.company.message || 'Company name is invalid');
    return [...errorList, ...formErrors];
  };

  return (
    <FormPageLayout
      title="Get Your Free Website Quote"
      subtitle="Tell us about your project and we'll get back to you within 24 hours with a personalized quote."
      formType="contact"
      errors={getFormErrors()}
      isSubmitting={isSubmitting}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
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

        {/* Project Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Project Details</h3>
          
          <div>
            <Label htmlFor="budget" className="text-sm font-medium text-foreground">
              Budget Range *
            </Label>
            <Select onValueChange={(value) => setValue('budget', value)} required>
              <SelectTrigger className="mt-1" onFocus={() => handleFieldFocus('budget')}>
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium text-foreground">
              Project Details *
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project, goals, and any specific requirements..."
              className="mt-1 min-h-[120px] resize-none"
              onFocus={() => handleFieldFocus('message')}
              {...register('message')}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Minimum 10 characters required
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-semibold text-base min-h-[48px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending Your Request..." : "Get My Free Quote"}
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center text-sm text-muted-foreground">
          <p>We typically respond within 2 hours during business hours.</p>
          <p className="mt-1">Need faster response? Call us at +44 758 626 6007</p>
        </div>
      </form>
    </FormPageLayout>
  );
}