import axios from 'axios';

const thickerURL = 'https://poloniex.com/public?command=returnTicker';
const currenciesURL = 'https://poloniex.com/public?command=returnCurrencies';

export const fetchCryptoData = async () => (axios.get(thickerURL));

export const fetchCurrencies = async () => (axios.get(currenciesURL));
