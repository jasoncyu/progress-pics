/*
 *
 * Entry reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_ENTRIES,
  FETCH_ENTRIES_SUCCESS,
  FETCH_ENTRIES_ERROR,
} from './constants';

const initialState = fromJS({
  entries: [],
});

function entryReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_ENTRIES_SUCCESS: {
      console.log('action: ', action)
      return state.set('entries', action.payload.entries)
    }
    case FETCH_ENTRIES_ERROR: {
      return state.set('error', action.err)
    }
    default:
      return state;
  }
}

export default entryReducer;
