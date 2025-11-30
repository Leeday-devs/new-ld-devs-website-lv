import {
  Globe,
  Smartphone,
  Search,
  Mail,
  MessageCircle,
  ShoppingCart,
  Calendar,
  Headset,
  Zap,
  Palette,
  Code,
  Crown,
  Brain,
  Server,
  Monitor
} from "lucide-react";
import { EnhancedPackage } from "@/types/pricing";

// Website Packages - Benefit-focused language for small businesses
export const websitePackages: EnhancedPackage[] = [
  {
    id: "website-starter",
    name: "Starter",
    tagline: "Perfect for getting online fast",
    description: "Get online fast",
    icon: Code,
    buildPrice: "£500",
    monthlyPrice: "£40/mo",
    dailyCost: "About £2/day",
    paymentLink: "https://buy.stripe.com/aFa00jf1ceRsb9kceV0Ny08",
    depositAmount: 5000,
    benefits: [
      {
        title: "Everything you need to get found online",
        description: "Home, About, Services, Contact + 1 custom page",
        icon: Globe,
        tooltip: "We'll create a professional 5-page website with all the essential pages small businesses need"
      },
      {
        title: "Looks perfect on phones & tablets",
        description: "No pinching or zooming needed",
        icon: Smartphone,
        tooltip: "Your website will automatically adjust to look great on any device - phones, tablets, and computers"
      },
      {
        title: "Let customers reach you 24/7",
        description: "Never miss a lead with our contact form",
        icon: Mail,
        tooltip: "Get instant email notifications when customers contact you through your website"
      },
      {
        title: "Get found on Google",
        description: "Show up when people search for your services",
        icon: Search,
        tooltip: "We'll set up basic SEO so your website appears in Google search results for your business type and location"
      }
    ],
    bestFor: ["Plumbers", "Electricians", "Local Services", "Small Trades"],
    demoLink: "/demo/plumber-pro",
    screenshots: [],
    roiExample: {
      investment: 980, // £500 + (£40 x 12)
      outcome: "Just 1 customer per month pays for this",
      breakeven: "Breaks even with half a customer per month"
    }
  },
  {
    id: "website-growth",
    name: "Growth",
    tagline: "Everything to grow your business",
    description: "Everything to grow",
    icon: Crown,
    buildPrice: "£1,250",
    monthlyPrice: "£55/mo",
    dailyCost: "About £3.50/day",
    paymentLink: "https://buy.stripe.com/7sY14ndX86kW0uG5Qx0Ny09",
    depositAmount: 12500,
    popular: true,
    benefits: [
      {
        title: "More pages for your growing business",
        description: "Up to 10 pages - room to showcase everything",
        icon: Globe,
        tooltip: "Perfect for businesses that need service pages, team bios, project galleries, and more"
      },
      {
        title: "Write articles that bring customers from Google",
        description: "Blog system that helps you rank higher",
        icon: Search,
        tooltip: "Regularly publish helpful articles and watch your Google rankings improve. We'll teach you how!"
      },
      {
        title: "Answer questions instantly, even while you sleep",
        description: "AI chat assistant for your customers",
        icon: MessageCircle,
        tooltip: "Our AI chatbot answers common questions 24/7, so you never miss a potential customer"
      },
      {
        title: "Get help within 4 hours when you need it",
        description: "Priority support for peace of mind",
        icon: Headset,
        tooltip: "When something goes wrong, we'll fix it fast - usually within the same business day"
      }
    ],
    bestFor: ["Salons", "Barbers", "Restaurants", "Professional Services"],
    demoLink: "/demo/modern-barber",
    screenshots: [],
    roiExample: {
      investment: 1910, // £1,250 + (£55 x 12)
      outcome: "2-3 customers per month and this pays for itself",
      breakeven: "Breaks even with 1.5 customers per month"
    },
    testimonial: {
      quote: "The blog feature brought us 5 new customers in the first month. Best investment we made!",
      author: "Sarah Jenkins",
      business: "Jenkins Hair Studio",
      industry: "Beauty"
    }
  },
  {
    id: "website-premium",
    name: "Premium",
    tagline: "The complete package for serious growth",
    description: "The full package",
    icon: ShoppingCart,
    buildPrice: "£2,250",
    monthlyPrice: "£75/mo",
    dailyCost: "About £5/day",
    paymentLink: "https://buy.stripe.com/00wcN5f1cfVw7X83Ip0Ny0a",
    depositAmount: 22500,
    benefits: [
      {
        title: "Unlimited pages - no restrictions",
        description: "Build as big as your business needs",
        icon: Globe,
        tooltip: "Add as many pages as you want - we won't charge extra"
      },
      {
        title: "Take payments or bookings directly on your website",
        description: "Online shop or appointment booking system",
        icon: Calendar,
        tooltip: "Sell products online or let customers book appointments 24/7. We integrate with Stripe for payments."
      },
      {
        title: "We fix issues within hours, not days",
        description: "Same-day priority support",
        icon: Zap,
        tooltip: "Critical issues get fixed the same day, usually within hours. You're our top priority."
      },
      {
        title: "Your website will look unique",
        description: "Custom design - not a template",
        icon: Palette,
        tooltip: "We'll create a completely custom design that matches your brand. No cookie-cutter templates."
      }
    ],
    bestFor: ["E-commerce Shops", "Service Bookings", "Established Businesses"],
    demoLink: "/demo/restaurant-deluxe",
    screenshots: [],
    roiExample: {
      investment: 3150, // £2,250 + (£75 x 12)
      outcome: "Taking payments online? This pays for itself quickly",
      breakeven: "Breaks even with 2-3 customers per month"
    },
    testimonial: {
      quote: "Online booking changed everything. We went from 60% capacity to fully booked in 3 months.",
      author: "Marcus Thompson",
      business: "Thompson Auto Repair",
      industry: "Automotive"
    }
  }
];

