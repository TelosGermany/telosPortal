/**
 *
 * AirgrabForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectClaims } from 'containers/NetworkClient/selectors';

import DesktopMac from '@material-ui/icons/DesktopMac';
import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import Disclaimer from 'components/Information/Disclaimer';

import AirgrabTable from './AirgrabTable';

const AirgrabForm = props => {
  const { networkAccount } = props;

  return (
    <Tool>
      <ToolSection lg={8}>
        <ToolBody color="warning" icon={DesktopMac} header="Blockchain Monitor">
          <Disclaimer />
          <AirgrabTable account={networkAccount} />
        </ToolBody>
      </ToolSection>
    </Tool>
  );
};

const mapStateToProps = createStructuredSelector({
  monitor: makeSelectClaims(),
});

export default connect(
  mapStateToProps,
  null
)(AirgrabForm);
