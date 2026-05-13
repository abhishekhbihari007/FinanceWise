import { useState, useEffect } from 'react';
import { RefreshCw, ArrowRightLeft, AlertCircle } from 'lucide-react';
import { fetchLatestRates, CURRENCIES } from '../lib/api';
import { CurrencyRates } from '../types';

interface CurrencyConverterProps {
  totalUSD: number;
}

export default function CurrencyConverter({ totalUSD }: CurrencyConverterProps) {
  const [rates, setRates] = useState<CurrencyRates | null>(null);
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLatestRates('USD');
      setRates(data);
    } catch (err) {
      setError('Unable to fetch exchange rates at this time.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
  }, []);

  const convertedValue = rates && rates[targetCurrency] 
    ? totalUSD * rates[targetCurrency] 
    : 0;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Live Conversion</h2>
          <p className="text-xl font-black text-slate-900 tracking-tight">Global Currencies</p>
        </div>
        <button 
          onClick={loadRates}
          disabled={loading}
          aria-label="Refresh rates"
          title="Refresh rates"
          className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-all disabled:animate-spin border border-slate-100"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-8">
        <div className="relative group">
          <select
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            aria-label="Select target currency"
            title="Select target currency"
            className="input-field pr-10 cursor-pointer"
          >
            {CURRENCIES.filter(c => c !== 'USD').map((curr) => (
              <option key={curr} value={curr}>
                {curr} Base
              </option>
            ))}
          </select>
          <ArrowRightLeft className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none group-hover:text-slate-900 transition-colors" />
        </div>

        {error ? (
          <div className="p-4 rounded-xl flex items-start gap-3 border border-red-50">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">{error}</p>
          </div>
        ) : (
          <div className="py-10 px-6 bg-slate-50/50 rounded-[24px] text-center relative border border-slate-50">
            <div className="relative z-10">
              <p className="text-4xl font-black text-slate-900 tracking-tighter">
                {loading ? '...' : convertedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-[10px] font-black text-slate-300 mt-2 uppercase tracking-[0.3em]">{targetCurrency}</p>
            </div>
          </div>
        )}

        <p className="text-[8px] text-slate-300 text-center font-bold uppercase tracking-[0.2em] px-4">
          Market rates updated via Frankfurter API
        </p>
      </div>
    </div>
  );
}
