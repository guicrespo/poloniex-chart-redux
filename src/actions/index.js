import fetchCryptoData from '../services';

export const REQUEST_POLONIEX_API = 'REQUEST_POLONIEX_API';
export const RECEIVE_POLONIEX_API_SUCCESS = 'RECEIVE_POLONIEX_API_SUCCESS';
export const RECEIVE_POLONIEX_API_FAILURE = 'RECEIVE_POLONIEX_API_FAILURE';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';

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

export const getCryptoDataFromAPI = () => async (dispatch) => {
  dispatch(requestPoloniexAPI());

  return fetchCryptoData()
    .then(({ data }) => {
      const filteredDataUSDT = Object.entries(data)
        .filter(([key, _value]) => key.startsWith('USDT'))
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
