import { CurrencyRates } from '../types';

const BASE_URL = 'https://api.frankfurter.app/latest';

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
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Network Error: The API might be blocked by browser settings or CORS policies.');
      throw new Error('Network connection issue. Please check your internet or try again later.');
    }
    console.error('Currency API Error:', error);
    throw error;
  }
}

export const CATEGORIES = ['Food', 'Travel', 'Marketing', 'Utilities', 'Other'] as const;
export const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD'] as const;
// End of configuration
