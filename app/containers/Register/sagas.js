import request from '../../utils/request'
import { browserHistory } from 'react-router';

import { takeLatest } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'

import * as s from './selectors'
import * as a from './actions'
import * as C from './constants'

export function* login(action) {
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
    }))

  if (!loginData.err) {
    yield put(a.logInSuccessAction({
      user: loginData.user,
      redirectPath: action.payload.redirectPath,
    }))
    browserHistory.push(action.payload.redirectPath)
  } else {
    yield put(a.logInErrorAction(loginData.err))
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
  yield fork(takeLatest, C.LOG_IN, login)
  yield fork(takeLatest, C.REGISTER, register)
}

// All sagas to be loaded
export default [
  defaultSaga,
];
