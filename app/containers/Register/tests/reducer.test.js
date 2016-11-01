import expect from 'expect';
import registerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('registerReducer', () => {
  it('returns the initial state', () => {
    expect(registerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
