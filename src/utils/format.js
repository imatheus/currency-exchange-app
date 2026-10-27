import { formatDate } from './dates.js';

export function formatMoney(value, currency) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(value);
}

export { formatDate };
