/*
 *
 * EntryListCont
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectEntryListCont from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { List, ListItem } from 'material-ui/List';

import {
  fetchEntriesAction,
} from '../Entry/actions'

export class EntryListCont extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchEntries()
  }

  render() {
    return (
      <div>
        <Helmet
          title="EntryListCont"
          meta={[
            { name: 'description', content: 'Description of EntryListCont' },
          ]}
        />
        <List>
        </List>
      </div>
    );
  }
}
EntryListCont.propTypes = {
  fetchEntries: React.PropTypes.func,
}

const mapStateToProps = selectEntryListCont();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchEntries: () => {
      dispatch(fetchEntriesAction())
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryListCont);
