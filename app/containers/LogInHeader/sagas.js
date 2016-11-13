import { take, call, put, select, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import request from 'utils/request';

export function* checkAuth() {
  try {
    yield call(request, '/users/is-logged-in', {
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
    })
  } catch (err) {
    const finalErr = yield err.response.json()
    yield put({
      type: 'CHECK_AUTH_ERROR',
      err: finalErr,
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
