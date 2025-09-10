import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Clock, Save, Trash2 } from "lucide-react";

interface PromoStripData {
  id?: string;
  text: string;
  end_date: string;
  is_active: boolean;
  background_color: string;
  text_color: string;
}

const PromoStripManagement = () => {
  const [promoData, setPromoData] = useState<PromoStripData>({
    text: "20% OFF ALL Website Builds Limited time only!",
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    is_active: true,
    background_color: "#ef4444",
    text_color: "#ffffff"
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPromoData();
  }, []);

  const fetchPromoData = async () => {
    try {
      const { data, error } = await supabase
        .from('promo_strips')
        .select('*')
        .eq('is_active', true)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching promo data:', error);
        return;
      }
      
      if (data) {
        setPromoData({
          ...data,
          end_date: new Date(data.end_date).toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Convert date to ISO string for storage
      const endDateTime = new Date(`${promoData.end_date}T23:59:59`).toISOString();

      const promoToSave = {
        text: promoData.text,
        end_date: endDateTime,
        is_active: promoData.is_active,
        background_color: promoData.background_color,
        text_color: promoData.text_color
      };

      let result;
      if (promoData.id) {
        // Update existing
        result = await supabase
          .from('promo_strips')
          .update(promoToSave)
          .eq('id', promoData.id);
      } else {
        // Create new
        result = await supabase
          .from('promo_strips')
          .insert([promoToSave]);
      }

      if (result.error) {
        throw result.error;
      }

      toast({
        title: "Success",
        description: "Promo strip saved successfully",
      });

      // Refresh data
      fetchPromoData();
    } catch (error) {
      console.error('Error saving promo:', error);
      toast({
        title: "Error",
        description: "Failed to save promo strip",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!promoData.id) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('promo_strips')
        .delete()
        .eq('id', promoData.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Promo strip deleted successfully",
      });

      // Reset to default
      setPromoData({
        text: "20% OFF ALL Website Builds Limited time only!",
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        is_active: true,
        background_color: "#ef4444",
        text_color: "#ffffff"
      });
    } catch (error) {
      console.error('Error deleting promo:', error);
      toast({
        title: "Error",
        description: "Failed to delete promo strip",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Promo Strip Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Promotional Banner Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Preview */}
          {promoData.is_active && (
            <div className="mb-6">
              <Label>Preview</Label>
              <div 
                className="mt-2 py-3 px-4 text-center text-sm font-bold rounded-lg"
                style={{
                  backgroundColor: promoData.background_color,
                  color: promoData.text_color,
                }}
              >
                <Clock className="inline h-4 w-4 mr-2" />
                {promoData.text}
                <span className="ml-4 bg-black/20 px-2 py-1 rounded text-xs font-mono">
                  Timer: 2d:14h:30m:45s
                </span>
              </div>
            </div>
          )}

          {/* Active Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={promoData.is_active}
              onCheckedChange={(checked) => 
                setPromoData(prev => ({ ...prev, is_active: checked }))
              }
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          {/* Promo Text */}
          <div className="space-y-2">
            <Label htmlFor="text">Promo Text</Label>
            <Textarea
              id="text"
              value={promoData.text}
              onChange={(e) => 
                setPromoData(prev => ({ ...prev, text: e.target.value }))
              }
              placeholder="Enter promotional message..."
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="end_date">End Date</Label>
            <Input
              id="end_date"
              type="date"
              value={promoData.end_date}
              onChange={(e) => 
                setPromoData(prev => ({ ...prev, end_date: e.target.value }))
              }
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="background_color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="background_color"
                  type="color"
                  value={promoData.background_color}
                  onChange={(e) => 
                    setPromoData(prev => ({ ...prev, background_color: e.target.value }))
                  }
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={promoData.background_color}
                  onChange={(e) => 
                    setPromoData(prev => ({ ...prev, background_color: e.target.value }))
                  }
                  placeholder="#ef4444"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text_color">Text Color</Label>
              <div className="flex gap-2">
                <Input
                  id="text_color"
                  type="color"
                  value={promoData.text_color}
                  onChange={(e) => 
                    setPromoData(prev => ({ ...prev, text_color: e.target.value }))
                  }
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={promoData.text_color}
                  onChange={(e) => 
                    setPromoData(prev => ({ ...prev, text_color: e.target.value }))
                  }
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isLoading ? "Saving..." : "Save"}
            </Button>
            
            {promoData.id && (
              <Button
                onClick={handleDelete}
                disabled={isLoading}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromoStripManagement;