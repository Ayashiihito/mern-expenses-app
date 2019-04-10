import { combineReducers } from 'redux';

import auth from './authReducer';
import errors from './errorReducer';
import expensesApp from './expensesReducer';

export default combineReducers({
  auth,
  errors,
  expensesApp,
});