// AI/Automation Packages
export const automationPackages: EnhancedPackage[] = [
  {
    id: "automation-starter",
    name: "Starter",
    tagline: "Automate one repetitive task",
    description: "One automation",
    icon: Brain,
    buildPrice: "£350",
    monthlyPrice: "£75/mo",
    depositAmount: 3500,
    benefits: [
      {
        title: "Automate 1 repetitive task",
        description: "Save hours every week",
        icon: Brain,
        tooltip: "We'll identify and automate your most time-consuming task"
      },
      {
        title: "Free setup support",
        description: "We handle all the technical work",
        icon: Headset,
        tooltip: "Don't worry about the tech - we'll set everything up for you"
      },
      {
        title: "We host it for you",
        description: "No extra hosting costs",
        icon: Server,
        tooltip: "Your automation runs on our servers - no additional fees"
      }
    ],
    bestFor: ["Email automation", "Social media posting", "Data entry"],
    roiExample: {
      investment: 1250, // £350 + (£75 x 12)
      outcome: "Save 5 hours per week = worth £1,200+/year",
      breakeven: "Pays for itself in saved time"
    }
  },
  {
    id: "automation-business",
    name: "Business",
    tagline: "Multiple automations working together",
    description: "Multiple tools",
    icon: Server,
    buildPrice: "£750",
    monthlyPrice: "£150/mo",
    popular: true,
    depositAmount: 7500,
    benefits: [
      {
        title: "3 automations working together",
        description: "Complete workflow automation",
        icon: Brain,
        tooltip: "Automate entire workflows - from customer inquiry to follow-up"
      },
      {
        title: "Control dashboard",
        description: "See everything in one place",
        icon: Monitor,
        tooltip: "Monitor and control all your automations from a simple dashboard"
      },
      {
        title: "Priority support",
        description: "Fast help when you need it",
        icon: Headset,
        tooltip: "Get priority support within 4 hours during business hours"
      }
    ],
    bestFor: ["Lead generation", "Customer onboarding", "Marketing campaigns"],
    roiExample: {
      investment: 2550, // £750 + (£150 x 12)
      outcome: "Save 15+ hours per week",
      breakeven: "Usually pays for itself in 2-3 months"
    }
  },
  {
    id: "automation-premium",
    name: "Premium",
    tagline: "Full business automation",
    description: "Full automation",
    icon: Crown,
    buildPrice: "£1,500",
    monthlyPrice: "£250/mo",
    depositAmount: 15000,
    benefits: [
      {
        title: "Unlimited automations",
        description: "Automate everything possible",
        icon: Brain,
        tooltip: "No limits - we'll automate as many processes as make sense for your business"
      },
      {
        title: "Custom dashboard",
        description: "Built specifically for your business",
        icon: Monitor,
        tooltip: "A completely custom control panel designed for your workflows"
      },
      {
        title: "Dedicated support team",
        description: "Same-day priority help",
        icon: Headset,
        tooltip: "Direct access to your dedicated support team for same-day fixes"
      },
      {
        title: "Quarterly strategy reviews",
        description: "We help you optimize continuously",
        icon: Zap,
        tooltip: "Every 3 months we review your automations and suggest improvements"
      }
    ],
    bestFor: ["Large operations", "Complex workflows", "High-volume businesses"],
    roiExample: {
      investment: 4500, // £1,500 + (£250 x 12)
      outcome: "Save 30+ hours per week",
      breakeven: "Pays for itself in months for busy businesses"
    }
  }
];

