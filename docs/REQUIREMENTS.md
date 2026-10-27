# Requisitos

## Contexto
Empresa de tecnologia financeira quer centralizar consulta de câmbio, conversão e análise histórica em uma SPA.

## Público-alvo
Pessoas que precisam converter valores e acompanhar a variação de moedas.

## Objetivo
Converter moedas, consultar histórico, visualizar gráfico/tabela, filtrar e exportar CSV.

## Escopo
Dentro: conversor, histórico, gráfico, tabela, filtros, ordenação, CSV.
Fora: autenticação, cadastro, back-end, banco de dados, pagamentos, compra/venda real.

## Requisitos funcionais
- RF01 Selecionar moeda de origem e destino
- RF02 Informar valor e ver o valor convertido
- RF03 Exibir taxa e data efetiva da cotação
- RF04 Inverter moedas
- RF05 Validar entradas inválidas
- RF06 Escolher período (7d, 15d, 30d, 3m, 6m, 1a, 5a, 10a)
- RF07 Gráfico atualiza ao mudar par ou período
- RF08 Tabela com data, origem, destino e cotação
- RF09 Filtros combináveis, limpeza, ordenação por data/cotação, contagem de registros
- RF10 Exportar CSV dos registros filtrados

## Requisitos não funcionais
- Responsivo (desktop e mobile)
- Estados de loading, erro e ausência de dados
- Código componentizado, com CSS Modules

## Regras de negócio
- Valor deve ser numérico e maior que zero
- Conversão = valor × taxa retornada pela API
- Mesma moeda na origem e destino: taxa 1, sem histórico
- Não exportar CSV vazio

## Critérios de aceite
- Valor inválido mostra mensagem e não converte
- Trocar par/período recarrega gráfico e tabela
- CSV contém cabeçalho e somente linhas filtradas
- Falha da API exibe mensagem de erro
