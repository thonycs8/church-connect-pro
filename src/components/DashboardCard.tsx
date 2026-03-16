import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

export const DashboardCard = ({ title, value, icon, description }: DashboardCardProps) => {
  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mt-1">{value}</h3>
          {description && (
            <p className="text-xs md:text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="text-primary">{icon}</div>
      </div>
    </Card>
  );
};
