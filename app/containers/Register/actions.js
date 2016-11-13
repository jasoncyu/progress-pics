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
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
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

export const logInSuccessAction = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    payload: data,
  }
}

export const logInErrorAction = (err) => {
  return {
    type: LOG_IN_ERROR,
    err,
  }
}

export const registerAction = (username, password) => {
  return {
    type: REGISTER,
    payload: { username, password },
  }
}

export const registerSuccessAction = () => {
  return {
    type: REGISTER_SUCCESS,
  }
}

export const registerErrorAction = (err) => {
  return {
    type: REGISTER_ERROR,
  }
}

export const logoutAction = (username, password) => {
  return {
    type: LOGOUT,
    payload: { username, password },
  }
}

export const logoutSuccessAction = () => {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export const logoutErrorAction = (err) => {
  return {
    type: LOGOUT_ERROR,
  }
}
