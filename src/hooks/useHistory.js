import { useEffect, useState } from 'react';
import { getHistory } from '../services/frankfurterApi.js';
import { getPeriodRange } from '../utils/dates.js';
import { toRecords } from '../utils/history.js';

export function useHistory(from, to, days) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!from || !to || from === to) {
      setRecords([]);
      return;
    }
    let cancelled = false;
    const { startDate, endDate } = getPeriodRange(days);
    setLoading(true);
    setError('');
    getHistory(from, to, startDate, endDate)
      .then((data) => !cancelled && setRecords(toRecords(data, from, to)))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [from, to, days]);

  return { records, loading, error };
}
