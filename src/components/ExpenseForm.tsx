import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../lib/api';
import { Category } from '../types';

interface ExpenseFormProps {
  onAddExpense: (name: string, amount: number, category: Category) => void;
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || parseFloat(amount) <= 0 || !category) return;

    onAddExpense(name, parseFloat(amount), category as Category);
    setName('');
    setAmount('');
    setCategory('');
  };

  return (
    <div className="glass-card p-10">
      <div className="mb-10">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">New Expense</h2>
        <p className="text-2xl font-black text-slate-900 tracking-tight">Add Expense</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 ml-1">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Office Supplies"
            className="input-field"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 ml-1">Amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="input-field"
              required
            />
          </div>
          <div className="space-y-2 relative">
            <label className="block text-sm font-medium text-slate-700 ml-1">Category</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="input-field w-full flex items-center justify-between text-left"
            >
              <span className={`font-bold ${category ? 'text-slate-900' : 'text-slate-400'}`}>
                {category || 'Select'}
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    type="button"
                    disabled
                    className="w-full text-left px-5 py-3 text-xs font-bold text-slate-300 uppercase tracking-wider cursor-default"
                  >
                    Select
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm font-bold transition-colors hover:bg-slate-50 ${
                        category === cat ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <button type="submit" className="btn-primary w-full py-4 rounded-[16px]">
          Add Expense
        </button>
      </form>
    </div>
  );
}
