/**
 * Test  sagas
 */
import { CREATE_ENTRY_ERROR } from '../constants'

import expect from 'expect';
import { call, put } from 'redux-saga/effects'
// import { take, call, put, select } from 'redux-saga/effects';
import { createEntry, createEntryCall } from '../sagas';

import * as actions from '../actions'

describe('createEntry Saga', () => {
  const file = 'asdf'
  let createEntryGen

  beforeEach(() => {
    createEntryGen = createEntry(actions.createEntryAction(file))

    expect(createEntryGen.next().value).toEqual(
      call(createEntryCall, file))
  })

  it('should call the createEntrySuccess action on success', () => {
    const mockEntry = {
      data: {
        id: '1',
        s3Url: 'http://fake.com',
      },
    }
    const putDescriptor = createEntryGen.next(mockEntry).value

    expect(putDescriptor).toEqual(
      put(actions.createEntrySuccessAction(mockEntry)))
  })

  it('should call the createEntryError action on error', () => {
    const errStr = 'This is an error'

    const errDescriptor = createEntryGen.next({
      err: errStr,
    }).value

    expect(errDescriptor).toEqual(
      put({ type: CREATE_ENTRY_ERROR, err: errStr }))
  })
})
