import expect from 'expect';
import entryListContReducer from '../reducer';
import { fromJS } from 'immutable';

describe('entryListContReducer', () => {
  it('returns the initial state', () => {
    expect(entryListContReducer(undefined, {})).toEqual(fromJS({}));
  });
});
