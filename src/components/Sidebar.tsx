import { Home, Users, Calendar, DollarSign, Video, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Users, label: "Membros", path: "/members" },
    { icon: Calendar, label: "Eventos", path: "/events" },
    { icon: DollarSign, label: "Financeiro", path: "/financial" },
    { icon: Video, label: "Mídia", path: "/media" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: Settings, label: "Configurações", path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-background border-r border-border flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Igreja CRM</h1>
        <ThemeToggle />
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent text-foreground hover:text-accent-foreground"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};