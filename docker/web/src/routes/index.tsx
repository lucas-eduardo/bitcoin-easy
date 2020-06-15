import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Authentication from '../pages/Authentication';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route
      path="/dashboard"
      component={() => <Dashboard path="/dashboard" />}
      isPrivate
    />

    <Route path="/" component={() => <Authentication path="/" />} />
  </Switch>
);

export default Routes;
