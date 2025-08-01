import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const DiscordNotificationTracker = () => {
  const { user } = useAuth();

  // Send Discord notification
  const sendDiscordNotification = async (eventType: string, data: any) => {
    try {
      await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType,
          data
        }
      });
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
      // Fail silently - don't interrupt user experience
    }
  };

  // Track site visits (only once per session)
  useEffect(() => {
    const hasTrackedVisit = sessionStorage.getItem('discord_visit_tracked');
    if (!hasTrackedVisit) {
      sendDiscordNotification('visit', {
        page: window.location.pathname,
        userAgent: navigator.userAgent
      });
      sessionStorage.setItem('discord_visit_tracked', 'true');
    }
  }, []);

  // Track user logins
  useEffect(() => {
    if (user) {
      const hasTrackedLogin = sessionStorage.getItem('discord_login_tracked');
      if (!hasTrackedLogin) {
        sendDiscordNotification('login', {
          email: user.email,
          name: user.user_metadata?.full_name || user.email,
          role: 'User'
        });
        sessionStorage.setItem('discord_login_tracked', 'true');
      }
    }
  }, [user]);

  return null; // This component doesn't render anything
};

export default DiscordNotificationTracker;