/*
* Author: Andre Litty
* Project: TeolosPortal
* Date: 27.09.19
* Version: 1.0
*/


import React from 'react';

import AttachMoney from '@material-ui/icons/AttachMoney';

import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import TokenPriceTable from './TokenPriceTable';

const TokenPrices = () => {
  return (
    <Tool>
      <ToolSection md={12}>
        <ToolBody
          color="warning"
          icon={AttachMoney}
          header="Token prices"
          subheader=" - Latest data from marketcap.one">
          <TokenPriceTable />
        </ToolBody>
      </ToolSection>
    </Tool>
  );
};

export default TokenPrices;
