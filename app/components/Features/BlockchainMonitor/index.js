/**
 *
 * AirgrabForm
 *
 */

import React from 'react';

import DesktopMac from '@material-ui/icons/DesktopMac';

import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import ChainMonitor from './ChainMonitor';
import ChainMonitorTable from './ChainMonitorTableStyle';
import ProducerMonitorTable from './ProducerMonitorTable';

const MonitorFeature = () => {
  return (
    <Tool>
      <ToolSection md={12}>
        <ToolBody
          color="warning"
          icon={DesktopMac}
          header="Blockchain monitor"
          subheader=" - Latest data from the chain">
          <ChainMonitorTable />
          <ProducerMonitorTable />
        </ToolBody>
      </ToolSection>
    </Tool>
  );
};

export default MonitorFeature;