// Mobile App Packages
export const appPackages: EnhancedPackage[] = [
  {
    id: "app-starter",
    name: "Starter",
    tagline: "Simple booking or information app",
    description: "Simple app",
    icon: Smartphone,
    buildPrice: "£1,500",
    monthlyPrice: "£95/mo",
    depositAmount: 15000,
    benefits: [
      {
        title: "Booking or info app",
        description: "Perfect for appointments or catalogs",
        icon: Calendar,
        tooltip: "Let customers book appointments or browse your services on their phone"
      },
      {
        title: "App Store ready",
        description: "We handle all the submission process",
        icon: Smartphone,
        tooltip: "We'll get your app approved and published on the App Store and Google Play"
      },
      {
        title: "Ongoing updates included",
        description: "Keep your app current",
        icon: Zap,
        tooltip: "Regular updates to keep your app working smoothly on new phone versions"
      }
    ],
    bestFor: ["Salons", "Spas", "Service businesses", "Local businesses"],
    roiExample: {
      investment: 2640, // £1,500 + (£95 x 12)
      outcome: "Customers love the convenience",
      breakeven: "Pay for itself with increased bookings"
    }
  },
  {
    id: "app-business",
    name: "Business",
    tagline: "Full-featured customer app",
    description: "Full-featured",
    icon: Crown,
    buildPrice: "£3,000",
    monthlyPrice: "£150/mo",
    popular: true,
    depositAmount: 30000,
    benefits: [
      {
        title: "User accounts",
        description: "Customers create profiles and save preferences",
        icon: Smartphone,
        tooltip: "Let customers create accounts to save their info and booking history"
      },
      {
        title: "Admin dashboard",
        description: "Manage everything from your computer",
        icon: Monitor,
        tooltip: "Control your app, view bookings, and manage customers from a web dashboard"
      },
      {
        title: "Tool integrations",
        description: "Connect to your existing software",
        icon: Server,
        tooltip: "We'll integrate with your CRM, payment system, or other business tools"
      },
      {
        title: "Priority support",
        description: "Fast fixes when needed",
        icon: Headset,
        tooltip: "Get help within 4 hours during business hours"
      }
    ],
    bestFor: ["Multi-location businesses", "Membership programs", "Loyalty schemes"],
    roiExample: {
      investment: 4800, // £3,000 + (£150 x 12)
      outcome: "Increase customer retention significantly",
      breakeven: "Worth it for businesses with 50+ regular customers"
    }
  },
  {
    id: "app-premium",
    name: "Premium",
    tagline: "Completely custom mobile solution",
    description: "Fully custom",
    icon: Server,
    buildPrice: "from £5,000",
    monthlyPrice: "£250/mo",
    depositAmount: 50000,
    benefits: [
      {
        title: "Completely custom built",
        description: "Any feature you can imagine",
        icon: Palette,
        tooltip: "We'll build exactly what you need - no limitations"
      },
      {
        title: "AI features",
        description: "Smart recommendations and automation",
        icon: Brain,
        tooltip: "Integrate AI for personalized experiences and smart automation"
      },
      {
        title: "Dedicated development team",
        description: "Your own dev team on call",
        icon: Headset,
        tooltip: "A dedicated team works on your app with same-day support"
      }
    ],
    bestFor: ["Complex requirements", "Enterprise features", "Unique businesses"],
    roiExample: {
      investment: 8000, // £5,000 + (£250 x 12)
      outcome: "For businesses with specific needs",
      breakeven: "Custom pricing based on your requirements"
    }
  }
];

