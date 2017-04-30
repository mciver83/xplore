import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';

import { LoginContainer } from './auth';
import AppContainer from './AppContainer';
import Home from '../components/Home';
import Profile from '../components/Profile';
import Dashboard from '../components/Dashboard';

const RouteContainer = () => (
  <NativeRouter>
    <AppContainer>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />

        <Route path="/auth/login" component={LoginContainer} />
      </Switch>
    </AppContainer>
  </NativeRouter>
);

export { RouteContainer as default };
