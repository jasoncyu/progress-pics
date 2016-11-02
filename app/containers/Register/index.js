/*
 *
 * Register
 *
 */

import React from 'react';
import autobind from 'autobind-decorator'
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectRegister from './selectors';
import styles from './styles.css';

import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import TextField from 'material-ui/TextField'

export class Register extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  @autobind
  onChangeEmail(evt) {
    console.log('this', this)
    console.log('evt.target.value', evt.target.value)
    this.setState({ email: evt.target.value })
  }

  @autobind
  onChangePassword(evt) {
    this.setState({ password: evt.target.value })
  }

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
          Register
        </h3>
        
        <Grid>
          <Row center="xs">
            <Col className={styles.extraColName} md={12}>
              <form className={styles.registerForm}>
                <TextField
                  fullWidth
                  floatingLabelText="Email"
                  className={styles.emailInput}
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />

                <TextField
                  fullWidth
                  className={styles.passwordInput}
                  floatingLabelText="Password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = selectRegister();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
