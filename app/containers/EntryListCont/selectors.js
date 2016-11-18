import { createSelector } from 'reselect';

/**
 * Direct selector to the entryListCont state domain
 */
const selectEntryListContDomain = () => (state) => state.get('entryListCont');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EntryListCont
 */

const selectEntryListCont = () => createSelector(
  selectEntryListContDomain(),
  (substate) => substate.toJS()
);

export default selectEntryListCont;
export {
  selectEntryListContDomain,
};
