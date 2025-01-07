import { useTranslation } from "react-i18next";
import { DashboardCard } from "@/components/DashboardCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, TrendingDown, Wallet } from "lucide-react";

const FinancialPage = () => {
  const { t } = useTranslation();

  // Mock data - replace with real data later
  const mockTransactions = [
    {
      id: 1,
      type: "income",
      description: "Dízimo",
      amount: 1000,
      date: "2024-03-10",
      category: "Ofertas",
      status: "completed",
    },
    {
      id: 2,
      type: "expense",
      description: "Conta de Luz",
      amount: 300,
      date: "2024-03-08",
      category: "Utilidades",
      status: "completed",
    },
  ];

  const totalIncome = 5000;
  const totalExpenses = 3000;
  const balance = totalIncome - totalExpenses;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("financial.title")}</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("financial.transactions.add")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard
          title={t("financial.dashboard.totalIncome")}
          value={`€${totalIncome}`}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <DashboardCard
          title={t("financial.dashboard.totalExpenses")}
          value={`€${totalExpenses}`}
          icon={<TrendingDown className="h-6 w-6" />}
        />
        <DashboardCard
          title={t("financial.dashboard.balance")}
          value={`€${balance}`}
          icon={<Wallet className="h-6 w-6" />}
        />
      </div>

      <div className="bg-card rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            {t("financial.dashboard.recentTransactions")}
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("financial.transactions.type")}</TableHead>
              <TableHead>{t("financial.transactions.description")}</TableHead>
              <TableHead>{t("financial.transactions.amount")}</TableHead>
              <TableHead>{t("financial.transactions.date")}</TableHead>
              <TableHead>{t("financial.transactions.category")}</TableHead>
              <TableHead>{t("financial.transactions.status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.type === "income" ? (
                    <span className="text-green-600 flex items-center">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      {t("financial.transactions.income")}
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center">
                      <TrendingDown className="mr-1 h-4 w-4" />
                      {t("financial.transactions.expense")}
                    </span>
                  )}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <span className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                    €{transaction.amount}
                  </span>
                </TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                    {transaction.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FinancialPage;