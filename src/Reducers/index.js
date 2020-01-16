import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import event from './event';
import buyer from './buyer';

export default combineReducers({
  alert,
  auth,
  event,
  buyer
});
