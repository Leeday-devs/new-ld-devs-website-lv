import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Edit,
  Save,
  X
} from "lucide-react";

interface WorkRequest {
  id: string;
  title: string;
  description: string | null;
  notes: string | null;
  status: 'pending' | 'approved' | 'declined' | 'completed';
  hours_logged: number;
  quote_price: number | null;
  requested_at: string;
  customer: {
    name: string;
    email: string;
    company: string | null;
  };
}

const WorkRequestsManagement = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<WorkRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRequest, setEditingRequest] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>("");

  useEffect(() => {
    fetchWorkRequests();
  }, []);

  const fetchWorkRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('work_requests')
        .select(`
          id,
          title,
          description,
          notes,
          status,
          hours_logged,
          quote_price,
          requested_at,
          customer:customers(name, email, company)
        `)
        .order('requested_at', { ascending: false });

      if (error) {
        console.error('Error fetching work requests:', error);
        toast({
          title: "Error",
          description: "Failed to fetch work requests.",
          variant: "destructive",
        });
        return;
      }

      setRequests((data || []) as any);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, status: WorkRequest['status']) => {
    try {
      const updateData: any = { 
        status,
        reviewed_at: new Date().toISOString()
      };

      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('work_requests')
        .update(updateData)
        .eq('id', requestId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update request status.",
          variant: "destructive",
        });
        return;
      }

      fetchWorkRequests();
      toast({
        title: "Success",
        description: `Request ${status} successfully.`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const updateQuotePrice = async (requestId: string, price: number) => {
    try {
      const { error } = await supabase
        .from('work_requests')
        .update({ quote_price: price } as any)
        .eq('id', requestId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update quote price.",
          variant: "destructive",
        });
        return;
      }

      fetchWorkRequests();
      setEditingRequest(null);
      toast({
        title: "Success",
        description: "Quote price updated successfully.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: WorkRequest['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'declined': return <XCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: WorkRequest['status']) => {
    switch (status) {
      case 'pending': return 'secondary' as const;
      case 'approved': return 'default' as const;
      case 'declined': return 'destructive' as const;
      case 'completed': return 'secondary' as const;
    }
  };

  if (loading) {
    return (
      <Card className="card-premium">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading work requests...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-premium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          Work Requests Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No work requests yet</h3>
            <p className="text-muted-foreground">
              Work requests from customers will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="card-subtle">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{request.title}</h3>
                        <Badge variant={getStatusVariant(request.status)} className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          {request.status}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-3">
                        <p className="font-medium">{request.customer.name}</p>
                        <p>{request.customer.email}</p>
                        {request.customer.company && <p>{request.customer.company}</p>}
                        <p>Requested: {new Date(request.requested_at).toLocaleDateString()}</p>
                      </div>
                      
                      {request.description && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Description:</p>
                          <p className="text-sm text-muted-foreground">{request.description}</p>
                        </div>
                      )}
                      
                      {request.notes && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Notes:</p>
                          <p className="text-sm text-muted-foreground">{request.notes}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Quote Price:</span>
                        {editingRequest === request.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm">£</span>
                            <Input
                              type="number"
                              step="0.01"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="w-24 h-8"
                              placeholder="0.00"
                            />
                            <Button
                              size="sm"
                              onClick={() => updateQuotePrice(request.id, parseFloat(editPrice))}
                              className="h-8 px-2"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingRequest(null)}
                              className="h-8 px-2"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>
                              {request.quote_price 
                                ? `£${request.quote_price.toFixed(2)}` 
                                : 'No quote set'
                              }
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingRequest(request.id);
                                setEditPrice(request.quote_price?.toString() || "0.00");
                              }}
                              className="h-6 px-2"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 min-w-[140px]">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateRequestStatus(request.id, 'approved')}
                            className="btn-premium"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateRequestStatus(request.id, 'declined')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </>
                      )}
                      
                      {request.status === 'approved' && (
                        <Button
                          size="sm"
                          onClick={() => updateRequestStatus(request.id, 'completed')}
                          className="btn-premium"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkRequestsManagement;