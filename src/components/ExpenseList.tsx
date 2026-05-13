import React from 'react';
import { Trash2, ShoppingBag, Plane, Megaphone, Zap, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Food: <ShoppingBag className="w-4 h-4" />,
  Travel: <Plane className="w-4 h-4" />,
  Marketing: <Megaphone className="w-4 h-4" />,
  Utilities: <Zap className="w-4 h-4" />,
  Other: <MoreHorizontal className="w-4 h-4" />,
};

export default function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">Recent Expenses</h2>
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
          {expenses.length} Items
        </span>
      </div>

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {expenses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-20 text-center text-slate-300 font-medium tracking-tight border-2 border-dashed border-slate-100 rounded-[32px]"
            >
              No expenses added yet.
            </motion.div>
          ) : (
            expenses.map((expense) => (
              <motion.div
                key={expense.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-2 h-10 rounded-full ${getCategoryBarColor(expense.category)}`} />
                  <div>
                    <h3 className="font-bold text-slate-900 tracking-tight">{expense.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{expense.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <p className="text-xl font-black text-slate-900 tracking-tighter">
                      <span className="text-slate-400 mr-0.5">$</span>
                      {expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">
                      {new Date(expense.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="btn-danger"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function getCategoryBarColor(category: string) {
  switch (category) {
    case 'Food': return 'bg-orange-400';
    case 'Travel': return 'bg-blue-400';
    case 'Marketing': return 'bg-purple-400';
    case 'Utilities': return 'bg-amber-400';
    default: return 'bg-slate-200';
  }
}
