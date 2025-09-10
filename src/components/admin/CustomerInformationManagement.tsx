import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Mail, 
  ShoppingCart, 
  Globe, 
  Cookie, 
  FileText, 
  Eye,
  Download,
  Search,
  Calendar,
  Phone,
  Building,
  CreditCard
} from "lucide-react";
import { format } from "date-fns";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status?: string;
  created_at: string;
}

interface NewsletterSubscription {
  id: string;
  email: string;
  status?: string;
  subscribed_at: string;
}

interface TemplatePurchase {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  business_name: string;
  template_name: string;
  services_offered?: string;
  color_preferences?: string;
  status: string;
  submitted_at: string;
}

interface WebsiteSetup {
  id: string;
  name: string;
  email: string;
  phone?: string;
  business_name: string;
  services_offered?: string;
  style_preferences?: string;
  created_at: string;
}

interface Order {
  id: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_company?: string;
  service_name?: string;
  amount: number;
  currency?: string;
  status?: string;
  created_at: string;
}

interface CookieConsent {
  id: string;
  ip_address?: string | null;
  consent_given: boolean;
  essential_cookies: boolean;
  analytics_cookies: boolean;
  marketing_cookies: boolean;
  page_url?: string;
  consent_timestamp: string;
}

export function CustomerInformationManagement() {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [newsletterSubs, setNewsletterSubs] = useState<NewsletterSubscription[]>([]);
  const [templatePurchases, setTemplatePurchases] = useState<TemplatePurchase[]>([]);
  const [websiteSetups, setWebsiteSetups] = useState<WebsiteSetup[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cookieConsents, setCookieConsents] = useState<CookieConsent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllCustomerData();
  }, []);

  const fetchAllCustomerData = async () => {
    setIsLoading(true);
    try {
      // Fetch all customer information in parallel
      const [
        contactData,
        newsletterData,
        templateData,
        websiteData,
        orderData,
        cookieData
      ] = await Promise.all([
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('newsletter_subscriptions').select('*').order('subscribed_at', { ascending: false }),
        supabase.from('template_purchases').select('*').order('submitted_at', { ascending: false }),
        supabase.from('website_setup_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('cookie_consents').select('*').order('consent_timestamp', { ascending: false })
      ]);

      if (contactData.error) throw contactData.error;
      if (newsletterData.error) throw newsletterData.error;
      if (templateData.error) throw templateData.error;
      if (websiteData.error) throw websiteData.error;
      if (orderData.error) throw orderData.error;
      if (cookieData.error) throw cookieData.error;

      setContactSubmissions(contactData.data || []);
      setNewsletterSubs(newsletterData.data || []);
      setTemplatePurchases(templateData.data || []);
      setWebsiteSetups(websiteData.data || []);
      setOrders(orderData.data || []);
      setCookieConsents((cookieData.data as CookieConsent[]) || []);

    } catch (error) {
      console.error('Error fetching customer data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch customer information.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = (data: any[], filename: string) => {
    const csv = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(item => Object.values(item).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status?: string) => {
    const statusColors = {
      new: "bg-blue-500",
      pending: "bg-yellow-500",
      completed: "bg-green-500",
      cancelled: "bg-red-500",
      active: "bg-green-500",
      submitted: "bg-blue-500"
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || "bg-gray-500"}>
        {status || 'Unknown'}
      </Badge>
    );
  };

  const filterData = (data: any[], searchFields: string[]) => {
    if (!searchTerm) return data;
    return data.filter(item =>
      searchFields.some(field =>
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading customer information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Information</h1>
          <p className="text-muted-foreground mt-1">All customer data collected from your website</p>
        </div>
        <Button onClick={fetchAllCustomerData} variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      <div className="flex items-center space-x-2 max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search across all customer data..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact ({contactSubmissions.length})
          </TabsTrigger>
          <TabsTrigger value="newsletter" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Newsletter ({newsletterSubs.length})
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Templates ({templatePurchases.length})
          </TabsTrigger>
          <TabsTrigger value="websites" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Websites ({websiteSetups.length})
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Orders ({orders.length})
          </TabsTrigger>
          <TabsTrigger value="cookies" className="flex items-center gap-2">
            <Cookie className="h-4 w-4" />
            Cookies ({cookieConsents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Form Submissions
              </CardTitle>
              <Button
                onClick={() => exportData(contactSubmissions, 'contact-submissions')}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterData(contactSubmissions, ['name', 'email', 'subject', 'message']).map((submission) => (
                  <div key={submission.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{submission.name}</h3>
                        <p className="text-sm text-muted-foreground">{submission.email}</p>
                        {submission.subject && (
                          <p className="text-sm font-medium mt-1">Subject: {submission.subject}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(submission.status)}
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(submission.created_at), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm bg-muted p-2 rounded">{submission.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="newsletter">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Newsletter Subscriptions
              </CardTitle>
              <Button
                onClick={() => exportData(newsletterSubs, 'newsletter-subscriptions')}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filterData(newsletterSubs, ['email']).map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{sub.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(sub.status)}
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(sub.subscribed_at), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Template Purchases
              </CardTitle>
              <Button
                onClick={() => exportData(templatePurchases, 'template-purchases')}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterData(templatePurchases, ['name', 'email', 'business_name', 'template_name']).map((purchase) => (
                  <div key={purchase.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{purchase.name || 'N/A'}</h3>
                        <p className="text-sm text-muted-foreground">{purchase.email}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm">
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {purchase.business_name}
                          </span>
                          {purchase.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {purchase.phone}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(purchase.status)}
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(purchase.submitted_at), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded space-y-1">
                      <p><strong>Template:</strong> {purchase.template_name}</p>
                      {purchase.services_offered && (
                        <p><strong>Services:</strong> {purchase.services_offered}</p>
                      )}
                      {purchase.color_preferences && (
                        <p><strong>Colors:</strong> {purchase.color_preferences}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="websites">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Website Setup Requests
              </CardTitle>
              <Button
                onClick={() => exportData(websiteSetups, 'website-setups')}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterData(websiteSetups, ['name', 'email', 'business_name']).map((setup) => (
                  <div key={setup.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{setup.name}</h3>
                        <p className="text-sm text-muted-foreground">{setup.email}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm">
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {setup.business_name}
                          </span>
                          {setup.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {setup.phone}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(setup.created_at), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    {(setup.services_offered || setup.style_preferences) && (
                      <div className="bg-muted p-3 rounded space-y-1">
                        {setup.services_offered && (
                          <p><strong>Services:</strong> {setup.services_offered}</p>
                        )}
                        {setup.style_preferences && (
                          <p><strong>Style Preferences:</strong> {setup.style_preferences}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Orders
              </CardTitle>
              <Button
                onClick={() => exportData(orders, 'orders')}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterData(orders, ['customer_name', 'customer_email', 'service_name']).map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{order.customer_name || 'N/A'}</h3>
                        <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm">
                          {order.customer_company && (
                            <span className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {order.customer_company}
                            </span>
                          )}
                          {order.customer_phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {order.customer_phone}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.status)}
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(order.created_at), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <p><strong>Service:</strong> {order.service_name}</p>
                      <p><strong>Amount:</strong> ${(order.amount / 100).toFixed(2)} {(order.currency || 'USD').toUpperCase()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cookies">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                Cookie Consents
              </CardTitle>
              <Button
                onClick={() => exportData(cookieConsents, 'cookie-consents')}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filterData(cookieConsents, ['ip_address', 'page_url']).map((consent) => (
                  <div key={consent.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">IP: {consent.ip_address || 'Anonymous'}</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <Badge variant={consent.essential_cookies ? "default" : "secondary"}>
                          Essential
                        </Badge>
                        <Badge variant={consent.analytics_cookies ? "default" : "secondary"}>
                          Analytics
                        </Badge>
                        <Badge variant={consent.marketing_cookies ? "default" : "secondary"}>
                          Marketing
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(consent.consent_timestamp), 'MMM dd, yyyy HH:mm')}
                      </div>
                      {consent.page_url && (
                        <div className="text-xs text-muted-foreground truncate max-w-40">
                          {consent.page_url}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}