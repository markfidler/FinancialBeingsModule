import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import LuxonUtils from 'material-ui-pickers/utils/luxon-utils';
import Main from './Components/Main'
import { MAIN} from './constants/routes'

const App = () => (
  <MuiPickersUtilsProvider utils={LuxonUtils}>
    <Switch>
      <Route exact path={MAIN} component={Main} />
    </Switch>
  </MuiPickersUtilsProvider>
);

export default App;
