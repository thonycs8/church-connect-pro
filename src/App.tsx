import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import MembersPage from "./pages/members";
import VisitorsPage from "./pages/visitors";
import DiscipleshipPage from "./pages/discipleship";
import EventsPage from "./pages/events";
import VolunteersPage from "./pages/volunteers";
import ChatPage from "./pages/chat";
import BlogPage from "./pages/blog";
import MediaPage from "./pages/media";
import SettingsPage from "./pages/settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/members" element={<MembersPage />} />
                        <Route path="/visitors" element={<VisitorsPage />} />
                        <Route path="/discipleship" element={<DiscipleshipPage />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/volunteers" element={<VolunteersPage />} />
                        <Route path="/financial" element={<div className="p-6"><h1 className="text-3xl font-bold">Financeiro</h1></div>} />
                        <Route path="/media" element={<MediaPage />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
