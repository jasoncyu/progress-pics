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
