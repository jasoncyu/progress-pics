import { createSelector } from 'reselect';

/**
 * Direct selector to the register state domain
 */
const selectRegisterDomain = () => (state) => state.get('register');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Register
 */

const selectRegister = () => createSelector(
  selectRegisterDomain(),
  (substate) => substate.toJS()
);

export default selectRegister;
export {
  selectRegisterDomain,
};
