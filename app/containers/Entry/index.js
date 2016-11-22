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
// import styles from './styles.css';
import { createEntryAction } from './actions'
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import Dropzone from 'react-dropzone'
import { UserIsAuthenticated } from '../../authWrappers'

import styled from 'styled-components'

const DropzoneRow = styled(Row)`
  margin: auto;
`

const MyDropzone = styled(Dropzone)`
  font-size: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  width: 100%;
  height: 100%;
  text-align: center;
  border: 0.4rem dashed grey;
`

/**
 * Component to create an entry.
 */
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
      <div className="top">
        <Helmet
          title="New Entry"
          meta={[
            { name: 'description', content: 'Description of Entry' },
          ]}
        />

        <Grid>
          <DropzoneRow center="lg">
            <Col lg={12}>
              <form>
                <MyDropzone
                  onDrop={this.props.handleDrop}
                >
                  <FormattedMessage
                    {...messages.takePicture}
                  />
                </MyDropzone>
              </form>
            </Col>
          </DropzoneRow>
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
