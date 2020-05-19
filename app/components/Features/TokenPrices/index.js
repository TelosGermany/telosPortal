/*
* Author: Andre Litty
* Project: TeolosPortal
* Date: 27.09.19
* Version: 1.0
*/

import React from 'react';
import { connect } from 'react-redux';

import AttachMoney from '@material-ui/icons/AttachMoney';

import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import { triggerUpdateTokenPrices } from 'containers/NetworkClient/actions';

import TokenPriceTable from './TokenPriceTable';
import UserTokenBalances from './UserTokenBalances';

class TokenPrices extends React.Component {
  componentDidMount() {
    this.props.updateTokenPrices();
  }

  render() {
    return (
      <Tool>
        <ToolSection md={12}>
          <ToolBody
            color="warning"
            icon={AttachMoney}
            header="Token prices"
            subheader=" - thanks to marketcap.one for providing their API">
            <UserTokenBalances />
            <br />
            <p>
              Token staked in Rex are not calculated at the moment. We're currently working on this feature, sorry for any
              inconvenience.
            </p>
            <TokenPriceTable />
          </ToolBody>
        </ToolSection>
      </Tool>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateTokenPrices: () => dispatch(triggerUpdateTokenPrices()),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(TokenPrices);
