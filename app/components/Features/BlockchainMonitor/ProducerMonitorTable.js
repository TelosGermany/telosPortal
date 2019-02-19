/**
 *
 * AirgrabForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectProducerMonitor } from 'containers/NetworkClient/selectors';

import ReactTable from 'react-table';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProducerMonitorTable = props => {
  const { producerMonitor } = props;
  let data = [];
  if (producerMonitor.rows !== undefined) {
    data = producerMonitor.rows.sort((a, b) => b.total_votes - a.total_votes).map(producer => {
      return {
        ...producer,
        position: producerMonitor.rows.indexOf(producer) + 1,
      };
    });
  }

  return (
    <ReactTable
      data={data}
      filterable
      noDataText={<CircularProgress color="secondary" />}
      columns={[
        {
          Header: 'Position',
          accessor: 'position',
          Cell: row => <span>{row.value}</span>,
        },
        {
          Header: 'Name',
          accessor: 'owner',
        },
        {
          Header: 'Url',
          accessor: 'url',
          Cell: row => (
            <a href={row.value} target="new">
              {row.value}
            </a>
          ),
          minWidth: 200,
          maxWidth: 300,
        },
        {
          Header: 'Total Votes',
          id: 'total_votes',
          accessor: d => Number(d.total_votes).toFixed(0),
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
      defaultPageSize={50}
      // pageSize={data.length}
      showPaginationTop //= {false}
      showPaginationBottom={false}
      className="-striped -highlight"
    />
  );
};

const mapStateToProps = createStructuredSelector({
  producerMonitor: makeSelectProducerMonitor(),
});

export default connect(
  mapStateToProps,
  null
)(ProducerMonitorTable);
