import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import LiveMap from "./pages/LiveMap";
import DeviceManagement from "./pages/DeviceManagement";
import IncidentLogs from "./pages/IncidentLogs";
import SystemHealth from "./pages/SystemHealth";
import DeviceConfig from "./pages/DeviceConfig";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
                <SidebarTrigger />
              </header>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/live-map" element={<LiveMap />} />
                <Route path="/device-management" element={<DeviceManagement />} />
                <Route path="/incident-logs" element={<IncidentLogs />} />
                <Route path="/system-health" element={<SystemHealth />} />
                <Route path="/device-config" element={<DeviceConfig />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
