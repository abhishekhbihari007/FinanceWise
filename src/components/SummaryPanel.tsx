import { PieChart, Wallet } from 'lucide-react';
import { Expense } from '../types';

interface SummaryPanelProps {
  expenses: Expense[];
}

export default function SummaryPanel({ expenses }: SummaryPanelProps) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const breakdown = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Ultra-Premium Balance Card */}
      <div className="bg-slate-900 rounded-[28px] p-10 text-white relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Total Spend</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h1 className="text-6xl font-black font-sans tracking-tighter text-white">
              <span className="text-slate-500 mr-2">$</span>
              {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h1>
          </div>

          <div className="mt-12 flex items-center justify-between opacity-60">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest mb-1">Status</span>
              <span className="text-xs font-semibold">Active</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-widest">Total Items</span>
              <p className="text-sm font-bold font-mono">{expenses.length.toString().padStart(2, '0')}</p>
            </div>
          </div>
        </div>
        
        {/* Subtlest background hint */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Category Breakdown */}
      <div className="glass-card p-8">
        <h2 className="text-sm font-bold mb-8 uppercase tracking-[0.2em] text-slate-400">Category Breakdown</h2>
        
        <div className="space-y-5">
          {Object.entries(breakdown).length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4 italic">No data to display yet</p>
          ) : (
            Object.entries(breakdown)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, amount]) => {
                const percentage = (amount / total) * 100;
                return (
                  <div key={cat} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">{cat}</span>
                      <div className="text-right">
                        <span className="font-bold text-slate-900">
                          <span className="text-slate-400 mr-0.5">$</span>
                          {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-slate-400 ml-2 text-xs">{percentage.toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${getBarColor(cat)}`}
                        ref={(el) => {
                          if (el) el.style.width = `${percentage}%`;
                        }}
                      />
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}

function getBarColor(category: string) {
  switch (category) {
    case 'Food': return 'bg-orange-500';
    case 'Travel': return 'bg-blue-500';
    case 'Marketing': return 'bg-purple-500';
    case 'Utilities': return 'bg-amber-500';
    default: return 'bg-slate-500';
  }
}
