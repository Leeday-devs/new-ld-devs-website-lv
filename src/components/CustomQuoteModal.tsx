import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Rocket, DollarSign, Clock, User, Mail, Phone, Building, CheckCircle } from "lucide-react";

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
        description: error.message || "Please try again or contact me directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-0 shadow-2xl">
        <DialogHeader className="pb-6 border-b border-gray-100 dark:border-gray-800">
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-orange to-orange/80 bg-clip-text text-transparent">
            Get Your Custom Quote
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground mt-2">
            Tell us about your project and we'll provide a detailed quote within 24 hours
          </DialogDescription>
        </DialogHeader>

        <div className="px-2 py-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-orange/5 to-orange/10 rounded-2xl p-6 space-y-6 border border-orange/20">
              <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <div className="p-2 bg-orange/20 rounded-lg">
                  <User className="h-5 w-5 text-orange" />
                </div>
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <User className="h-4 w-4 text-orange" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your full name"
                    className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange transition-colors"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Mail className="h-4 w-4 text-orange" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@company.com"
                    className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange transition-colors"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Phone className="h-4 w-4 text-orange" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+44 7XXX XXXXXX"
                    className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange transition-colors"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="company" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Building className="h-4 w-4 text-orange" />
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Your company name"
                    className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-950/30 dark:to-blue-900/20 rounded-2xl p-6 space-y-6 border border-blue-200/50 dark:border-blue-800/50">
              <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Rocket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                Project Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="projectType" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Project Type *
                  </Label>
                  <Select value={formData.projectType} onValueChange={(value) => setFormData({...formData, projectType: value})}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 transition-colors">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl z-50">
                      <SelectItem value="website">Website Development</SelectItem>
                      <SelectItem value="mobile_app">Mobile App</SelectItem>
                      <SelectItem value="ai_automation">AI Automation</SelectItem>
                      <SelectItem value="custom_software">Custom Software</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="budgetRange" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    Budget Range
                  </Label>
                  <Select value={formData.budgetRange} onValueChange={(value) => setFormData({...formData, budgetRange: value})}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 transition-colors">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl z-50">
                      <SelectItem value="under_1k">Under £1,000</SelectItem>
                      <SelectItem value="1k_5k">£1,000 - £5,000</SelectItem>
                      <SelectItem value="5k_10k">£5,000 - £10,000</SelectItem>
                      <SelectItem value="10k_25k">£10,000 - £25,000</SelectItem>
                      <SelectItem value="25k_plus">£25,000+</SelectItem>
                      <SelectItem value="discuss">Let's discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="timeline" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Clock className="h-4 w-4 text-purple-600" />
                    Timeline
                  </Label>
                  <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 transition-colors">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl z-50">
                      <SelectItem value="urgent">Urgent (ASAP)</SelectItem>
                      <SelectItem value="1_month">Within 1 month</SelectItem>
                      <SelectItem value="2_3_months">2-3 months</SelectItem>
                      <SelectItem value="3_6_months">3-6 months</SelectItem>
                      <SelectItem value="flexible">I'm flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="projectDescription" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Project Description *
                </Label>
                <Textarea
                  id="projectDescription"
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                  placeholder="Tell us about your project goals, target audience, key features you need..."
                  className="min-h-[120px] border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 transition-colors resize-none"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="specialRequirements" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Special Requirements
                </Label>
                <Textarea
                  id="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})}
                  placeholder="Any specific technologies, integrations, or unique requirements..."
                  className="min-h-[100px] border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Additional Services */}
            <div className="bg-gradient-to-br from-purple-50/50 to-purple-100/30 dark:from-purple-950/30 dark:to-purple-900/20 rounded-2xl p-6 space-y-6 border border-purple-200/50 dark:border-purple-800/50">
              <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                Additional Services
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-600 transition-colors bg-white/50 dark:bg-gray-800/50">
                  <div className="space-y-1">
                    <Label htmlFor="hasExistingBranding" className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                      I have existing branding/design
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Logo, colors, fonts already established
                    </p>
                  </div>
                  <Switch
                    id="hasExistingBranding"
                    checked={formData.hasExistingBranding}
                    onCheckedChange={(checked) => setFormData({...formData, hasExistingBranding: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-colors bg-white/50 dark:bg-gray-800/50">
                  <div className="space-y-1">
                    <Label htmlFor="needsHosting" className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                      I need hosting & domain
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Secure hosting, SSL, domain setup
                    </p>
                  </div>
                  <Switch
                    id="needsHosting"
                    checked={formData.needsHosting}
                    onCheckedChange={(checked) => setFormData({...formData, needsHosting: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-green-300 dark:hover:border-green-600 transition-colors bg-white/50 dark:bg-gray-800/50">
                  <div className="space-y-1">
                    <Label htmlFor="needsMaintenance" className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                      I need ongoing maintenance
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
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
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange to-orange/80 hover:from-orange/90 hover:to-orange/70 text-white py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Submitting Your Request...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-3 h-6 w-6" />
                    Submit Quote Request
                  </>
                )}
              </Button>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                We'll review your request and get back to you within 24 hours
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};