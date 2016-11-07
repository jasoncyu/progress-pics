/*
 *
 * Register
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styles from './styles.css';

import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import * as actions from './actions'
import * as s from './selectors'

export class Register extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.register}>
        <Helmet
          title="Register"
          meta={[
            { name: 'description', content: 'Description of Register' },
          ]}
        />

        <h3 className={styles.title}>
          Log in
        </h3>

        <Grid>
          <Row center="xs">
            <Col className={styles.extraColName} md={12}>
              <form className={styles.registerForm} onSubmit={this.props.logIn}>
                <TextField
                  fullWidth
                  floatingLabelText="Email"
                  className={styles.emailInput}
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />

                <TextField
                  fullWidth
                  className={styles.passwordInput}
                  floatingLabelText="Password"
                  value={this.props.password}
                  onChange={this.props.onChangePassword}
                />

                <RaisedButton
                  type="submit"
                  label="Log In"
                />
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  username: React.PropTypes.string,
  password: React.PropTypes.string,

  onChangeUsername: React.PropTypes.func,
  onChangePassword: React.PropTypes.func,
  logIn: React.PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  username: s.selectUsername(),
  password: s.selectPassword(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeUsername(evt) {
      dispatch(actions.changeUsernameAction(evt.target.value))
    },
    onChangePassword(evt) {
      dispatch(actions.changePasswordAction(evt.target.value))
    },
    logIn(evt) {
      evt.preventDefault()
      dispatch(actions.logInAction())
    },
    register(evt) {
      evt.preventDefault()
      dispatch(actions.registerAction())
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
