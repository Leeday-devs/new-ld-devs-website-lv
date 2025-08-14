import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cookie, Shield, BarChart3, Target, Palette, Settings } from "lucide-react";
import { 
  getConsentPreferences,
  saveConsentPreferences,
  hasGivenConsent,
  clearConsent,
  type CookieConsent 
} from "@/utils/cookies";
import { useToast } from "@/hooks/use-toast";

interface CookiePreferencesProps {
  children?: React.ReactNode;
  showAsCard?: boolean;
}

export const CookiePreferences = ({ children, showAsCard = false }: CookiePreferencesProps) => {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });
  const [hasConsent, setHasConsent] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const consent = getConsentPreferences();
    const consentExists = hasGivenConsent();
    
    setHasConsent(consentExists);
    
    if (consent) {
      setPreferences(consent);
    }
  }, [open]);

  const updatePreference = (key: keyof CookieConsent, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: key === 'essential' ? true : value // Essential cookies always required
    }));
  };

  const handleSavePreferences = async () => {
    try {
      await saveConsentPreferences(preferences);
      setOpen(false);
      toast({
        title: "Success",
        description: "Your cookie preferences have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResetConsent = () => {
    clearConsent();
    setHasConsent(false);
    setPreferences({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
    toast({
      title: "Reset Complete",
      description: "Your cookie consent has been reset. The banner will appear again.",
    });
    setOpen(false);
    // Reload to show the banner again
    setTimeout(() => window.location.reload(), 1000);
  };

  const getConsentSummary = () => {
    if (!hasConsent) return "No consent given";
    
    const activeTypes = [];
    if (preferences.essential) activeTypes.push("Essential");
    if (preferences.analytics) activeTypes.push("Analytics");
    if (preferences.marketing) activeTypes.push("Marketing");
    if (preferences.preferences) activeTypes.push("Preferences");
    
    return activeTypes.join(", ");
  };

  if (showAsCard && hasConsent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Cookie className="h-5 w-5" />
            Cookie Preferences
          </CardTitle>
          <CardDescription>
            Manage your cookie consent settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Current Settings</Label>
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant={preferences.essential ? "default" : "outline"}>
                  <Shield className="h-3 w-3 mr-1" />
                  Essential
                </Badge>
                <Badge variant={preferences.analytics ? "default" : "outline"}>
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Analytics
                </Badge>
                <Badge variant={preferences.marketing ? "default" : "outline"}>
                  <Target className="h-3 w-3 mr-1" />
                  Marketing
                </Badge>
                <Badge variant={preferences.preferences ? "default" : "outline"}>
                  <Palette className="h-3 w-3 mr-1" />
                  Preferences
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Update Preferences
                  </Button>
                </DialogTrigger>
                <CookiePreferencesDialog 
                  preferences={preferences}
                  updatePreference={updatePreference}
                  onSave={handleSavePreferences}
                  onReset={handleResetConsent}
                />
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Cookie className="h-4 w-4" />
            Cookie Settings
          </Button>
        )}
      </DialogTrigger>
      <CookiePreferencesDialog 
        preferences={preferences}
        updatePreference={updatePreference}
        onSave={handleSavePreferences}
        onReset={handleResetConsent}
        hasConsent={hasConsent}
        consentSummary={getConsentSummary()}
      />
    </Dialog>
  );
};

interface CookiePreferencesDialogProps {
  preferences: CookieConsent;
  updatePreference: (key: keyof CookieConsent, value: boolean) => void;
  onSave: () => void;
  onReset: () => void;
  hasConsent?: boolean;
  consentSummary?: string;
}

const CookiePreferencesDialog = ({ 
  preferences, 
  updatePreference, 
  onSave, 
  onReset,
  hasConsent,
  consentSummary
}: CookiePreferencesDialogProps) => {
  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Cookie className="h-5 w-5" />
          Cookie Preferences
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {hasConsent && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="font-medium">Current Consent Status</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Active: {consentSummary}
            </p>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          Customize your cookie preferences below. You can change these settings at any time.
        </div>

        {/* Essential Cookies */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <Label className="text-base font-medium">Essential Cookies</Label>
            </div>
            <Switch 
              checked={preferences.essential} 
              disabled 
              className="opacity-50"
            />
          </div>
          <p className="text-sm text-muted-foreground ml-6">
            These cookies are necessary for the website to function and cannot be switched off. 
            They are usually only set in response to actions made by you which amount to a request for services.
          </p>
        </div>

        <Separator />

        {/* Analytics Cookies */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <Label className="text-base font-medium">Analytics Cookies</Label>
            </div>
            <Switch 
              checked={preferences.analytics}
              onCheckedChange={(checked) => updatePreference('analytics', checked)}
            />
          </div>
          <p className="text-sm text-muted-foreground ml-6">
            These cookies help us understand how visitors interact with our website by collecting and 
            reporting information anonymously. This helps us improve our website's performance.
          </p>
        </div>

        <Separator />

        {/* Marketing Cookies */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-600" />
              <Label className="text-base font-medium">Marketing Cookies</Label>
            </div>
            <Switch 
              checked={preferences.marketing}
              onCheckedChange={(checked) => updatePreference('marketing', checked)}
            />
          </div>
          <p className="text-sm text-muted-foreground ml-6">
            These cookies are used to track visitors across websites to display ads that are 
            relevant and engaging for the individual user.
          </p>
        </div>

        <Separator />

        {/* Preference Cookies */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-orange-600" />
              <Label className="text-base font-medium">Preference Cookies</Label>
            </div>
            <Switch 
              checked={preferences.preferences}
              onCheckedChange={(checked) => updatePreference('preferences', checked)}
            />
          </div>
          <p className="text-sm text-muted-foreground ml-6">
            These cookies enable the website to remember choices you make and provide enhanced, 
            more personal features like language preferences and region.
          </p>
        </div>

        <Separator />

        <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4">
          <Button
            variant="destructive"
            onClick={onReset}
            className="flex items-center gap-2"
          >
            <Cookie className="h-4 w-4" />
            Reset Consent
          </Button>
          <Button
            onClick={onSave}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};