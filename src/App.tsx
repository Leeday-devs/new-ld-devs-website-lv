import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import DiscordNotificationTracker from "./components/DiscordNotificationTracker";
import { PopupManager } from "@/components/PopupManager";
import ErrorBoundary from "@/components/ErrorBoundary";
import Loading from "./components/Loading";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const UnifiedAuth = lazy(() => import("./pages/UnifiedAuth"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const CustomerDashboard = lazy(() => import("./pages/CustomerDashboard"));
const RequestWork = lazy(() => import("./pages/RequestWork"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCanceled = lazy(() => import("./pages/PaymentCanceled"));
const WebsiteTemplates = lazy(() => import("./pages/WebsiteTemplates"));
const TemplateDetail = lazy(() => import("./pages/TemplateDetail"));
const PlumberProDemo = lazy(() => import("./pages/PlumberProDemo"));
const ElectricianExpertDemo = lazy(() => import("./pages/ElectricianExpertDemo"));
const ModernBarberDemo = lazy(() => import("./pages/ModernBarberDemo"));
const RestaurantDeluxeDemo = lazy(() => import("./pages/RestaurantDeluxeDemo"));
const FitnessStudioDemo = lazy(() => import("./pages/FitnessStudioDemo"));
const AutoRepairDemo = lazy(() => import("./pages/AutoRepairDemo"));
const BusinessDetailsForm = lazy(() => import("./pages/BusinessDetailsForm"));
const BusinessDetailsSuccess = lazy(() => import("./pages/BusinessDetailsSuccess"));
const WebsiteSetupForm = lazy(() => import("./pages/WebsiteSetupForm"));
const WebsiteSetupThankYou = lazy(() => import("./pages/WebsiteSetupThankYou"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) return false;
        return failureCount < 2;
      },
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ErrorBoundary>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <DiscordNotificationTracker />
            <PopupManager />
            <Suspense fallback={<Loading message="Loading page..." />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<UnifiedAuth />} />
                <Route path="/admin/auth" element={<AdminAuth />} />
                <Route path="/admin/panel" element={<AdminPanel />} />
                <Route path="/dashboard" element={<CustomerDashboard />} />
                <Route path="/request-work" element={<RequestWork />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/templates" element={<WebsiteTemplates />} />
                <Route path="/templates/:templateId" element={<TemplateDetail />} />
                <Route path="/demo/plumber-pro" element={<PlumberProDemo />} />
                <Route path="/demo/electrician-expert" element={<ElectricianExpertDemo />} />
                <Route path="/demo/modern-barber" element={<ModernBarberDemo />} />
                <Route path="/demo/restaurant-deluxe" element={<RestaurantDeluxeDemo />} />
                <Route path="/demo/fitness-studio" element={<FitnessStudioDemo />} />
                <Route path="/demo/auto-repair" element={<AutoRepairDemo />} />
                <Route path="/business-details" element={<BusinessDetailsForm />} />
                <Route path="/business-details-success" element={<BusinessDetailsSuccess />} />
                <Route path="/website-setup" element={<WebsiteSetupForm />} />
                <Route path="/website-setup-thank-you" element={<WebsiteSetupThankYou />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-canceled" element={<PaymentCanceled />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
