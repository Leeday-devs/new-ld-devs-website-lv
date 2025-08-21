import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import DiscordNotificationTracker from "./components/DiscordNotificationTracker";
import { CookieBanner } from "./components/CookieBanner";
import { PopupManager } from "@/components/PopupManager";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import UnifiedAuth from "./pages/UnifiedAuth";
import AdminAuth from "./pages/AdminAuth";
import AdminPanel from "./pages/AdminPanel";
import CustomerDashboard from "./pages/CustomerDashboard";
import RequestWork from "./pages/RequestWork";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import WebsiteTemplates from "./pages/WebsiteTemplates";
import TemplateDetail from "./pages/TemplateDetail";
import PlumberProDemo from "./pages/PlumberProDemo";
import ElectricianExpertDemo from "./pages/ElectricianExpertDemo";
import ModernBarberDemo from "./pages/ModernBarberDemo";
import RestaurantDeluxeDemo from "./pages/RestaurantDeluxeDemo";
import FitnessStudioDemo from "./pages/FitnessStudioDemo";
import AutoRepairDemo from "./pages/AutoRepairDemo";
import BusinessDetailsForm from "./pages/BusinessDetailsForm";
import BusinessDetailsSuccess from "./pages/BusinessDetailsSuccess";
import WebsiteSetupForm from "./pages/WebsiteSetupForm";
import WebsiteSetupThankYou from "./pages/WebsiteSetupThankYou";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DiscordNotificationTracker />
          <CookieBanner />
          <ErrorBoundary>
            <PopupManager />
          </ErrorBoundary>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
