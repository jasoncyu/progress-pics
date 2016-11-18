/*
 *
 * Entry actions
 *
 */

import {
  CREATE_ENTRY,
  CREATE_ENTRY_SUCCESS,
  CREATE_ENTRY_ERROR,
  DEFAULT_ACTION,
  FETCH_ENTRIES,
  FETCH_ENTRIES_SUCCESS,
  FETCH_ENTRIES_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

/**
 * Create an entry with a progress picture.
 * @param  {file} file The image file for this Entry.
 */
export const createEntryAction = (file) => {
  return {
    type: CREATE_ENTRY,
    payload: { file },
  }
}

export const createEntrySuccessAction = (entry) => {
  return {
    type: CREATE_ENTRY_SUCCESS,
    payload: entry,
  }
}

export const createEntryErrorAction = (err) => {
  return {
    type: CREATE_ENTRY_ERROR,
    err,
  }
}

/**
 * Fetch existing entries for this user.
 */
export const fetchEntriesAction = () => {
  return {
    type: FETCH_ENTRIES,
    payload: {},
  }
}

export const fetchEntriesSuccessAction = (entries) => {
  return {
    type: FETCH_ENTRIES_SUCCESS,
    payload: entries,
  }
}

export const fetchEntriesErrorAction = (err) => {
  return {
    type: FETCH_ENTRIES_ERROR,
    err,
  }
}
