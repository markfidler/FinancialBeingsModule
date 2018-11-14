import React from 'react';
import { Query } from 'react-apollo';
import { FINANCIAL_BEINGS } from "../../../GraphQL/Calls";
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

        <Query query={FINANCIAL_BEINGS}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            const list = data.financialBeings.map((event, index) => (
              <p>{event.name}</p>
            ));
            return (
              <React.Fragment>
                { list }
              </React.Fragment>
            );
          }}
        </Query>
      </Typography>
    );
  }
}

export default withStyles(styles)(History);
