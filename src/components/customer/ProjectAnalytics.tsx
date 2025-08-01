import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  DollarSign,
  Calendar
} from "lucide-react";

interface WorkRequest {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'declined' | 'completed';
  hours_logged: number;
  quote_price: number | null;
  requested_at: string;
}

interface ProjectAnalyticsProps {
  workRequests: WorkRequest[];
  customerData: {
    plan_price: number;
    payment_amount: number;
    next_payment_date: string | null;
  };
}

const ProjectAnalytics = ({ workRequests, customerData }: ProjectAnalyticsProps) => {
  const totalRequests = workRequests.length;
  const completedRequests = workRequests.filter(req => req.status === 'completed').length;
  const pendingRequests = workRequests.filter(req => req.status === 'pending').length;
  const totalHours = workRequests.reduce((sum, req) => sum + req.hours_logged, 0);
  const totalQuoteValue = workRequests.reduce((sum, req) => sum + (req.quote_price || 0), 0);
  const averageCompletionTime = completedRequests > 0 ? Math.round(totalHours / completedRequests * 10) / 10 : 0;

  const completionRate = totalRequests > 0 ? Math.round((completedRequests / totalRequests) * 100) : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">{totalRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold">{totalHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">{completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                <span className="text-sm text-muted-foreground">Monthly Plan</span>
                <span className="font-semibold">{formatCurrency(customerData.plan_price)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                <span className="text-sm text-muted-foreground">Total Quote Value</span>
                <span className="font-semibold">{formatCurrency(totalQuoteValue)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                <span className="text-sm text-muted-foreground">Last Payment</span>
                <span className="font-semibold">{formatCurrency(customerData.payment_amount)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Project Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pending Requests</span>
                <Badge variant="secondary">{pendingRequests}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average Project Hours</span>
                <span className="font-semibold">{averageCompletionTime}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <Badge variant={completionRate >= 80 ? "default" : "secondary"}>
                  {completionRate}%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Next Payment</span>
                <span className="font-semibold">
                  {customerData.next_payment_date 
                    ? new Date(customerData.next_payment_date).toLocaleDateString()
                    : 'Not set'
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Recent Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          {workRequests.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No activity to display</p>
          ) : (
            <div className="space-y-3">
              {workRequests.slice(0, 5).map((request, index) => (
                <div key={request.id} className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                  <div className="flex-shrink-0">
                    {request.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {request.status === 'pending' && <Clock className="h-4 w-4 text-yellow-500" />}
                    {request.status === 'approved' && <TrendingUp className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{request.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(request.requested_at).toLocaleDateString()} • Status: {request.status}
                    </p>
                  </div>
                  <Badge variant={
                    request.status === 'completed' ? 'default' : 
                    request.status === 'pending' ? 'secondary' : 'outline'
                  }>
                    {request.hours_logged}h
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectAnalytics;