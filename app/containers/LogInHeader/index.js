/*
 *
 * LogInHeader
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectLogInHeader from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AppBar from 'material-ui/AppBar'

export class LogInHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="LogInHeader"
          meta={[
            { name: 'description', content: 'Description of LogInHeader' },
          ]}
        />
        <AppBar
          title="Progress Pics"
        />
      </div>
    );
  }
}

const mapStateToProps = selectLogInHeader();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInHeader);
