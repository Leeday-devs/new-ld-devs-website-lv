import { LucideIcon } from "lucide-react";

export interface Benefit {
  title: string; // "Get found on Google"
  description: string; // "Show up when customers search for your services"
  icon: LucideIcon;
  tooltip?: string; // Detailed explanation
}

export interface Testimonial {
  quote: string;
  author: string;
  business: string;
  industry: string;
  photo?: string;
}

export interface ROIExample {
  investment: number; // Total first year cost
  outcome: string; // "Brings 2 customers/month = £1,000 revenue"
  breakeven: string; // "Pays for itself with 0.5 customers/month"
}

export interface EnhancedPackage {
  id: string;
  name: string;
  tagline: string; // "Perfect for getting online fast"
  description?: string; // Short description

  // Pricing
  buildPrice: string | number;
  monthlyPrice: string | number;
  dailyCost?: string; // "About £2/day"

  // Stripe integration
  paymentLink?: string;
  depositAmount?: number;

  // Display
  icon: LucideIcon;
  popular?: boolean;

  // Benefits (not features!)
  benefits: Benefit[];

  // Visual proof
  screenshots?: string[];
  demoLink?: string;

  // Social proof
  testimonial?: Testimonial;

  // ROI justification
  roiExample?: ROIExample;

  // Who it's for
  bestFor?: string[]; // ["Plumbers", "Electricians", "Local services"]

  // Legacy features (for backward compatibility during transition)
  features?: string[];
  ctaText?: string;
}

export interface PricingCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  packages: EnhancedPackage[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  text: string;
  weight: {
    starter: number;
    growth: number;
    premium: number;
  };
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
  weight: {
    starter: number;
    growth: number;
    premium: number;
  };
}

export interface QuizResults {
  recommended: 'starter' | 'growth' | 'premium';
  reasoning: string[];
  score: {
    starter: number;
    growth: number;
    premium: number;
  };
  alternatives?: string[];
}

export interface ConsultationRequest {
  fullName: string;
  email: string;
  phone: string;
  businessType: string;
  websiteGoal: string;
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'flexible';
  urgency: 'this_week' | 'next_week' | 'flexible';
  currentWebsite?: string;
  specificQuestions?: string;
  packageInterested?: string;
}
