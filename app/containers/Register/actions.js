/*
 *
 * Register actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const changeUsernameAction = (username) => {
  return {
    type: CHANGE_USERNAME,
    payload: {
      username,
    },
  }
}

export const changePasswordAction = (password) => {
  return {
    type: CHANGE_PASSWORD,
    payload: {
      password,
    },
  }
}

export const logInAction = () => {
  return {
    type: LOG_IN,
  }
}

export const logInSuccessAction = () => {
  return {
    type: LOG_IN_SUCCESS,
  }
}

export const logInErrorAction = (err) => {
  return {
    type: LOG_IN_ERROR,
    err,
  }
}
