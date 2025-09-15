import { z } from 'zod';

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[\d\s\-\(\)]{10,20}$/.test(val), {
      message: 'Please enter a valid phone number'
    }),
  
  budget: z.string()
    .min(1, 'Please select a budget range'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),

  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
});

// Custom Quote Form Schema
export const customQuoteSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[\d\s\-\(\)]{10,20}$/.test(val), {
      message: 'Please enter a valid phone number'
    }),
  
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  
  projectType: z.string()
    .min(1, 'Please select a project type'),
  
  budgetRange: z.string()
    .min(1, 'Please select a budget range'),
  
  timeline: z.string()
    .min(1, 'Please select a timeline'),
  
  projectDescription: z.string()
    .min(20, 'Project description must be at least 20 characters')
    .max(3000, 'Project description must be less than 3000 characters'),
  
  specialRequirements: z.string()
    .max(1000, 'Special requirements must be less than 1000 characters')
    .optional(),
  
  hasExistingBranding: z.boolean().optional(),
  needsHosting: z.boolean().optional(),
  needsMaintenance: z.boolean().optional()
});

// Booking Form Schema
export const bookingFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  phone: z.string()
    .min(10, 'Please enter your phone number')
    .regex(/^[\+]?[\d\s\-\(\)]{10,20}$/, 'Please enter a valid phone number'),
  
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  
  serviceType: z.string()
    .min(1, 'Please select a service type'),
  
  preferredDate: z.string()
    .min(1, 'Please select a preferred date'),
  
  preferredTime: z.string()
    .min(1, 'Please select a preferred time'),
  
  meetingType: z.enum(['video', 'phone', 'in-person'], {
    required_error: 'Please select a meeting type'
  }),
  
  message: z.string()
    .min(10, 'Please provide more details about your project')
    .max(1000, 'Message must be less than 1000 characters')
});

// Consultation Form Schema
export const consultationFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[\d\s\-\(\)]{10,20}$/.test(val), {
      message: 'Please enter a valid phone number'
    }),
  
  businessType: z.string()
    .min(1, 'Please select your business type'),
  
  currentWebsite: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  
  goals: z.array(z.string())
    .min(1, 'Please select at least one goal'),
  
  timeline: z.string()
    .min(1, 'Please select a timeline'),
  
  additionalInfo: z.string()
    .max(1000, 'Additional information must be less than 1000 characters')
    .optional()
});

// Form data types
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CustomQuoteData = z.infer<typeof customQuoteSchema>;
export type BookingFormData = z.infer<typeof bookingFormSchema>;
export type ConsultationFormData = z.infer<typeof consultationFormSchema>;

// Form validation utility
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): { 
  success: boolean; 
  data?: T; 
  errors?: string[] 
} => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => err.message);
      return { success: false, errors };
    }
    return { success: false, errors: ['Validation failed'] };
  }
};