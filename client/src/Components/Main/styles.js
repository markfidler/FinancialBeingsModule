const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    margin: 0,
    minHeight: '500px'
  },
  tabTitle: {
    width: '33%',
    maxWidth: 'none',
  },
  card: {
    flexGrow: 1,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 400,
    marginRight: 400,
  },
  buttonList: {
    margin: theme.spacing.unit,
    float: 'right',
  },
  buttonGrid: {
    marginTop: -20,
  },
  title: {
    marginTop: 20,
  },
});

export default styles;
