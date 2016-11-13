/*
 *
 * Register reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  LOG_IN_SUCCESS,
} from './constants';

const initialState = fromJS({
  username: '',
  password: '',
});

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    // Change the currently typed username.
    case CHANGE_USERNAME: {
      return state
        .set('username', action.payload.username)
    }
    // Change the currently typed password.
    case CHANGE_PASSWORD: {
      return state
        .set('password', action.payload.password)
    }
    case LOG_IN_SUCCESS: {
      return state
        .set('user', action.payload.user)
    }

    default:
      return state;
  }
}

export default registerReducer;
