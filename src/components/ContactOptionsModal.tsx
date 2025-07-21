import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, MessageSquare } from "lucide-react";

interface ContactOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactOptionsModal = ({ isOpen, onClose }: ContactOptionsModalProps) => {
  const contactOptions = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Chat with us instantly",
      action: () => window.open('https://wa.me/447586266007', '_blank'),
      color: "bg-green-500 hover:bg-green-600",
      iconColor: "text-white"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us a detailed message",
      action: () => window.location.href = 'mailto:info@yourcompany.com',
      color: "bg-blue-500 hover:bg-blue-600",
      iconColor: "text-white"
    },
    {
      icon: Phone,
      title: "Call",
      description: "Speak with us directly",
      action: () => window.location.href = 'tel:+447586266007',
      color: "bg-purple-500 hover:bg-purple-600",
      iconColor: "text-white"
    },
    {
      icon: MessageSquare,
      title: "Text/SMS",
      description: "Send us a quick text",
      action: () => window.location.href = 'sms:+447586266007',
      color: "bg-orange-500 hover:bg-orange-600",
      iconColor: "text-white"
    }
  ];

  const handleOptionClick = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            How would you like to chat?
          </DialogTitle>
          <DialogDescription className="text-center">
            Choose your preferred way to get in touch with us
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {contactOptions.map((option) => (
            <Button
              key={option.title}
              onClick={() => handleOptionClick(option.action)}
              className={`${option.color} h-24 flex flex-col items-center justify-center gap-2 border-0 text-white transition-all duration-200 hover:scale-105`}
              variant="default"
            >
              <option.icon className={`h-6 w-6 ${option.iconColor}`} />
              <div className="text-center">
                <div className="font-semibold text-sm">{option.title}</div>
                <div className="text-xs opacity-90">{option.description}</div>
              </div>
            </Button>
          ))}
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            We typically respond within a few hours during business hours
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};