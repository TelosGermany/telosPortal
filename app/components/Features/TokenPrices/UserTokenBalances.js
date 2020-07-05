/*
 * Author: Andre Litty
 * Project: TelosPortal
 * Date: 03.10.19
 * Version: 1.0
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import { makeSelectAccount, makeSelectTokenList } from 'containers/NetworkClient/selectors';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import withStyles from '@material-ui/core/styles/withStyles';
import tableStyle from 'assets/jss/tableStyle';

function compare(a, b) {
  if (a.balance === '/') return 1;
  else if (b.balance === '/') return -1;
  return b.balance - a.balance;
}

const getAccountBalance = (account, tokenPrices) => {
  const { total_resources } = account;
  const userBalances = { total: 0, currencies: [] };
  const accountResourceToken = total_resources.net_weight.substr(
    total_resources.net_weight.indexOf(' ') + 1,
    total_resources.net_weight.length
  );
  const accountNetWeight = parseFloat(total_resources.net_weight.substr(0, total_resources.net_weight.indexOf(' ')));
  const accountCpuWeight = parseFloat(total_resources.cpu_weight.substr(0, total_resources.cpu_weight.indexOf(' ')));

  account.balances.forEach(balance => {
    const tokenName = balance.substr(balance.indexOf(' ') + 1, balance.length);
    const balanceValue = balance.substr(0, balance.indexOf(' '));
    tokenPrices.forEach(tokenPrice => {
      if (tokenPrice.symbol === tokenName) {
        let totalCurrencyValue = balanceValue * tokenPrice.current_price;
        if (tokenPrice.symbol === accountResourceToken) {
          totalCurrencyValue += accountNetWeight * tokenPrice.current_price;
          totalCurrencyValue += accountCpuWeight * tokenPrice.current_price;
        }
        userBalances.total += totalCurrencyValue;
        totalCurrencyValue = totalCurrencyValue.toFixed(2);
        userBalances.currencies.push({ name: tokenPrice.symbol, balance: totalCurrencyValue });
      }
    });
    if (!userBalances.currencies.find(currency => currency.name === tokenName))
      userBalances.currencies.push({ name: tokenName, balance: '/' });
  });
  userBalances.currencies.sort(compare);
  return userBalances;
};

const TokenMonitorTable = props => {
  const { classes, account, tokenPrices } = props;
  let userBalances = { total: 0, currencies: [] };
  if (account !== null) userBalances = getAccountBalance(account, tokenPrices);
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        <TableHead className={classes.successRow}>
          <TableRow className={classes.tableRow}>
            <TableCell className={`${classes.tableCellCenter} ${classes.tableHeadFontSize}`}>Currencies</TableCell>
            <TableCell className={`${classes.tableCellCenter} ${classes.tableHeadFontSize}`}>
              Total Token Balance
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {account !== null ? (
            userBalances.currencies.map((currency, index) => {
              return (
                <TableRow className={classes.tableRowHover} key={currency.name}>
                  <TableCell className={classes.tableCellCenter}>
                    <a href={`https://marketcap.one/m/${currency.name}`} target="new">
                      {currency.name} - {currency.balance} USD
                    </a>
                  </TableCell>
                  {index === 0 && (
                    <TableCell className={classes.tableCellCenter}>{userBalances.total.toFixed(2)} USD</TableCell>
                  )}
                </TableRow>
              );
            })
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
  account: makeSelectAccount(),
  tokenPrices: makeSelectTokenList(),
});

export default compose(withStyles(tableStyle), connect(mapStateToProps, null))(TokenMonitorTable);
