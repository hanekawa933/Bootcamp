import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_ALL_USER,
  GET_ERROR,
  DELETE_USER,
  GET_USER,
  UPDATE_USER,
  LOGIN_ADMIN,
  GET_USERS_COUNT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isAdmin: null,
  loading: true,
  check: null,
  user: [],
  dataUser: [],
  delete: [],
  update: [],
  countUser: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        check: false,
        user: payload
      };
    case GET_USERS_COUNT:
      return {
        ...state,
        countUser: payload,
        loading: false
      };
    case UPDATE_USER:
      return {
        ...state,
        update: payload,
        loading: false,
        check: false
      };
    case DELETE_USER:
      return {
        ...state,
        delete: payload,
        loading: false,
        check: false
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        check: true,
        loading: false
      };
    case LOGIN_ADMIN:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isAdmin: true,
        loading: false,
        check: false
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        check: false
      };
    case GET_ALL_USER:
      return {
        ...state,
        dataUser: payload,
        loading: false,
        check: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        check: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        loading: false,
        check: false
      };
    case GET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        check: false
      };
    default:
      return state;
  }
}
