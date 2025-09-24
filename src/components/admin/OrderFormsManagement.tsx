import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  Clock, 
  CheckCircle, 
  Phone, 
  Mail,
  Building2,
  User,
  DollarSign,
  Calendar,
  Globe,
  Target,
  Timer,
  Server
} from "lucide-react";

interface OrderForm {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  customer_company: string | null;
  customer_website_url: string | null;
  customer_project_goals: string | null;
  customer_timeline: string | null;
  customer_add_hosting: boolean | null;
  service_name: string;
  amount: number;
  status: string;
  stripe_session_id: string | null;
  created_at: string;
  updated_at: string;
}

export function OrderFormsManagement() {
  const [orders, setOrders] = useState<OrderForm[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch order forms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_website_url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_project_goals?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_timeline?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      if (statusFilter === "completed") {
        filtered = filtered.filter(order => order.stripe_session_id !== null);
      } else if (statusFilter === "pending") {
        filtered = filtered.filter(order => order.stripe_session_id === null);
      } else {
        filtered = filtered.filter(order => order.status === statusFilter);
      }
    }

    setFilteredOrders(filtered);
  };

  const getPaymentStatus = (order: OrderForm) => {
    if (order.stripe_session_id) {
      return { status: 'completed', label: 'Payment Completed', color: 'bg-green-100 text-green-800' };
    } else {
      return { status: 'pending', label: 'Payment Pending', color: 'bg-orange-100 text-orange-800' };
    }
  };

  const formatAmount = (amount: number) => {
    return `£${(amount / 100).toFixed(2)}`;
  };

  const getProjectGoalsLabel = (goals: string) => {
    switch (goals) {
      case 'new-website': return 'New Website';
      case 'redesign': return 'Redesign';
      case 'ecommerce': return 'E-commerce';
      case 'ai-tools': return 'AI Tools';
      case 'other': return 'Other';
      default: return goals;
    }
  };

  const getTimelineLabel = (timeline: string) => {
    switch (timeline) {
      case 'asap': return 'ASAP';
      case '1-2-weeks': return '1–2 weeks';
      case '1-month-plus': return '1 month+';
      case 'flexible': return 'Flexible';
      default: return timeline;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportOrders = () => {
    const csvContent = [
      ['Date', 'Customer Name', 'Email', 'Phone', 'Company', 'Website URL', 'Project Goals', 'Timeline', 'Hosting', 'Service', 'Amount', 'Payment Status', 'Stripe Session ID'].join(','),
      ...filteredOrders.map(order => [
        formatDate(order.created_at),
        order.customer_name || '',
        order.customer_email || '',
        order.customer_phone || '',
        order.customer_company || '',
        order.customer_website_url || '',
        order.customer_project_goals ? getProjectGoalsLabel(order.customer_project_goals) : '',
        order.customer_timeline ? getTimelineLabel(order.customer_timeline) : '',
        order.customer_add_hosting ? 'Yes' : 'No',
        order.service_name || '',
        formatAmount(order.amount),
        getPaymentStatus(order).label,
        order.stripe_session_id || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order-forms-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Order status updated successfully.",
      });

      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <CreditCard className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading order forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Order Forms</h1>
          <p className="text-muted-foreground mt-1">
            Customer orders from pricing cards with payment status
          </p>
        </div>
        <Button onClick={exportOrders} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Order Forms ({filteredOrders.length})
          </CardTitle>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="completed">Payment Completed</SelectItem>
                <SelectItem value="pending">Payment Pending</SelectItem>
                <SelectItem value="inquiry">Inquiry Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No order forms found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const paymentStatus = getPaymentStatus(order);
                
                return (
                  <div key={order.id} className="border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            {order.customer_name || 'Unknown Customer'}
                          </h3>
                          <Badge className={paymentStatus.color}>
                            {paymentStatus.status === 'completed' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {paymentStatus.label}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Service: <span className="font-medium">{order.service_name}</span>
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary flex items-center gap-1">
                          <DollarSign className="h-5 w-5" />
                          {formatAmount(order.amount)}
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{order.customer_email}</span>
                      </div>
                      
                      {order.customer_phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{order.customer_phone}</span>
                        </div>
                      )}
                      
                      {order.customer_company && (
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{order.customer_company}</span>
                        </div>
                      )}

                      {order.customer_website_url && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{order.customer_website_url}</span>
                        </div>
                      )}

                      {order.customer_project_goals && (
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{getProjectGoalsLabel(order.customer_project_goals)}</span>
                        </div>
                      )}

                      {order.customer_timeline && (
                        <div className="flex items-center gap-2">
                          <Timer className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{getTimelineLabel(order.customer_timeline)}</span>
                        </div>
                      )}

                      {order.customer_add_hosting !== null && (
                        <div className="flex items-center gap-2">
                          <Server className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Hosting: {order.customer_add_hosting ? 'Yes (£40/month)' : 'No'}
                          </span>
                        </div>
                      )}
                    </div>

                    {order.stripe_session_id && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          Stripe Session: <code className="bg-muted px-1 rounded">{order.stripe_session_id}</code>
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      <Select
                        value={order.status}
                        onValueChange={(value) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inquiry">Inquiry</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}