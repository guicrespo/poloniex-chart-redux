# Projeto site CryptoINFO

Projeto que teve como objetivo o desenvolvimento de uma aplicação WEB front-end, na qual o usuário ou usuária acessa um ranking de criptomoedas e pode ver detalhes de cada uma, de forma dinâmica e atualizada a partir do consumo da API disponibilizada pelo [Poloniex](https://docs.poloniex.com).

## Tecnologias utilizadas

A aplicação foi construída utilizando a biblioteca React para Javascript, em conjunto com Redux (thunk) para gerenciamento de estado e de funções assíncronas.

## Funcionalidades

### Página Inicial

A página inicial traz uma tabela com informações atualizadas sobre as criptomoedas retornadas pela API. Na primeira renderização, os dados são exibidos segundo a última maior cotação de cada criptomoeda.

Os valores monetários são exibidos em USDT. Esta informação está numa legenda acima da tabela, que abre um pequeno "pop-up" explicando o significado da sigla.

A tabela é paginada, exibindo 10 resultados por página. Os botões de 'voltar' e 'avançar' só ficam habilitados caso haja uma página anterior ou posterior, respectivamente.

Há um campo dinâmico de busca por sigla da criptomoeda, que exibe instantaneamente, na tabela, o resultado da busca enquanto se digita.

Todos campos/atributos de cada moeda são "clicáveis" e ordenam a lista em ordem crescente ou decrescente, conforme seta indicativa ao lado de cada campo selecionado.

Todos os nomes das criptomoedas são links para a página de detalhes daquela moeda específica.

A tabela é responsiva e pode ser utilizada em dispositivos móveis, pois sua primeira coluna é fixa e o restante do corpo da tabela pode ser arrastado.

![Página inicial da aplicação, mostrando todos os elementos descritos acima](/public/assets/app-home.png "Página inicial")

### Página de Detalhes

**Em construção**

A página de detalhes de cada criptomoeda tem duas fucionalidades previstas:  
1) Exibição sobre as ofertas e demandas por empréstimo da criptomoeda selecionada;  
2) Exibição do histórico de negociações entre a criptomoeda (carregada na página) e outra selecionada pelo usuário ou usuária para formar o par.

A visualização dos dados dssa página ainda está em construção, mas funciona bem com moedas que têm muitas informações (como, por exemplo, o Bitcoin). Entretanto, ainda é necessário melhorar as formas de visualização e, talvez, adicionar outros dados.

![Página de detalhes das criptomoedas, mostrando todos os elementos descritos acima](/public/assets/app-details.png "Página de Detalhes")

## Pontos de melhoria

Pontos de melhoria:
- Outras ferramentas de filtro na página inicial;
- Página de detalhes reformulada com mais informações e de forma mais ilustrativa;
- Refatoração do código para simplificação de algumas lógicas e componentização de algumas partes das classes;
- Construção de mais testes unitários - apesar de ter alguns testes, este trabalho foi apenas iniciado, e é necessária uma cobertura maior;
- Mais estudo sobre os termos utilizados e também quanto ao funcionamento do mercado de criptomoedas, para exibição de informações mais assertivas e relevantes.

## Esse é meu projeto até agora, agradeço por ter lido até aqui :)
