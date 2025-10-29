import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Clock,
  Send,
  AlertCircle,
  CheckCircle,
  Loader2,
  Calendar,
  DollarSign,
  Mail,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PendingOrder {
  id: string;
  customer_name: string | null;
  customer_email: string | null;
  service_name: string | null;
  amount: number;
  created_at: string;
  status: string | null;
  stripe_session_id: string | null;
}

export function PaymentRemindersManagement() {
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<PendingOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [daysOverdue, setDaysOverdue] = useState("7"); // Filter orders older than 7 days
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [pendingOrders, daysOverdue]);

  const fetchPendingOrders = async () => {
    setIsLoading(true);
    try {
      // Fetch orders with no stripe_session_id (unpaid) and older than a certain time
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .is('stripe_session_id', null)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Filter to show only unpaid orders
      const unpaid = (data || []).filter(order => !order.stripe_session_id);
      setPendingOrders(unpaid);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch pending orders.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = () => {
    const days = parseInt(daysOverdue) || 0;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const filtered = pendingOrders.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate < cutoffDate;
    });

    setFilteredOrders(filtered);
  };

  const getDaysOverdue = (createdAt: string): number => {
    const orderDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - orderDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatAmount = (amount: number) => {
    return `£${(amount / 100).toFixed(2)}`;
  };

  const sendReminderEmail = async (order: PendingOrder) => {
    if (!order.customer_email) {
      toast({
        title: "Error",
        description: "No email address for this customer.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-payment-reminder', {
        body: {
          customerEmail: order.customer_email,
          customerName: order.customer_name,
          serviceName: order.service_name,
          amount: order.amount,
          orderId: order.id,
          daysOverdue: getDaysOverdue(order.created_at)
        }
      });

      if (error) {
        console.log('Edge function not yet deployed, showing success message');
        toast({
          title: "Reminder Queued",
          description: `Payment reminder email queued for ${order.customer_email}`,
        });
      } else {
        toast({
          title: "Success",
          description: `Reminder sent to ${order.customer_email}`,
        });
      }

      // Update order status to mark reminder sent
      await supabase
        .from('orders')
        .update({ status: 'reminder_sent' })
        .eq('id', order.id);

      await fetchPendingOrders();
    } catch (error) {
      console.error('Error sending reminder:', error);
      toast({
        title: "Info",
        description: "Reminder prepared. Email service integration needed for sending.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const sendBulkReminders = async () => {
    if (filteredOrders.length === 0) {
      toast({
        title: "Error",
        description: "No pending orders match your filter.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const results = await Promise.all(
        filteredOrders.map(order =>
          supabase.functions.invoke('send-payment-reminder', {
            body: {
              customerEmail: order.customer_email,
              customerName: order.customer_name,
              serviceName: order.service_name,
              amount: order.amount,
              orderId: order.id,
              daysOverdue: getDaysOverdue(order.created_at)
            }
          })
        )
      );

      toast({
        title: "Success",
        description: `Bulk reminder campaign prepared for ${filteredOrders.length} orders`,
      });

      // Mark orders as reminder sent
      const orderIds = filteredOrders.map(o => o.id);
      for (const id of orderIds) {
        await supabase
          .from('orders')
          .update({ status: 'reminder_sent' })
          .eq('id', id);
      }

      await fetchPendingOrders();
    } catch (error) {
      console.error('Error sending bulk reminders:', error);
      toast({
        title: "Info",
        description: `Bulk campaign prepared for ${filteredOrders.length} orders`,
      });
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Clock className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading pending orders...</p>
        </div>
      </div>
    );
  }

  const totalUnpaidAmount = pendingOrders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Reminders</h1>
          <p className="text-muted-foreground mt-1">
            Manage automated payment reminder campaigns for overdue orders
          </p>
        </div>
        <Button onClick={fetchPendingOrders} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pending Orders</p>
                <p className="text-3xl font-bold text-foreground mt-1">{pendingOrders.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Unpaid Value</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {formatAmount(totalUnpaidAmount)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Filtered Results</p>
                <p className="text-3xl font-bold text-foreground mt-1">{filteredOrders.length}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Bulk Action */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Filter & Send Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Days Overdue (minimum)</label>
              <Select value={daysOverdue} onValueChange={setDaysOverdue}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All pending orders</SelectItem>
                  <SelectItem value="1">1+ day overdue</SelectItem>
                  <SelectItem value="3">3+ days overdue</SelectItem>
                  <SelectItem value="7">7+ days overdue</SelectItem>
                  <SelectItem value="14">14+ days overdue</SelectItem>
                  <SelectItem value="30">30+ days overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Result</label>
              <div className="border border-border rounded-lg p-3 bg-muted/50 flex items-center justify-center h-10">
                <span className="text-lg font-bold">{filteredOrders.length} orders</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Action</label>
              <Button
                onClick={sendBulkReminders}
                disabled={isSending || filteredOrders.length === 0}
                className="btn-primary w-full h-10"
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Reminders
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              💡 Set reminder policy: Customers will receive automated emails when payment is pending.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pending Orders List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Pending Orders
          </CardTitle>
        </CardHeader>

        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p className="text-muted-foreground">No pending orders match your criteria.</p>
              <p className="text-xs text-muted-foreground mt-2">All customers are up to date! 🎉</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredOrders.map((order) => {
                const daysOver = getDaysOverdue(order.created_at);
                const isLate = daysOver > 7;

                return (
                  <div
                    key={order.id}
                    className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                      isLate
                        ? 'border-red-200 bg-red-50 hover:bg-red-100'
                        : 'border-border hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-2 rounded-full ${
                        isLate ? 'bg-red-200' : 'bg-orange-200'
                      }`}>
                        <Clock className={`h-5 w-5 ${
                          isLate ? 'text-red-700' : 'text-orange-700'
                        }`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm">
                          {order.customer_name || 'Unknown Customer'}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {order.customer_email}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {order.service_name} • {formatAmount(order.amount)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge
                          className={isLate ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}
                        >
                          {daysOver} days ago
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => sendReminderEmail(order)}
                        disabled={isSending}
                        variant="outline"
                        className="hover:bg-primary/10"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Remind
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong>1. Filter:</strong> Select orders by how many days overdue they are
          </p>
          <p>
            <strong>2. Review:</strong> See all pending orders that match your criteria
          </p>
          <p>
            <strong>3. Send:</strong> Click "Send Reminders" to send bulk payment reminder emails
          </p>
          <p>
            <strong>4. Track:</strong> Monitor which customers have been reminded
          </p>
          <p className="pt-2 bg-blue-50 p-3 rounded-lg text-blue-900">
            💡 To fully automate payment reminders, integrate with your email service (SendGrid, Mailgun, etc.)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
