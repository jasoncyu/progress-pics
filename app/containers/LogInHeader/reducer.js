/*
 *
 * LogInHeader reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  // Object representing the user.
  user: {},
});

function logInHeaderReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case 'CHECK_AUTH_ERROR':
      return state.set('errorMessage', action.err.message)
    default:
      return state;
  }
}

export default logInHeaderReducer;
