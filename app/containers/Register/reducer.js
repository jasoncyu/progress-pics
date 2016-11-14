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
} from './constants';

const initialState = fromJS({
  username: '',
  password: '',
  user: {},
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
    default:
      return state;
  }
}

export default registerReducer;
