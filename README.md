# LD Devs - Professional Web Development Services

A comprehensive SaaS platform for Lee Day Devs, a London-based web development agency specializing in premium web design, e-commerce solutions, and AI automation.

## 🚀 Project Overview

This is a full-featured platform combining:
- **Marketing Website** - Showcasing services and portfolio
- **Customer Dashboard** - Client portal for project management
- **Admin Control Panel** - Business operations management
- **Blog & Knowledge Hub** - Content management system
- **Template Showcase** - 8 industry-specific website demos
- **E-commerce Integration** - Payment processing and checkout

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3.1** - UI framework
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.1** - Ultra-fast build tool
- **React Router 7.9.1** - Client-side routing

### Styling & UI
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **shadcn/ui** - High-quality accessible components
- **Radix UI** - Component primitives
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - PostgreSQL database + authentication
- **Supabase JS SDK 2.57.4** - Client integration
- **Row-Level Security** - Data protection

### State & Forms
- **TanStack React Query 5.85.5** - Server state management
- **React Hook Form 7.53.0** - Form handling
- **Zod 3.23.8** - Schema validation

### Additional Libraries
- **Recharts** - Analytics & data visualization
- **React Quill** - Rich text editor for blog posts
- **Sonner** - Toast notifications
- **DOMPurify** - XSS protection

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui primitives
│   │   ├── admin/          # Admin dashboard components
│   │   ├── customer/       # Customer dashboard components
│   │   └── blog/           # Blog-specific components
│   ├── pages/              # Route pages
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # Supabase integration
│   ├── utils/              # Utility functions
│   ├── lib/                # Helper libraries
│   └── assets/             # Images and static files
├── public/                 # Public assets
├── supabase/              # Supabase functions & migrations
└── Configuration files
```

## 🎨 Key Features

### Marketing & Sales
- ✅ Mobile-first responsive design
- ✅ SEO optimized with meta tags & schema markup
- ✅ Lead capture modals
- ✅ Contact forms with spam protection
- ✅ Live chat widget integration
- ✅ WhatsApp direct messaging

### Content Management
- ✅ Full blog CRUD operations
- ✅ Rich text editor with media support
- ✅ Knowledge hub articles
- ✅ Auto-generated table of contents
- ✅ Social sharing buttons
- ✅ Reading progress tracking

### E-commerce
- ✅ Product pricing pages
- ✅ Shopping cart & checkout
- ✅ Stripe payment integration
- ✅ Custom quote request system
- ✅ Template checkout flow

### Admin Dashboard
- ✅ Business KPI metrics
- ✅ Revenue analytics & charts
- ✅ Customer management
- ✅ Order tracking
- ✅ Blog post management
- ✅ Email marketing tools
- ✅ Payment reminders system
- ✅ Team management with roles

### Customer Portal
- ✅ Project dashboard
- ✅ Billing history
- ✅ Service management
- ✅ Notification center
- ✅ Account preferences

### Website Templates (8 Demos)
1. Plumber Pro
2. Electrician Expert
3. Modern Barber
4. Restaurant Deluxe
5. Fitness Studio
6. Auto Repair Shop
7. Cleaning Services
8. Pet Grooming

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd new-ld-devs-website-lv

# Install dependencies
npm install
```

### Development

```bash
# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🔐 Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Database Schema

### Key Tables
- `profiles` - User profiles with role management
- `blog_posts` - Blog content and metadata
- `custom_quotes` - Quote requests from customers
- `orders` - E-commerce orders and payments
- `newsletter_subscribers` - Email marketing list
- `notifications` - User notifications

## 🎨 Design System

### Color Palette
- **Primary Orange**: #FF7A00
- **Navy**: #0A192F
- **White**: #FFFFFF
- **Grey Shades**: Multiple levels

### Typography
- **Headers**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Accent**: Cormorant Garamond (serif)

### Responsive Breakpoints
- `xs`: 400px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🔧 Configuration Files

- `vite.config.ts` - Build configuration
- `tailwind.config.ts` - Styling configuration
- `tsconfig.json` - TypeScript settings
- `components.json` - shadcn/ui configuration

## 📱 Mobile Optimization

- Mobile-first design approach
- Touch-friendly UI (48x48px minimum targets)
- Optimized font sizes for readability
- Performance-optimized animations
- Service worker for offline capability

## 🔒 Security Features

- Spam protection on contact forms
- Rate limiting on submissions
- Honeypot fields for bot detection
- XSS protection with DOMPurify
- Supabase Row-Level Security (RLS)
- Secure authentication flow

## 🚢 Deployment

### Build for Production
```bash
npm run build
# Output: dist/ folder
```

### Deploy Options
- **Recommended**: Vercel, Netlify, or Cloudflare Pages
- Static hosting with SPA routing support
- Environment variables configuration required

## 📖 Documentation

For detailed project documentation, see [.claude.md](.claude.md)

## 🤝 Contributing

This is a private project for Lee Day Devs. For questions or issues, contact the development team.

## 📄 License

Proprietary - All rights reserved by Lee Day Devs

## 🔗 Links

- **Project Dashboard**: [Lovable Project](https://lovable.dev/projects/658469cf-c55f-44ae-ac8a-ddb3a67b329f)
- **Live Site**: TBD
- **Support**: Contact Lee Day Devs team

---

**Last Updated**: November 2024
**Status**: Production-ready
