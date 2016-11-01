import { takeLatest } from 'redux-saga'
import { fork, call, put } from 'redux-saga/effects'
import request from 'utils/request';

import { CREATE_ENTRY, CREATE_ENTRY_SUCCESS, CREATE_ENTRY_ERROR } from './constants'


export async function createEntryCall(file) {
  const body = new FormData()
  body.append('progressPicture', file)

  return request('/entries', {
    method: 'POST',
    body,
  })
}

export function* createEntry(createEntryAction) {
  const file = createEntryAction.payload.file
  const entry = yield call(createEntryCall, file)
  if (!entry.err) {
    yield put({
      type: CREATE_ENTRY_SUCCESS,
      payload: entry,
    })
  } else {
    yield put({
      type: CREATE_ENTRY_ERROR,
      err: entry.err,
    })
  }
}

export function* createEntryWatcher() {
  yield fork(takeLatest, CREATE_ENTRY, createEntry)
}

// Individual exports for testing
export function* defaultSaga() {
  // yield fork(takeLatest, CREATE_ENTRY, createEntry)
  yield fork(takeLatest, CREATE_ENTRY, createEntry)
}

// All sagas to be loaded
export default [
  defaultSaga,
];
