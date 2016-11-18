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

export class EntryListCont extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="EntryListCont"
          meta={[
            { name: 'description', content: 'Description of EntryListCont' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

const mapStateToProps = selectEntryListCont();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryListCont);
