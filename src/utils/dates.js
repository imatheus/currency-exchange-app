export function toISODate(date) {
  return date.toISOString().slice(0, 10);
}

export function getPeriodRange(days, today = new Date()) {
  const start = new Date(today);
  start.setDate(start.getDate() - days);
  return { startDate: toISODate(start), endDate: toISODate(today) };
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
