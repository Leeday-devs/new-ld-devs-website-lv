import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  TrendingUp,
  AlertCircle,
  Heart,
  Search,
  Loader2,
  RefreshCw,
  Activity,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Customer {
  id: string;
  name: string;
  email: string;
  company: string | null;
  plan_name: string;
  payment_amount: number;
  next_payment_date: string | null;
  created_at: string;
  approval_status: string;
  user_id: string | null;
}

interface CustomerHealth {
  customerId: string;
  name: string;
  email: string;
  company: string | null;
  score: number;
  status: 'healthy' | 'at-risk' | 'critical';
  risks: string[];
  engagement: number; // 0-100
  paymentReliability: number; // 0-100
  activityDays: number; // days since last activity
}

export function CustomerHealthScoring() {
  const [customers, setCustomers] = useState<CustomerHealth[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerHealth[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [healthFilter, setHealthFilter] = useState("all");
  const [sortBy, setSortBy] = useState("score-desc");
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomerHealth();
  }, []);

  useEffect(() => {
    filterAndSortCustomers();
  }, [customers, searchTerm, healthFilter, sortBy]);

  const fetchCustomerHealth = async () => {
    setIsLoading(true);
    try {
      // Fetch customers
      const { data: customersData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (customerError) throw customerError;

      // Fetch orders to calculate payment reliability
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('user_id, stripe_session_id');

      if (ordersError) throw ordersError;

      // Calculate health scores
      const healthScores = (customersData || []).map(customer => {
        const customerOrders = (ordersData || []).filter(o => o.user_id === customer.user_id);
        const completedOrders = customerOrders.filter(o => o.stripe_session_id !== null).length;
        const paymentReliability = customerOrders.length > 0
          ? (completedOrders / customerOrders.length) * 100
          : 50;

        // Calculate engagement (days since creation)
        const createdDate = new Date(customer.created_at);
        const now = new Date();
        const daysSinceCreation = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
        const engagement = Math.min(100, (daysSinceCreation / 180) * 100); // Max 6 months

        // Calculate activity (next payment date)
        let activityDays = 0;
        if (customer.next_payment_date) {
          const nextPaymentDate = new Date(customer.next_payment_date);
          activityDays = Math.floor((now.getTime() - nextPaymentDate.getTime()) / (1000 * 60 * 60 * 24));
        }

        // Identify risks
        const risks: string[] = [];
        if (paymentReliability < 70) risks.push('Low payment reliability');
        if (activityDays > 30) risks.push('Overdue payment');
        if (customer.approval_status !== 'approved') risks.push('Not yet approved');
        if (engagement < 30) risks.push('New customer - low engagement');

        // Calculate overall score (0-100)
        const score = Math.round(
          (paymentReliability * 0.5) + // 50% weight
          (engagement * 0.3) + // 30% weight
          (100 - Math.min(100, activityDays * 2)) * 0.2 // 20% weight (penalize overdue)
        );

        // Determine status
        let status: 'healthy' | 'at-risk' | 'critical';
        if (score >= 80) status = 'healthy';
        else if (score >= 60) status = 'at-risk';
        else status = 'critical';

        return {
          customerId: customer.id,
          name: customer.name,
          email: customer.email,
          company: customer.company,
          score,
          status,
          risks,
          engagement,
          paymentReliability,
          activityDays
        };
      });

      setCustomers(healthScores);
    } catch (error) {
      console.error('Error fetching customer health:', error);
      toast({
        title: "Error",
        description: "Failed to calculate customer health scores.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortCustomers = () => {
    let filtered = customers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Health filter
    if (healthFilter !== "all") {
      filtered = filtered.filter(customer => customer.status === healthFilter);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "score-desc":
          return b.score - a.score;
        case "score-asc":
          return a.score - b.score;
        case "risk-high":
          return a.risks.length - b.risks.length;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredCustomers(filtered);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'at-risk':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Calculating customer health scores...</p>
        </div>
      </div>
    );
  }

  const healthyCount = customers.filter(c => c.status === 'healthy').length;
  const atRiskCount = customers.filter(c => c.status === 'at-risk').length;
  const criticalCount = customers.filter(c => c.status === 'critical').length;
  const avgScore = customers.length > 0
    ? Math.round(customers.reduce((sum, c) => sum + c.score, 0) / customers.length)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Health Scoring</h1>
          <p className="text-muted-foreground mt-1">
            Monitor customer engagement, payment reliability, and churn risk
          </p>
        </div>
        <Button onClick={fetchCustomerHealth} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Recalculate
        </Button>
      </div>

      {/* Health Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Health</p>
                <p className={`text-3xl font-bold mt-1 ${getScoreColor(avgScore)}`}>{avgScore}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Healthy</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{healthyCount}</p>
              </div>
              <Heart className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">At Risk</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{atRiskCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{criticalCount}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Customer Scores
          </CardTitle>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={healthFilter} onValueChange={setHealthFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score-desc">Score (High to Low)</SelectItem>
                <SelectItem value="score-asc">Score (Low to High)</SelectItem>
                <SelectItem value="risk-high">Most Risks First</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No customers match your criteria.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[700px] overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.customerId}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-3 rounded-full ${getScoreBg(customer.score)}`}>
                      <p className={`text-xl font-bold ${getScoreColor(customer.score)}`}>
                        {customer.score}
                      </p>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{customer.name}</h3>
                        <Badge className={getStatusBadge(customer.status)}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                      {customer.company && (
                        <p className="text-xs text-muted-foreground">{customer.company}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="text-xs space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-muted-foreground">Payment Reliability:</span>
                          <span className="font-semibold">{Math.round(customer.paymentReliability)}%</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-muted-foreground">Engagement:</span>
                          <span className="font-semibold">{Math.round(customer.engagement)}%</span>
                        </div>
                      </div>
                    </div>

                    {customer.risks.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-end">
                        {customer.risks.slice(0, 2).map((risk, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {risk}
                          </Badge>
                        ))}
                        {customer.risks.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{customer.risks.length - 2} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scoring Methodology */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scoring Methodology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div>
            <strong className="text-foreground">Score Calculation:</strong>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Payment Reliability (50%): % of completed orders vs total orders</li>
              <li>Engagement (30%): Days since account creation</li>
              <li>Payment Activity (20%): Days since last payment (penalizes overdue)</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mt-4 pt-4 border-t">
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="font-semibold text-green-900">Healthy (80-100)</p>
              <p className="text-xs text-green-800 mt-1">Reliable payment history & good engagement</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <p className="font-semibold text-orange-900">At Risk (60-79)</p>
              <p className="text-xs text-orange-800 mt-1">Some payment issues or low engagement</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <p className="font-semibold text-red-900">Critical (0-59)</p>
              <p className="text-xs text-red-800 mt-1">High churn risk or payment problems</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
