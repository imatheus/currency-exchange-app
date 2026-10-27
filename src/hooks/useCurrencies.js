import { useEffect, useState } from 'react';
import { getCurrencies } from '../services/frankfurterApi.js';

export function useCurrencies() {
  const [currencies, setCurrencies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getCurrencies()
      .then(setCurrencies)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { currencies, loading, error };
}
