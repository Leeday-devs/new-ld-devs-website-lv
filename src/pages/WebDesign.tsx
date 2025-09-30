import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Zap, Shield, TrendingUp, MessageSquare } from "lucide-react";

const WebDesign = () => {
  // FAQ Data
  const faqData = [
    {
      question: "How long does a small business website take?",
      answer: "Most projects launch in about 4 weeks from approved mockup, assuming timely content and feedback."
    },
    {
      question: "What's included in hosting & maintenance?",
      answer: "Updates, security, uptime monitoring, backups, speed checks, and minor content tweaks; £40/month."
    },
    {
      question: "Do you offer a refund if I don't like the design?",
      answer: "Yes — the £20 slot deposit is fully refundable if you're not happy with your initial mockup."
    },
    {
      question: "Can I start small and expand later?",
      answer: "Absolutely. Launch core pages first; add bookings, blog, or AI features as you grow."
    },
    {
      question: "How are payments structured?",
      answer: "£20 slot deposit → 50% upfront to start → 50% on completion before go-live."
    }
  ];

  // Structured Data
  const structuredDataArray = [
    // Service Schema
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Design & Development",
      "provider": {
        "@type": "Organization",
        "name": "LD Development",
        "url": "https://leeday.uk"
      },
      "areaServed": "GB",
      "serviceType": "Website design, development, hosting & maintenance",
      "description": "Custom, mobile-first websites for UK small businesses with clear pricing and fast 4-week delivery.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "GBP",
        "price": "500-3000",
        "description": "Typical range; £20 slot deposit, 50/50 split, £40/mo hosting & maintenance."
      }
    },
    // Breadcrumb Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://leeday.uk"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://leeday.uk/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Web Design",
          "item": "https://leeday.uk/services/web-design"
        }
      ]
    },
    // FAQ Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ];

  return (
    <>
      <SEOHead
        title="Web Design & Development for UK Small Businesses | LD Development"
        description="Custom, mobile-first websites for UK small businesses. Clear pricing (£500–£3,000), fast 4-week delivery, and ongoing support. Get a free mockup today."
        keywords="web design UK, small business website, mobile-first design, website development, web design pricing"
        url="https://leeday.uk/services/web-design"
        structuredData={structuredDataArray}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Navigation />

        <main className="container mx-auto px-4 pt-28 pb-16">
          {/* Breadcrumbs */}
          <div className="mb-8 max-w-5xl mx-auto">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Web Design" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground tracking-tight mb-6">
              Web Design & Development
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Custom, mobile-first websites for UK small businesses. Clear pricing, fast delivery, and ongoing support to help your business grow online.
            </p>
          </div>

          {/* At a Glance Card */}
          <div className="max-w-5xl mx-auto mb-16">
            <Card className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/10 border-blue-200/50 dark:border-blue-800/30 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Zap className="h-6 w-6 text-[#FF7A00]" />
                  At a Glance
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      For
                    </h3>
                    <p className="text-muted-foreground">UK small businesses that want a premium, mobile-first site</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Outcomes
                    </h3>
                    <p className="text-muted-foreground">More enquiries, faster load times, trust-building design</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                      Typical Cost
                    </h3>
                    <p className="text-muted-foreground">£500–£3,000 + £40/mo hosting & maintenance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Sections */}
          <div className="max-w-5xl mx-auto space-y-16">
            {/* What You Get */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">What You Get</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Every website we build is designed to attract customers, load fast, and look professional across all devices. Here's what's included in every project:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Custom Design</h3>
                    <p className="text-muted-foreground">Tailored to your brand, not a generic template</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Mobile-First</h3>
                    <p className="text-muted-foreground">Optimized for smartphones and tablets</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Fast Hosting</h3>
                    <p className="text-muted-foreground">Lightning-fast page loads and 99.9% uptime</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Analytics Included</h3>
                    <p className="text-muted-foreground">Track visitors, traffic sources, and conversions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">On-Brand Copy Support</h3>
                    <p className="text-muted-foreground">Help with headlines, CTAs, and content structure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">SEO Foundation</h3>
                    <p className="text-muted-foreground">Proper meta tags, schema markup, and site structure</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Process & Timeline */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Process & Timeline</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We've streamlined our process to get your website live in about 4 weeks. Here's how it works:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Free Mockup</h3>
                    <p className="text-muted-foreground">See your design before committing to anything</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">£20 Slot Deposit</h3>
                    <p className="text-muted-foreground">Fully refundable if you don't love the mockup</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">50% Upfront to Start</h3>
                    <p className="text-muted-foreground">We begin building your site once approved</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Build & Review</h3>
                    <p className="text-muted-foreground">We create your site, you provide feedback and content</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF7A00] to-[#0D6EFD] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Launch (≈4 weeks)</h3>
                    <p className="text-muted-foreground">Final 50% payment and your site goes live</p>
                  </div>
                </div>
              </div>
            </section>

            {/* What It Costs */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">What It Costs</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Most small business websites fall between £500–£3,000 depending on scope, pages, and features. Here's what affects the price:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-blue-200/50 dark:border-blue-800/30">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Number of Pages</h3>
                    <p className="text-muted-foreground">3–5 pages cost less than 10+ pages with complex content</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-200/50 dark:border-blue-800/30">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Integrations</h3>
                    <p className="text-muted-foreground">Payment systems, booking tools, and third-party APIs add complexity</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-200/50 dark:border-blue-800/30">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Custom Features</h3>
                    <p className="text-muted-foreground">AI chat, member portals, or bespoke functionality increase scope</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6 p-6 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200/50 dark:border-blue-800/30">
                <p className="text-foreground font-semibold mb-2">Ongoing Support: £40/month</p>
                <p className="text-muted-foreground">Includes hosting, security updates, backups, and minor content changes</p>
              </div>
            </section>

            {/* Add-Ons */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Add-Ons</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Start with the essentials and add more features as your business grows:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-white/70 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                  <h3 className="font-semibold text-foreground mb-2">📅 Online Bookings</h3>
                  <p className="text-muted-foreground">Let customers book appointments 24/7</p>
                </div>
                <div className="p-5 bg-white/70 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                  <h3 className="font-semibold text-foreground mb-2">💳 Stripe Payment Links</h3>
                  <p className="text-muted-foreground">Accept payments securely online</p>
                </div>
                <div className="p-5 bg-white/70 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                  <h3 className="font-semibold text-foreground mb-2">🤖 AI Live Chat</h3>
                  <p className="text-muted-foreground">Automated customer support and lead capture</p>
                </div>
                <div className="p-5 bg-white/70 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                  <h3 className="font-semibold text-foreground mb-2">📝 Blog / Knowledge Hub</h3>
                  <p className="text-muted-foreground">Share updates and improve SEO</p>
                </div>
                <div className="p-5 bg-white/70 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                  <h3 className="font-semibold text-foreground mb-2">📱 PWA Upgrade</h3>
                  <p className="text-muted-foreground">Install your site like an app on mobile</p>
                </div>
                <div className="p-5 bg-white/70 dark:bg-white/5 rounded-lg border border-blue-200/50 dark:border-white/10">
                  <h3 className="font-semibold text-foreground mb-2">🔗 Custom Integrations</h3>
                  <p className="text-muted-foreground">Connect to your existing tools and systems</p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <Card key={index} className="border-blue-200/50 dark:border-blue-800/30">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-[#FF7A00] flex-shrink-0 mt-1" />
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground pl-8">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="mt-16">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF7A00] via-[#FF8A1A] to-[#0D6EFD] p-12 shadow-2xl">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                <div className="relative text-center space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Get Your Free Mockup Today
                  </h2>
                  <p className="text-xl text-white/90 max-w-2xl mx-auto">
                    See how your website could look before committing to anything. Fully refundable deposit.
                  </p>
                  <div className="pt-4">
                    <Link to="/contact">
                      <Button size="lg" className="bg-white text-[#FF7A00] hover:bg-white/90 font-bold px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        Book My Free Mockup →
                      </Button>
                    </Link>
                  </div>
                  <p className="text-sm text-white/80 pt-2">
                    💰 Only £20 deposit • 100% refundable • No obligation
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WebDesign;
