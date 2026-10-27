import { useEffect, useState } from 'react';
import styles from './Converter.module.css';
import CurrencySelect from './CurrencySelect.jsx';
import Status from './Status.jsx';
import { getLatestRate } from '../services/frankfurterApi.js';
import { parseAmount, convert } from '../utils/convert.js';
import { formatMoney, formatDate } from '../utils/format.js';

export default function Converter({ currencies, from, to, onFromChange, onToChange, onSwap }) {
  const [amountText, setAmountText] = useState('1');
  const [quote, setQuote] = useState(null); // { rate, date }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const amount = parseAmount(amountText);

  useEffect(() => {
    if (from === to) {
      setQuote({ rate: 1, date: null });
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError('');
    getLatestRate(from, to)
      .then((data) => !cancelled && setQuote({ rate: data.rates[to], date: data.date }))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [from, to]);

  return (
    <section className={styles.converter}>
      <h2>Conversor</h2>
      <div className={styles.row}>
        <label>
          Valor
          <input value={amountText} onChange={(e) => setAmountText(e.target.value)} inputMode="decimal" />
        </label>
        <CurrencySelect label="De" value={from} currencies={currencies} onChange={onFromChange} />
        <button type="button" onClick={onSwap} title="Inverter moedas">⇄</button>
        <CurrencySelect label="Para" value={to} currencies={currencies} onChange={onToChange} />
      </div>

      {amount === null && <Status type="error" message="Informe um valor numérico maior que zero." />}
      {loading && <Status type="loading" message="Buscando cotação..." />}
      {error && <Status type="error" message={error} />}
      {amount !== null && !loading && !error && quote && (
        <div className={styles.result}>
          <strong>{formatMoney(convert(amount, quote.rate), to)}</strong>
          <span>
            1 {from} = {quote.rate} {to}
            {quote.date && ` · cotação de ${formatDate(quote.date)}`}
          </span>
        </div>
      )}
    </section>
  );
}
