import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactQuoteModal = ({ isOpen, onClose }: ContactQuoteModalProps) => {
  const { modalRef } = useModal({ isOpen, onClose });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const budgetOptions = [
    { value: 'under-5k', label: 'Under £5,000' },
    { value: '5k-15k', label: '£5,000 - £15,000' },
    { value: '15k-30k', label: '£15,000 - £30,000' },
    { value: 'over-30k', label: 'Over £30,000' },
    { value: 'not-sure', label: 'Not sure yet' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !budget || !message.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('work_requests')
        .insert([{ 
          customer_id: 'temp-' + Date.now(), // Temp ID for anonymous requests
          title: `Quote Request - ${budget}`,
          description: `Name: ${name.trim()}\nEmail: ${email.trim()}\nBudget: ${budget}\nMessage: ${message.trim()}`,
          status: 'pending'
        }]);

      if (error) throw error;

      // Send Discord notification
      const { error: discordError } = await supabase.functions.invoke('send-discord-notification', {
        body: {
          eventType: 'quote_request',
          data: {
            name: name.trim(),
            email: email.trim(),
            budget,
            message: message.trim().substring(0, 200) + (message.trim().length > 200 ? '...' : '')
          }
        }
      });

      if (discordError) {
        console.error('Discord notification failed:', discordError);
      }

      toast({
        title: "Quote request sent!",
        description: "We'll get back to you within 24 hours.",
      });
      onClose();
      setName('');
      setEmail('');
      setBudget('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/447586266007?text=Hi! I\'d like to discuss a project quote.', '_blank');
    onClose();
  };

  const titleId = "contact-quote-title";
  const descriptionId = "contact-quote-description";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        ref={modalRef}
        className="modal-default"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <DialogHeader>
          <DialogTitle id={titleId} className="modal-title">
            Tell us about your project
          </DialogTitle>
          <DialogDescription id={descriptionId} className="modal-subtitle">
            Get a personalized quote for your website project
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="modal-body space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-text-primary mb-2 block">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="premium-input"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-text-primary mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="premium-input"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="budget" className="text-sm font-medium text-text-primary mb-2 block">
              Budget Range
            </Label>
            <Select value={budget} onValueChange={setBudget} required>
              <SelectTrigger className="premium-input">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium text-text-primary mb-2 block">
              Project Details
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project, goals, and any specific requirements..."
              className="premium-input min-h-[100px] resize-none"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              type="submit" 
              className="btn-primary flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Get My Quote"}
            </Button>
            <Button 
              type="button" 
              onClick={handleWhatsAppClick}
              className="btn-secondary flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};