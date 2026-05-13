/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingUp, ShieldCheck } from 'lucide-react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryPanel from './components/SummaryPanel';
import CurrencyConverter from './components/CurrencyConverter';
import AboutModal from './components/AboutModal';
import { Expense, Category } from './types';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (name: string, amount: number, category: Category) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      name,
      amount,
      category,
      date: Date.now(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const totalUSD = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative selection:bg-indigo-500 selection:text-white">
      {/* Premium Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-indigo-400/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-400/5 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-900">FinanceWise</span>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-10 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] transition-all">
              <span onClick={() => setIsAboutOpen(true)} className="hover:text-slate-900 cursor-pointer">About</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-40 pb-24 px-10 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Left Column: Form and Summary */}
          <div className="w-full lg:w-[420px] space-y-12 lg:sticky lg:top-40">
            <section role="region" aria-label="Add Expense">
              <ExpenseForm onAddExpense={addExpense} />
            </section>
            
            <section role="region" aria-label="Currency Conversion">
              <CurrencyConverter totalUSD={totalUSD} />
            </section>
          </div>

          {/* Right Column: List and Stats */}
          <div className="flex-grow w-full space-y-16">
            <div className="flex flex-col gap-2">
               <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">Expense Summary</h2>
               <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Your Total Expenses</h3>
            </div>
            
            <section role="region" aria-label="Spending Summary">
              <SummaryPanel expenses={expenses} />
            </section>

            <section role="region" aria-label="Transaction History">
              <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 mt-12 bg-white/80 backdrop-blur-md border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] uppercase mb-2">
            &copy; {new Date().getFullYear()} FinanceWise
          </p>
          <p className="text-slate-500 text-xs font-medium flex items-center gap-1.5">
            Crafted by
            <span className="text-slate-900 font-bold hover:text-indigo-600 transition-colors cursor-pointer">
              Abhishekh Bihari
            </span>
          </p>
        </div>
      </footer>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}
