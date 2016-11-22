/*
 *
 * ViewEntryCont
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectViewEntryCont from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {
  fetchEntryAction,
} from './actions'

export class ViewEntryCont extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchEntry(this.props.params.entryId)
  }

  render() {
    return (
      <div>
        <Helmet
          title="ViewEntryCont"
          meta={[
            { name: 'description', content: 'Description of ViewEntryCont' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}
ViewEntryCont.propTypes = {
  params: React.PropTypes.object,
  fetchEntry: React.PropTypes.func,
}

const mapStateToProps = selectViewEntryCont();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchEntry: (entryId) => {
      dispatch(fetchEntryAction(entryId))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewEntryCont);
