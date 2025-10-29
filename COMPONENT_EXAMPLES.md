# Premium Component Examples & Usage Guide

Quick reference guide for using all new premium components implemented in Phase 1-3.

---

## 1. ScrollRevealSection - Scroll-Triggered Animations

Automatically triggers entrance animations when sections come into view.

### Basic Usage
```tsx
import ScrollRevealSection from '@/components/ScrollRevealSection';

export default function MyPage() {
  return (
    <ScrollRevealSection
      animationType="fade-in-up"
      delay={100}
      duration={600}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold">This content animates in on scroll!</h2>
      <p>It will fade in and slide up when visible.</p>
    </ScrollRevealSection>
  );
}
```

### Animation Types
- `fade-in-up` - Fades in while sliding up (default)
- `fade-in-left` - Fades in from left
- `fade-in-right` - Fades in from right
- `scale-in` - Scales from 0.9 to 1
- `fade-in` - Pure fade without movement

### Props
```typescript
interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'fade-in';
  delay?: number;           // Delay before animation starts (ms)
  duration?: number;        // Animation duration (ms)
}
```

---

## 2. AnimatedCounter - Number Counting Animation

Smoothly animates numbers from 0 to your target value.

### Basic Usage
```tsx
import AnimatedCounter from '@/components/AnimatedCounter';

export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <AnimatedCounter
          endValue={500}
          suffix="+"
          className="text-orange"
        />
        <p className="text-sm text-gray-600 mt-2">Websites Built</p>
      </div>

      <div>
        <AnimatedCounter
          endValue={98}
          suffix="%"
          className="text-orange"
        />
        <p className="text-sm text-gray-600 mt-2">Client Satisfaction</p>
      </div>

      <div>
        <AnimatedCounter
          endValue={10}
          prefix="$"
          suffix="K+"
          decimals={1}
          className="text-orange"
        />
        <p className="text-sm text-gray-600 mt-2">Revenue Generated</p>
      </div>
    </div>
  );
}
```

### Props
```typescript
interface AnimatedCounterProps {
  endValue: number;                    // Number to count to
  duration?: number;                   // Animation duration (default 2000ms)
  prefix?: string;                     // Text before number ($)
  suffix?: string;                     // Text after number (%)
  decimals?: number;                   // Decimal places (default 0)
  className?: string;                  // Custom CSS classes
  triggerOnScroll?: boolean;           // Auto-trigger on scroll (default true)
}
```

---

## 3. GlowButton - Premium CTA Button

Enhanced button with glow effects and smooth animations.

### Basic Usage
```tsx
import GlowButton from '@/components/GlowButton';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <div className="flex gap-4">
      {/* Primary Glow Button */}
      <GlowButton
        variant="primary"
        size="lg"
        glowColor="orange"
        onClick={() => console.log('Clicked!')}
      >
        Start My Project
        <ArrowRight className="h-5 w-5 ml-2" />
      </GlowButton>

      {/* Outline Button */}
      <GlowButton
        variant="outline"
        size="lg"
      >
        Learn More
      </GlowButton>
    </div>
  );
}
```

### Variants
```typescript
variant="primary"    // Gradient background with glow
variant="outline"    // Bordered style
variant="secondary"  // Alternative style
```

### Sizes
```typescript
size="sm"    // Small (px-4 py-2)
size="md"    // Medium (px-6 py-3) - default
size="lg"    // Large (px-8 py-4)
size="xl"    // Extra Large (px-10 py-5)
```

### Glow Colors
```typescript
glowColor="orange"   // Orange glow (default)
glowColor="navy"     // Navy glow
glowColor="white"    // White glow
```

---

## 4. ParallaxImage - Parallax Scrolling Effect

Creates smooth parallax scrolling effect for hero images.

### Basic Usage
```tsx
import ParallaxImage from '@/components/ParallaxImage';

export default function HeroSection() {
  return (
    <div>
      <ParallaxImage
        src="/assets/hero-image.jpg"
        alt="Hero background"
        speed={0.5}
        height="500px"
        className="rounded-xl overflow-hidden"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Your Content Here</h1>
      </div>
    </div>
  );
}
```

