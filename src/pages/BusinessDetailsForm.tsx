import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Upload, 
  CheckCircle, 
  Building, 
  Mail, 
  Phone, 
  Globe,
  Palette,
  FileText,
  Loader2
} from "lucide-react";

const BusinessDetailsForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const sessionId = searchParams.get('session_id');
  const templateName = searchParams.get('template') || 'Website Template';

  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    website: '',
    businessDescription: '',
    servicesOffered: '',
    targetAudience: '',
    brandColors: '',
    preferredStyle: '',
    additionalRequests: '',
    logoFile: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPEG, PNG, SVG, or GIF file.",
          variant: "destructive"
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "File too large", 
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      setFormData(prev => ({ ...prev, logoFile: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.businessName || !formData.email) {
        toast({
          title: "Missing information",
          description: "Please fill in your business name and email address.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      let logoUrl = null;

      // Upload logo if provided
      if (formData.logoFile) {
        const fileExt = formData.logoFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(`logos/${fileName}`, formData.logoFile);

        if (uploadError) {
          throw new Error('Failed to upload logo');
        }

        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(uploadData.path);
        
        logoUrl = publicUrl;
      }

      // Submit business details
      const businessDetails = {
        sessionId,
        templateName,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        businessDescription: formData.businessDescription,
        servicesOffered: formData.servicesOffered,
        targetAudience: formData.targetAudience,
        brandColors: formData.brandColors,
        preferredStyle: formData.preferredStyle,
        additionalRequests: formData.additionalRequests,
        logoUrl,
        submittedAt: new Date().toISOString()
      };

      // Send details via edge function
      const { error: submitError } = await supabase.functions.invoke('submit-business-details', {
        body: businessDetails
      });

      if (submitError) {
        throw submitError;
      }

      toast({
        title: "Details submitted successfully!",
        description: "We'll start working on your website and contact you within 24 hours."
      });

      // Redirect to success page
      navigate('/business-details-success');

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission failed",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // If no session ID, redirect to templates
  if (!sessionId) {
    navigate('/templates');
    return null;
  }

  return (
    <>
      <SEOHead 
        title="Business Details - Complete Your Website Setup | L-Development"
        description="Provide your business details to customize your new website template. We'll have your professional site live within 48 hours."
        keywords="website customization, business details form, website setup, professional web design"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <Navigation />
        
        <main>
          <div className="container mx-auto px-4 pt-20">
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Website Templates", href: "/templates" },
                { label: "Business Details", href: "/business-details" }
              ]}
            />
          </div>

          {/* Success Message */}
          <section className="container mx-auto px-4 py-8">
            <Card className="bg-green-50 border-green-200 max-w-2xl mx-auto">
              <CardContent className="flex items-center gap-4 pt-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">Payment Successful!</h3>
                  <p className="text-green-700">
                    Thank you for purchasing the {templateName} template.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Form Section */}
          <section className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Complete Your Website Setup
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Provide your business details below so we can customize your {templateName} template. 
                  We'll have your website live within 24-48 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Business Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Business Information
                    </CardTitle>
                    <CardDescription>
                      Tell us about your business so we can customize your website accordingly.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                          placeholder="Your Business Name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+44 7123 456789"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Current Website (if any)</Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="www.yourwebsite.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="businessDescription">Business Description</Label>
                      <Textarea
                        id="businessDescription"
                        value={formData.businessDescription}
                        onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                        placeholder="Briefly describe what your business does and what makes it unique..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="servicesOffered">Services/Products Offered</Label>
                      <Textarea
                        id="servicesOffered"
                        value={formData.servicesOffered}
                        onChange={(e) => handleInputChange('servicesOffered', e.target.value)}
                        placeholder="List your main services or products (e.g., Emergency plumbing, Bathroom installations, Leak repairs...)"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="targetAudience">Target Audience</Label>
                      <Input
                        id="targetAudience"
                        value={formData.targetAudience}
                        onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                        placeholder="Who are your ideal customers? (e.g., Homeowners, Businesses, etc.)"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Branding */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Branding & Design
                    </CardTitle>
                    <CardDescription>
                      Help us match your brand style and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="logoUpload">Business Logo</Label>
                      <div className="mt-2">
                        <label 
                          htmlFor="logoUpload"
                          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                        >
                          {formData.logoFile ? (
                            <div className="text-center">
                              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                              <p className="text-sm font-medium">{formData.logoFile.name}</p>
                              <p className="text-xs text-muted-foreground">Click to change</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm font-medium">Upload your logo</p>
                              <p className="text-xs text-muted-foreground">PNG, JPG, SVG up to 5MB</p>
                            </div>
                          )}
                        </label>
                        <input
                          id="logoUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="brandColors">Brand Colors</Label>
                        <Input
                          id="brandColors"
                          value={formData.brandColors}
                          onChange={(e) => handleInputChange('brandColors', e.target.value)}
                          placeholder="e.g., Blue and white, #FF5733, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredStyle">Preferred Style</Label>
                        <Input
                          id="preferredStyle"
                          value={formData.preferredStyle}
                          onChange={(e) => handleInputChange('preferredStyle', e.target.value)}
                          placeholder="e.g., Modern, Traditional, Bold, Minimal"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Requests */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Additional Requests
                    </CardTitle>
                    <CardDescription>
                      Any special requests or specific features you'd like included?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      id="additionalRequests"
                      value={formData.additionalRequests}
                      onChange={(e) => handleInputChange('additionalRequests', e.target.value)}
                      placeholder="Any specific features, pages, or customizations you'd like us to include..."
                      rows={4}
                    />
                  </CardContent>
                </Card>

                {/* Submit */}
                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting Details...
                      </>
                    ) : (
                      'Submit Details & Start Build'
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    We'll contact you within 24 hours to confirm details and start building your website.
                  </p>
                </div>
              </form>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BusinessDetailsForm;