import expect from 'expect';
import viewEntryContReducer from '../reducer';
import { fromJS } from 'immutable';

describe('viewEntryContReducer', () => {
  it('returns the initial state', () => {
    expect(viewEntryContReducer(undefined, {})).toEqual(fromJS({}));
  });
});
