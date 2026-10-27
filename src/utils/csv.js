export function recordsToCsv(records) {
  const header = 'data,moeda_origem,moeda_destino,cotacao';
  const lines = records.map((r) => `${r.date},${r.from},${r.to},${r.rate}`);
  return [header, ...lines].join('\n');
}

export function downloadCsv(records, from, to) {
  if (records.length === 0) return false;
  const blob = new Blob([recordsToCsv(records)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cotacoes_${from}_${to}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  return true;
}
