import expect from 'expect';
import logInHeaderReducer from '../reducer';
import { fromJS } from 'immutable';

describe('logInHeaderReducer', () => {
  it('returns the initial state', () => {
    expect(logInHeaderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