### Speed Values
```typescript
speed={0.3}  // Very slow parallax
speed={0.5}  // Half scroll speed (default, recommended)
speed={1.0}  // Normal scroll speed
speed={1.5}  // Faster than scroll
```

### Props
```typescript
interface ParallaxImageProps {
  src: string;                         // Image URL
  alt: string;                         // Alt text
  speed?: number;                      // Parallax speed (0.5)
  height?: string | number;            // Container height ("400px")
  className?: string;                  // Custom CSS
  objectFit?: 'cover' | 'contain' | 'fill';  // Image fit
}
```

---

## 5. PricingComparisonToggle - Feature Comparison Matrix

Interactive pricing comparison table with animated indicators.

### Basic Usage
```tsx
import PricingComparisonToggle from '@/components/PricingComparisonToggle';

export default function PricingSection() {
  const features = [
    { name: 'Up to 5 Pages', included: [true, true, true] },
    { name: 'Blog Setup', included: [false, true, true] },
    { name: 'E-commerce', included: [false, false, true] },
    { name: 'AI Chatbot', included: [false, true, true] },
    { name: 'Priority Support', included: [false, false, true] },
  ];

  return (
    <PricingComparisonToggle
      planNames={['Starter', 'Business Growth', 'Premium Pro']}
      features={features}
      highlightPlanIndex={1}  // Highlight "Business Growth"
    />
  );
}
```

### Feature Object
```typescript
interface PricingFeature {
  name: string;                    // Feature name
  included: boolean[] | 'highlight';  // true/false per plan, or 'highlight'
}
```

---

## 6. InteractiveFAQ - FAQ with Search & Filtering

Advanced FAQ section with real-time search and category filtering.

### Basic Usage
```tsx
import InteractiveFAQ from '@/components/InteractiveFAQ';

export default function FAQPage() {
  const faqItems = [
    {
      id: 'faq-1',
      question: 'How long does a website take to build?',
      answer: 'Most websites are completed within 2-4 weeks, depending on complexity.',
      category: 'Timeline',
    },
    {
      id: 'faq-2',
      question: 'Do you provide ongoing support?',
      answer: 'Yes, all websites include 30 days of free support after launch.',
      category: 'Support',
    },
    {
      id: 'faq-3',
      question: 'What technologies do you use?',
      answer: 'We use React, TypeScript, Node.js, and modern cloud services.',
      category: 'Technical',
    },
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <InteractiveFAQ
        items={faqItems}
        animated={true}
      />
    </div>
  );
}
```

### Features
- 🔍 Real-time search through questions and answers
- 🏷️ Category filtering (auto-detected from items)
- 🎬 Smooth accordion animations
- 📱 Fully responsive design

### FAQ Item Interface
```typescript
interface FAQItem {
  id: string;          // Unique identifier
  question: string;    // Question text
  answer: string;      // Answer text
  category?: string;   // Optional category
}
```

---

## 7. FloatingBadge - Notification Badge

Premium floating notification component for alerts and announcements.

### Basic Usage
```tsx
import FloatingBadge from '@/components/FloatingBadge';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function App() {
  const [showSuccess, setShowSuccess] = useState(true);

  return (
    <>
      {/* Success Notification */}
      {showSuccess && (
        <FloatingBadge
          text="Profile updated successfully!"
          icon={<CheckCircle className="h-5 w-5" />}
          variant="success"
          position="top-right"
          autoDismiss={true}
          dismissTime={4000}
          onDismiss={() => setShowSuccess(false)}
        />
      )}

      {/* Error Notification */}
      <FloatingBadge
        text="An error occurred. Please try again."
        icon={<AlertCircle className="h-5 w-5" />}
        variant="error"
        position="bottom-right"
      />

      {/* Info Notification */}
      <FloatingBadge
        text="New feature available: AI Chat Assistant"
        icon={<Info className="h-5 w-5" />}
        variant="info"
        position="top-left"
        autoDismiss={true}
      />
    </>
  );
}
```

