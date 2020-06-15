import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';

interface Props {
  pathFather: string;
}

const Routes: React.FC<Props> = ({ pathFather }) => (
  <Switch>
    <Route path={pathFather} exact component={Home} />
  </Switch>
);

export default Routes;
