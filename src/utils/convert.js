export function parseAmount(text) {
  const value = Number(String(text).replace(',', '.'));
  if (String(text).trim() === '' || Number.isNaN(value) || value <= 0) return null;
  return value;
}

export function convert(amount, rate) {
  return amount * rate;
}
