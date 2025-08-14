import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Cookie, 
  Users, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Search,
  Download,
  BarChart3,
  Shield,
  Target,
  Palette
} from "lucide-react";
import { format } from "date-fns";

interface CookieConsentData {
  id: string;
  user_id: string | null;
  session_id: string;
  ip_address: string | null;
  user_agent: string;
  consent_given: boolean;
  essential_cookies: boolean;
  analytics_cookies: boolean;
  marketing_cookies: boolean;
  preferences_cookies: boolean;
  consent_timestamp: string;
  updated_at: string;
  consent_version: string;
  page_url: string | null;
  referrer: string | null;
}

interface ConsentStats {
  total: number;
  accepted: number;
  rejected: number;
  analytics: number;
  marketing: number;
  preferences: number;
}

export const CookieConsentManagement = () => {
  const [consents, setConsents] = useState<CookieConsentData[]>([]);
  const [stats, setStats] = useState<ConsentStats>({
    total: 0,
    accepted: 0,
    rejected: 0,
    analytics: 0,
    marketing: 0,
    preferences: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchCookieConsents();
  }, []);

  const fetchCookieConsents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cookie_consents')
        .select('*')
        .order('consent_timestamp', { ascending: false });

      if (error) throw error;

      const consentsData = data as CookieConsentData[];
      setConsents(consentsData);

      // Calculate stats
      const stats: ConsentStats = {
        total: consentsData.length,
        accepted: consentsData.filter(c => c.consent_given).length,
        rejected: consentsData.filter(c => !c.consent_given).length,
        analytics: consentsData.filter(c => c.analytics_cookies).length,
        marketing: consentsData.filter(c => c.marketing_cookies).length,
        preferences: consentsData.filter(c => c.preferences_cookies).length,
      };
      
      setStats(stats);
    } catch (error) {
      console.error('Error fetching cookie consents:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const csvData = consents.map(consent => ({
      id: consent.id,
      user_id: consent.user_id || 'Anonymous',
      session_id: consent.session_id,
      ip_address: consent.ip_address || 'N/A',
      consent_given: consent.consent_given ? 'Yes' : 'No',
      essential_cookies: consent.essential_cookies ? 'Yes' : 'No',
      analytics_cookies: consent.analytics_cookies ? 'Yes' : 'No',
      marketing_cookies: consent.marketing_cookies ? 'Yes' : 'No',
      preferences_cookies: consent.preferences_cookies ? 'Yes' : 'No',
      consent_timestamp: format(new Date(consent.consent_timestamp), 'yyyy-MM-dd HH:mm:ss'),
      page_url: consent.page_url || 'N/A',
      user_agent: consent.user_agent
    }));

    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header as keyof typeof row]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cookie-consents-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredConsents = consents.filter(consent => {
    const matchesSearch = 
      consent.session_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (consent.ip_address && consent.ip_address.includes(searchTerm)) ||
      (consent.page_url && consent.page_url.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = filterType === "all" || 
      (filterType === "accepted" && consent.consent_given) ||
      (filterType === "rejected" && !consent.consent_given) ||
      (filterType === "analytics" && consent.analytics_cookies) ||
      (filterType === "marketing" && consent.marketing_cookies);

    return matchesSearch && matchesFilter;
  });

  const paginatedConsents = filteredConsents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredConsents.length / itemsPerPage);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            Cookie Consent Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading cookie consent data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Consents</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accepted</p>
                <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Analytics</p>
                <p className="text-2xl font-bold text-blue-600">{stats.analytics}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Marketing</p>
                <p className="text-2xl font-bold text-purple-600">{stats.marketing}</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Preferences</p>
                <p className="text-2xl font-bold text-orange-600">{stats.preferences}</p>
              </div>
              <Palette className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            Cookie Consent Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by session ID, IP, or page URL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="min-w-[200px]">
              <Label>Filter</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Records</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="analytics">Analytics Enabled</SelectItem>
                  <SelectItem value="marketing">Marketing Enabled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {paginatedConsents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No cookie consent records found.
              </div>
            ) : (
              paginatedConsents.map((consent) => (
                <Card key={consent.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={consent.consent_given ? "default" : "destructive"}>
                            {consent.consent_given ? "Accepted" : "Rejected"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Session: {consent.session_id.slice(0, 8)}...
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          <Badge variant={consent.essential_cookies ? "default" : "outline"}>
                            <Shield className="h-3 w-3 mr-1" />
                            Essential
                          </Badge>
                          <Badge variant={consent.analytics_cookies ? "default" : "outline"}>
                            <BarChart3 className="h-3 w-3 mr-1" />
                            Analytics
                          </Badge>
                          <Badge variant={consent.marketing_cookies ? "default" : "outline"}>
                            <Target className="h-3 w-3 mr-1" />
                            Marketing
                          </Badge>
                          <Badge variant={consent.preferences_cookies ? "default" : "outline"}>
                            <Palette className="h-3 w-3 mr-1" />
                            Preferences
                          </Badge>
                        </div>

                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>IP: {consent.ip_address || 'Unknown'}</p>
                          {consent.page_url && <p>Page: {consent.page_url}</p>}
                          {consent.referrer && <p>Referrer: {consent.referrer}</p>}
                          <p>User Agent: {consent.user_agent.slice(0, 60)}...</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(consent.consent_timestamp), 'MMM d, yyyy HH:mm')}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          v{consent.consent_version}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};