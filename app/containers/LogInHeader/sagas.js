import { take, call, put, select, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import request from 'utils/request';

import {
  LOGOUT,
} from '../Register/constants'

import {
  logoutSuccessAction,
  logoutErrorAction,
} from '../Register/actions'

export function* checkAuth() {
  const res = yield call(request, '/users/get-current-user', {
    method: 'POST',
  })

  if (!res.err) {
    yield put({
      type: 'CHECK_AUTH_SUCCESS',
      payload: {
        user: res.user,
      },
    })
  } else {
    yield put({
      type: 'CHECK_AUTH_ERROR',
      err: res.err,
    })
  }
}

export function* logout() {
  console.log('logout handler');
  const logoutData = (
    yield call(request, '/users/logout', {
      method: 'POST',
    }))

  if (!logoutData.err) {
    yield put(logoutSuccessAction())
  } else {
    yield put(logoutErrorAction())
  }
}

// Individual exports for testing
export function* defaultSaga() {
  yield fork(takeLatest, 'CHECK_AUTH', checkAuth)
  yield fork(takeLatest, LOGOUT, logout)
}

// All sagas to be loaded
export default [
  defaultSaga,
];
