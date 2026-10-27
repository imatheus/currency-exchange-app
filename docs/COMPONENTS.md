# Componentes

| Componente | Responsabilidade | JSX / CSS Module | Props | Estados |
|---|---|---|---|---|
| App | Estado do par e período; compõe a tela | App.jsx / App.module.css | — | from, to, days |
| Converter | Valor, cotação atual e resultado | components/Converter.jsx / .module.css | currencies, from, to, onFromChange, onToChange, onSwap | amountText, quote, loading, error |
| CurrencySelect | Select de moeda | components/CurrencySelect.jsx | label, value, currencies, onChange | — |
| PeriodSelector | Botões de período | components/PeriodSelector.jsx / .module.css | days, onChange | — |
| RateChart | Gráfico de linha (Recharts) | components/RateChart.jsx | records | — |
| HistoryTable | Filtros, ordenação, tabela e CSV | components/HistoryTable.jsx / .module.css | records | filters, sort |
| Status | Mensagem de loading/erro/vazio | components/Status.jsx / .module.css | type, message | — |

Hooks: `useCurrencies` (lista de moedas), `useHistory(from, to, days)` (histórico).

Relação: `App` → `Converter` (→ `CurrencySelect`), `PeriodSelector`, `RateChart`, `HistoryTable`, `Status`.
