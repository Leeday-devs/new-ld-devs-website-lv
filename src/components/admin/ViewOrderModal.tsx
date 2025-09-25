import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Globe, 
  Target, 
  Timer, 
  Server, 
  DollarSign, 
  Calendar,
  CreditCard,
  CheckCircle,
  Clock
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

interface ViewOrderModalProps {
  order: OrderForm | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewOrderModal({ order, isOpen, onClose }: ViewOrderModalProps) {
  if (!order) return null;

  const formatAmount = (amount: number) => `£${(amount / 100).toFixed(2)}`;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const getPaymentStatus = () => {
    if (order.stripe_session_id) {
      return { status: 'completed', label: 'Payment Completed', color: 'bg-green-100 text-green-800' };
    } else {
      return { status: 'pending', label: 'Payment Pending', color: 'bg-orange-100 text-orange-800' };
    }
  };

  const paymentStatus = getPaymentStatus();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            Order Details - {order.customer_name}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="space-y-6 p-1">
            {/* Order Summary */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{order.service_name}</h3>
                <Badge className={paymentStatus.color}>
                  {paymentStatus.status === 'completed' ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <Clock className="h-3 w-3 mr-1" />
                  )}
                  {paymentStatus.label}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                  <DollarSign className="h-6 w-6" />
                  {formatAmount(order.amount)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(order.created_at)}
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Customer Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{order.customer_name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium break-all">{order.customer_email}</p>
                    </div>
                  </div>

                  {order.customer_phone && (
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{order.customer_phone}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {order.customer_company && (
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Company</p>
                        <p className="font-medium">{order.customer_company}</p>
                      </div>
                    </div>
                  )}

                  {order.customer_website_url && (
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <p className="font-medium break-all">{order.customer_website_url}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Project Details */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Project Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.customer_project_goals && (
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Project Goals</p>
                      <p className="font-medium">{getProjectGoalsLabel(order.customer_project_goals)}</p>
                    </div>
                  </div>
                )}

                {order.customer_timeline && (
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Timeline</p>
                      <p className="font-medium">{getTimelineLabel(order.customer_timeline)}</p>
                    </div>
                  </div>
                )}

                {order.customer_add_hosting !== null && (
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Hosting & Maintenance</p>
                      <p className="font-medium">
                        {order.customer_add_hosting ? 'Yes (£40/month)' : 'No'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Payment Information */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                Payment Information
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Order Status</p>
                  <Badge variant="outline" className="capitalize">
                    {order.status}
                  </Badge>
                </div>

                {order.stripe_session_id && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Stripe Session ID</p>
                    <code className="text-xs bg-background px-2 py-1 rounded border">
                      {order.stripe_session_id}
                    </code>
                  </div>
                )}

                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
                  <p className="font-medium">{formatDate(order.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}