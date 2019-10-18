/*
* Author: Andre Litty
* Project: TeolosPortal
* Date: 27.09.19
* Version: 1.0
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectTokenPrices } from 'containers/NetworkClient/selectors';

import ReactTable from 'react-table';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getEOSPrice, calculateUSDPrice } from './utils';

const TokenPriceTable = props => {
  const { tokenPrices } = props;
  const eosPrice = getEOSPrice(tokenPrices);

  return (
    <ReactTable
      data={tokenPrices}
      filterable
      noDataText={<CircularProgress color="secondary" />}
      columns={[
        {
          Header: 'Name',
          accessor: 'symbol',
          id: 'symbol',
          Cell: row => (
            <a href={`https://marketcap.one/m/${row.value}`} target="new">
              {row.value}
            </a>
          ),
        },
        {
          Header: 'Current Price',
          id: 'current_price',
          accessor: d =>
            d.symbol !== 'EOS' && d.symbol !== 'BTC'
              ? calculateUSDPrice(d.current_price, eosPrice).toFixed(5)
              : Number(d.current_price).toFixed(5),
          Cell: row => <span>{row.value} USD</span>,
        },
        {
          Header: 'Current Supply',
          id: 'current_supply',
          accessor: d => Number(d.current_supply).toFixed(2),
          Cell: row => <span>{row.value}</span>,
        },
        {
          Header: 'May Supply',
          id: 'max_supply',
          accessor: d => Number(d.max_supply).toFixed(2),
          Cell: row => <span>{row.value}</span>,
        },
        {
          Header: 'Current Marketcap',
          id: 'current_marketcap',
          accessor: d => Number(d.current_marketcap).toFixed(2),
          Cell: row => <span>{row.value}</span>,
        },
        {
          Header: 'Volume 24hr',
          id: 'volume_24hr',
          accessor: d => Number(d.volume_24hr).toFixed(2),
          Cell: row => <span>{row.value}</span>,
        },
        {
          Header: 'Price change 24hr',
          id: 'price_change_24hr',
          accessor: d => Number(d.price_change_24hr).toFixed(2),
          Cell: row => <span style={{ color: row.value >= 0 ? 'green' : 'red' }}>{row.value} %</span>,
        },
        {
          filterable: false,
          sortable: false,
          maxWidth: 0,
        },
      ]}
      defaultSorted={[
        {
          id: 'position',
          desc: false,
        },
      ]}
      // defaultPageSize={50}
      pageSize={tokenPrices.length}
      showPaginationTop={false}
      showPaginationBottom={false}
      className="-striped -highlight"
    />
  );
};

const mapStateToProps = createStructuredSelector({
  tokenPrices: makeSelectTokenPrices(),
});

export default connect(
  mapStateToProps,
  null
)(TokenPriceTable);
