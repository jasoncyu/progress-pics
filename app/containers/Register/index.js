/*
 *
 * Register
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
// import styles from './styles.css';

import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import * as actions from './actions'
import * as s from './selectors'
import styled from 'styled-components';

import { H3 } from '../../stuff/typography';

const MyCol = styled(Col)`
  display: flex;
  flex-flow: column;
  height: 100%;
`

const RegisterForm = styled.form`
  width: 100%;
  max-width: 400px;
  margin: auto;
`

const EmailInput = styled(TextField)`
  margin: auto;
`
const PasswordInput = styled(TextField)`
  margin: auto;
`

export class Register extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Register"
          meta={[
            { name: 'description', content: 'Description of Register' },
          ]}
        />

        <H3>
          Log in
        </H3>

        <Grid>
          <Row center="xs">
            <MyCol md={12}>
              <RegisterForm onSubmit={this.props.logIn}>
                <EmailInput
                  fullWidth
                  floatingLabelText="Email"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />

                <PasswordInput
                  fullWidth
                  floatingLabelText="Password"
                  value={this.props.password}
                  onChange={this.props.onChangePassword}
                />

                <RaisedButton
                  type="submit"
                  label="Log In"
                />
              </RegisterForm>
            </MyCol>
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
    /* logIn(evt) {
     *   evt.preventDefault()
     *   dispatch(actions.logInAction())
     * },
     * register(evt) {
     *   evt.preventDefault()
     *   dispatch(actions.registerAction())
     * },*/
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
