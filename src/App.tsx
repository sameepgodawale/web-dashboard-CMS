import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Index from "./pages/Index";
import LiveMap from "./pages/LiveMap";
import DeviceManagement from "./pages/DeviceManagement";
import IncidentLogs from "./pages/IncidentLogs";
import SystemHealth from "./pages/SystemHealth";
import DeviceConfig from "./pages/DeviceConfig";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppHeader = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
      <SidebarTrigger />
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden sm:inline">
          {user?.email}
        </span>
        <ThemeToggle />
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <SidebarProvider>
                      <div className="flex min-h-screen w-full">
                        <AppSidebar />
                        <SidebarInset className="flex-1">
                          <AppHeader />
                          <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/live-map" element={<LiveMap />} />
                            <Route path="/device-management" element={<DeviceManagement />} />
                            <Route path="/incident-logs" element={<IncidentLogs />} />
                            <Route path="/system-health" element={<SystemHealth />} />
                            <Route path="/device-config" element={<DeviceConfig />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/user-management" element={
                              <ProtectedRoute requireAdmin>
                                <UserManagement />
                              </ProtectedRoute>
                            } />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </SidebarInset>
                      </div>
                    </SidebarProvider>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
