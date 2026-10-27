# Figma

Arquivo: https://www.figma.com/design/UbiVYUoIHszYiwtZUN1JLZ/Currency-Exchange-App

> Antes de entregar, em **Share** do Figma deixe o link com acesso "Anyone with the link can view".

## Páginas
| Página | Conteúdo |
|---|---|
| Wireframe baixa fidelidade | Wireframe em cinza: desktop, adaptação mobile e estados (loading, erro, ausência de dados, entrada inválida) |
| Protótipo média fidelidade | Telas desktop e mobile com o visual do app (conversor, período, gráfico, filtros e tabela) |

## Wireframe de baixa fidelidade
Fonte editável: [`figma/wireframe-baixa-fidelidade.svg`](figma/wireframe-baixa-fidelidade.svg), gerado por `node docs/figma/gen-wireframe.mjs`.

Estrutura das telas (mesma do app):
1. **Conversor:** valor, moeda de origem, botão inverter, moeda de destino, resultado, taxa e data da cotação.
2. **Histórico:** botões de período (7d, 15d, 30d, 3m, 6m, 1a, 5a, 10a) e gráfico de linha.
3. **Tabela:** filtros (datas, cotação mín./máx.), ordenação, limpar filtros, exportar CSV, contador de registros e linhas (data, origem, destino, cotação).

Estados cobertos: loading, erro de API, ausência de dados e entrada inválida.

## Mobile
Os blocos empilham em coluna única; botões de período quebram em duas linhas; filtros em duas colunas; botão de inverter ocupa a largura toda.

> Adicione aqui prints das duas páginas do Figma como evidência.
