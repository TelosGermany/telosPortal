/**
 *
 * AirgrabForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import { makeSelectChainMonitor } from 'containers/NetworkClient/selectors';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import withStyles from '@material-ui/core/styles/withStyles';
import tableStyle from 'assets/jss/tableStyle';

const ChainMonitorTable = props => {
  const { classes, chainMonitor } = props;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        <TableHead className={classes.successRow}>
          <TableRow className={classes.tableRow}>
            <TableCell className={`${classes.tableHeadCell} ${classes.tableHeadFontSize}`}>Current Block</TableCell>
            <TableCell className={`${classes.tableHeadCell} ${classes.tableHeadFontSize}`}>Current Producer</TableCell>
            <TableCell className={`${classes.tableHeadCell} ${classes.tableHeadFontSize}`}>
              Last irreversible block number
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chainMonitor !== null ? (
            <TableRow className={classes.tableRowHover} key={chainMonitor.head_block_num}>
              <TableCell className={classes.tableCell}>{chainMonitor.head_block_num}</TableCell>
              <TableCell className={classes.tableCell}>{chainMonitor.head_block_producer}</TableCell>
              <TableCell className={classes.tableCell}>{chainMonitor.last_irreversible_block_num}</TableCell>
            </TableRow>
          ) : (
            <TableRow className={classes.tableRowHover}>
              <TableCell className={classes.tableCell} colSpan={3}>
                No data available yet...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  chainMonitor: makeSelectChainMonitor(),
});

export default compose(
  withStyles(tableStyle),
  connect(
    mapStateToProps,
    null
  )
)(ChainMonitorTable);
