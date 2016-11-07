import request from '../../utils/request'

import { takeLatest } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'

import * as s from './selectors'
import * as a from './actions'
import * as C from './constants'

export function* login() {
  const username = yield select(s.selectUsername())
  const password = yield select(s.selectPassword())

  const loginData = (
    yield call(request, '/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: 'include',
    }))

  if (!loginData.err) {
    console.log('login done, new cookie: ', document.cookie);
    yield put(a.logInSuccessAction(loginData.data))
  } else {
    yield put(a.logInErrorAction(loginData.err))
  }
}

export function* logout() {
  console.log('logout handler');
  const logoutData = (
    yield call(request, '/users/logout', {
      method: 'POST',
    }))

  if (!logoutData.err) {
    yield put(a.logoutSuccessAction())
  } else {
    yield put(a.logoutErrorAction())
  }
}

export function* register() {
  const username = yield select(s.selectUsername())
  const password = yield select(s.selectPassword())

  const registerData = (
    yield call(request, '/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }))

  if (!registerData.err) {
    yield put(a.registerSuccessAction())
  } else {
    yield put(a.registerErrorAction())
  }
}

// Individual exports for testing
export function* defaultSaga() {
  yield fork(takeLatest, C.LOGOUT, logout)
  yield fork(takeLatest, C.LOG_IN, login)
  yield fork(takeLatest, C.REGISTER, register)
}

// All sagas to be loaded
export default [
  defaultSaga,
];
