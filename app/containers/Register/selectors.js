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

export const selectUsername = () => createSelector(
  selectRegister(),
  (substate) => substate.username
)

export const selectPassword = () => createSelector(
  selectRegister(),
  (substate) => substate.password
)

export const selectUser = () => createSelector(
  selectRegisterDomain(),
  (substate) => substate ? substate.get('user').toJS() : {}
)

export default selectRegister;
export {
  selectRegisterDomain,
};
