import axios from 'axios';

const poloniexURL = 'https://poloniex.com/public?command=returnTicker';

const fetchCryptoData = async () => (axios.get(poloniexURL));

export default fetchCryptoData;
