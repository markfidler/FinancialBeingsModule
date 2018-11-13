import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { myTreeData } from './blobs'
import styles from '../styles';


class Genealogy extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography
          className={classes.title}
          variant='h4'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          You can explore genealogy of all trading bots here
        </Typography>
        <div id="treeWrapper" style={{ margin: '0 auto', color: 'black', width: '100em', height: '50em', background:'linear-gradient(0deg,#6a82fb,#fc5c7d)' }}>
          <Tree nodeSvgShape={{ shape: 'circle', shapeProps: {r: 10, fill: 'gray' }}} data={myTreeData} translate={{ x: 300, y: 200 }} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Genealogy);
