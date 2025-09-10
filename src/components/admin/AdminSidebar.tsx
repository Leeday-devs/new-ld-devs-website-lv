import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Users, 
  Clock, 
  Shield, 
  BarChart3, 
  Mail, 
  Cookie, 
  Settings, 
  PenTool, 
  Home,
  LogOut,
  User,
  Database,
  MessageSquare
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/panel",
    icon: BarChart3,
    section: "dashboard"
  },
  {
    title: "Customer Info",
    url: "/admin/panel?tab=customer-info",
    icon: Database,
    section: "management"
  },
  {
    title: "Custom Quotes",
    url: "/admin/panel?tab=custom-quotes",
    icon: MessageSquare,
    section: "management"
  },
  {
    title: "Customers",
    url: "/admin/panel?tab=customers",
    icon: Users,
    section: "management"
  },
  {
    title: "Pending Requests",
    url: "/admin/panel?tab=pending",
    icon: Clock,
    section: "management"
  },
  {
    title: "Work Requests",
    url: "/admin/panel?tab=work-requests",
    icon: BarChart3,
    section: "management"
  },
  {
    title: "Banned Emails",
    url: "/admin/panel?tab=banned",
    icon: Shield,
    section: "security"
  },
  {
    title: "Collected Emails",
    url: "/admin/panel?tab=emails",
    icon: Mail,
    section: "communication"
  },
  {
    title: "Cookie Consent",
    url: "/admin/panel?tab=cookies",
    icon: Cookie,
    section: "communication"
  },
  {
    title: "Discord Settings",
    url: "/admin/panel?tab=discord",
    icon: Settings,
    section: "communication"
  },
  {
    title: "Blog Posts",
    url: "/admin/panel?tab=blog",
    icon: PenTool,
    section: "content"
  },
];

const sectionLabels = {
  dashboard: "Overview",
  management: "User Management",
  security: "Security",
  communication: "Communication",
  content: "Content Management"
};

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [currentTab, setCurrentTab] = useState("customers");

  const isCollapsed = state === "collapsed";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab") || "customers";
    setCurrentTab(tab);
  }, [location]);

  const isActive = (item: typeof menuItems[0]) => {
    if (item.section === "dashboard") {
      return location.pathname === "/admin/panel" && !location.search;
    }
    return location.search.includes(`tab=${item.url.split("tab=")[1]}`);
  };

  const getNavCls = (item: typeof menuItems[0]) =>
    isActive(item) ? "bg-primary text-primary-foreground font-medium" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

  const handleSignOut = async () => {
    if (confirm("Are you sure you want to logout?")) {
      await signOut();
    }
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">LD Development</h2>
              <p className="text-sm text-sidebar-foreground/70">Management Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {Object.entries(groupedItems).map(([section, items]) => (
          <SidebarGroup key={section}>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider font-semibold">
              {sectionLabels[section as keyof typeof sectionLabels]}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={getNavCls(item)}>
                      <NavLink to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/" className="flex items-center gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground">
                <Home className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>Back to Website</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        {user && (
          <div className="mt-4 space-y-2">
            {!isCollapsed && (
              <div className="px-3 py-2 text-xs text-sidebar-foreground/70">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>
            )}
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleSignOut}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  {!isCollapsed && <span>Sign out</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}