import { fetchCryptoData, fetchCurrencies } from '../services';

export const REQUEST_POLONIEX_API = 'REQUEST_POLONIEX_API';
export const RECEIVE_POLONIEX_API_SUCCESS = 'RECEIVE_POLONIEX_API_SUCCESS';
export const RECEIVE_POLONIEX_API_FAILURE = 'RECEIVE_POLONIEX_API_FAILURE';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const SORT_TABLE = 'SORT_TABLE';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

const requestPoloniexAPI = () => ({
  type: REQUEST_POLONIEX_API,
});

const receivePoloniexAPISuccess = (data) => ({
  type: RECEIVE_POLONIEX_API_SUCCESS,
  data,
});

const receivePoloniexAPIFailure = (error) => ({
  type: RECEIVE_POLONIEX_API_FAILURE,
  error,
});

const receiveCurrenciesAPISuccess = (data) => ({
  type: RECEIVE_CURRENCIES,
  data,
});

export const getCryptoDataFromAPI = () => async (dispatch) => {
  dispatch(requestPoloniexAPI());

  return fetchCryptoData()
    .then(({ data }) => {
      const filteredDataUSDT = Object.entries(data)
        .filter(([key, _value]) => key.startsWith('USDT'))
        .sort(([, a], [, b]) => b.last - a.last)
        .reduce((acc, cur) => {
          acc[cur[0].substring(5)] = cur[1];
          return acc;
        }, []);

      dispatch(receivePoloniexAPISuccess(filteredDataUSDT));
    })
    .catch((error) => dispatch(receivePoloniexAPIFailure(error)));
};

export const filterByName = (data, name) => {
  const filteredData = Object.entries(data)
    .filter(([key, _value]) => key.match(name))
    .reduce((acc, cur) => {
      acc[cur[0]] = cur[1];
      return acc;
    }, []);
  return {
    type: FILTER_BY_NAME,
    filteredData,
    name,
  };
};

export const sortContent = (data, field, order) => {
  const operator = order === 'ASC' ? 1 : -1;
  const sortedData = Object.entries(data)
    .sort(([, a], [, b]) => operator * (a[field] - b[field]))
    .reduce((acc, cur) => {
      acc[cur[0]] = cur[1];
      return acc;
    }, []);
  return {
    type: SORT_TABLE,
    data: sortedData,
    field,
    order,
  };
};

export const getCurrencies = () => async (dispatch) => {
  dispatch(requestPoloniexAPI);

  return fetchCurrencies()
    .then(({ data }) => dispatch(receiveCurrenciesAPISuccess(Object.keys(data))))
    .catch((error) => dispatch(receivePoloniexAPIFailure(error)));
};
