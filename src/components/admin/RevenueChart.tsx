import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface MonthlyRevenue {
  month: string;
  revenue: number;
  orderCount: number;
}

export function RevenueChart() {
  const [revenueData, setRevenueData] = useState<MonthlyRevenue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('amount, created_at, stripe_session_id')
        .not('stripe_session_id', 'is', null)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Group orders by month
      const monthlyData: { [key: string]: { revenue: number; count: number } } = {};
      let total = 0;

      orders?.forEach(order => {
        const date = new Date(order.created_at);
        const monthKey = date.toLocaleDateString('en-GB', { 
          year: 'numeric', 
          month: 'short' 
        });
        
        const revenue = order.amount / 100; // Convert from pence to pounds
        total += revenue;

        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { revenue: 0, count: 0 };
        }
        
        monthlyData[monthKey].revenue += revenue;
        monthlyData[monthKey].count += 1;
      });

      // Convert to array format for chart
      const chartData = Object.entries(monthlyData).map(([month, data]) => ({
        month,
        revenue: data.revenue,
        orderCount: data.count,
      }));

      // If no data, show last 6 months with zero values
      if (chartData.length === 0) {
        const lastSixMonths = [];
        for (let i = 5; i >= 0; i--) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          lastSixMonths.push({
            month: date.toLocaleDateString('en-GB', { 
              year: 'numeric', 
              month: 'short' 
            }),
            revenue: 0,
            orderCount: 0,
          });
        }
        setRevenueData(lastSixMonths);
      } else {
        setRevenueData(chartData);
      }
      
      setTotalRevenue(total);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 shadow-lg border border-border/50">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">
            Revenue: £{payload[0].value.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            {payload[0].payload.orderCount} orders
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="px-6 pb-6">
        <Card className="glass-card animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <Card className="glass-card hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="inline-flex rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Revenue Over Time
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Total: £{totalRevenue.toFixed(2)} • {revenueData.reduce((sum, d) => sum + d.orderCount, 0)} orders
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  opacity={0.3}
                />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `£${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="url(#revenueGradient)"
                  strokeWidth={3}
                  dot={{ 
                    fill: 'hsl(var(--primary))', 
                    strokeWidth: 2, 
                    stroke: 'hsl(var(--background))',
                    r: 6 
                  }}
                  activeDot={{ 
                    r: 8, 
                    fill: 'hsl(var(--primary))',
                    stroke: 'hsl(var(--background))',
                    strokeWidth: 3,
                  }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="50%" stopColor="hsl(220 70% 50%)" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {revenueData.length === 0 && (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No revenue data available yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}