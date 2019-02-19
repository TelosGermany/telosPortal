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
        <ChainMonitorTable />
        <ToolBody color="warning" icon={DesktopMac} header="Block Producers" subheader=" - Latest BP data">
          <ProducerMonitorTable />
        </ToolBody>
      </ToolSection>
    </Tool>
  );
};

export default MonitorFeature;
