import { createSelector } from 'reselect';

/**
 * Direct selector to the logInHeader state domain
 */
const selectLogInHeaderDomain = () => (state) => state.get('global');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LogInHeader
 */

const selectLogInHeader = () => createSelector(
  selectLogInHeaderDomain(),
  (substate) => substate.toJS()
);

export default selectLogInHeader;
export {
  selectLogInHeaderDomain,
};
