import { Users, Calendar, DollarSign, ChurchIcon } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  const stats = [
    {
      title: "Total de Membros",
      value: "150",
      icon: <Users className="w-8 h-8" />,
      description: "+12 este mês"
    },
    {
      title: "Eventos Próximos",
      value: "8",
      icon: <Calendar className="w-8 h-8" />,
      description: "Próximos 30 dias"
    },
    {
      title: "Dízimos do Mês",
      value: "R$ 12.580",
      icon: <DollarSign className="w-8 h-8" />,
      description: "+15% vs. mês anterior"
    },
    {
      title: "Presença Dominical",
      value: "125",
      icon: <ChurchIcon className="w-8 h-8" />,
      description: "Média últimas 4 semanas"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <DashboardCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                description={stat.description}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Próximos Eventos</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <div>
                    <h3 className="font-medium">Culto de Domingo</h3>
                    <p className="text-sm text-gray-500">Domingo, 19h</p>
                  </div>
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                    Principal
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <div>
                    <h3 className="font-medium">Estudo Bíblico</h3>
                    <p className="text-sm text-gray-500">Quarta, 19h30</p>
                  </div>
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                    Semanal
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Últimas Doações</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary-800" />
                    </div>
                    <div>
                      <p className="font-medium">Dízimo</p>
                      <p className="text-sm text-gray-500">Há 2 horas</p>
                    </div>
                  </div>
                  <span className="font-medium">R$ 250,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary-800" />
                    </div>
                    <div>
                      <p className="font-medium">Oferta</p>
                      <p className="text-sm text-gray-500">Há 5 horas</p>
                    </div>
                  </div>
                  <span className="font-medium">R$ 100,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;