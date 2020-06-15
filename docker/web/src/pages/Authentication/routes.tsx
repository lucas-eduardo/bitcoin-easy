import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';

interface Props {
  pathFather: string;
}

const Routes: React.FC<Props> = ({ pathFather }) => (
  <Switch>
    <Route path={pathFather} exact component={SignIn} />
    <Route path={`${pathFather}signup`} component={SignUp} />
  </Switch>
);

export default Routes;
