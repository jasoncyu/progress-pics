/*
 *
 * LogInHeader
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import { browserHistory } from 'react-router'

import {
  logoutAction,
} from '../Register/actions'


import { createStructuredSelector } from 'reselect';
import { selectUser } from '../Register/selectors'

/**
 * Checks the user's auth status and shows the appropriate content.
 */
export class LogInHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.dispatch({
      type: 'CHECK_AUTH',
    })
  }

  render() {
    const iconElementRight = (() => {
      if (this.props.user._id) {
        return (
          <FlatButton label="Log Out" onClick={this.props.logout} />
        )
      }
      return (
        <FlatButton label="Log In" onClick={this.props.goToLoginPage} />
      )
    })()

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
          iconElementRight={iconElementRight}
        />
      </div>
    );
  }
}

LogInHeader.propTypes = {
  user: React.PropTypes.object,
  logout: React.PropTypes.func,
  goToLoginPage: React.PropTypes.func,
  dispatch: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    goToLoginPage() {
      browserHistory.push('/login')
    },
    logout() {
      this.dispatch(logoutAction())
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInHeader);
