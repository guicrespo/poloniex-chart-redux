import { REQUEST_POLONIEX_API, RECEIVE_POLONIEX_API_SUCCESS, RECEIVE_POLONIEX_API_FAILURE } from '../actions';

const INITIAL_STATE = { isFetching: false, data: [], error: '' };

const cryptoData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_POLONIEX_API:
      return { ...state, isFetching: true };
    case RECEIVE_POLONIEX_API_SUCCESS:
      return { ...state, isFetching: false, data: action.data };
    case RECEIVE_POLONIEX_API_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default: return state;
  }
};

export default cryptoData;
