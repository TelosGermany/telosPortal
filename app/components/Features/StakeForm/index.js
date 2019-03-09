/**
 *
 * LinkAuthForm
 *
 */

import React from 'react';

import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import Delegate from './DelegateForm';
import Undelegate from './UndelegateForm';

const StakeForm = props => {
  return (
    <Tool>
      <ToolSection lg={8}>
        <Delegate {...props} />
        <Undelegate {...props} />
      </ToolSection>
      <ToolSection lg={4}>
        <ToolBody color="info" header="Information">
          <p>
            Delegate: <br />
            Stake or delegate CPU and/or RAM by entering the desired amount. If you only want to stake them to your own account, just enter your account name in the recipient field. You can also stake them to another account but if you check the “Transfer” button the resources will be completely transferred to the other account and can’t be unstaked or regained by this original account.
            <br /> <br />
            Undelegate: <br />
            Unstake your own resources or undelegate them from another account by entering the holding account name and the desired amount.
          </p>
        </ToolBody>
      </ToolSection>
    </Tool>
  );
};

export default StakeForm;
