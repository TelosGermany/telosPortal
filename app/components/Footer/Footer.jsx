import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import footerStyle from './footerStyle';

function Footer({ ...props }) {
  const { classes, fluid, white } = props;
  const container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
  });
  const anchor =
    classes.a +
    cx({
      [` ${classes.whiteColor}`]: white,
    });
  const block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white,
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="https://t.me/TelosGermany" target="new" className={block}>
                {'Telegram'}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://twitter.com/TelosGermany" target="new" className={block}>
                {'Twitter'}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://github.com/TelosGermany" target="new" className={block}>
                {'GitHub'}
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{' '}
          <a href="https://telosgermany.io" target="new" className={anchor}>
            {'TelosGermany'}
          </a>
          {', made with passion for the Telos and EOS Community'}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool,
};

export default withStyles(footerStyle)(Footer);
