import { Users, Calendar, DollarSign, ChurchIcon } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";

const Index = () => {
  const stats = [
    {
      title: "Total de Membros",
      value: "150",
      icon: <Users className="w-8 h-8" />,
      description: "+12 este mês",
    },
    {
      title: "Eventos Próximos",
      value: "8",
      icon: <Calendar className="w-8 h-8" />,
      description: "Próximos 30 dias",
    },
    {
      title: "Dízimos do Mês",
      value: "R$ 12.580",
      icon: <DollarSign className="w-8 h-8" />,
      description: "+15% vs. mês anterior",
    },
    {
      title: "Presença Dominical",
      value: "125",
      icon: <ChurchIcon className="w-8 h-8" />,
      description: "Média últimas 4 semanas",
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-card text-card-foreground p-4 md:p-6 rounded-lg shadow border border-border">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Próximos Eventos</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded">
                <div>
                  <h3 className="font-medium text-foreground">Culto de Domingo</h3>
                  <p className="text-sm text-muted-foreground">Domingo, 19h</p>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm">
                  Principal
                </span>
              </div>
              <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded">
                <div>
                  <h3 className="font-medium text-foreground">Estudo Bíblico</h3>
                  <p className="text-sm text-muted-foreground">Quarta, 19h30</p>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm">
                  Semanal
                </span>
              </div>
            </div>
          </div>

          <div className="bg-card text-card-foreground p-4 md:p-6 rounded-lg shadow border border-border">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Últimas Doações</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Dízimo</p>
                    <p className="text-sm text-muted-foreground">Há 2 horas</p>
                  </div>
                </div>
                <span className="font-medium text-foreground">R$ 250,00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Oferta</p>
                    <p className="text-sm text-muted-foreground">Há 5 horas</p>
                  </div>
                </div>
                <span className="font-medium text-foreground">R$ 100,00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
