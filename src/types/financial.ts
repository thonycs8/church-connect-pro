export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}