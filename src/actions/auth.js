import axios from 'axios';
import { setAlert } from './alert';
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
  UPDATE_USER,
  GET_USER,
  LOGIN_ADMIN,
  GET_USERS_COUNT
} from './types';
import setAuthToken from '../Utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Register User
export const register = ({ username, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//Register User
export const registerAdmin = ({ username, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: GET_ERROR
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Login Admin
export const admin = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth/admin', body, config);

    dispatch({
      type: LOGIN_ADMIN,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// GET CURRENT USERS
export const getUserById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/auth/id=${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// GET ALL USERS
export const getAllUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');
    dispatch({
      type: GET_ALL_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};

// Delete user
export const deleteUser = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/users/id=${id}`);
    dispatch({
      type: DELETE_USER,
      payload: res.data
    });
    dispatch(getAllUsers());
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update User
export const update = (props, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const { username, email, password, isAdmin } = props;
  const body = JSON.stringify({
    username,
    email,
    password,
    isAdmin
  });

  try {
    const res = await axios.put(`/api/users/update/id=${id}`, body, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });
    dispatch(setAlert('User sucessfully updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// GET ALL USERS RECORD
export const getUsersCount = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/count');
    dispatch({
      type: GET_USERS_COUNT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
