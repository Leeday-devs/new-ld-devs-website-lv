import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

interface BillingHistoryProps {
  customerData: {
    plan_name: string;
    plan_price: number;
    payment_amount: number;
    next_payment_date: string | null;
  };
}

const BillingHistory = ({ customerData }: BillingHistoryProps) => {
  // Mock billing history data - in a real app, this would come from your database
  const generateBillingHistory = () => {
    const history = [];
    const now = new Date();
    
    // Generate last 6 months of billing history
    for (let i = 0; i < 6; i++) {
      const paymentDate = new Date(now);
      paymentDate.setMonth(paymentDate.getMonth() - i);
      
      history.push({
        id: `invoice-${i + 1}`,
        date: paymentDate.toISOString(),
        amount: customerData.plan_price,
        status: i === 0 ? 'pending' : 'paid',
        description: `${customerData.plan_name} Plan - ${paymentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
        invoice_number: `INV-${String(Date.now() - (i * 1000000)).slice(-6)}`,
        payment_method: 'Credit Card ending in ****4242',
        due_date: paymentDate.toISOString()
      });
    }
    
    return history;
  };

  const billingHistory = generateBillingHistory();
  const totalPaid = billingHistory.filter(item => item.status === 'paid').reduce((sum, item) => sum + item.amount, 0);
  const pendingAmount = billingHistory.filter(item => item.status === 'pending').reduce((sum, item) => sum + item.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'default' as const;
      case 'pending': return 'secondary' as const;
      case 'overdue': return 'destructive' as const;
      default: return 'outline' as const;
    }
  };

  return (
    <div className="space-y-6">
      {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold">{formatCurrency(totalPaid)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <p className="text-xl font-bold">{customerData.plan_name}</p>
                <p className="text-sm text-muted-foreground">{formatCurrency(customerData.plan_price)}/month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Calendar className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Payment</p>
                <p className="text-lg font-bold">
                  {customerData.next_payment_date 
                    ? new Date(customerData.next_payment_date).toLocaleDateString()
                    : 'Not set'
                  }
                </p>
                {pendingAmount > 0 && (
                  <p className="text-sm text-muted-foreground">{formatCurrency(pendingAmount)} due</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing History Table */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Billing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billingHistory.map((invoice) => (
              <Card key={invoice.id} className="card-subtle">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(invoice.status)}
                        <div>
                          <h3 className="font-semibold text-sm">{invoice.description}</h3>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>Date: {new Date(invoice.date).toLocaleDateString()}</span>
                        <span>Due: {new Date(invoice.due_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-lg">{formatCurrency(invoice.amount)}</p>
                        <Badge variant={getStatusVariant(invoice.status)} className="text-xs">
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-6">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Load More History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Credit Card</p>
                  <p className="text-sm text-muted-foreground">**** **** **** 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Badge variant="default" className="text-xs">Primary</Badge>
            </div>
            
            <Button variant="outline" className="w-full gap-2">
              <CreditCard className="h-4 w-4" />
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingHistory;