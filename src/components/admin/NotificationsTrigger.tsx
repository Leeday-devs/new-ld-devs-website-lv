import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NotificationsTriggerProps {
  onClick: () => void;
  isOpen: boolean;
}

export function NotificationsTrigger({ onClick, isOpen }: NotificationsTriggerProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
    
    // Set up polling for new notifications every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const now = new Date();
      const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1000));
      const threeDaysAgo = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000));
      
      let count = 0;

      // Count new payments (last 3 days)
      const { count: paymentsCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .not('stripe_session_id', 'is', null)
        .gte('created_at', threeDaysAgo.toISOString());

      count += paymentsCount || 0;

      // Count new messages (last 24 hours)
      const { count: contactCount } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', yesterday.toISOString());

      const { count: quoteCount } = await supabase
        .from('custom_quote_requests')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', yesterday.toISOString());

      count += (contactCount || 0) + (quoteCount || 0);

      // Count expiring subscriptions (next 7 days)
      const nextWeek = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
      const { count: subscriptionCount } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .not('next_payment_date', 'is', null)
        .lte('next_payment_date', nextWeek.toISOString().split('T')[0])
        .gte('next_payment_date', now.toISOString().split('T')[0]);

      count += subscriptionCount || 0;

      // Count approaching deadlines
      const { data: projects } = await supabase
        .from('work_requests')
        .select('requested_at, estimated_timeline')
        .in('status', ['accepted', 'in_progress'])
        .not('estimated_timeline', 'is', null);

      const approachingDeadlines = projects?.filter(project => {
        const requestDate = new Date(project.requested_at);
        const timelineInDays = project.estimated_timeline || 7;
        const deadline = new Date(requestDate.getTime() + (timelineInDays * 24 * 60 * 60 * 1000));
        const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
        return daysUntilDeadline <= 3 && daysUntilDeadline >= 0;
      }) || [];

      count += approachingDeadlines.length;

      setUnreadCount(count);
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="relative hover:bg-muted/50 transition-colors"
    >
      <Bell className={`h-5 w-5 transition-colors ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
      {unreadCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center animate-pulse"
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </Button>
  );
}