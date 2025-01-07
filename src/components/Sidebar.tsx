import { Home, Users, Calendar, DollarSign, Video, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary-800">Igreja CRM</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-100 text-gray-700 hover:text-primary-800"
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