import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import BreadcrumbsNavigation from "@/components/BreadcrumbsNavigation";

const PrivacyPolicy = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy | LD Development - GDPR Compliant Data Protection"
        description="Learn how LD Development collects, uses, and protects your personal data. GDPR compliant privacy policy for UK web development services."
        keywords="privacy policy, GDPR, data protection, UK web development, LD Development"
        noindex={false}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy - LD Development",
          "description": "Privacy policy and data protection information for LD Development web development services."
        }}
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-16 max-w-4xl">
          <BreadcrumbsNavigation 
            items={[
              { name: "Home", href: "/" },
              { name: "Privacy Policy", href: "" }
            ]}
          />
          
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-black text-brand-navy mb-8">Privacy Policy</h1>
            
            <div className="bg-blue-50 border-l-4 border-brand-orange p-6 mb-8 rounded-r-lg">
              <p className="text-sm text-brand-navy mb-2"><strong>Last Updated:</strong> December 2024</p>
              <p className="text-brand-navy">
                This privacy policy explains how LD Development ("we", "us", or "our") collects, uses, 
                and protects your personal information when you use our website and services.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-brand-navy mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Name and email address (when you contact us or subscribe to our newsletter)</li>
                <li>Phone number (when provided for project inquiries)</li>
                <li>Company information (for business clients)</li>
                <li>Project requirements and preferences</li>
                <li>Communication records and correspondence</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-navy mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Device information and screen resolution</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referral source and search terms</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>To provide and improve our web development services</li>
                <li>To communicate about your projects and respond to inquiries</li>
                <li>To send newsletters and marketing communications (with your consent)</li>
                <li>To analyze website performance and user behavior</li>
                <li>To comply with legal obligations and protect our rights</li>
                <li>To prevent fraud and ensure website security</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">3. Legal Basis for Processing (GDPR)</h2>
              <p className="mb-4">Under GDPR, we process your data based on:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Consent:</strong> For newsletter subscriptions and marketing communications</li>
                <li><strong>Contract:</strong> To fulfill our web development services</li>
                <li><strong>Legitimate Interest:</strong> For website analytics and business communications</li>
                <li><strong>Legal Obligation:</strong> For tax records and compliance requirements</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">4. Information Sharing</h2>
              <p className="mb-4">We do not sell your personal information. We may share data with:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Service Providers:</strong> Hosting services, email providers, analytics tools</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">5. Data Security</h2>
              <p className="mb-4">We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>SSL encryption for all data transmission</li>
                <li>Regular security updates and monitoring</li>
                <li>Access controls and staff training</li>
                <li>Secure data backup and recovery procedures</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">6. Your Rights Under GDPR</h2>
              <p className="mb-4">You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Right to Object:</strong> Opt out of marketing communications and processing</li>
                <li><strong>Right to Withdraw Consent:</strong> Revoke consent at any time</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">7. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies to enhance your browsing experience. For detailed information about our cookie usage, 
                please visit our <a href="/cookies" className="text-brand-orange hover:underline">Cookie Policy</a>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">8. Data Retention</h2>
              <p className="mb-4">We retain your personal data for:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Active client projects: Duration of project plus 7 years for tax purposes</li>
                <li>Newsletter subscribers: Until you unsubscribe or request deletion</li>
                <li>Website analytics: 26 months maximum</li>
                <li>Email communications: 7 years for business records</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">9. International Transfers</h2>
              <p className="mb-4">
                Some of our service providers may be located outside the UK/EU. When we transfer your data internationally, 
                we ensure appropriate safeguards are in place, including adequacy decisions or standard contractual clauses.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">10. Children's Privacy</h2>
              <p className="mb-4">
                Our services are not intended for children under 16. We do not knowingly collect personal information 
                from children under 16. If you believe we have collected information from a child under 16, 
                please contact us immediately.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">11. Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4"><strong>Data Controller:</strong> LD Development (Part of Hosting Easy Ltd)</p>
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:lee@leedaydevs.com" className="text-brand-orange hover:underline">lee@leedaydevs.com</a></p>
                <p className="mb-2"><strong>Phone:</strong> <a href="tel:+447586266007" className="text-brand-orange hover:underline">+44 7586 266007</a></p>
                <p className="mb-4"><strong>Address:</strong> London, United Kingdom</p>
                
                <p className="text-sm text-gray-600">
                  To exercise your rights or raise concerns about data protection, 
                  you can also contact the UK Information Commissioner's Office (ICO) at 
                  <a href="https://ico.org.uk" className="text-brand-orange hover:underline ml-1" target="_blank" rel="noopener noreferrer">ico.org.uk</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">12. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will notify you of any significant changes 
                by posting a notice on our website or sending you an email notification. 
                Please review this policy periodically for any updates.
              </p>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;