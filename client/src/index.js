import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import LuxonUtils from 'material-ui-pickers/utils/luxon-utils';
import Main from './Components/Main'
import Profile from './Components/Profile/Profile'
import { MAIN, PROFILE } from './constants/routes'

const App = () => (
  <MuiPickersUtilsProvider utils={LuxonUtils}>
    <Switch>
      <Route exact path={MAIN} component={Main} />
      <Route path={`${PROFILE}/:id`} component={Profile} />
    </Switch>
  </MuiPickersUtilsProvider>
);

export default App;
