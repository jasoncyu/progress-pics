/*
 *
 * ViewEntryCont reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_ENTRY_SUCCESS,
  FETCH_ENTRY_ERROR,
} from './constants';

const initialState = fromJS({});

function viewEntryContReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_ENTRY_SUCCESS: {
      return state.set('entry', fromJS(action.payload.entry))
    }
    case FETCH_ENTRY_ERROR: {
      return state.set('error', fromJS(action.err))
    }
    default:
      return state;
  }
}

export default viewEntryContReducer;
