# Currency Exchange App

SPA em React + JavaScript para converter moedas e analisar o histórico de câmbio, usando a [API Frankfurter](https://frankfurter.dev).

## Funcionalidades
- Conversão entre duas moedas, com taxa e data da cotação, inversão de moedas e validação de entrada
- Histórico por período (7d, 15d, 30d, 3m, 6m, 1a, 5a, 10a) com gráfico e tabela
- Filtros combinados (intervalo de datas, cotação mínima/máxima), limpeza de filtros, ordenação por data/cotação e contador de registros
- Exportação CSV apenas dos registros filtrados (bloqueia exportação vazia)
- Estados de loading, erro e ausência de dados

## Tecnologias
React 18, Vite, CSS Modules, Recharts, Vitest.

## Instalação e execução
```bash
npm install
npm run dev     # desenvolvimento
npm test        # testes das funções
npm run build   # build de produção
```

## Arquitetura
```
src/
  components/  Converter, CurrencySelect, PeriodSelector, RateChart, HistoryTable, Status
  hooks/       useCurrencies, useHistory
  services/    frankfurterApi.js (fetch)
  utils/       convert, dates, history (filtro/ordenação), csv, format
  constants/   periods
```
O estado do par de moedas e do período fica em `App` (lifting state up) e é compartilhado entre conversor, gráfico e tabela.

Documentação adicional em `docs/`. A Collection do Postman está em `docs/postman_collection.json`.
