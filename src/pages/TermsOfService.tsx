import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import BreadcrumbsNavigation from "@/components/BreadcrumbsNavigation";

const TermsOfService = () => {
  return (
    <>
      <SEOHead 
        title="Terms of Service | LD Development - Web Development Agreement"
        description="Terms and conditions for LD Development web development services. UK law governs our professional web development agreements."
        keywords="terms of service, web development contract, UK terms, LD Development, service agreement"
        noindex={false}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Terms of Service - LD Development",
          "description": "Terms and conditions governing the use of LD Development web development services."
        }}
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-16 max-w-4xl">
          <BreadcrumbsNavigation 
            items={[
              { name: "Home", href: "/" },
              { name: "Terms of Service", href: "" }
            ]}
          />
          
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-black text-brand-navy mb-8">Terms of Service</h1>
            
            <div className="bg-blue-50 border-l-4 border-brand-orange p-6 mb-8 rounded-r-lg">
              <p className="text-sm text-brand-navy mb-2"><strong>Last Updated:</strong> December 2024</p>
              <p className="text-brand-navy">
                These terms and conditions govern your use of LD Development services and website. 
                By using our services, you agree to these terms.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">1. Company Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="mb-2"><strong>Company:</strong> LD Development (Trading name of Hosting Easy Ltd)</p>
                <p className="mb-2"><strong>Registration:</strong> Company registered in England and Wales</p>
                <p className="mb-2"><strong>Address:</strong> London, United Kingdom</p>
                <p className="mb-2"><strong>Email:</strong> leedaydevs@gmail.com</p>
                <p><strong>Phone:</strong> 07586 266007</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">2. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using our website and services, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms of Service. If you do not agree 
                to these terms, you must not use our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">3. Services Provided</h2>
              <p className="mb-4">LD Development provides:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Custom website design and development</li>
                <li>E-commerce solution development</li>
                <li>Web application development</li>
                <li>AI automation and integration services</li>
                <li>Website hosting and maintenance</li>
                <li>Technical support and consulting</li>
                <li>Digital marketing and SEO services</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">4. Service Agreement Process</h2>
              
              <h3 className="text-xl font-semibold text-brand-navy mb-3">Project Initiation</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>All projects begin with a consultation and requirements gathering</li>
                <li>Written proposals will be provided detailing scope, timeline, and costs</li>
                <li>A signed contract and initial deposit are required before work commences</li>
                <li>Changes to project scope require written approval and may incur additional costs</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-navy mb-3">Payment Terms</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Deposits are typically 50% of the total project cost</li>
                <li>Final payment is due upon project completion and approval</li>
                <li>Monthly retainer services are billed in advance</li>
                <li>Late payments may incur interest charges of 8% per annum above Bank of England base rate</li>
                <li>We reserve the right to suspend services for overdue accounts</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">5. Client Responsibilities</h2>
              <p className="mb-4">As a client, you agree to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide accurate and complete project requirements</li>
                <li>Supply necessary content, images, and materials in a timely manner</li>
                <li>Respond to requests for feedback and approvals within agreed timeframes</li>
                <li>Ensure you have rights to all materials provided</li>
                <li>Maintain confidentiality of login credentials and sensitive information</li>
                <li>Make payments according to agreed terms</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">6. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-brand-navy mb-3">Client Content</h3>
              <p className="mb-4">
                You retain all rights to content, images, text, and materials you provide. 
                By providing these materials, you grant us a license to use them for your project.
              </p>

              <h3 className="text-xl font-semibold text-brand-navy mb-3">Developed Work</h3>
              <p className="mb-4">
                Upon full payment, you own the custom code and design elements created specifically 
                for your project. We retain rights to our development methodologies, frameworks, 
                and general solutions that may be reused for other clients.
              </p>

              <h3 className="text-xl font-semibold text-brand-navy mb-3">Third-Party Components</h3>
              <p className="mb-4">
                Some projects may use third-party themes, plugins, or libraries. 
                These remain subject to their respective licenses.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">7. Warranties and Disclaimers</h2>
              
              <h3 className="text-xl font-semibold text-brand-navy mb-3">Service Warranties</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>We provide a 30-day warranty on custom development work</li>
                <li>Warranty covers bugs and issues directly related to our work</li>
                <li>Warranty does not cover changes in requirements, third-party services, or hosting issues</li>
                <li>We guarantee 99.9% uptime for our hosting services, subject to force majeure events</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-navy mb-3">Disclaimers</h3>
              <p className="mb-4">
                Our services are provided "as is" without warranty of any kind beyond those expressly stated. 
                We do not guarantee specific results from SEO or marketing services, as these depend on 
                numerous factors beyond our control.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">8. Limitation of Liability</h2>
              <p className="mb-4">
                Our total liability for any claim arising from our services shall not exceed 
                the amount paid by you for the specific service that gave rise to the claim. 
                We shall not be liable for:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Indirect, consequential, or punitive damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Third-party actions or failures</li>
                <li>Force majeure events beyond our reasonable control</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">9. Website Usage Terms</h2>
              
              <h3 className="text-xl font-semibold text-brand-navy mb-3">Acceptable Use</h3>
              <p className="mb-4">When using our website, you agree not to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Use the site for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Upload malicious code or attempt to disrupt our services</li>
                <li>Infringe on intellectual property rights</li>
                <li>Spam or send unsolicited communications</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-navy mb-3">Content Accuracy</h3>
              <p className="mb-4">
                While we strive to keep information accurate and up-to-date, 
                we make no representations about the completeness or accuracy of website content.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">10. Privacy and Data Protection</h2>
              <p className="mb-4">
                Your privacy is important to us. Please review our 
                <a href="/privacy-policy" className="text-brand-orange hover:underline ml-1">Privacy Policy</a> 
                to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">11. Termination</h2>
              
              <h3 className="text-xl font-semibold text-brand-navy mb-3">By Client</h3>
              <p className="mb-4">
                You may terminate services with 30 days written notice. 
                Payment for completed work and costs incurred up to termination date remain due.
              </p>

              <h3 className="text-xl font-semibold text-brand-navy mb-3">By LD Development</h3>
              <p className="mb-4">
                We may terminate services immediately for non-payment, breach of terms, 
                or if continuation of services becomes impractical or unlawful.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">12. Dispute Resolution</h2>
              <p className="mb-4">
                We encourage resolving disputes through direct communication. 
                If formal resolution is needed:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Initial disputes should be raised in writing within 30 days</li>
                <li>We will attempt resolution through good faith negotiations</li>
                <li>Unresolved disputes may be subject to mediation or arbitration</li>
                <li>English law governs these terms and any disputes</li>
                <li>Courts of England and Wales have exclusive jurisdiction</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">13. Force Majeure</h2>
              <p className="mb-4">
                We shall not be liable for delays or failures in performance resulting from 
                circumstances beyond our reasonable control, including but not limited to 
                natural disasters, government actions, internet outages, or third-party service failures.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">14. Modifications to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. 
                Significant changes will be communicated via email or website notice. 
                Continued use of our services after changes constitutes acceptance of new terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">15. Severability</h2>
              <p className="mb-4">
                If any provision of these terms is found to be unenforceable, 
                the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">16. Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:leedaydevs@gmail.com" className="text-brand-orange hover:underline">leedaydevs@gmail.com</a></p>
                <p className="mb-2"><strong>Phone:</strong> <a href="tel:07586266007" className="text-brand-orange hover:underline">07586 266007</a></p>
                <p><strong>Address:</strong> London, United Kingdom</p>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;