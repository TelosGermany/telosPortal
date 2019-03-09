/**
 *
 * LinkAuthForm
 *
 */

import React from 'react';

import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import BuyRam from './BuyRamForm';
import SellRam from './SellRamForm';

const RamForm = props => {
  return (
    <Tool>
      <ToolSection lg={8}>
        <BuyRam {...props} />
        <SellRam {...props} />
      </ToolSection>
      <ToolSection lg={4}>
        <ToolBody color="info" header="Information">
          <p>
            Buying RAM can be done by entering either the desired amount in byte or the spendable amount of TLOS. The name of the paying and the receiving amount must be put in the fields, too.
            <br />
            <br />
            In order to sell RAM, the selling account name and the amount of RAM in bytes must be entered.
          </p>
        </ToolBody>
      </ToolSection>
    </Tool>
  );
};

export default RamForm;
