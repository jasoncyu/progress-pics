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

const CenteredH3 = styled(H3)`
  text-align: center;
`

/**
 * For both registering and logging in.
 */
export class Register extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const login = (evt) => {
      evt.preventDefault()

      if (this.props.params.redirect) {
        this.props.logIn({ redirectPath: this.props.params.redirect })
      } else {
        this.props.logIn()
      }
    }

    return (
      <div>
        <Helmet
          title="Register"
          meta={[
            { name: 'description', content: 'Description of Register' },
          ]}
        />

        <CenteredH3>
          Log in
        </CenteredH3>

        <Grid>
          <Row center="xs">
            <MyCol md={12}>
              <RegisterForm onSubmit={login}>
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
                  type="password"
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
  params: React.PropTypes.obj,
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
    logIn(params) {
      dispatch(actions.logInAction(params))
    },
    register(evt) {
      evt.preventDefault()
      dispatch(actions.registerAction())
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
