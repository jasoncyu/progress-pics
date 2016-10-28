import { createSelector } from 'reselect';

/**
 * Direct selector to the entry state domain
 */
const selectEntryDomain = () => (state) => state.get('entry');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Entry
 */

const selectEntry = () => createSelector(
  selectEntryDomain(),
  (substate) => substate.toJS()
);

export default selectEntry;
export {
  selectEntryDomain,
};
