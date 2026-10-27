# Testes de API (Frankfurter)

Base: `https://api.frankfurter.dev/v1`
Collection exportável: [`postman_collection.json`](postman_collection.json) (importar no Postman via Import).

Execução no Postman Runner em 27/10/2026: **5 requisições, 8 testes, 8 passaram, 0 falhas**.

| Requisição | Endpoint | Status | Resultado |
|---|---|---|---|
| Listar moedas | `GET /currencies` | 200 | objeto `{ "USD": "United States Dollar", ... }` com USD e BRL |
| Cotação mais recente | `GET /latest?base=USD&symbols=BRL` | 200 | `amount, base, date, rates.BRL` |
| Histórico por intervalo | `GET /2026-09-01..2026-09-30?base=USD&symbols=BRL` | 200 | `rates` agrupado por data, ex.: `{ "2026-09-01": { "BRL": 5.xx } }` |
| Erro: moeda inválida | `GET /latest?base=XXX&symbols=BRL` | 404 | erro tratado no app (mensagem de erro) |
| Erro: data inválida | `GET /2026-99-99..2026-99-100?base=USD&symbols=BRL` | 404 | erro tratado no app (mensagem de erro) |

## Observações
- Dias sem cotação (fins de semana e feriados) não aparecem no histórico.
- Em intervalos longos a API devolve menos pontos (dados agrupados).
- Parâmetros: `base` (moeda de origem) e `symbols` (moedas de destino).
- O app faz a conversão: valor × taxa retornada.

> Para a entrega: tire prints da tela de resultados do Runner e anexe aqui.
