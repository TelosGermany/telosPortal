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

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';

import withStyles from '@material-ui/core/styles/withStyles';
import userProfileStyles from '../../Summary/comingSoon';

const ChainMonitor = props => {
  const { classes, chainMonitor } = props;

  return (
    <div>
      <GridContainer>
        <GridItem md={12}>
          <Card>
            <CardHeader>
              <h5 className={classes.cardIconTitle}>
                Current block: {chainMonitor.head_block_num} - Current producer: {chainMonitor.head_block_producer}{' '}
              </h5>
            </CardHeader>
            <CardHeader>
              <h5 className={classes.cardIconTitle}>
                Last irrecersible block number: {chainMonitor.last_irreversible_block_num}
              </h5>
            </CardHeader>
            <CardBody />
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  chainMonitor: makeSelectChainMonitor(),
});

export default compose(
  withStyles(userProfileStyles),
  connect(
    mapStateToProps,
    null
  )
)(ChainMonitor);
