/*
 *
 * EntryListCont
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectEntryListCont from './selectors';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Link } from 'react-router'
import { List, ListItem } from 'material-ui/List';
import { UserIsAuthenticated } from 'authWrappers'

import {
  fetchEntriesAction,
} from '../Entry/actions'

import {
  selectEntries,
} from '../Entry/selectors'

@UserIsAuthenticated
export class EntryListCont extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchEntries()
  }

  render() {
    console.log('this.props.entries: ', this.props.entries)
    return (
      <div>
        <Helmet
          title="EntryListCont"
          meta={[
            { name: 'description', content: 'Description of EntryListCont' },
          ]}
        />
        <List>
          {
            this.props.entries.map((entry) => {
              return (
                <ListItem
                  key={entry.createdTs}
                  primaryText={<Link to={`/entries/${entry._id}`}>{entry.s3Url}</Link>}
                />
              )
            })
          }
        </List>
      </div>
    );
  }
}
EntryListCont.propTypes = {
  entries: React.PropTypes.array,
  fetchEntries: React.PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  entries: selectEntries(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchEntries: () => {
      dispatch(fetchEntriesAction())
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryListCont);