### Variants
```typescript
variant="success"   // Green gradient
variant="info"      // Blue gradient (default)
variant="warning"   // Amber gradient
variant="error"     // Red gradient
```

### Positions
```typescript
position="top-left"      // Top left corner
position="top-right"     // Top right corner (default)
position="bottom-left"   // Bottom left corner
position="bottom-right"  // Bottom right corner
```

### Props
```typescript
interface FloatingBadgeProps {
  text: string;                  // Badge text
  icon?: React.ReactNode;       // Optional icon
  variant?: 'success' | 'info' | 'warning' | 'error';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  autoDismiss?: boolean;        // Auto-hide after time (default false)
  dismissTime?: number;         // Time before auto-dismiss (ms)
  onDismiss?: () => void;       // Callback when dismissed
  className?: string;           // Custom CSS
}
```

---

## Integration Example: Complete Page

Here's how to use multiple components together:

```tsx
import ScrollRevealSection from '@/components/ScrollRevealSection';
import AnimatedCounter from '@/components/AnimatedCounter';
import GlowButton from '@/components/GlowButton';
import ParallaxImage from '@/components/ParallaxImage';
import InteractiveFAQ from '@/components/InteractiveFAQ';

export default function HomePage() {
  return (
    <>
      {/* Hero with Parallax */}
      <section className="relative min-h-screen">
        <ParallaxImage
          src="/hero.jpg"
          alt="Hero"
          speed={0.5}
          height="100vh"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <ScrollRevealSection animationType="fade-in-up" delay={200}>
            <h1 className="text-5xl font-bold text-white mb-4">
              Welcome to Our Service
            </h1>
            <GlowButton size="lg" glowColor="orange">
              Get Started
            </GlowButton>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Stats Section */}
      <ScrollRevealSection className="py-16 bg-gray-50">
        <div className="container mx-auto grid grid-cols-3 gap-8">
          <AnimatedCounter endValue={500} suffix="+" />
          <AnimatedCounter endValue={98} suffix="%" />
          <AnimatedCounter endValue={10} prefix="$" suffix="K+" decimals={1} />
        </div>
      </ScrollRevealSection>

      {/* FAQ Section */}
      <ScrollRevealSection className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">FAQ</h2>
          <InteractiveFAQ items={faqItems} />
        </div>
      </ScrollRevealSection>
    </>
  );
}
```

---

## Performance Tips

### Best Practices
1. **Limit animations**: Use 2-3 scroll-triggered animations per page
2. **Debounce scroll**: ScrollRevealSection handles this automatically
3. **Lazy load images**: Use native `loading="lazy"` for ParallaxImage
4. **Reduce motion**: Respect `prefers-reduced-motion` media query
5. **Test on mobile**: All components are optimized, but test on real devices

### Browser Support
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

---

## Troubleshooting

### ScrollRevealSection not animating
```tsx
// Make sure the element is in viewport on page load
// Add delay if needed:
<ScrollRevealSection delay={500}>
```

### AnimatedCounter not starting
```tsx
// Check if triggerOnScroll is disabled:
<AnimatedCounter triggerOnScroll={false} />  // Manual trigger
```

### GlowButton styles not applying
```tsx
// Make sure parent has proper z-index:
<div className="relative z-10">
  <GlowButton>Click me</GlowButton>
</div>
```

### ParallaxImage looks broken
```tsx
// Ensure image is accessible and provide height:
<ParallaxImage
  src="/image.jpg"
  alt="Description"
  height="400px"
/>
```

---

## Questions or Need Help?

Refer to:
- 📖 `IMPROVEMENTS_COMPLETED.md` - Full implementation details
- 📋 `UI_UX_IMPROVEMENT_PLAN.md` - Roadmap and future phases
- 💻 Component source files for TypeScript interfaces
- 🎨 `src/index.css` for animation definitions

---

**Last Updated**: October 29, 2025
