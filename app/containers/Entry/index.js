/*
 *
 * Entry
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectEntry from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import { createEntryAction } from './actions'
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import Dropzone from 'react-dropzone'
import { UserIsAuthenticated } from '../../authWrappers'

@UserIsAuthenticated
export class Entry extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onChange(evt) {
    console.log('evt', evt)
    console.log('evt.target.value', evt.target.value)
  }

  xOnDrop() {
    console.log('onDrop');
  }

  render() {
    return (
      <div className={styles.entry}>
        <Helmet
          title="New Entry"
          meta={[
            { name: 'description', content: 'Description of Entry' },
          ]}
        />

        <Grid>
          <Row className={styles.dropZoneRow}>
            <Col md={10} lg={10}>
              <form>
                <Dropzone
                  className={styles.dropZone}
                  onDrop={this.props.handleDrop}
                >
                  <FormattedMessage
                    {...messages.takePicture}
                  />
                </Dropzone>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Entry.propTypes = {
  handleDrop: React.PropTypes.func,
}

const mapStateToProps = selectEntry();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleDrop: (acceptedFiles, rejectedFiles) => {
      console.debug('handleDrop called')
      if (rejectedFiles.length > 0) {
        console.err('rejected files')
      }
      console.dir(acceptedFiles)
      dispatch(createEntryAction(acceptedFiles[0]))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
