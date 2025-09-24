import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users, FolderOpen, Server } from "lucide-react";

interface StatsData {
  revenueThisMonth: number;
  activeProjects: number;
  newClientsThisMonth: number;
  hostingSubscriptions: number;
}

export function AdminStatsRow() {
  const [stats, setStats] = useState<StatsData>({
    revenueThisMonth: 0,
    activeProjects: 0,
    newClientsThisMonth: 0,
    hostingSubscriptions: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // Get revenue this month from completed orders
      const { data: revenueData } = await supabase
        .from('orders')
        .select('amount')
        .not('stripe_session_id', 'is', null)
        .gte('created_at', startOfMonth.toISOString())
        .lte('created_at', endOfMonth.toISOString());

      const revenueThisMonth = revenueData?.reduce((sum, order) => sum + (order.amount / 100), 0) || 0;

      // Get active projects (work requests in progress)
      const { data: activeProjectsData, count: activeProjects } = await supabase
        .from('work_requests')
        .select('*', { count: 'exact', head: true })
        .in('status', ['in_progress', 'quoted', 'accepted']);

      // Get new clients this month
      const { data: newClientsData, count: newClientsThisMonth } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfMonth.toISOString())
        .lte('created_at', endOfMonth.toISOString());

      // Get hosting subscriptions (customer services with hosting or customers with add_hosting)
      const { data: hostingServicesData, count: hostingFromServices } = await supabase
        .from('customer_services')
        .select('*', { count: 'exact', head: true })
        .ilike('service_name', '%hosting%')
        .eq('status', 'active');

      const { data: hostingOrdersData, count: hostingFromOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('customer_add_hosting', true)
        .not('stripe_session_id', 'is', null);

      const hostingSubscriptions = (hostingFromServices || 0) + (hostingFromOrders || 0);

      setStats({
        revenueThisMonth,
        activeProjects: activeProjects || 0,
        newClientsThisMonth: newClientsThisMonth || 0,
        hostingSubscriptions,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: "Revenue This Month",
      value: `£${stats.revenueThisMonth.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "from-green-500/10 to-green-600/5",
    },
    {
      title: "Active Projects",
      value: stats.activeProjects.toString(),
      icon: FolderOpen,
      color: "text-blue-600",
      bgColor: "from-blue-500/10 to-blue-600/5",
    },
    {
      title: "New Clients This Month",
      value: stats.newClientsThisMonth.toString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "from-purple-500/10 to-purple-600/5",
    },
    {
      title: "Hosting Subscriptions",
      value: stats.hostingSubscriptions.toString(),
      icon: Server,
      color: "text-orange-600",
      bgColor: "from-orange-500/10 to-orange-600/5",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 pb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="glass-card animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-muted rounded mb-2"></div>
              <div className="h-10 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 pb-6">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card 
            key={index} 
            className="glass-card hover-scale group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className={`inline-flex rounded-lg bg-gradient-to-br ${card.bgColor} p-3 mb-4`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {card.value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}