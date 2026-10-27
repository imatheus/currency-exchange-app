import { useState } from 'react';
import styles from './App.module.css';
import { useCurrencies } from './hooks/useCurrencies.js';
import { useHistory } from './hooks/useHistory.js';
import { PERIODS } from './constants/periods.js';
import Converter from './components/Converter.jsx';
import PeriodSelector from './components/PeriodSelector.jsx';
import RateChart from './components/RateChart.jsx';
import HistoryTable from './components/HistoryTable.jsx';
import Status from './components/Status.jsx';

export default function App() {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('BRL');
  const [days, setDays] = useState(PERIODS[2].days);

  const { currencies, loading: loadingCurrencies, error: currenciesError } = useCurrencies();
  const { records, loading, error } = useHistory(from, to, days);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <main className={styles.app}>
      <h1>Currency Exchange</h1>

      {loadingCurrencies && <Status type="loading" message="Carregando moedas..." />}
      {currenciesError && <Status type="error" message={currenciesError} />}

      {!loadingCurrencies && !currenciesError && (
        <>
          <Converter
            currencies={currencies}
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
            onSwap={swap}
          />

          <section className={styles.card}>
            <h2>Histórico {from} → {to}</h2>
            <PeriodSelector days={days} onChange={setDays} />
            {loading && <Status type="loading" message="Carregando histórico..." />}
            {error && <Status type="error" message={error} />}
            {!loading && !error && records.length === 0 && (
              <Status type="empty" message="Nenhum dado disponível para este par/período." />
            )}
            {!loading && !error && records.length > 0 && (
              <>
                <RateChart records={records} />
                <HistoryTable records={records} />
              </>
            )}
          </section>
        </>
      )}
    </main>
  );
}
