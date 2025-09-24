import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FolderPlus, 
  Receipt, 
  Server, 
  FileText,
  ArrowRight
} from "lucide-react";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

export function QuickActionsRow() {
  const quickActions: QuickAction[] = [
    {
      id: 'create-project',
      title: 'Create New Project',
      description: 'Start a new client project',
      icon: FolderPlus,
      onClick: () => {
        // TODO: Navigate to create project page or open modal
        console.log('Create new project');
      }
    },
    {
      id: 'send-invoice',
      title: 'Send Invoice',
      description: 'Generate payment link',
      icon: Receipt,
      onClick: () => {
        // TODO: Open invoice/payment link modal
        console.log('Send invoice');
      }
    },
    {
      id: 'assign-hosting',
      title: 'Assign Hosting Plan',
      description: 'Set up client hosting',
      icon: Server,
      onClick: () => {
        // TODO: Open hosting assignment modal
        console.log('Assign hosting plan');
      }
    },
    {
      id: 'generate-contract',
      title: 'Generate Contract',
      description: 'Create client agreement',
      icon: FileText,
      onClick: () => {
        // TODO: Open contract generation modal
        console.log('Generate contract');
      }
    }
  ];

  return (
    <div className="px-6 pb-6">
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">
              Common tasks and shortcuts for managing your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              
              return (
                <Button
                  key={action.id}
                  onClick={action.onClick}
                  variant="ghost"
                  className="quick-action-btn group relative h-auto p-6 flex flex-col items-center text-center space-y-3 rounded-xl border border-border/50 bg-gradient-to-br from-background/80 to-background/60 hover:from-primary/10 hover:to-primary/5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Icon container with orange gradient on hover */}
                  <div className="relative p-4 rounded-full bg-gradient-to-br from-muted/50 to-muted/30 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    
                    {/* Hover arrow indicator */}
                    <div className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                      <div className="bg-primary rounded-full p-1">
                        <ArrowRight className="h-3 w-3 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-300">
                      {action.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                  
                  {/* Subtle animated background gradient on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}