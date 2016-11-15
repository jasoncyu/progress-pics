import React from 'react';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

import styled from 'styled-components'


const Section = styled.section`
  margin: auto;
`


class Footer extends React.Component {
  render() {
    return (
      <Wrapper>
        <Section>
          Made with @jasoncyu.
        </Section>
      </Wrapper>
    );
  }
}

export default Footer;
