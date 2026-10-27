import { describe, it, expect } from 'vitest';
import { parseAmount, convert } from './convert.js';
import { filterRecords, sortRecords, toRecords } from './history.js';
import { recordsToCsv } from './csv.js';
import { getPeriodRange } from './dates.js';

const records = toRecords(
  { rates: { '2026-01-01': { BRL: 5 }, '2026-01-02': { BRL: 6 }, '2026-01-03': { BRL: 4 } } },
  'USD',
  'BRL'
);

describe('conversão', () => {
  it('valida entradas', () => {
    expect(parseAmount('')).toBeNull();
    expect(parseAmount('abc')).toBeNull();
    expect(parseAmount('-3')).toBeNull();
    expect(parseAmount('10,5')).toBe(10.5);
  });
  it('converte', () => expect(convert(10, 5.2)).toBeCloseTo(52));
});

describe('filtros e ordenação', () => {
  it('combina filtros', () => {
    const r = filterRecords(records, { startDate: '2026-01-02', endDate: '', minRate: '5', maxRate: '' });
    expect(r.map((x) => x.date)).toEqual(['2026-01-02']);
  });
  it('ordena por cotação', () => {
    expect(sortRecords(records, 'rate-asc').map((x) => x.rate)).toEqual([4, 5, 6]);
  });
});

describe('csv e datas', () => {
  it('gera cabeçalho e linhas', () => {
    expect(recordsToCsv(records).split('\n')[0]).toBe('data,moeda_origem,moeda_destino,cotacao');
  });
  it('calcula período', () => {
    expect(getPeriodRange(7, new Date('2026-01-10T12:00:00Z'))).toEqual({
      startDate: '2026-01-03',
      endDate: '2026-01-10',
    });
  });
});
