import {
  BUY_FAIL,
  BUY_TICKET,
  DELETE_BUYER,
  GET_ALL_BUYER,
  GET_BUYER,
  UPDATE_BUYER,
  GET_ERROR,
  GET_BUYERS_COUNT,
  GET_VALID_BUYER,
  UPDATE_VALID
} from '../actions/types';

const initialState = {
  loading: true,
  event: [],
  error: {},
  check: null,
  delete: [],
  buyer: [],
  specificBuyer: [],
  countBuyer: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_VALID_BUYER:
    case GET_BUYER:
      return {
        ...state,
        specificBuyer: payload,
        loading: false,
        check: false
      };
    case GET_BUYERS_COUNT:
      return {
        ...state,
        countBuyer: payload,
        loading: false
      };
    case GET_ALL_BUYER:
      return {
        ...state,
        buyer: payload,
        loading: false,
        check: false
      };
    case UPDATE_VALID:
    case UPDATE_BUYER:
      return {
        ...state,
        event: payload,
        loading: false,
        check: false
      };
    case BUY_TICKET:
      return {
        ...state,
        event: payload,
        loading: false,
        check: true
      };
    case GET_ERROR:
    case BUY_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        check: false
      };
    case DELETE_BUYER:
      return {
        ...state,
        delete: payload,
        loading: false,
        check: false
      };
    default:
      return state;
  }
}
