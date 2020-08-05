import axios from 'axios';

const thickerURL = 'https://poloniex.com/public?command=returnTicker';
const tradeHistoryURL = 'https://poloniex.com/public?command=returnTradeHistory&currencyPair=';

export const fetchCryptoData = async () => (axios.get(thickerURL));

export const fetchTradeHistory = async (coinPair) => (axios.get(`${tradeHistoryURL}${coinPair}`));
