import { useState } from 'react';
import styles from './HistoryTable.module.css';
import { filterRecords, sortRecords } from '../utils/history.js';
import { downloadCsv } from '../utils/csv.js';
import { formatDate } from '../utils/dates.js';

const EMPTY_FILTERS = { startDate: '', endDate: '', minRate: '', maxRate: '' };

export default function HistoryTable({ records }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState('date-desc');

  const visible = sortRecords(filterRecords(records, filters), sort);

  const invalidDates = filters.startDate && filters.endDate && filters.startDate > filters.endDate;
  const invalidRates =
    filters.minRate !== '' && filters.maxRate !== '' && Number(filters.minRate) > Number(filters.maxRate);

  function updateFilter(field, value) {
    setFilters({ ...filters, [field]: value });
  }

  function handleExport() {
    if (!downloadCsv(visible, records[0].from, records[0].to)) {
      alert('Não há registros para exportar.');
    }
  }

  return (
    <div>
      <div className={styles.filters}>
        <label>
          De
          <input type="date" value={filters.startDate} onChange={(e) => updateFilter('startDate', e.target.value)} />
        </label>
        <label>
          Até
          <input type="date" value={filters.endDate} onChange={(e) => updateFilter('endDate', e.target.value)} />
        </label>
        <label>
          Cotação mín.
          <input type="number" step="any" value={filters.minRate} onChange={(e) => updateFilter('minRate', e.target.value)} />
        </label>
        <label>
          Cotação máx.
          <input type="number" step="any" value={filters.maxRate} onChange={(e) => updateFilter('maxRate', e.target.value)} />
        </label>
        <label>
          Ordenar por
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="date-desc">Data (mais recente)</option>
            <option value="date-asc">Data (mais antiga)</option>
            <option value="rate-desc">Cotação (maior)</option>
            <option value="rate-asc">Cotação (menor)</option>
          </select>
        </label>
        <button type="button" onClick={() => setFilters(EMPTY_FILTERS)}>Limpar filtros</button>
        <button type="button" onClick={handleExport} disabled={visible.length === 0}>Exportar CSV</button>
      </div>

      {invalidDates && <p role="alert">A data inicial não pode ser maior que a data final.</p>}
      {invalidRates && <p role="alert">A cotação mínima não pode ser maior que a máxima.</p>}

      <p>{visible.length} registro(s) encontrado(s)</p>

      {visible.length === 0 ? (
        <p>Nenhum registro para os filtros aplicados.</p>
      ) : (
        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr><th>Data</th><th>Origem</th><th>Destino</th><th>Cotação</th></tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.date}>
                  <td>{formatDate(r.date)}</td>
                  <td>{r.from}</td>
                  <td>{r.to}</td>
                  <td>{r.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
