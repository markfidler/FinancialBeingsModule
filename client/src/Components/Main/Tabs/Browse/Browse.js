import React from 'react';
import {Query} from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import {FINANCIAL_BEINGS} from "../../../../GraphQL/Calls/index";
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../styles';
import BotCard from './views/Card'


class History extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Typography className={classes.title} variant='h4' align='center' color='textPrimary' gutterBottom>
          Browse financial beings
        </Typography>

        <Query query={FINANCIAL_BEINGS}>
          {({loading, error, data}) => {
            if(loading) return "Please wait, loading in progress..";
            if(error) return `Error! ${error.message}`;
            const list = data.financialBeings_FinancialBeings.map((bot) => (
              <Grid item xs>
                <BotCard botInfo={bot} className={classes.paper} />
              </Grid>
            ));
            return (
              <React.Fragment>
                <div className={classes.root}>
                  <Grid container spacing={24}>
                    {list}
                  </Grid>
                </div>
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(styles)(History);
