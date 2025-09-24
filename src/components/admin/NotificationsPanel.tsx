import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  CreditCard, 
  Calendar, 
  MessageCircle, 
  AlertTriangle,
  X,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: 'payment' | 'subscription' | 'deadline' | 'message';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const notificationsList: Notification[] = [];
      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000));

      // Fetch new payments (last 3 days)
      const { data: payments } = await supabase
        .from('orders')
        .select('*')
        .not('stripe_session_id', 'is', null)
        .gte('created_at', threeDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(10);

      payments?.forEach(payment => {
        notificationsList.push({
          id: `payment-${payment.id}`,
          type: 'payment',
          title: 'New Payment Received',
          description: `£${(payment.amount / 100).toFixed(2)} from ${payment.customer_name || payment.customer_email}`,
          time: formatRelativeTime(payment.created_at),
          isRead: false,
          priority: 'high'
        });
      });

      // Fetch expiring subscriptions (next 7 days)
      const nextWeek = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
      const { data: subscriptions } = await supabase
        .from('customers')
        .select('*')
        .not('next_payment_date', 'is', null)
        .lte('next_payment_date', nextWeek.toISOString().split('T')[0])
        .gte('next_payment_date', now.toISOString().split('T')[0]);

      subscriptions?.forEach(sub => {
        notificationsList.push({
          id: `subscription-${sub.id}`,
          type: 'subscription',
          title: 'Subscription Expiring Soon',
          description: `${sub.name}'s subscription expires ${formatDate(sub.next_payment_date)}`,
          time: formatRelativeTime(sub.updated_at),
          isRead: false,
          priority: 'medium'
        });
      });

      // Fetch approaching project deadlines
      const { data: projects } = await supabase
        .from('work_requests')
        .select('*')
        .in('status', ['accepted', 'in_progress'])
        .not('estimated_timeline', 'is', null)
        .order('requested_at', { ascending: false })
        .limit(5);

      projects?.forEach(project => {
        const requestDate = new Date(project.requested_at);
        const timelineInDays = project.estimated_timeline || 7;
        const deadline = new Date(requestDate.getTime() + (timelineInDays * 24 * 60 * 60 * 1000));
        const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
        
        if (daysUntilDeadline <= 3 && daysUntilDeadline >= 0) {
          notificationsList.push({
            id: `deadline-${project.id}`,
            type: 'deadline',
            title: 'Project Deadline Approaching',
            description: `"${project.title}" due in ${daysUntilDeadline} days`,
            time: formatRelativeTime(project.requested_at),
            isRead: false,
            priority: daysUntilDeadline <= 1 ? 'high' : 'medium'
          });
        }
      });

      // Fetch new client messages (last 24 hours)
      const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1000));
      
      const { data: contacts } = await supabase
        .from('contact_submissions')
        .select('*')
        .gte('created_at', yesterday.toISOString())
        .order('created_at', { ascending: false })
        .limit(5);

      contacts?.forEach(contact => {
        notificationsList.push({
          id: `contact-${contact.id}`,
          type: 'message',
          title: 'New Contact Message',
          description: `${contact.name}: ${contact.subject || 'New inquiry'}`,
          time: formatRelativeTime(contact.created_at),
          isRead: false,
          priority: 'medium'
        });
      });

      const { data: quotes } = await supabase
        .from('custom_quote_requests')
        .select('*')
        .gte('created_at', yesterday.toISOString())
        .order('created_at', { ascending: false })
        .limit(5);

      quotes?.forEach(quote => {
        notificationsList.push({
          id: `quote-${quote.id}`,
          type: 'message',
          title: 'New Quote Request',
          description: `${quote.name}: ${quote.project_type}`,
          time: formatRelativeTime(quote.created_at),
          isRead: false,
          priority: 'high'
        });
      });

      // Sort by priority and time
      notificationsList.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;
        
        return new Date(b.time).getTime() - new Date(a.time).getTime();
      });

      setNotifications(notificationsList);
      setUnreadCount(notificationsList.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="h-4 w-4" />;
      case 'subscription':
        return <AlertTriangle className="h-4 w-4" />;
      case 'deadline':
        return <Calendar className="h-4 w-4" />;
      case 'message':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <>
      {/* Mobile: Below content */}
      <div className="lg:hidden">
        {isOpen && (
          <div className="p-6">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notifications
                    {unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {unreadCount}
                      </Badge>
                    )}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  {isLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-muted rounded mb-2"></div>
                          <div className="h-3 bg-muted rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">No new notifications</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "p-3 rounded-lg border transition-colors hover:bg-muted/50",
                            getPriorityColor(notification.priority)
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium truncate">
                                {notification.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {notification.description}
                              </p>
                              <span className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Desktop: Side panel */}
      <div className="hidden lg:block">
        <div
          className={cn(
            "fixed top-0 right-0 h-full w-80 bg-background border-l border-border shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  {unreadCount > 0 && (
                    <Badge variant="destructive">
                      {unreadCount}
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                    <p className="text-muted-foreground">No new notifications to show.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer group",
                          getPriorityColor(notification.priority)
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="text-sm font-medium leading-5">
                                {notification.title}
                              </h4>
                              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              {notification.description}
                            </p>
                            <span className="text-xs text-muted-foreground mt-2 block">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
        )}
      </div>
    </>
  );
}