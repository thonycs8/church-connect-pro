import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";

const SettingsPage = () => {
  const { user, roles, signOut } = useAuth();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Configurações</h1>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">Email: {user?.email}</p>
          <p className="text-sm text-muted-foreground">
            Cargos: {roles.length > 0 ? roles.join(", ") : "Nenhum"}
          </p>
        </CardContent>
      </Card>

      <Button variant="destructive" onClick={signOut}>
        <LogOut className="mr-2 h-4 w-4" />
        Sair
      </Button>
    </div>
  );
};

export default SettingsPage;
