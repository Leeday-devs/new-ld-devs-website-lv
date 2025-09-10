import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Rocket, DollarSign, Clock, User, Mail, Phone, Building } from "lucide-react";

interface CustomQuoteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CustomQuoteModal = ({ isOpen, onOpenChange }: CustomQuoteModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectDescription: '',
    budgetRange: '',
    timeline: '',
    specialRequirements: '',
    hasExistingBranding: false,
    needsHosting: false,
    needsMaintenance: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.projectType || !formData.projectDescription) {
        throw new Error('Please fill in all required fields');
      }

      const { data, error } = await supabase.functions.invoke('submit-custom-quote', {
        body: formData
      });

      if (error) {
        console.error('Quote submission error:', error);
        throw new Error('Failed to submit quote request');
      }

      toast({
        title: "Quote Request Submitted! 🎉",
        description: "We'll review your request and get back to you within 24 hours.",
      });

      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        projectDescription: '',
        budgetRange: '',
        timeline: '',
        specialRequirements: '',
        hasExistingBranding: false,
        needsHosting: false,
        needsMaintenance: false
      });
      
      onOpenChange(false);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-orange to-orange/80 bg-clip-text text-transparent">
            Get Your Custom Quote
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-orange" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@company.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+44 7XXX XXXXXX"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company Name
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="Your company name"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Rocket className="h-5 w-5 text-orange" />
              Project Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type *</Label>
                <Select value={formData.projectType} onValueChange={(value) => setFormData({...formData, projectType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website Development</SelectItem>
                    <SelectItem value="mobile_app">Mobile App</SelectItem>
                    <SelectItem value="ai_automation">AI Automation</SelectItem>
                    <SelectItem value="custom_software">Custom Software</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budgetRange" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Budget Range
                </Label>
                <Select value={formData.budgetRange} onValueChange={(value) => setFormData({...formData, budgetRange: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under_1k">Under £1,000</SelectItem>
                    <SelectItem value="1k_5k">£1,000 - £5,000</SelectItem>
                    <SelectItem value="5k_10k">£5,000 - £10,000</SelectItem>
                    <SelectItem value="10k_25k">£10,000 - £25,000</SelectItem>
                    <SelectItem value="25k_plus">£25,000+</SelectItem>
                    <SelectItem value="discuss">Let's discuss</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="timeline" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Timeline
                </Label>
                <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent (ASAP)</SelectItem>
                    <SelectItem value="1_month">Within 1 month</SelectItem>
                    <SelectItem value="2_3_months">2-3 months</SelectItem>
                    <SelectItem value="3_6_months">3-6 months</SelectItem>
                    <SelectItem value="flexible">I'm flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description *</Label>
              <Textarea
                id="projectDescription"
                value={formData.projectDescription}
                onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                placeholder="Tell us about your project goals, target audience, key features you need..."
                className="min-h-[100px]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialRequirements">Special Requirements</Label>
              <Textarea
                id="specialRequirements"
                value={formData.specialRequirements}
                onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})}
                placeholder="Any specific technologies, integrations, or unique requirements..."
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Additional Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Services</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="hasExistingBranding" className="font-medium">
                    I have existing branding/design
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Logo, colors, fonts already established
                  </p>
                </div>
                <Switch
                  id="hasExistingBranding"
                  checked={formData.hasExistingBranding}
                  onCheckedChange={(checked) => setFormData({...formData, hasExistingBranding: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="needsHosting" className="font-medium">
                    I need hosting & domain
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Secure hosting, SSL, domain setup
                  </p>
                </div>
                <Switch
                  id="needsHosting"
                  checked={formData.needsHosting}
                  onCheckedChange={(checked) => setFormData({...formData, needsHosting: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="needsMaintenance" className="font-medium">
                    I need ongoing maintenance
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Updates, backups, security monitoring
                  </p>
                </div>
                <Switch
                  id="needsMaintenance"
                  checked={formData.needsMaintenance}
                  onCheckedChange={(checked) => setFormData({...formData, needsMaintenance: checked})}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange to-orange/80 hover:from-orange/90 hover:to-orange/70 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-5 w-5" />
                  Submit Quote Request
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};