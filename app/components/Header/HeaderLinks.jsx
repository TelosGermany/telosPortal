import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import logo from 'assets/img/telosGermany.png';

import VoteUs from 'components/Features/VoteUs';

import headerLinksStyle from './headerLinksStyle';

class HeaderLinks extends React.Component {
  state = {
    open: false,
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, rtlActive } = this.props;
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive,
    });
    return (
      <div className={wrapper}>
        <div className={classes.poweredBy}>
          <span className={classes.logoNormal}>
            <VoteUs />
          </span>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(headerLinksStyle)(HeaderLinks);
