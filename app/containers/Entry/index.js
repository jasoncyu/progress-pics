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
import $ from 'npm-zepto'

// Needed for material-ui. It'll raise errors in development for multiple injections,
// but we can ignore those.
/* import injectTapEventPlugin from 'react-tap-event-plugin';
 * injectTapEventPlugin();*/
import RaisedButton from 'material-ui/RaisedButton'


export class Entry extends React.Component { // eslint-disable-line react/prefer-stateless-function
  takePicture() {
    const $inputElem = $(`.${styles.cameraInputElem}`)
    $inputElem.trigger('click')
  }

  uploadPicture() {
    $(`.${styles.uploadInputElem}`).trigger('click')
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

        <RaisedButton
          className="button"
          label={<FormattedMessage {...messages.takePicture} />}
          onClick={this.takePicture}
          primary
        >
        </RaisedButton>
        <input
          className={styles.cameraInputElem}
          name="name1"
          type="file"
          accept="image/*"
          capture="camera"
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
        />
      </div>
    )
  }
}

const mapStateToProps = selectEntry();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
