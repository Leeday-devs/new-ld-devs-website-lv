import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import BreadcrumbsNavigation from "@/components/BreadcrumbsNavigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CookiePolicy = () => {
  const [showPreferences, setShowPreferences] = useState(false);

  const handleManagePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  return (
    <>
      <SEOHead 
        title="Cookie Policy | LD Development - Cookie Usage & Privacy Controls"
        description="Learn about cookie usage on LD Development website. Manage your cookie preferences and understand how we use cookies to improve your experience."
        keywords="cookie policy, website cookies, privacy controls, LD Development, GDPR cookies"
        noindex={false}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Cookie Policy - LD Development",
          "description": "Cookie policy and preference management for LD Development website."
        }}
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-16 max-w-4xl">
          <BreadcrumbsNavigation 
            items={[
              { name: "Home", href: "/" },
              { name: "Cookie Policy", href: "" }
            ]}
          />
          
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-black text-brand-navy mb-8">Cookie Policy</h1>
            
            <div className="bg-blue-50 border-l-4 border-brand-orange p-6 mb-8 rounded-r-lg">
              <p className="text-sm text-brand-navy mb-2"><strong>Last Updated:</strong> December 2024</p>
              <p className="text-brand-navy">
                This cookie policy explains how LD Development uses cookies and similar technologies 
                on our website to enhance your browsing experience.
              </p>
            </div>

            <div className="bg-orange-50 border border-brand-orange rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-brand-navy mb-3">Quick Cookie Preferences</h3>
              <p className="text-brand-navy mb-4">
                You can manage your cookie preferences at any time by clicking the button below:
              </p>
              <Button 
                onClick={handleManagePreferences}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white"
              >
                {showPreferences ? 'Hide' : 'Manage'} Cookie Preferences
              </Button>
              
              {showPreferences && (
                <div className="mt-6 p-4 bg-white rounded border">
                  <h4 className="font-semibold mb-3">Cookie Categories:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Essential Cookies</span>
                      <span className="text-green-600 font-medium">Always Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Analytics Cookies</span>
                      <Button size="sm" variant="outline">Toggle</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Marketing Cookies</span>
                      <Button size="sm" variant="outline">Toggle</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Preference Cookies</span>
                      <Button size="sm" variant="outline">Toggle</Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Note: This is a demonstration. For full functionality, 
                    use the cookie banner that appears when you first visit our site.
                  </p>
                </div>
              )}
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">1. What Are Cookies?</h2>
              <p className="mb-4">
                Cookies are small text files that are stored on your device when you visit a website. 
                They help websites remember information about your visit, which can make your next 
                visit easier and the site more useful to you.
              </p>
              
              <h3 className="text-xl font-semibold text-brand-navy mb-3">Types of Cookies</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period</li>
                <li><strong>First-Party Cookies:</strong> Cookies set by our website directly</li>
                <li><strong>Third-Party Cookies:</strong> Cookies set by external services we use</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">2. How We Use Cookies</h2>
              
              <div className="grid gap-6">
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-brand-navy mb-3">🔒 Essential Cookies (Always Active)</h3>
                  <p className="mb-3">
                    These cookies are necessary for the website to function properly and cannot be disabled.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Website security and authentication</li>
                    <li>Form submission and user preferences</li>
                    <li>Cookie consent management</li>
                    <li>Basic website functionality</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-brand-navy mb-3">📊 Analytics Cookies</h3>
                  <p className="mb-3">
                    These cookies help us understand how visitors use our website so we can improve it.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Google Analytics for website traffic analysis</li>
                    <li>Page views and user behavior tracking</li>
                    <li>Performance monitoring and optimization</li>
                    <li>A/B testing for website improvements</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Retention:</strong> Up to 26 months
                  </p>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-brand-navy mb-3">🎯 Marketing Cookies</h3>
                  <p className="mb-3">
                    These cookies are used to deliver relevant advertisements and track marketing performance.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Google Ads conversion tracking</li>
                    <li>Facebook Pixel for social media advertising</li>
                    <li>Retargeting and remarketing campaigns</li>
                    <li>Social media integration and sharing</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Retention:</strong> Up to 2 years
                  </p>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-brand-navy mb-3">⚙️ Preference Cookies</h3>
                  <p className="mb-3">
                    These cookies remember your choices and preferences to provide a personalized experience.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Language and region preferences</li>
                    <li>Theme and display settings</li>
                    <li>Form data and user preferences</li>
                    <li>Newsletter subscription status</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Retention:</strong> Up to 1 year
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">3. Third-Party Services</h2>
              <p className="mb-4">We use the following third-party services that may set cookies:</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Service</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Purpose</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Privacy Policy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Google Analytics</td>
                      <td className="border border-gray-300 px-4 py-3">Website analytics and performance</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                           className="text-brand-orange hover:underline">Google Privacy Policy</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Google Ads</td>
                      <td className="border border-gray-300 px-4 py-3">Advertising and conversion tracking</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                           className="text-brand-orange hover:underline">Google Privacy Policy</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Facebook Pixel</td>
                      <td className="border border-gray-300 px-4 py-3">Social media marketing</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" 
                           className="text-brand-orange hover:underline">Facebook Privacy Policy</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Supabase</td>
                      <td className="border border-gray-300 px-4 py-3">Backend services and authentication</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" 
                           className="text-brand-orange hover:underline">Supabase Privacy Policy</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">4. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-semibold text-brand-navy mb-3">Cookie Banner</h3>
              <p className="mb-4">
                When you first visit our website, you'll see a cookie banner asking for your consent. 
                You can choose to accept all cookies, customize your preferences, or accept only essential cookies.
              </p>

              <h3 className="text-xl font-semibold text-brand-navy mb-3">Browser Settings</h3>
              <p className="mb-4">You can also manage cookies through your browser settings:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-navy mb-3">Opt-Out Links</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" 
                     className="text-brand-orange hover:underline">
                    Google Analytics Opt-out Browser Add-on
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" 
                     className="text-brand-orange hover:underline">
                    Facebook Ad Preferences
                  </a>
                </li>
                <li>
                  <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" 
                     className="text-brand-orange hover:underline">
                    Your Online Choices (EU)
                  </a>
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">5. Impact of Disabling Cookies</h2>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-brand-navy mb-3">Please Note:</h3>
                <p className="mb-4">
                  Disabling certain cookies may impact your experience on our website:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Some features may not work properly</li>
                  <li>You may need to re-enter information</li>
                  <li>Personalized content may not be available</li>
                  <li>We may not be able to remember your preferences</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">6. Cookie Data Security</h2>
              <p className="mb-4">We implement appropriate security measures to protect cookie data:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Cookies are transmitted over secure HTTPS connections</li>
                <li>Sensitive information is never stored in cookies</li>
                <li>Cookie data is encrypted where necessary</li>
                <li>We regularly audit our cookie usage and security practices</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">7. Children's Privacy</h2>
              <p className="mb-4">
                Our website is not intended for children under 16. We do not knowingly collect 
                cookie data from children under 16. If you believe we have collected such information, 
                please contact us immediately.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">8. Updates to This Policy</h2>
              <p className="mb-4">
                We may update this cookie policy from time to time to reflect changes in our 
                practices or legal requirements. We will notify you of significant changes 
                by updating the "Last Updated" date and posting a notice on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">9. Contact Us</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4">
                  If you have questions about our cookie policy or want to exercise your privacy rights:
                </p>
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:leedaydevs@gmail.com" className="text-brand-orange hover:underline">leedaydevs@gmail.com</a></p>
                <p className="mb-2"><strong>Phone:</strong> <a href="tel:07586266007" className="text-brand-orange hover:underline">07586 266007</a></p>
                <p className="mb-4"><strong>Address:</strong> London, United Kingdom</p>
                
                <p className="text-sm text-gray-600">
                  For data protection concerns, you can also contact the 
                  <a href="https://ico.org.uk" className="text-brand-orange hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                    UK Information Commissioner's Office (ICO)
                  </a>
                </p>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CookiePolicy;