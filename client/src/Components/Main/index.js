import React, { Component } from 'react';

import {
  Typography,
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  ImportContacts,
  People,
} from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import BannerTopBar from '../BannerTopBar';

import {
  Search,
  Browse,
  Genealogy
} from './Tabs';

function TabContainer(props) {
  return (
    <Typography component='div' style={{ padding: 6 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Main extends Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <React.Fragment>
        <BannerTopBar
          size='medium'
          title='Financial Beings'
          text='You can explore all financial beings here'
          backgroundUrl='https://aacorporatesitedevelop.azurewebsites.net/img/photos/events.jpg'
        />
        <React.Fragment>
          <div className={classes.root}>
            <AppBar position='static' color='default'>
              <Tabs
                value={value}
                onChange={this.handleChange}
                scrollable
                scrollButtons='off'
                indicatorColor='primary'
                textColor='primary'
              >
                <Tab
                  className={classes.tabTitle}
                  label='Search'
                  icon={<SearchIcon />}
                />
                <Tab
                  className={classes.tabTitle}
                  label='Browse'
                  icon={<ImportContacts />}
                />
                <Tab
                  className={classes.tabTitle}
                  label='Genealogy'
                  icon={<People />}
                />
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer><Search /></TabContainer>}
            {value === 1 && <TabContainer><Browse /></TabContainer>}
            {value === 2 && <TabContainer><Genealogy /></TabContainer>}
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Main);
