import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader2, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const WebsiteSetupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    servicesOffered: "",
    stylePreferences: ""
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
  };

  const uploadFile = async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('website-setup-files')
      .upload(path, file);
    
    if (error) throw error;
    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let logoUrl = null;
      let imageUrls: string[] = [];

      // Upload logo if provided
      if (logoFile) {
        const logoPath = `logos/${Date.now()}-${logoFile.name}`;
        logoUrl = await uploadFile(logoFile, logoPath);
      }

      // Upload images if provided
      if (imageFiles.length > 0) {
        const uploadPromises = imageFiles.map(async (file, index) => {
          const imagePath = `images/${Date.now()}-${index}-${file.name}`;
          return await uploadFile(file, imagePath);
        });
        imageUrls = await Promise.all(uploadPromises);
      }

      // Save to database
      const { error: dbError } = await supabase
        .from('website_setup_submissions')
        .insert({
          name: formData.name,
          business_name: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          logo_url: logoUrl,
          images_urls: imageUrls,
          services_offered: formData.servicesOffered,
          style_preferences: formData.stylePreferences
        });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-website-setup-email', {
        body: {
          ...formData,
          logoUrl,
          imageUrls
        }
      });

      if (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't throw here as the form submission was successful
      }

      toast({
        title: "Form submitted successfully!",
        description: "We've received your information and will be in touch soon.",
      });

      navigate('/website-setup-thank-you');
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead 
        title="Website Setup Form - Let's Build Your Website | L-Development"
        description="Tell us about your business and we'll customize your website template to match your brand and requirements."
        keywords="website setup, business information, custom website, web design form"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <Navigation />
        
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Website Setup Form
              </h1>
              <p className="text-lg text-muted-foreground">
                Help us customize your website by providing your business details below.
              </p>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Let's Get Started on Your Website
                </CardTitle>
                <CardDescription>
                  Fill out the form below so we can customize your website to perfectly match your business.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        required
                        placeholder="Your business name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+44 123 456 7890"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Upload Logo</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="flex-1"
                      />
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    {logoFile && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {logoFile.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="images">Upload Images (optional)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImagesUpload}
                        className="flex-1"
                      />
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    {imageFiles.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {imageFiles.length} image(s)
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servicesOffered">Services Offered</Label>
                    <Textarea
                      id="servicesOffered"
                      name="servicesOffered"
                      value={formData.servicesOffered}
                      onChange={handleInputChange}
                      placeholder="Describe the services your business offers..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stylePreferences">Colour or Style Preferences</Label>
                    <Textarea
                      id="stylePreferences"
                      name="stylePreferences"
                      value={formData.stylePreferences}
                      onChange={handleInputChange}
                      placeholder="Tell us about your preferred colors, style, or any specific design requests..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Your Info...
                      </>
                    ) : (
                      "Send My Info"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WebsiteSetupForm;