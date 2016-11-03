import { LOG_IN } from './constants'
import request from '../../utils/request'

import { takeLatest } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'
import * as s from './selectors'
import * as a from './actions'

export function* logIn() {
  const username = yield select(s.selectUsername())
  const password = yield select(s.selectPassword())

  const register = (
    yield call(request, '/users', {
      method: 'POST',
      body: {
        username,
        password,
      },
    }))

  if (!register.err) {
    yield put(a.logInSuccessAction())
  } else {
    yield put(a.logInErrorAction())
  }
}

// Individual exports for testing
export function* defaultSaga() {
  yield fork(takeLatest, LOG_IN, logIn)
}

// All sagas to be loaded
export default [
  defaultSaga,
];
