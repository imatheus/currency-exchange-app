const BASE_URL = 'https://api.frankfurter.dev/v1';

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Erro na API (${response.status})`);
  }
  return response.json();
}

export async function getCurrencies() {
  return request('/currencies'); // { USD: "United States Dollar", ... }
}

export async function getLatestRate(from, to) {
  return request(`/latest?base=${from}&symbols=${to}`);
}

export async function getHistory(from, to, startDate, endDate) {
  return request(`/${startDate}..${endDate}?base=${from}&symbols=${to}`);
}