// Hosting Packages
export const hostingPackages: EnhancedPackage[] = [
  {
    id: "hosting-starter",
    name: "Starter",
    tagline: "Basic hosting for small sites",
    description: "Basic hosting",
    icon: Code,
    buildPrice: "£40/mo",
    monthlyPrice: "",
    depositAmount: 4000,
    benefits: [
      {
        title: "1 professional email address",
        description: "yourname@yourbusiness.com",
        icon: Mail,
        tooltip: "Look professional with an email at your own domain name"
      },
      {
        title: "Daily backups",
        description: "Never lose your data",
        icon: Server,
        tooltip: "We back up your website every day automatically"
      },
      {
        title: "Security updates",
        description: "Stay protected automatically",
        icon: Zap,
        tooltip: "We apply security patches automatically - you don't have to think about it"
      },
      {
        title: "Email support",
        description: "Help when you need it",
        icon: Headset,
        tooltip: "Get help via email within 24-48 hours"
      }
    ],
    bestFor: ["Small websites", "Startups", "Solo businesses"],
    dailyCost: "About £1.30/day"
  },
  {
    id: "hosting-business",
    name: "Business",
    tagline: "Priority support & monitoring",
    description: "Priority support",
    icon: Server,
    buildPrice: "£65/mo",
    monthlyPrice: "",
    popular: true,
    depositAmount: 6500,
    benefits: [
      {
        title: "3 professional email addresses",
        description: "For you and your team",
        icon: Mail,
        tooltip: "Get multiple email addresses at your domain"
      },
      {
        title: "Monthly performance reports",
        description: "Know how your site is doing",
        icon: Monitor,
        tooltip: "We'll send you easy-to-understand reports on your website's performance"
      },
      {
        title: "Fast support",
        description: "Priority response times",
        icon: Headset,
        tooltip: "Get help within 4-8 hours during business hours"
      },
      {
        title: "Monitoring",
        description: "We watch for problems 24/7",
        icon: Zap,
        tooltip: "We monitor your website and alert you if anything goes wrong"
      }
    ],
    bestFor: ["Growing businesses", "Professional services", "Most businesses"],
    dailyCost: "About £2.15/day"
  },
  {
    id: "hosting-premium",
    name: "Premium",
    tagline: "24/7 monitoring & priority",
    description: "24/7 support",
    icon: Crown,
    buildPrice: "£95/mo",
    monthlyPrice: "",
    depositAmount: 9500,
    benefits: [
      {
        title: "Unlimited email addresses",
        description: "As many as you need",
        icon: Mail,
        tooltip: "Create email addresses for everyone on your team at no extra cost"
      },
      {
        title: "Smart monitoring",
        description: "AI-powered issue detection",
        icon: Brain,
        tooltip: "Our AI watches for problems and often fixes them before you even notice"
      },
      {
        title: "Marketing insights",
        description: "Understand your visitors",
        icon: Search,
        tooltip: "Get detailed reports on who visits your site and how they behave"
      },
      {
        title: "24/7 priority support",
        description: "Help anytime you need it",
        icon: Headset,
        tooltip: "Same-day fixes, even on weekends and holidays"
      }
    ],
    bestFor: ["E-commerce", "High-traffic sites", "Mission-critical websites"],
    dailyCost: "About £3.15/day"
  }
];
