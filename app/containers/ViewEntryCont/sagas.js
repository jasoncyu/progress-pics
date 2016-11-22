import { takeLatest } from 'redux-saga'
import { fork, take, call, put, select } from 'redux-saga/effects';

import request from 'utils/request';

import {
  FETCH_ENTRY,
} from './constants'

import {
  fetchEntrySuccessAction,
  fetchEntryErrorAction,
} from './actions'

export function* fetchEntry(action) {
  const res = yield call(request, `/entries/${action.payload.entryId}.json`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!res.err) {
    yield put(fetchEntrySuccessAction(res.entry))
  } else {
    yield put(fetchEntryErrorAction(res.err))
  }
}

// Individual exports for testing
export function* defaultSaga() {
  yield fork(takeLatest, FETCH_ENTRY, fetchEntry)
}

// All sagas to be loaded
export default [
  defaultSaga,
];
