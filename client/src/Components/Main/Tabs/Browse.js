import React from 'react';
import { Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

class History extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Typography
        className={classes.title}
        variant='h4'
        align='center'
        color='textPrimary'
        gutterBottom
      >
      Browse financial beings
      </Typography>
    );
  }
}

export default withStyles(styles)(History);
