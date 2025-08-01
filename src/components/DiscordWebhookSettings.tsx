import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle, CheckCircle, Settings } from 'lucide-react';

const DiscordWebhookSettings = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTestWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Discord webhook URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    console.log("Testing Discord webhook:", webhookUrl);

    try {
      const response = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'test',
          data: {
            message: 'Discord webhook test successful!',
            timestamp: new Date().toISOString()
          }
        }
      });

      if (response.error) {
        throw response.error;
      }

      toast({
        title: "Test Successful!",
        description: "Check your Discord channel for the test message.",
      });
    } catch (error) {
      console.error("Error testing webhook:", error);
      toast({
        title: "Test Failed",
        description: "Failed to send test message. Please check your webhook URL.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Discord Notifications Setup
        </CardTitle>
        <CardDescription>
          Configure Discord webhooks to receive notifications for customer activities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Instructions */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            How to set up Discord notifications:
          </h3>
          <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
            <li>Go to your Discord server settings</li>
            <li>Click on "Integrations" → "Webhooks"</li>
            <li>Click "New Webhook" and configure it</li>
            <li>Copy the webhook URL and paste it below</li>
            <li>Click "Test Webhook" to verify it works</li>
          </ol>
        </div>

        {/* Webhook URL Input */}
        <form onSubmit={handleTestWebhook} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Discord Webhook URL</Label>
            <Input
              id="webhookUrl"
              type="url"
              placeholder="https://discord.com/api/webhooks/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Your webhook URL will be stored securely as an environment variable.
            </p>
          </div>

          <Button type="submit" disabled={loading || !webhookUrl} className="w-full">
            {loading ? 'Testing...' : 'Test Webhook'}
          </Button>
        </form>

        {/* What notifications you'll receive */}
        <div className="space-y-3">
          <h3 className="font-medium">You'll receive notifications for:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Customer purchases
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              New customer signups
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Customer logins
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Website visits
            </div>
          </div>
        </div>

        {/* Environment Variable Info */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-900 dark:text-amber-100">
                Environment Variable Setup Required
              </p>
              <p className="text-amber-800 dark:text-amber-200 mt-1">
                After testing, you'll need to add <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">DISCORD_WEBHOOK_URL</code> 
                as an environment variable in your Supabase Edge Functions settings for live notifications.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscordWebhookSettings;