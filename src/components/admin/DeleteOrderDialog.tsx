import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface OrderForm {
  id: string;
  customer_name: string;
  customer_email: string;
  service_name: string;
  amount: number;
}

interface DeleteOrderDialogProps {
  order: OrderForm | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteOrderDialog({ order, isOpen, onClose, onDeleted }: DeleteOrderDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (!order) return null;

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', order.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Order deleted successfully.",
      });

      onDeleted();
      onClose();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast({
        title: "Error",
        description: "Failed to delete order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Order</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this order from{' '}
            <strong>{order.customer_name}</strong> ({order.customer_email})?
            <br />
            <br />
            <strong>Service:</strong> {order.service_name}
            <br />
            <strong>Amount:</strong> £{(order.amount / 100).toFixed(2)}
            <br />
            <br />
            This action cannot be undone and will permanently remove the order from your records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Delete Order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}