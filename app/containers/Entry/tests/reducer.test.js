import expect from 'expect';
import entryReducer from '../reducer';
import { fromJS } from 'immutable';

describe('entryReducer', () => {
  it('returns the initial state', () => {
    expect(entryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
