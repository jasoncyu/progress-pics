import { createSelector } from 'reselect';

/**
 * Direct selector to the viewEntryCont state domain
 */
const selectViewEntryContDomain = () => (state) => state.get('viewEntryCont');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ViewEntryCont
 */

const selectViewEntryCont = () => createSelector(
  selectViewEntryContDomain(),
  (substate) => substate.toJS()
);

export default selectViewEntryCont;
export {
  selectViewEntryContDomain,
};
