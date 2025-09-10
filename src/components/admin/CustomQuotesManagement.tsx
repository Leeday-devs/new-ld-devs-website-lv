import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  MessageSquare, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  DollarSign, 
  Clock, 
  FileText,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw
} from "lucide-react";

interface CustomQuoteRequest {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type: string;
  project_description: string;
  budget_range?: string;
  timeline?: string;
  special_requirements?: string;
  has_existing_branding: boolean;
  needs_hosting: boolean;
  needs_maintenance: boolean;
  status: string;
  admin_notes?: string;
  quote_amount?: number;
  quoted_at?: string;
  quoted_by?: string;
}

export const CustomQuotesManagement = () => {
  const [quotes, setQuotes] = useState<CustomQuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<CustomQuoteRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [quoteAmount, setQuoteAmount] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const { toast } = useToast();

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch custom quotes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'reviewed': return 'bg-blue-500';
      case 'quoted': return 'bg-green-500';
      case 'converted': return 'bg-purple-500';
      case 'declined': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getProjectTypeLabel = (type: string) => {
    switch (type) {
      case 'website': return 'Website Development';
      case 'mobile_app': return 'Mobile App';
      case 'ai_automation': return 'AI Automation';
      case 'custom_software': return 'Custom Software';
      case 'other': return 'Other';
      default: return type;
    }
  };

  const getBudgetRangeLabel = (range: string) => {
    switch (range) {
      case 'under_1k': return 'Under £1,000';
      case '1k_5k': return '£1,000 - £5,000';
      case '5k_10k': return '£5,000 - £10,000';
      case '10k_25k': return '£10,000 - £25,000';
      case '25k_plus': return '£25,000+';
      case 'discuss': return "Let's discuss";
      default: return range;
    }
  };

  const getTimelineLabel = (timeline: string) => {
    switch (timeline) {
      case 'urgent': return 'Urgent (ASAP)';
      case '1_month': return 'Within 1 month';
      case '2_3_months': return '2-3 months';
      case '3_6_months': return '3-6 months';
      case 'flexible': return "I'm flexible";
      default: return timeline;
    }
  };

  const handleViewDetails = (quote: CustomQuoteRequest) => {
    setSelectedQuote(quote);
    setAdminNotes(quote.admin_notes || '');
    setQuoteAmount(quote.quote_amount?.toString() || '');
    setNewStatus(quote.status);
    setIsDetailModalOpen(true);
  };

  const handleUpdateQuote = async () => {
    if (!selectedQuote) return;

    setIsUpdating(true);
    try {
      const updates: any = {
        admin_notes: adminNotes,
        status: newStatus,
        updated_at: new Date().toISOString()
      };

      if (quoteAmount) {
        updates.quote_amount = parseFloat(quoteAmount);
        if (newStatus === 'quoted') {
          updates.quoted_at = new Date().toISOString();
        }
      }

      const { error } = await supabase
        .from('custom_quote_requests')
        .update(updates)
        .eq('id', selectedQuote.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Quote request updated successfully"
      });

      fetchQuotes();
      setIsDetailModalOpen(false);
    } catch (error) {
      console.error('Error updating quote:', error);
      toast({
        title: "Error",
        description: "Failed to update quote request",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading custom quotes...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Custom Quote Requests</h1>
          <p className="text-muted-foreground">Manage and respond to custom project quotes</p>
        </div>
        <Button onClick={fetchQuotes} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {quotes.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No custom quote requests found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {quotes.map((quote) => (
            <Card key={quote.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {quote.name}
                      {quote.company && (
                        <span className="text-muted-foreground text-sm">• {quote.company}</span>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {quote.email}
                      </span>
                      {quote.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {quote.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(quote.created_at).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusBadgeColor(quote.status)} text-white`}>
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium">Project Type</Label>
                    <p className="text-sm text-muted-foreground">{getProjectTypeLabel(quote.project_type)}</p>
                  </div>
                  {quote.budget_range && (
                    <div>
                      <Label className="text-sm font-medium">Budget Range</Label>
                      <p className="text-sm text-muted-foreground">{getBudgetRangeLabel(quote.budget_range)}</p>
                    </div>
                  )}
                  {quote.timeline && (
                    <div>
                      <Label className="text-sm font-medium">Timeline</Label>
                      <p className="text-sm text-muted-foreground">{getTimelineLabel(quote.timeline)}</p>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <Label className="text-sm font-medium">Project Description</Label>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                    {quote.project_description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {quote.has_existing_branding && (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Has Branding
                      </span>
                    )}
                    {quote.needs_hosting && (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Needs Hosting
                      </span>
                    )}
                    {quote.needs_maintenance && (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-purple-500" />
                        Needs Maintenance
                      </span>
                    )}
                  </div>
                  <Button 
                    onClick={() => handleViewDetails(quote)}
                    variant="outline" 
                    size="sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Quote Request Details
            </DialogTitle>
          </DialogHeader>

          {selectedQuote && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label>Name</Label>
                    <p className="text-muted-foreground">{selectedQuote.name}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-muted-foreground">{selectedQuote.email}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p className="text-muted-foreground">{selectedQuote.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label>Company</Label>
                    <p className="text-muted-foreground">{selectedQuote.company || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="font-semibold mb-3">Project Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <Label>Project Type</Label>
                    <p className="text-muted-foreground">{getProjectTypeLabel(selectedQuote.project_type)}</p>
                  </div>
                  <div>
                    <Label>Budget Range</Label>
                    <p className="text-muted-foreground">{selectedQuote.budget_range ? getBudgetRangeLabel(selectedQuote.budget_range) : 'Not specified'}</p>
                  </div>
                  <div>
                    <Label>Timeline</Label>
                    <p className="text-muted-foreground">{selectedQuote.timeline ? getTimelineLabel(selectedQuote.timeline) : 'Not specified'}</p>
                  </div>
                  <div>
                    <Label>Project Description</Label>
                    <p className="text-muted-foreground whitespace-pre-wrap">{selectedQuote.project_description}</p>
                  </div>
                  {selectedQuote.special_requirements && (
                    <div>
                      <Label>Special Requirements</Label>
                      <p className="text-muted-foreground whitespace-pre-wrap">{selectedQuote.special_requirements}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Services */}
              <div>
                <h3 className="font-semibold mb-3">Additional Services</h3>
                <div className="flex gap-4 text-sm">
                  <div className={`flex items-center gap-2 ${selectedQuote.has_existing_branding ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {selectedQuote.has_existing_branding ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    Has Existing Branding
                  </div>
                  <div className={`flex items-center gap-2 ${selectedQuote.needs_hosting ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {selectedQuote.needs_hosting ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    Needs Hosting
                  </div>
                  <div className={`flex items-center gap-2 ${selectedQuote.needs_maintenance ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {selectedQuote.needs_maintenance ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    Needs Maintenance
                  </div>
                </div>
              </div>

              {/* Admin Management */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Admin Management</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={newStatus} onValueChange={setNewStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="quoted">Quoted</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="declined">Declined</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quoteAmount">Quote Amount (£)</Label>
                      <Input
                        id="quoteAmount"
                        type="number"
                        value={quoteAmount}
                        onChange={(e) => setQuoteAmount(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="adminNotes">Admin Notes</Label>
                    <Textarea
                      id="adminNotes"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add internal notes about this quote request..."
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleUpdateQuote}
                      disabled={isUpdating}
                      className="flex-1"
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Update Quote
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};