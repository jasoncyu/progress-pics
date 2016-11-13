import { take, call, put, select, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import request from 'utils/request';

export function* checkAuth() {
  const res = yield call(request, '/users/get-current-user', {
    method: 'POST',
    credentials: 'include',
    mode: 'no-cors',
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

// Individual exports for testing
export function* defaultSaga() {
  const watcher = yield fork(takeLatest, 'CHECK_AUTH', checkAuth)
}

// All sagas to be loaded
export default [
  defaultSaga,
];
