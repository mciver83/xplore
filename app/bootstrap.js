/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import { Provider } from 'react-redux';

import { bootstrapRedux } from './reducers';
import RouteContainer from './containers/RouteContainer';

/**
 * Bootstraps the root component.
 *
 * @param {object} store :: redux store.
 * @return {object} XploreApp component class.
 */
const bootstrapXploreAppComponent = store => class XploreApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouteContainer />
      </Provider>
    );
  }
};

/**
 * Initializes application dependencies and registers the root component.
 *
 * @returns {void}
 */
function bootstrap() {
  const store = bootstrapRedux();
  const XploreApp = bootstrapXploreAppComponent(store);

  AppRegistry.registerComponent('TravelPlanner', () => XploreApp);
}

export { bootstrap as default };
