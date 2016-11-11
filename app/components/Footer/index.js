import React from 'react';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';
/* import styles from './styles.css';*/
import { FormattedMessage } from 'react-intl';

function Footer() {
  return (
    <Wrapper>
      <section>
        Made with ❤️  by @jasoncyu.
      </section>
    </Wrapper>
  );
}

export default Footer;
