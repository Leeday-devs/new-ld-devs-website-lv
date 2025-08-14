import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Cookie, Settings, Shield, BarChart3, Target, Palette } from "lucide-react";
import { 
  hasGivenConsent, 
  acceptAllCookies, 
  acceptEssentialOnly,
  saveConsentPreferences,
  getConsentPreferences,
  type CookieConsent 
} from "@/utils/cookies";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const checkConsent = () => {
      if (!hasGivenConsent()) {
        setIsVisible(true);
      } else {
        const savedPreferences = getConsentPreferences();
        if (savedPreferences) {
          setPreferences(savedPreferences);
        }
      }
    };

    // Small delay to prevent flash on page load
    const timer = setTimeout(checkConsent, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = async () => {
    await acceptAllCookies();
    setIsVisible(false);
  };

  const handleAcceptEssential = async () => {
    await acceptEssentialOnly();
    setIsVisible(false);
  };

  const handleSavePreferences = async () => {
    await saveConsentPreferences(preferences);
    setShowPreferences(false);
    setIsVisible(false);
  };

  const updatePreference = (key: keyof CookieConsent, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: key === 'essential' ? true : value // Essential cookies always required
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <Card className="mx-auto max-w-4xl shadow-lg border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cookie className="h-5 w-5" />
              Cookie Consent
            </CardTitle>
            <CardDescription className="text-sm">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowPreferences(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Customize
              </Button>
              <Button
                variant="outline"
                onClick={handleAcceptEssential}
              >
                Essential Only
              </Button>
              <Button
                onClick={handleAcceptAll}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Accept All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Cookie Preferences
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
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

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
              <Button
                variant="outline"
                onClick={handleAcceptEssential}
              >
                Essential Only
              </Button>
              <Button
                onClick={handleSavePreferences}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};