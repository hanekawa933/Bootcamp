import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_EVENT,
  GET_ERROR,
  CREATE_EVENT,
  CREATE_ERROR,
  GET_ALL_EVENT,
  GET_SPECIFIC_EVENT,
  GET_EVENT_BY_CATEGORY,
  DELETE_EVENT,
  UPDATE_EVENT,
  UPDATE_SOLD,
  UPDATE_SOLD2,
  GET_EVENTS_COUNT,
  CREATE_PHOTO,
  SEARCH_EVENT,
  SEARCH_RESULT,
  ADD_VIEWS
} from './types';

// GET ALL USERS EVENT
export const getAllEvent = () => async dispatch => {
  try {
    const res = await axios.get('/api/events/list');
    dispatch({
      type: GET_ALL_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// DELETE USERS EVENT
export const deleteEvent = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/events/id=${id}`);
    dispatch({
      type: DELETE_EVENT,
      payload: res.data
    });
    dispatch(getAllEvent());
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const photoupload = (formData, progressBar, uploadFile, message) => async dispatch => {
  const config = {
    headers: {
      'Type-Content': 'multipart/form-data'
    }
  };
  try {
    const res = await axios.post('/api/events/upload', formData, {
      config,
      progressBar
    });

    const { fileName, filePath } = res.data;

    uploadFile({ fileName, filePath });

    message('File Uploaded');

    dispatch({
      type: CREATE_PHOTO,
      payload: { fileName, filePath }
    });
  } catch (err) {
    if (err.response.status === 500) {
      message('There was a problem with the server');
    } else {
      message(err.response.data.msg);
    }
    dispatch({
      type: CREATE_ERROR
    });
  }
};

// CREATE EVENTS
export const create = ({
  organizer,
  eventName,
  dateStart,
  dateEnd,
  artist,
  category,
  requirement,
  term,
  redeem,
  venue,
  city,
  price,
  quantity,
  description,
  fileName,
  sold,
  available
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    organizer,
    eventName,
    dateStart,
    dateEnd,
    artist,
    category,
    requirement,
    term,
    redeem,
    venue,
    city,
    price,
    quantity,
    description,
    fileName,
    sold,
    available
  });

  try {
    const res = await axios.post('/api/events', body, config);

    dispatch({
      type: CREATE_EVENT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CREATE_ERROR
    });
  }
};

// GET EVENT BY ID AND EVENT NAME
export const getSpecificEvent = (id, eventName) => async dispatch => {
  try {
    const res = await axios.get(`/api/events/id=${id}&eventName=${eventName}`);
    dispatch({
      type: GET_SPECIFIC_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// UPDATE EVENTS
export const update = (props, id, event) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const {
    organizer,
    eventName,
    dateStart,
    dateEnd,
    artist,
    category,
    requirement,
    term,
    redeem,
    venue,
    city,
    price,
    quantity,
    description,
    photo,
    sold,
    available
  } = props;
  const body = JSON.stringify({
    organizer,
    eventName,
    dateStart,
    dateEnd,
    artist,
    category,
    requirement,
    term,
    redeem,
    venue,
    city,
    price,
    quantity,
    description,
    photo,
    sold,
    available
  });

  try {
    const res = await axios.put(`/api/events/update/id=${id}&eventName=${event}`, body, config);

    dispatch({
      type: UPDATE_EVENT,
      payload: res.data
    });
    dispatch(setAlert('Event sucessfully updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CREATE_ERROR
    });
  }
};

// GET EVENT BY CATEGORY
export const getEventCategory = category => async dispatch => {
  try {
    const res = await axios.get(`/api/events/category=${category}`);
    dispatch({
      type: GET_EVENT_BY_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// GET CURRENT USERS EVENT
export const getCurrentEvent = () => async dispatch => {
  try {
    const res = await axios.get('/api/events');
    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// GET ALL EVENTS RECORD
export const getEventsCount = () => async dispatch => {
  try {
    const res = await axios.get('/api/events/count');
    dispatch({
      type: GET_EVENTS_COUNT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// UPDATE EO TICKET FROM USERS VALIDATION
// UPDATE BUYER
export const updateSold = (qtydb, id, eventName, qty) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    qtydb
  });

  try {
    const res = await axios.put(
      `/api/events/verify/id=${id}&eventName=${eventName}&${qty}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_SOLD,
      payload: res.data
    });
    dispatch(setAlert('Purchasement Completed', 'success'));
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// UPDATE EO TICKET FROM USERS VALIDATION
// UPDATE BUYER
export const updateSold2 = (qtydb, id, qty) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    qtydb
  });

  try {
    const res = await axios.put(`/api/events/verify/id=${id}&${qty}`, body, config);

    dispatch({
      type: UPDATE_SOLD2,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// UPDATE EO TICKET FROM USERS VALIDATION
// UPDATE BUYER
export const addViews = (id, eventName) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/events/views/id=${id}&eventName=${eventName}`, config);
    dispatch({
      type: ADD_VIEWS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// SEARCH SUBMIT FOR USER
export const searchResult = search => async dispatch => {
  try {
    const res = await axios.get(`/api/events/search=${search}`);
    dispatch({
      type: SEARCH_RESULT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// GET SOLD BY CATEGORY
export const countCategory = (category, id, reducers) => async dispatch => {
  try {
    const res = await axios.get(`/api/events/count=${category}&${id}`);
    const type = reducers;
    dispatch({
      type: type,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// SEARCH RESULT FOR BUYER
// CREATE EVENTS
export const searchEvent = ({ search }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    search
  });

  try {
    const res = await axios.post('/api/events/search', body, config);

    dispatch({
      type: SEARCH_EVENT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CREATE_ERROR
    });
  }
};
