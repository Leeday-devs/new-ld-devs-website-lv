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
  Loader2,
  Zap
} from "lucide-react";

const BusinessDetailsForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const sessionId = searchParams.get('session_id');
  const templateName = searchParams.get('template') || 'Website Template';

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    servicesOffered: '',
    colorPreferences: '',
    logoFile: null as File | null,
    imagesFiles: [] as File[]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'images') => {
    const files = Array.from(e.target.files || []);
    
    // Validate file types and sizes
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload JPEG, PNG, SVG, or GIF files only.",
          variant: "destructive"
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "File too large", 
          description: "Please upload files smaller than 5MB each.",
          variant: "destructive"
        });
        return;
      }
    }

    if (type === 'logo' && files[0]) {
      setFormData(prev => ({ ...prev, logoFile: files[0] }));
    } else if (type === 'images') {
      setFormData(prev => ({ ...prev, imagesFiles: files }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.businessName || !formData.email) {
        toast({
          title: "Missing information",
          description: "Please fill in your name, business name, and email address.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      let logoUrl = null;
      let imageUrls = [];

      // Upload logo if provided
      if (formData.logoFile) {
        const fileExt = formData.logoFile.name.split('.').pop();
        const fileName = `${Date.now()}-logo.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(`business-assets/${fileName}`, formData.logoFile);

        if (uploadError) {
          throw new Error('Failed to upload logo');
        }

        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(uploadData.path);
        
        logoUrl = publicUrl;
      }

      // Upload additional images if provided
      if (formData.imagesFiles.length > 0) {
        for (let i = 0; i < formData.imagesFiles.length; i++) {
          const file = formData.imagesFiles[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-image-${i}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(`business-assets/${fileName}`, file);

          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('blog-images')
              .getPublicUrl(uploadData.path);
            
            imageUrls.push(publicUrl);
          }
        }
      }

      // Submit business details
      const businessDetails = {
        sessionId,
        templateName,
        name: formData.name,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        servicesOffered: formData.servicesOffered,
        colorPreferences: formData.colorPreferences,
        logoUrl,
        imageUrls,
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
        description: "We'll start working on your website and send you a mockup within 24-48 hours."
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
        title="Business Details - Let's Get Started on Your Website | L-Development"
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
                  Let's Get Started on Your Website
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Please provide your details below so we can customize your {templateName} template. 
                  We'll send you a mockup within 24-48 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal & Business Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Your Information
                    </CardTitle>
                    <CardDescription>
                      Tell us about yourself and your business.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="John Smith"
                          required
                        />
                      </div>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+44 7123 456789"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="servicesOffered">Services Offered</Label>
                      <Textarea
                        id="servicesOffered"
                        value={formData.servicesOffered}
                        onChange={(e) => handleInputChange('servicesOffered', e.target.value)}
                        placeholder="What services do you provide? (e.g., Web Design, Plumbing, Hair Cutting, etc.)"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="colorPreferences">Colors or Style Preferences</Label>
                      <Input
                        id="colorPreferences"
                        value={formData.colorPreferences}
                        onChange={(e) => handleInputChange('colorPreferences', e.target.value)}
                        placeholder="e.g., Blue and white, Modern style, Traditional look, etc."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* File Uploads */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Upload Your Assets
                    </CardTitle>
                    <CardDescription>
                      Upload your logo and any images you'd like us to include on your website.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                          onChange={(e) => handleFileChange(e, 'logo')}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="imagesUpload">Additional Images (Optional)</Label>
                      <div className="mt-2">
                        <label 
                          htmlFor="imagesUpload"
                          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                        >
                          {formData.imagesFiles.length > 0 ? (
                            <div className="text-center">
                              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                              <p className="text-sm font-medium">{formData.imagesFiles.length} image(s) selected</p>
                              <p className="text-xs text-muted-foreground">Click to change</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm font-medium">Upload business images</p>
                              <p className="text-xs text-muted-foreground">Photos of your work, team, location, etc.</p>
                            </div>
                          )}
                        </label>
                        <input
                          id="imagesUpload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleFileChange(e, 'images')}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hosting Upsell */}
                <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Zap className="h-5 w-5" />
                      Need Hosting & Ongoing Support?
                    </CardTitle>
                    <CardDescription>
                      All our sites include optional hosting, backups, support, updates and a business email for just £40/month. 
                      You can add this during checkout or anytime after launch.
                    </CardDescription>
                  </CardHeader>
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
                        Sending Your Info...
                      </>
                    ) : (
                      'Send My Info'
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    We'll send you a mockup within 24-48 hours and contact you to confirm details.
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