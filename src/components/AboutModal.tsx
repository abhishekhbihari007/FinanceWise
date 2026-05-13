import { X, Code2, Layout, Database } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Expense Tracking App</h2>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">FinanceWise</h3>
            </div>
            <button 
              onClick={onClose}
              aria-label="Close"
              title="Close"
              className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <p className="text-slate-600 leading-relaxed text-sm">
              FinanceWise is a premium expense tracking application designed with a focus on elegant UI, seamless user experience, and robust frontend engineering. It allows users to track their daily transactions, view categorical spending breakdowns, and convert their portfolio balance to global currencies in real-time.
            </p>

            <div className="grid grid-cols-1 gap-4 mt-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <Layout className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Architecture</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Built with React, Vite, and Tailwind CSS. Features a responsive, glassmorphism-inspired design system with smooth micro-animations.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <Database className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Data Management</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Utilizes strictly local state management with React Hooks and data persistence via browser LocalStorage.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <Code2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Integrations</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Features real-time currency conversion powered by the Frankfurter API for accurate, up-to-date market rates.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6 mt-6 border-t border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Crafted by Abhishekh Bihari
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
