/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectUsername = () => createSelector(
  selectHome(),
  (homeState) => {
    console.log('homeState: ', homeState)
    return homeState.get('username')
  }
);

export {
  selectHome,
  selectUsername,
};
