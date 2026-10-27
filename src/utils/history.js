// Transforma a resposta da API em lista de registros da tabela
export function toRecords(data, from, to) {
  return Object.entries(data.rates).map(([date, rates]) => ({
    date,
    from,
    to,
    rate: rates[to],
  }));
}

// filters: { startDate, endDate, minRate, maxRate }
export function filterRecords(records, filters) {
  const min = filters.minRate === '' ? null : Number(filters.minRate);
  const max = filters.maxRate === '' ? null : Number(filters.maxRate);
  return records.filter((r) => {
    if (filters.startDate && r.date < filters.startDate) return false;
    if (filters.endDate && r.date > filters.endDate) return false;
    if (min !== null && r.rate < min) return false;
    if (max !== null && r.rate > max) return false;
    return true;
  });
}

// sort: 'date-desc' | 'date-asc' | 'rate-desc' | 'rate-asc'
export function sortRecords(records, sort) {
  const [field, dir] = sort.split('-');
  const factor = dir === 'asc' ? 1 : -1;
  return [...records].sort((a, b) =>
    field === 'date' ? factor * a.date.localeCompare(b.date) : factor * (a.rate - b.rate)
  );
}
