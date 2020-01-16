import axios from 'axios';
import { setAlert } from './alert';
import {
  BUY_FAIL,
  BUY_TICKET,
  GET_ALL_BUYER,
  DELETE_BUYER,
  GET_BUYER,
  UPDATE_BUYER,
  GET_ERROR,
  GET_BUYERS_COUNT,
  GET_VALID_BUYER,
  UPDATE_VALID
} from './types';

// Buy Event
export const buy = (
  { name, email, telephone, quantity, price, kk },
  id,
  eventName
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, telephone, quantity, price, kk });

  try {
    const res = await axios.put(`/api/buyers/id=${id}&eventName=${eventName}`, body, config);

    dispatch({
      type: BUY_TICKET,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: BUY_FAIL
    });
  }
};

// Delete Buyer
export const deleteBuyer = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/buyers/id=${id}`);
    dispatch({
      type: DELETE_BUYER,
      payload: res.data
    });
    dispatch(getAllBuyer());
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// GET ALL BUYER
export const getAllBuyer = () => async dispatch => {
  try {
    const res = await axios.get('/api/buyers');
    dispatch({
      type: GET_ALL_BUYER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// GET BUYER
export const getBuyer = id => async dispatch => {
  try {
    const res = await axios.get(`/api/buyers/id=${id}`);
    dispatch({
      type: GET_BUYER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// GET BUYER BUY EVENT
export const getValidBuyer = id => async dispatch => {
  try {
    const res = await axios.get(`/api/buyers/buyer_id=${id}`);
    dispatch({
      type: GET_VALID_BUYER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// GET BUYER BUY EVENT
export const validUpdate = id => async dispatch => {
  try {
    const res = await axios.put(`/api/buyers/buyer_id=${id}`);
    dispatch({
      type: UPDATE_VALID,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// UPDATE BUYER
export const update = (props, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const { name, email, telephone, quantity, price, kk } = props;
  const body = JSON.stringify({
    name,
    email,
    telephone,
    quantity,
    price,
    kk
  });

  try {
    const res = await axios.put(`/api/buyers/update/id=${id}`, body, config);

    dispatch({
      type: UPDATE_BUYER,
      payload: res.data
    });
    dispatch(setAlert('Buyer sucessfully updated', 'success'));
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

// GET ALL BUYERS RECORD
export const getBuyersCount = () => async dispatch => {
  try {
    const res = await axios.get('/api/buyers/count');
    dispatch({
      type: GET_BUYERS_COUNT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
