export const formatTableHead = (key) => {
  switch (key) {
    case 'last': return 'Último preço';
    case 'lowestAsk': return 'Menor preço atual';
    case 'highestBid': return 'Maior preço atual';
    case 'percentChange': return 'Variação (%)';
    case 'baseVolume': return 'Volume (24h)';
    case 'high24hr': return 'Maior preço (24h)';
    case 'low24hr': return 'Menor preço (24h)';
    default: return undefined;
  }
};

export const formatTableBody = (key, value) => {
  const currencyFormat = { minimumFractionDigits: 4, style: 'currency', currency: 'BRL' };
  switch (key) {
    case 'last': return `${Number(value).toLocaleString('pt-BR', currencyFormat).substring(1)}`;
    case 'lowestAsk': return `${Number(value).toLocaleString('pt-BR', currencyFormat).substring(1)}`;
    case 'highestBid': return `${Number(value).toLocaleString('pt-BR', currencyFormat).substring(1)}`;
    case 'percentChange': return `${parseFloat(value * 100).toFixed(3)}%`;
    case 'baseVolume': return `${Number(value).toLocaleString('pt-BR', currencyFormat).substring(1)}`;
    case 'high24hr': return `${Number(value).toLocaleString('pt-BR', currencyFormat).substring(1)}`;
    case 'low24hr': return `${Number(value).toLocaleString('pt-BR', currencyFormat).substring(1)}`;
    default: return undefined;
  }
};
