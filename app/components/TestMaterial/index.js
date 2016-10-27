/**
 *
 * TestMaterial
 *
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';


import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';

function TestMaterial() {
  return (
    <div className={styles.testMaterial}>
      <FormattedMessage {...messages.header} />
      <AppBar
        title="Title"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    </div>
  );
}

export default TestMaterial;
