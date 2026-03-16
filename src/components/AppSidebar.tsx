import { Home, Users, UserPlus, BookOpen, Calendar, HandHelping, DollarSign, Video, MessageSquare, Settings, Newspaper } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
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
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Users, label: "Membros", path: "/members" },
  { icon: UserPlus, label: "Visitantes", path: "/visitors" },
  { icon: BookOpen, label: "Discipulado", path: "/discipleship" },
  { icon: Calendar, label: "Eventos", path: "/events" },
  { icon: HandHelping, label: "Voluntários", path: "/volunteers" },
  { icon: DollarSign, label: "Financeiro", path: "/financial" },
  { icon: Video, label: "Mídia", path: "/media" },
  { icon: MessageSquare, label: "Chat", path: "/chat" },
  { icon: Newspaper, label: "Blog", path: "/blog" },
  { icon: Settings, label: "Configurações", path: "/settings" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        {!collapsed && (
          <h1 className="text-xl font-bold text-sidebar-foreground">Igreja CRM</h1>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
