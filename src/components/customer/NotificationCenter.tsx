import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  DollarSign,
  Calendar,
  FileText,
  TrendingUp
} from "lucide-react";

interface WorkRequest {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'declined' | 'completed';
  requested_at: string;
  quote_price: number | null;
}

interface NotificationCenterProps {
  workRequests: WorkRequest[];
  customerData: {
    next_payment_date: string | null;
    plan_name: string;
  };
}

const NotificationCenter = ({ workRequests, customerData }: NotificationCenterProps) => {
  // Generate notifications based on data
  const generateNotifications = () => {
    const notifications = [];
    const now = new Date();

    // Payment due notifications
    if (customerData.next_payment_date) {
      const paymentDate = new Date(customerData.next_payment_date);
      const daysUntilPayment = Math.ceil((paymentDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilPayment <= 7 && daysUntilPayment > 0) {
        notifications.push({
          id: 'payment-due',
          type: 'warning',
          icon: <DollarSign className="h-4 w-4" />,
          title: 'Payment Due Soon',
          message: `Your ${customerData.plan_name} plan payment is due in ${daysUntilPayment} days`,
          timestamp: now.toISOString(),
          action: 'View Billing'
        });
      } else if (daysUntilPayment <= 0) {
        notifications.push({
          id: 'payment-overdue',
          type: 'error',
          icon: <AlertCircle className="h-4 w-4" />,
          title: 'Payment Overdue',
          message: `Your ${customerData.plan_name} plan payment is overdue`,
          timestamp: now.toISOString(),
          action: 'Pay Now'
        });
      }
    }

    // Work request status notifications
    workRequests.forEach(request => {
      const requestDate = new Date(request.requested_at);
      const daysSinceRequest = Math.floor((now.getTime() - requestDate.getTime()) / (1000 * 60 * 60 * 24));

      if (request.status === 'completed' && daysSinceRequest <= 3) {
        notifications.push({
          id: `completed-${request.id}`,
          type: 'success',
          icon: <CheckCircle className="h-4 w-4" />,
          title: 'Work Request Completed',
          message: `"${request.title}" has been completed`,
          timestamp: request.requested_at,
          action: 'View Details'
        });
      } else if (request.status === 'approved' && daysSinceRequest <= 2) {
        notifications.push({
          id: `approved-${request.id}`,
          type: 'info',
          icon: <TrendingUp className="h-4 w-4" />,
          title: 'Work Request Approved',
          message: `"${request.title}" has been approved and work will begin soon`,
          timestamp: request.requested_at,
          action: 'View Project'
        });
      } else if (request.status === 'pending' && daysSinceRequest >= 5) {
        notifications.push({
          id: `pending-${request.id}`,
          type: 'warning',
          icon: <Clock className="h-4 w-4" />,
          title: 'Request Under Review',
          message: `"${request.title}" is still being reviewed`,
          timestamp: request.requested_at,
          action: 'Contact Support'
        });
      }

      // Quote received notification
      if (request.quote_price && request.status === 'approved' && daysSinceRequest <= 1) {
        notifications.push({
          id: `quote-${request.id}`,
          type: 'info',
          icon: <FileText className="h-4 w-4" />,
          title: 'Quote Received',
          message: `Quote for "${request.title}": $${request.quote_price.toFixed(2)}`,
          timestamp: request.requested_at,
          action: 'View Quote'
        });
      }
    });

    // Sort by timestamp (newest first)
    return notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const notifications = generateNotifications();
  const unreadCount = notifications.length;

  const getNotificationVariant = (type: string) => {
    switch (type) {
      case 'success': return 'default';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      case 'info': return 'outline';
      default: return 'secondary';
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-accent/5';
    }
  };

  return (
    <Card className="card-premium">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </div>
          {unreadCount > 0 && (
            <Badge variant="default" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">All caught up!</h3>
            <p className="text-muted-foreground">
              No new notifications at this time.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-lg border ${getNotificationBgColor(notification.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {notification.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">{notification.title}</h4>
                      <Badge variant={getNotificationVariant(notification.type)} className="text-xs">
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-6 px-2"
                      >
                        {notification.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;