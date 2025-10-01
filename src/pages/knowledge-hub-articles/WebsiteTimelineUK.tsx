import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, AlertCircle, DollarSign } from "lucide-react";
import { Helmet } from "react-helmet-async";

const WebsiteTimelineUK = () => {
  return (
    <>
      <Helmet>
        <title>How Long Does It Take to Build a Professional Website? | UK Timeline Guide 2025</title>
        <meta
          name="description"
          content="Most small-business websites launch in ~4 weeks from approved mockup. Learn what speeds up or delays projects, and how our process ensures on-time delivery."
        />
        <link rel="canonical" href="https://leewilliams.pro/knowledge-hub/website-timeline-uk" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does a small-business website take to build?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Around 4 weeks from approved mockup to launch, assuming timely content and feedback."
                }
              },
              {
                "@type": "Question",
                "name": "What causes delays?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Late content, slow approvals, scope changes, complex integrations, and domain or email provisioning issues."
                }
              },
              {
                "@type": "Question",
                "name": "Can we launch faster?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes—provide content/branding upfront, keep scope tight, and give same-day feedback for critical steps."
                }
              },
              {
                "@type": "Question",
                "name": "How do payments work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "£20 slot deposit (fully refundable if the mockup isn't approved), then 50% to start and 50% on completion."
                }
              },
              {
                "@type": "Question",
                "name": "What support do I get after launch?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "One month of free revisions; optional hosting & maintenance at £40/month thereafter."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/knowledge-hub" className="hover:text-primary">Knowledge Hub</Link>
          <span className="mx-2">›</span>
          <span>Website Timeline</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          How Long Does It Take to Build a Professional Website?
        </h1>

        {/* Answer Box - Premium Card */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Quick Answer</h3>
              <p className="text-foreground/90 leading-relaxed">
                Most small-business websites launch in <strong>~4 weeks from the approved mockup</strong>, 
                faster if content and approvals arrive quickly. The exact timeline depends on your 
                responsiveness, content readiness, and project scope.
              </p>
            </div>
          </div>
        </Card>

        {/* Intro */}
        <div className="prose prose-lg max-w-none mb-8 text-foreground/90">
          <p>
            Website development timelines vary based on several factors: your content readiness, 
            feedback speed, technical complexity, and how quickly design decisions are approved. 
            Understanding these variables helps set realistic expectations and ensures your project 
            stays on track.
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-12">
          {/* Section 1: The Typical 4-Week Timeline */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              The Typical 4-Week Timeline
            </h2>
            <p className="text-foreground/90 mb-4">
              For most small-business websites, here's how the standard month-long process breaks down:
            </p>
            <ul className="space-y-3 text-foreground/90">
              <li className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[80px]">Week 1:</span>
                <span>Free mockup review, discuss goals, finalize site map and project scope</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[80px]">Week 2:</span>
                <span>Designs approved, content finalized, development begins</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[80px]">Week 3:</span>
                <span>Build continues, mobile optimization, SEO basics implemented</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold text-primary min-w-[80px]">Week 4:</span>
                <span>Testing, fixes, launch, handover training provided</span>
              </li>
            </ul>
          </section>

          {/* Section 2: What Speeds Things Up */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-primary" />
              What Speeds Things Up
            </h2>
            <p className="text-foreground/90 mb-4">
              Projects move faster when clients are prepared and decisive:
            </p>
            <ul className="space-y-3 text-foreground/90">
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>Single decision-maker</strong> who can approve designs quickly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>Approved brand assets</strong> (logos, colors, fonts) ready to go</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>Ready copy and images</strong> provided upfront</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>Quick feedback cycles</strong> (24–48 hour turnaround)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>Fixed scope</strong> with no mid-project feature additions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>Prompt domain/DNS access</strong> for hosting setup</span>
              </li>
            </ul>
          </section>

          {/* Section 3: What Can Delay a Project */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-primary" />
              What Can Delay a Project
            </h2>
            <p className="text-foreground/90 mb-4">
              Common delays that can extend timelines beyond 4 weeks:
            </p>
            <ul className="space-y-3 text-foreground/90">
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>Late content or approvals</strong> – waiting days or weeks for text/images</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>Scope creep</strong> – adding new features or pages mid-project</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>Third-party integrations</strong> – booking systems, payment gateways requiring external setup</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>Domain/email issues</strong> – DNS propagation, hosting account access delays</span>
              </li>
            </ul>
          </section>

          {/* Section 4: Our Payment & Handover */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-foreground flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-primary" />
              Our Payment & Handover
            </h2>
            <p className="text-foreground/90 mb-4">
              Transparent pricing and support structure:
            </p>
            <ul className="space-y-3 text-foreground/90">
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>£20 slot deposit</strong> (fully refundable if mockup not approved)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>50% payment to start</strong> development after mockup approval</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>50% on completion</strong> before launch</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>One month of free revisions</strong> after launch</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mr-2">•</span>
                <span><strong>Optional hosting & maintenance</strong> at £40/month for ongoing support</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Related Articles</h3>
          <div className="flex flex-wrap gap-3">
            <Link to="/knowledge-hub/website-cost-uk-2025">
              <Button variant="outline" className="gap-2">
                How Much Does a Website Cost in the UK (2025)?
              </Button>
            </Link>
            <Link to="/knowledge-hub/builders-vs-custom-2025">
              <Button variant="outline" className="gap-2">
                Website Builders vs Custom Development
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Want your site live in ~4 weeks?
          </h2>
          <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
            Get started with a free mockup and see exactly what your website will look like 
            before committing. Fast turnaround, transparent pricing, and expert support.
          </p>
          <Link to="/contact">
            <Button size="lg" className="btn-premium gap-2">
              Book My Free Mockup →
            </Button>
          </Link>
        </Card>
      </article>
    </>
  );
};

export default WebsiteTimelineUK;
