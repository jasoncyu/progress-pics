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
// import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import FileReaderInput from 'react-file-reader-input'

// Needed for material-ui. It'll raise errors in development for multiple injections,
// but we can ignore those.
/* import injectTapEventPlugin from 'react-tap-event-plugin';
 * injectTapEventPlugin();*/
import RaisedButton from 'material-ui/RaisedButton'


export class Entry extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onChange(evt) {
    console.log('evt', evt)
    console.log('evt.target.value', evt.target.value)
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


        {/* <input
        className={styles.cameraInputElem}
        name="name1"
        type="file"
        accept="image/*"
        capture="camera"
        onChange={this.onChange}
        />

        <RaisedButton
        className="button"
        label={<FormattedMessage {...messages.uploadPicture} />}
        onClick={this.uploadPicture}
        secondary
        />
        <input
        className={styles.uploadInputElem}
        type="file"
        accept="image/*"
        /> */}

        <form>
          <label
            htmlFor="takePictureInput"
          >
          </label>
          {/* The as="binary" attr is required, but note that the console does
              throw an error when we use it. Not sure how to get rid of it, so
              leaving it in for now.*/}
          <FileReaderInput
            as="binary"
            id="takePictureInput"
            onChange={this.props.handleFileUpload}
            capture="camera"
          >
            <RaisedButton
              className="button"
              label={<FormattedMessage {...messages.takePicture} />}
              primary
            >
            </RaisedButton>
          </FileReaderInput>
        </form>
      </div>
    )
  }
}

Entry.propTypes = {
  handleFileUpload: React.PropTypes.func,
}

const mapStateToProps = selectEntry();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleFileUpload: (evt, results) => {
      results.forEach((result) => {
        const file = result[1];
        dispatch(createEntryAction(file))
      })
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
