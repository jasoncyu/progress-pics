/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// Needed for material-ui. It'll raise errors in development for multiple injections,
// but we can ignore those.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import AppBar from 'material-ui/AppBar'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import styles from './styles.css';

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
        {React.Children.toArray(props.children)}
      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
