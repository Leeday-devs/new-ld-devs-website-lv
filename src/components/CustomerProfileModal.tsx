import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Building, Mail, Globe } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  company: string | null;
  website_url: string | null;
  phone: string | null;
}

interface CustomerProfileModalProps {
  open: boolean;
  onClose: () => void;
  customer: Customer;
  onSuccess: () => void;
}

const CustomerProfileModal = ({ open, onClose, customer, onSuccess }: CustomerProfileModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (customer) {
      setName(customer.name || '');
      setEmail(customer.email || '');
      setCompany(customer.company || '');
      setWebsiteUrl(customer.website_url || '');
      setPhone(customer.phone || '');
    }
  }, [customer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('customers')
        .update({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || null,
          website_url: websiteUrl.trim() || null,
          phone: phone.trim() || null,
        })
        .eq('id', customer.id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update profile. Please try again.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Your profile has been updated successfully.',
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="modal-default">
        <DialogHeader>
          <DialogTitle className="modal-title flex items-center gap-2">
            <User className="h-5 w-5" />
            Edit Profile
          </DialogTitle>
          <DialogDescription className="modal-subtitle">
            Update your profile information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="modal-body space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name" className="modal-label">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="modal-input min-h-[48px] text-base pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="modal-label">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="modal-input min-h-[48px] text-base pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="company" className="modal-label">Company</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="company"
                  type="text"
                  placeholder="Enter your company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="modal-input min-h-[48px] text-base pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="website" className="modal-label">Website URL</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="website"
                  type="url"
                  placeholder="https://your-website.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="modal-input min-h-[48px] text-base pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="modal-label">Phone Number</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="modal-input min-h-[48px] text-base pl-10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="min-h-[48px] touch-manipulation"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-premium min-h-[48px] touch-manipulation"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerProfileModal;