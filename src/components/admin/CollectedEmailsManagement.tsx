import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Search, Download, Calendar, User, Building } from "lucide-react";
import { format } from "date-fns";

interface CollectedEmail {
  id: string;
  name?: string;
  email: string;
  source: string;
  date: string;
  businessName?: string;
  additionalInfo?: string;
}

export const CollectedEmailsManagement = () => {
  const [emails, setEmails] = useState<CollectedEmail[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<CollectedEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchCollectedEmails();
  }, []);

  useEffect(() => {
    // Filter emails based on search term
    const filtered = emails.filter(
      (email) =>
        email.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.source.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmails(filtered);
  }, [emails, searchTerm]);

  const fetchCollectedEmails = async () => {
    try {
      setLoading(true);
      const allEmails: CollectedEmail[] = [];

      // Fetch newsletter subscriptions
      const { data: newsletters, error: newsletterError } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (newsletterError) throw newsletterError;

      newsletters?.forEach((sub) => {
        allEmails.push({
          id: `newsletter-${sub.id}`,
          email: sub.email,
          source: 'Newsletter',
          date: sub.subscribed_at,
          additionalInfo: sub.status === 'active' ? 'Active' : 'Inactive'
        });
      });

      // Fetch contact submissions
      const { data: contacts, error: contactError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactError) throw contactError;

      contacts?.forEach((contact) => {
        allEmails.push({
          id: `contact-${contact.id}`,
          name: contact.name,
          email: contact.email,
          source: 'Contact Form',
          date: contact.created_at,
          additionalInfo: contact.subject || 'No subject'
        });
      });

      // Fetch customers
      const { data: customers, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (customerError) throw customerError;

      customers?.forEach((customer) => {
        allEmails.push({
          id: `customer-${customer.id}`,
          name: customer.name,
          email: customer.email,
          businessName: customer.company,
          source: 'Customer Registration',
          date: customer.created_at,
          additionalInfo: `${customer.plan_name} - ${customer.approval_status}`
        });
      });

      // Fetch template purchases
      const { data: templates, error: templateError } = await supabase
        .from('template_purchases')
        .select('*')
        .order('created_at', { ascending: false });

      if (templateError) throw templateError;

      templates?.forEach((template) => {
        allEmails.push({
          id: `template-${template.id}`,
          name: template.name || template.business_name,
          email: template.email,
          businessName: template.business_name,
          source: 'Template Purchase',
          date: template.created_at,
          additionalInfo: template.template_name
        });
      });

      // Fetch website setup submissions
      const { data: websites, error: websiteError } = await supabase
        .from('website_setup_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (websiteError) throw websiteError;

      websites?.forEach((website) => {
        allEmails.push({
          id: `website-${website.id}`,
          name: website.name,
          email: website.email,
          businessName: website.business_name,
          source: 'Website Setup',
          date: website.created_at,
          additionalInfo: 'Setup request'
        });
      });

      // Fetch orders
      const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (orderError) throw orderError;

      orders?.forEach((order) => {
        if (order.customer_email) {
          allEmails.push({
            id: `order-${order.id}`,
            name: order.customer_name,
            email: order.customer_email,
            businessName: order.customer_company,
            source: 'Order',
            date: order.created_at,
            additionalInfo: `${order.service_name} - $${order.amount/100} ${order.status}`
          });
        }
      });

      // Sort by date (newest first)
      allEmails.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setEmails(allEmails);
    } catch (error) {
      console.error('Error fetching collected emails:', error);
      toast({
        title: "Error",
        description: "Failed to load collected emails.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Business Name', 'Source', 'Date', 'Additional Info'];
    const csvContent = [
      headers.join(','),
      ...filteredEmails.map(email => [
        email.name || '',
        email.email,
        email.businessName || '',
        email.source,
        format(new Date(email.date), 'yyyy-MM-dd HH:mm:ss'),
        email.additionalInfo || ''
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `collected-emails-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
      title: "Success",
      description: "Email list exported to CSV.",
    });
  };

  const getSourceBadgeVariant = (source: string) => {
    switch (source) {
      case 'Newsletter':
        return 'default';
      case 'Contact Form':
        return 'secondary';
      case 'Customer Registration':
        return 'destructive';
      case 'Template Purchase':
        return 'outline';
      case 'Website Setup':
        return 'secondary';
      case 'Order':
        return 'default';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <Card className="card-premium">
        <CardContent className="p-6">
          <div className="text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
            <p className="text-muted-foreground">Loading collected emails...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="card-premium">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Collected Emails ({filteredEmails.length} total)
          </CardTitle>
          <Button onClick={exportToCSV} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, email, business, or source..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {['Newsletter', 'Contact Form', 'Customer Registration', 'Template Purchase', 'Website Setup', 'Order'].map(source => {
              const count = emails.filter(e => e.source === source).length;
              return (
                <div key={source} className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="font-semibold text-lg text-primary">{count}</div>
                  <div className="text-xs text-muted-foreground">{source}</div>
                </div>
              );
            })}
          </div>

          {/* Email List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredEmails.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No emails found matching your search.
              </div>
            ) : (
              filteredEmails.map((email) => (
                <div key={email.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        {email.name && (
                          <div className="flex items-center gap-1 text-sm">
                            <User className="h-3 w-3" />
                            <span className="font-medium">{email.name}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-sm text-primary">
                          <Mail className="h-3 w-3" />
                          <span>{email.email}</span>
                        </div>
                        {email.businessName && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Building className="h-3 w-3" />
                            <span>{email.businessName}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{format(new Date(email.date), 'MMM dd, yyyy HH:mm')}</span>
                        </div>
                        {email.additionalInfo && (
                          <span>• {email.additionalInfo}</span>
                        )}
                      </div>
                    </div>
                    
                    <Badge variant={getSourceBadgeVariant(email.source)}>
                      {email.source}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};