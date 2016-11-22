/*
 *
 * ViewEntryCont actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_ENTRY,
  FETCH_ENTRY_SUCCESS,
  FETCH_ENTRY_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const fetchEntryAction = (entryId) => {
  return {
    type: FETCH_ENTRY,
    payload: {
      entryId,
    },
  }
}

export const fetchEntrySuccessAction = (entry) => {
  return {
    type: FETCH_ENTRY_SUCCESS,
    payload: {
      entry,
    },
  }
}

export const fetchEntryErrorAction = (err) => {
  return {
    type: FETCH_ENTRY_ERROR,
    err,
  }
}
