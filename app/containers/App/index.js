/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// Needed for material-ui. It'll raise errors in development for multiple injections,
// but we can ignore those.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import AppBar from 'material-ui/AppBar'
import Footer from 'components/Footer';
import FlatButton from 'material-ui/FlatButton';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import {
  logInAction,
  logoutAction,
} from '../Register/actions'

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import { VisibleOnlyIfLoggedIn, VisibleOnlyAdmin } from '../../authWrappers'
import request from '../../utils/request'

import styles from './styles.css';

import sa from 'superagent'

const authCheck = (evt) => {
  evt.preventDefault()
  request('/users/is-logged-in', {
    method: 'POST',
    credentials: 'include',
    mode: 'no-cors',
  })
  /* sa
   *    .post('/users/is-logged-in')
   *    .send()
   * .end()*/
  /* const req = new XMLHttpRequest()
   * req.open('POST')*/
}

function App(props) {
  return (
    // Needed for material-ui to work.
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div className={styles.wrapper}>
        <Helmet
          titleTemplate="%s - Progress Pics"
          defaultTitle="Progress Pics"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application' },
          ]}
        />
        <AppBar
          title="Progress Pics"
        />
        <button onClick={authCheck}>
          Check auth
        </button>
        <div
          className={styles.contentWrapper}
        >
          {React.Children.toArray(props.children)}
        </div>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
  logout: React.PropTypes.func,
  login: React.PropTypes.func,
};

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    logout(evt) {
      evt.preventDefault()
      dispatch(logoutAction())
    },
    login(evt) {
      evt.preventDefault()
      dispatch(logInAction())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
