import { ReactNode } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <header className="border-b border-border bg-gradient-to-r from-background via-background to-background/80">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1" />
            </div>
            <div className="px-6 pb-6 pt-2">
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-lg p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                  Welcome back, Lee 👋
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Here's an overview of your business performance this month.
                </p>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}