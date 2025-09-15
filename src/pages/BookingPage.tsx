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
import { bookingFormSchema, type BookingFormData, validateForm } from '@/schemas/formSchemas';
import { useFormAnalytics } from '@/hooks/useFormAnalytics';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const serviceTypes = [
  'Website Development',
  'E-commerce Store',
  'Web Application',
  'Mobile App',
  'SEO Consultation',
  'Website Redesign',
  'Technical Audit',
  'General Consultation'
];

const meetingTypes = [
  { value: 'video', label: 'Video Call (Zoom/Teams)' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'in-person', label: 'In-Person Meeting' }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

// Generate next 30 days for date selection
const generateDateOptions = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip weekends for business meetings
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-GB', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      });
    }
  }
  
  return dates;
};

export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const { toast } = useToast();
  const { trackFieldFocus, trackError, trackSubmission, trackSuccess } = useFormAnalytics('booking');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema)
  });

  const dateOptions = generateDateOptions();

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setFormErrors([]);

    try {
      // Validate form data
      const validation = validateForm(bookingFormSchema, data);
      if (!validation.success) {
        setFormErrors(validation.errors || []);
        validation.errors?.forEach(error => {
          trackError('validation_error', error);
        });
        return;
      }

      const submissionTime = trackSubmission();

      // Submit to work_requests table as a booking request
      const { error: dbError } = await supabase
        .from('work_requests')
        .insert([{
          customer_id: 'temp-' + Date.now(), // Temp ID for anonymous requests
          title: `Booking Request - ${data.serviceType}`,
          description: `Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\nPhone: ${data.phone.trim()}\nCompany: ${data.company || 'Not provided'}\nService: ${data.serviceType}\nPreferred Date: ${data.preferredDate}\nPreferred Time: ${data.preferredTime}\nMeeting Type: ${data.meetingType}\nMessage: ${data.message.trim()}`,
          status: 'pending'
        }]);

      if (dbError) throw dbError;

      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'booking_request',
          data: {
            name: data.name.trim(),
            email: data.email.trim(),
            phone: data.phone.trim(),
            serviceType: data.serviceType,
            preferredDate: data.preferredDate,
            preferredTime: data.preferredTime,
            meetingType: data.meetingType,
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
      navigate(`/thank-you?ref=booking&returnTo=${encodeURIComponent(returnTo)}`);

    } catch (error) {
      console.error('Error submitting booking:', error);
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
      title="Book Your Consultation"
      subtitle="Schedule a meeting with our team to discuss your project requirements and get expert advice."
      formType="booking"
      errors={getFormErrors()}
      isSubmitting={isSubmitting}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                Phone Number *
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
                placeholder="Your company (optional)"
                className="mt-1"
                onFocus={() => handleFieldFocus('company')}
                {...register('company')}
              />
            </div>
          </div>
        </div>

        {/* Service & Schedule */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Service & Schedule</h3>
          
          <div>
            <Label htmlFor="serviceType" className="text-sm font-medium text-foreground">
              Service Type *
            </Label>
            <Select onValueChange={(value) => setValue('serviceType', value)} required>
              <SelectTrigger className="mt-1" onFocus={() => handleFieldFocus('serviceType')}>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredDate" className="text-sm font-medium text-foreground">
                Preferred Date *
              </Label>
              <Select onValueChange={(value) => setValue('preferredDate', value)} required>
                <SelectTrigger className="mt-1" onFocus={() => handleFieldFocus('preferredDate')}>
                  <SelectValue placeholder="Select preferred date" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {dateOptions.map((date) => (
                    <SelectItem key={date.value} value={date.value}>
                      {date.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="preferredTime" className="text-sm font-medium text-foreground">
                Preferred Time *
              </Label>
              <Select onValueChange={(value) => setValue('preferredTime', value)} required>
                <SelectTrigger className="mt-1" onFocus={() => handleFieldFocus('preferredTime')}>
                  <SelectValue placeholder="Select preferred time" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="meetingType" className="text-sm font-medium text-foreground">
              Meeting Type *
            </Label>
            <Select onValueChange={(value) => setValue('meetingType', value as 'video' | 'phone' | 'in-person')} required>
              <SelectTrigger className="mt-1" onFocus={() => handleFieldFocus('meetingType')}>
                <SelectValue placeholder="Select meeting type" />
              </SelectTrigger>
              <SelectContent>
                {meetingTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Project Details</h3>
          
          <div>
            <Label htmlFor="message" className="text-sm font-medium text-foreground">
              Tell us about your project *
            </Label>
            <Textarea
              id="message"
              placeholder="Describe your project, goals, and what you'd like to discuss during the consultation..."
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
            {isSubmitting ? "Booking Your Consultation..." : "Book My Consultation"}
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center text-sm text-muted-foreground">
          <p>We'll confirm your appointment within 2 hours and send calendar invites.</p>
          <p className="mt-1">All consultations are completely free with no obligations.</p>
        </div>
      </form>
    </FormPageLayout>
  );
}