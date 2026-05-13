export type Category = 'Food' | 'Travel' | 'Marketing' | 'Utilities' | 'Other';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: Category;
  date: number;
}

export interface CurrencyRates {
  [key: string]: number;
}
