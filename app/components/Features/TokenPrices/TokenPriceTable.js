/*
 * Author: Andre Litty
 * Project: TeolosPortal
 * Date: 27.09.19
 * Version: 1.0
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectTokenList } from 'containers/NetworkClient/selectors';

import ReactTable from 'react-table';
import CircularProgress from '@material-ui/core/CircularProgress';

const TokenPriceTable = props => {
  const { tokenList } = props;
  if (tokenList !== undefined)
    return (
      <ReactTable
        data={tokenList}
        filterable
        noDataText={<CircularProgress color="secondary" />}
        columns={[
          {
            Header: 'Name',
            accessor: 'id',
            id: 'id',
            Cell: row => (
              <a href={`https://www.coingecko.com/en/coins/${row.value}`} target="new">
                {row.value}
              </a>
            ),
          },
          {
            Header: 'Current Price',
            id: 'current_price',
            accessor: d => Number(d.current_price).toFixed(2),
            Cell: row => <span>{row.value} USD</span>,
          },
          {
            Header: 'High 24h',
            id: 'high_24h',
            accessor: d => Number(d.high_24h).toFixed(2),
            Cell: row => <span>{row.value}</span>,
          },
          {
            Header: 'Low 24h',
            id: 'low_24h',
            accessor: d => Number(d.low_24h).toFixed(2),
            Cell: row => <span>{row.value}</span>,
          },
          {
            Header: 'Price change 24hr',
            id: 'price_chprice_change_24hange_24h',
            accessor: d => Number(d.price_change_24h).toFixed(2),
            Cell: row => <span style={{ color: row.value >= 0 ? 'green' : 'red' }}>{row.value} %</span>,
          },
          {
            Header: 'Current Marketcap',
            id: 'market_cap',
            accessor: d => Number(d.market_cap).toFixed(2),
            Cell: row => <span>{row.value}</span>,
          },
          {
            Header: 'Marketcap change 24hr',
            id: 'market_cap_change_24h',
            accessor: d => Number(d.market_cap_change_24h).toFixed(2),
            Cell: row => <span>{row.value}</span>,
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
        pageSize={tokenList.length}
        showPaginationTop={false}
        showPaginationBottom={false}
        className="-striped -highlight"
      />
    );
  return null;
};

const mapStateToProps = createStructuredSelector({
  tokenList: makeSelectTokenList(),
});

export default connect(mapStateToProps, null)(TokenPriceTable);
