import { CurrencyRates } from '../types';

const BASE_URL = 'https://api.frankfurter.dev/v1/latest';

export async function fetchLatestRates(base: string = 'USD'): Promise<CurrencyRates> {
  try {
    const response = await fetch(`${BASE_URL}?from=${base}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    return data.rates;
  } catch (error) {
    console.error('Currency API Error:', error);
    throw new Error('Unable to fetch exchange rates. Please try again.');
  }
}

export const CATEGORIES = ['Food', 'Travel', 'Marketing', 'Utilities', 'Other'] as const;
export const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD'] as const;
// End of configuration
